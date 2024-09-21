import * as Cesium from 'cesium'
import { defineColor } from '~/core/utils/defineColor'
import { useViewer } from '../useViewer'
import VERTEX from './VertexShader.glsl?raw'
import WATER_MATERIAL from './WaterMaterial.glsl?raw'

type OmitProperties =
  | 'scene'
  | 'rippleSize'
  | 'waterColor'
  | 'waterAlpha'
  | 'reflectivity'
  | 'distortionScale'
  | 'flowDegrees'
  | 'lightDirection'
  | 'sunShiny'

export type UseWaterPlaneOptions = {
  scene?: Cesium.Scene
  rippleSize?: number
  waterColor?: Cesium.Color
  waterAlpha?: number
  reflectivity?: number
  distortionScale?: number
  flowDegrees?: number
  lightDirection?: Cesium.Cartesian3
  sunShiny?: number
} & Omit<WaterPrimitiveConstructorOptions, OmitProperties>

export function useWaterPlane(viewer = useViewer()) {
  return (options: UseWaterPlaneOptions) => {
    const {
      scene = viewer.scene,
      rippleSize = 100,
      waterColor = defineColor('#020E12'),
      waterAlpha = 0.9,
      reflectivity = 0.2,
      distortionScale = 10,
      flowDegrees = 0,
      lightDirection = new Cesium.Cartesian3(0, 0, 1),
      sunShiny = 100,
    } = options

    const primitive = new WaterPrimitive({
      ...options,
      scene,
      rippleSize,
      waterColor,
      waterAlpha,
      reflectivity,
      distortionScale,
      flowDegrees,
      lightDirection,
      sunShiny,
    })

    return primitive
  }
}

export interface WaterPrimitiveConstructorOptions {
  scene: Cesium.Scene
  height: number
  flowDegrees: number
  positions: { latitude: number, longitude: number }[]
  normalMapUrl: string
  rippleSize: number
  waterColor: Cesium.Color
  waterAlpha: number
  reflectivity: number
  lightDirection: Cesium.Cartesian3
  sunShiny: number
  distortionScale: number
}
class WaterPrimitive {
  private _scene: Cesium.Scene
  private _height: number
  private _flowDegrees: number
  private _positions: Cesium.Cartesian3[]
  private _show: boolean

  private _reflectorWorldPosition: Cesium.Cartesian3
  private _originalReflectorWorldPosition: Cesium.Cartesian3
  private _normal: Cesium.Cartesian3
  private _waterPlane: Cesium.Plane
  private _reflectMatrix: Cesium.Matrix4
  private _reflectorViewMatrix: Cesium.Matrix4
  private _reflectorProjectionMatrix: Cesium.Matrix4
  private _initUniforms: {
    normalMapUrl: string
    size: number
    waterColor: Cesium.Color
    waterAlpha: number
    rf0: number
    lightDirection: Cesium.Cartesian3
    sunShiny: number
    distortionScale: number
  }

  private _primitive: Cesium.Primitive
  private _virtualCamera?: Cesium.Camera
  private _material?: Cesium.Material
  // @ts-expect-error Private property
  private _colorFramebuffer?: Cesium.FrameBuffer
  // @ts-expect-error Private property
  private _colorTexture?: Cesium.Texture
  // @ts-expect-error Private property
  private _depthStencilTexture?: Cesium.Texture
  private _hdr?: boolean

  private __UniformState_prototype_updateFrustum: any
  private __PerspectiveFrustum_prototype_clone: any

  constructor(options: WaterPrimitiveConstructorOptions) {
    this._scene = options.scene
    this._height = options.height
    this._flowDegrees = options.flowDegrees
    const positions = options.positions
    this._show = true

    this._positions = []

    const [
      cosLatitudeSum,
      cosLatitudeSinLongitudeSum,
      sinLatitudeSum,
    ] = positions
      .reduce((acc, position) => {
        const { latitude, longitude } = position

        this._positions.push(Cesium.Cartesian3.fromRadians(position.longitude, position.latitude, this._height))

        return [
          acc[0] + Math.cos(latitude) * Math.cos(longitude),
          acc[1] + Math.cos(latitude) * Math.sin(longitude),
          acc[2] + Math.sin(latitude),
        ]
      }, [0, 0, 0])
      .map(item => item /= positions.length)

    const averageLongitude = Math.atan2(cosLatitudeSinLongitudeSum, cosLatitudeSum)
    const distanceToSurface = Math.sqrt(cosLatitudeSum * cosLatitudeSum + cosLatitudeSinLongitudeSum * cosLatitudeSinLongitudeSum)
    const averageLatitude = Math.atan2(sinLatitudeSum, distanceToSurface)

    this._reflectorWorldPosition = Cesium.Cartesian3.fromRadians(averageLongitude, averageLatitude, this._height)
    this._originalReflectorWorldPosition = this._reflectorWorldPosition.clone()
    this._normal = Cesium.Ellipsoid.WGS84.geodeticSurfaceNormal(this._reflectorWorldPosition)
    this._waterPlane = Cesium.Plane.fromPointNormal(this._reflectorWorldPosition, this._normal)

    this._reflectMatrix = new Cesium.Matrix4(
      -2 * this._waterPlane.normal.x * this._waterPlane.normal.x + 1,
      -2 * this._waterPlane.normal.x * this._waterPlane.normal.y,
      -2 * this._waterPlane.normal.x * this._waterPlane.normal.z,
      -2 * this._waterPlane.normal.x * this._waterPlane.distance,
      -2 * this._waterPlane.normal.y * this._waterPlane.normal.x,
      -2 * this._waterPlane.normal.y * this._waterPlane.normal.y + 1,
      -2 * this._waterPlane.normal.y * this._waterPlane.normal.z,
      -2 * this._waterPlane.normal.y * this._waterPlane.distance,
      -2 * this._waterPlane.normal.z * this._waterPlane.normal.x,
      -2 * this._waterPlane.normal.z * this._waterPlane.normal.y,
      -2 * this._waterPlane.normal.z * this._waterPlane.normal.z + 1,
      -2 * this._waterPlane.normal.z * this._waterPlane.distance,
      0,
      0,
      0,
      1,
    )

    this._reflectorViewMatrix = Cesium.Matrix4.IDENTITY.clone()
    this._reflectorProjectionMatrix = Cesium.Matrix4.IDENTITY.clone()

    this._initUniforms = {
      normalMapUrl: options.normalMapUrl,
      size: options.rippleSize,
      waterColor: options.waterColor,
      waterAlpha: options.waterAlpha,
      rf0: options.reflectivity,
      lightDirection: options.lightDirection,
      sunShiny: options.sunShiny,
      distortionScale: options.distortionScale,
    }

    // @ts-expect-error Private property
    const context = this._scene.context

    this._createFramebuffer(context, context.drawingBufferWidth, context.drawingBufferHeight, this._scene.highDynamicRange)

    this._primitive = this._createPrimitive(this._positions, this._flowDegrees)
    this._scene.primitives.add(this._primitive)

    this.preRender = this.preRender.bind(this)
    this._scene.preRender.addEventListener(this.preRender)

    // @ts-expect-error Private property
    this.__UniformState_prototype_updateFrustum = Cesium.UniformState.prototype.updateFrustum
    this.__PerspectiveFrustum_prototype_clone = Cesium.PerspectiveFrustum.prototype.clone

    // @ts-expect-error Private property
    Cesium.UniformState.prototype.updateFrustum = function (frustum) {
      Cesium.Matrix4.clone(Cesium.defaultValue(frustum.customProjectionMatrix, frustum.projectionMatrix), this._projection)
      this._inverseProjectionDirty = true
      this._viewProjectionDirty = true
      this._inverseViewProjectionDirty = true
      this._modelViewProjectionDirty = true
      this._modelViewProjectionRelativeToEyeDirty = true
      if (Cesium.defined(frustum.infiniteProjectionMatrix)) {
        Cesium.Matrix4.clone(frustum.infiniteProjectionMatrix, this._infiniteProjection)
        this._modelViewInfiniteProjectionDirty = true
      }
      this._currentFrustum.x = frustum.near
      this._currentFrustum.y = frustum.far
      this._farDepthFromNearPlusOne = frustum.far - frustum.near + 1
      this._log2FarDepthFromNearPlusOne = Cesium.Math.log2(this._farDepthFromNearPlusOne)
      this._oneOverLog2FarDepthFromNearPlusOne = 1 / this._log2FarDepthFromNearPlusOne
      if (Cesium.defined(frustum._offCenterFrustum))
        frustum = frustum._offCenterFrustum

      this._frustumPlanes.x = frustum.top
      this._frustumPlanes.y = frustum.bottom
      this._frustumPlanes.z = frustum.left
      this._frustumPlanes.w = frustum.right
    }

    Cesium.PerspectiveFrustum.prototype.clone = function (result) {
      if (!Cesium.defined(result))
        result = new Cesium.PerspectiveFrustum()

      result.aspectRatio = this.aspectRatio
      result.fov = this.fov
      result.near = this.near
      result.far = this.far
      // @ts-expect-error Private property
      result._aspectRatio = undefined
      // @ts-expect-error Private property
      result._fov = undefined
      // @ts-expect-error Private property
      result._near = undefined
      // @ts-expect-error Private property
      result._far = undefined
      // @ts-expect-error Private property
      this._offCenterFrustum.clone(result._offCenterFrustum)
      // @ts-expect-error Custom property
      result.customProjectionMatrix = this.customProjectionMatrix
      return result
    }
  }

  get show() {
    return this._show
  }

  set show(val) {
    this._show = val
  }

  get rippleSize() {
    return this._material!.uniforms.size
  }

  set rippleSize(val) {
    this._material!.uniforms.size = val
  }

  get waterColor() {
    return this._material!.uniforms.waterColor
  }

  set waterColor(val) {
    this._material!.uniforms.waterColor = val
  }

  get waterAlpha() {
    return this._material!.uniforms.waterAlpha
  }

  set waterAlpha(val) {
    this._material!.uniforms.waterAlpha = val
  }

  get reflectivity() {
    return this._material!.uniforms.rf0
  }

  set reflectivity(val) {
    this._material!.uniforms.rf0 = val
  }

  get distortionScale() {
    return this._material!.uniforms.distortionScale
  }

  set distortionScale(val) {
    this._material!.uniforms.distortionScale = val
  }

  get height() {
    return this._height
  }

  set height(val) {
    this._height = val

    const reflectorCartographic = Cesium.Cartographic.fromCartesian(this._originalReflectorWorldPosition)
    const reflectorCartesian = Cesium.Cartesian3.fromRadians(reflectorCartographic.longitude, reflectorCartographic.latitude, this._height)
    const reflectorOffset = Cesium.Cartesian3.subtract(
      reflectorCartesian,
      this._originalReflectorWorldPosition,
      new Cesium.Cartesian3(),
    )
    const reflectorMatrix = Cesium.Matrix4.fromTranslation(reflectorOffset)

    this._primitive.modelMatrix = reflectorMatrix
    this._reflectorWorldPosition = reflectorCartesian
    this._normal = Cesium.Ellipsoid.WGS84.geodeticSurfaceNormal(this._reflectorWorldPosition)
    this._waterPlane = Cesium.Plane.fromPointNormal(this._reflectorWorldPosition, this._normal)

    this._reflectMatrix = new Cesium.Matrix4(
      -2 * this._waterPlane.normal.x * this._waterPlane.normal.x + 1,
      -2 * this._waterPlane.normal.x * this._waterPlane.normal.y,
      -2 * this._waterPlane.normal.x * this._waterPlane.normal.z,
      -2 * this._waterPlane.normal.x * this._waterPlane.distance,
      -2 * this._waterPlane.normal.y * this._waterPlane.normal.x,
      -2 * this._waterPlane.normal.y * this._waterPlane.normal.y + 1,
      -2 * this._waterPlane.normal.y * this._waterPlane.normal.z,
      -2 * this._waterPlane.normal.y * this._waterPlane.distance,
      -2 * this._waterPlane.normal.z * this._waterPlane.normal.x,
      -2 * this._waterPlane.normal.z * this._waterPlane.normal.y,
      -2 * this._waterPlane.normal.z * this._waterPlane.normal.z + 1,
      -2 * this._waterPlane.normal.z * this._waterPlane.distance,
      0,
      0,
      0,
      1,
    )
  }

  _createReflectionWaterMaterial() {
    // @ts-expect-error Private property
    const context = this._scene.context
    const placeholderTexture = createPlaceHolderTexture(context)
    const {
      normalMapUrl,
      size,
      waterColor,
      waterAlpha,
      rf0,
      lightDirection,
      sunShiny,
      distortionScale,
    } = this._initUniforms
    // @ts-expect-error Private property
    const reflectionTexture = Cesium.Texture.fromFramebuffer({
      context,
      framebuffer: this._colorFramebuffer,
    })
    reflectionTexture.type = 'sampler2D'
    const material = new Cesium.Material({
      fabric: {
        type: 'ReflectionWater',
        uniforms: {
          size,
          waterColor,
          waterAlpha,
          rf0,
          lightDirection,
          sunShiny,
          distortionScale,

          normalTexture: placeholderTexture,
          reflexTexture: reflectionTexture,
          time: 0,
          fixedFrameToEastNorthUpTransform: Cesium.Matrix4.toArray(this._getFixedFrameToEastNorthUpTransformFromWorldMatrix()),
        },
        source: WATER_MATERIAL,
      },
      translucent: false,
      minificationFilter: Cesium.TextureMinificationFilter.LINEAR,
      magnificationFilter: Cesium.TextureMagnificationFilter.LINEAR,
    })
    addTextureUniform({
      context,
      material,
      uniformName: 'normalTexture',
      imgSrc: normalMapUrl,
    })
    return material
  }

  _updateVirtualCamera(virtualCamera: Cesium.Camera) {
    const defaultDirection = new Cesium.Cartesian3(0, 0, -1)
    let reflectedDirection = new Cesium.Cartesian3()
    // @ts-expect-error Private property
    this._virtualCamera = Cesium.Camera.clone(virtualCamera, this._virtualCamera)
    const cameraPosition = virtualCamera.positionWC.clone()
    let reflectorToCameraVector = Cesium.Cartesian3.subtract(
      this._reflectorWorldPosition,
      cameraPosition,
      new Cesium.Cartesian3(),
    )
    if (Cesium.Cartesian3.dot(reflectorToCameraVector, this._normal) > 0)
      return false

    const _virtualCamera = this._virtualCamera!
    reflectorToCameraVector = reflect(reflectorToCameraVector, this._normal)

    Cesium.Cartesian3.negate(reflectorToCameraVector, reflectorToCameraVector)
    Cesium.Cartesian3.add(reflectorToCameraVector, this._reflectorWorldPosition, reflectorToCameraVector)

    _virtualCamera!.position = reflectorToCameraVector.clone()

    Cesium.Cartesian3.add(virtualCamera.directionWC, cameraPosition, defaultDirection)
    Cesium.Cartesian3.subtract(this._reflectorWorldPosition, defaultDirection, reflectedDirection)

    reflectedDirection = reflect(reflectedDirection, this._normal)

    Cesium.Cartesian3.negate(reflectedDirection, reflectedDirection)
    Cesium.Cartesian3.add(reflectedDirection, this._reflectorWorldPosition, reflectedDirection)

    _virtualCamera.direction = Cesium.Cartesian3.subtract(
      reflectedDirection,
      _virtualCamera.position,
      new Cesium.Cartesian3(),
    )

    Cesium.Cartesian3.normalize(_virtualCamera.direction, _virtualCamera.direction)
    Cesium.Cartesian3.add(virtualCamera.upWC, cameraPosition, defaultDirection)
    Cesium.Cartesian3.subtract(this._reflectorWorldPosition, defaultDirection, reflectedDirection)

    reflectedDirection = reflect(reflectedDirection, this._normal)

    Cesium.Cartesian3.negate(reflectedDirection, reflectedDirection)
    Cesium.Cartesian3.add(reflectedDirection, this._reflectorWorldPosition, reflectedDirection)

    _virtualCamera.up = Cesium.Cartesian3.subtract(
      reflectedDirection,
      _virtualCamera.position,
      new Cesium.Cartesian3(),
    )

    Cesium.Cartesian3.normalize(_virtualCamera.up, _virtualCamera.up)

    this._reflectorProjectionMatrix = _virtualCamera.frustum.projectionMatrix
    this._reflectorViewMatrix = _virtualCamera.viewMatrix
    const reflectorPlane = Cesium.Plane.fromPointNormal(this._reflectorWorldPosition, this._normal)
    Cesium.Plane.transform(reflectorPlane, _virtualCamera.viewMatrix, reflectorPlane)
    const reflectorNormal = new Cesium.Cartesian4(
      reflectorPlane.normal.x,
      reflectorPlane.normal.y,
      reflectorPlane.normal.z,
      reflectorPlane.distance,
    )
    const customProjectionMatrix = Cesium.Matrix4.clone(_virtualCamera.frustum.projectionMatrix)
    const customPlane = new Cesium.Cartesian4(
      (Math.sign(reflectorNormal.x) + customProjectionMatrix[8]) / customProjectionMatrix[0],
      (Math.sign(reflectorNormal.y) + customProjectionMatrix[9]) / customProjectionMatrix[5],
      -1,
      (1 + customProjectionMatrix[10]) / customProjectionMatrix[14],
    )
    Cesium.Cartesian4.multiplyByScalar(
      reflectorNormal,
      2 / Cesium.Cartesian4.dot(reflectorNormal, customPlane),
      reflectorNormal,
    )
    // @ts-expect-error Private property
    customProjectionMatrix[2] = reflectorNormal.x
    // @ts-expect-error Private property
    customProjectionMatrix[6] = reflectorNormal.y
    // @ts-expect-error Private property
    customProjectionMatrix[10] = reflectorNormal.z + 1 - 0
    // @ts-expect-error Private property
    customProjectionMatrix[14] = reflectorNormal.w
    // @ts-expect-error Private property
    _virtualCamera.frustum.customProjectionMatrix = Cesium.Matrix4.clone(customProjectionMatrix)
    return true
  }

  preRender(renderInfo: any) {
    const defaultCamera = renderInfo._defaultView.camera
    const shadowMap = renderInfo.shadowMap
    const showGlobe = renderInfo.globe.show
    const showGlobeSkirts = renderInfo.globe.showSkirts

    if (!this._updateVirtualCamera(renderInfo._defaultView.camera)) {
      this._primitive.show = false
      return
    }

    this._primitive.show = false

    renderInfo._defaultView.camera = this._virtualCamera
    renderInfo.shadowMap = undefined
    renderInfo.globe.show = false
    renderInfo.globe.showSkirts = false

    const context = renderInfo.context
    const drawingBufferWidth = context.drawingBufferWidth
    const drawingBufferHeight = context.drawingBufferHeight
    const highDynamicRange = renderInfo.highDynamicRange

    this._createFramebuffer(context, drawingBufferWidth, drawingBufferHeight, highDynamicRange)

    render(renderInfo, this._colorFramebuffer)

    const appearance = this._primitive.appearance
    const framebufferInfo = {
      context,
      framebuffer: this._colorFramebuffer,
    }

    // @ts-expect-error Private property
    const textureFromFramebuffer = Cesium.Texture.fromFramebuffer(framebufferInfo)
    textureFromFramebuffer.type = 'sampler2D'
    this._material!.uniforms.reflexTexture = textureFromFramebuffer
    this._material!.uniforms.time = performance.now() / 1000
    this._material!.uniforms.fixedFrameToEastNorthUpTransform = Cesium.Matrix4.toArray(this._getFixedFrameToEastNorthUpTransformFromWorldMatrix())
    // @ts-expect-error Private property
    appearance.uniforms.reflectMatrix = Cesium.Matrix4.toArray(this._reflectMatrix)
    // @ts-expect-error Private property
    appearance.uniforms.reflectorProjectionMatrix = Cesium.Matrix4.toArray(this._reflectorProjectionMatrix)
    // @ts-expect-error Private property
    appearance.uniforms.reflectorViewMatrix = Cesium.Matrix4.toArray(this._reflectorViewMatrix)

    this._primitive.show = this._show

    renderInfo._defaultView.camera = defaultCamera
    renderInfo.shadowMap = shadowMap
    renderInfo.globe.show = showGlobe
    renderInfo.globe.showSkirts = showGlobeSkirts
  }

  _createPrimitive(positions: Cesium.Cartesian3[], rotationAngle: number) {
    const reflectionMaterial = this._createReflectionWaterMaterial()

    this._material = reflectionMaterial

    const materialAppearance = new Cesium.MaterialAppearance({
      material: reflectionMaterial,
      vertexShaderSource: VERTEX,
      translucent: true,
    })

    // @ts-expect-error Private property
    materialAppearance.uniforms = {
      reflectMatrix: Cesium.Matrix4.toArray(this._reflectMatrix),
      reflectorProjectionMatrix: Cesium.Matrix4.toArray(this._reflectorProjectionMatrix),
      reflectorViewMatrix: Cesium.Matrix4.toArray(this._reflectorViewMatrix),
    }

    const primitive = new Cesium.Primitive({
      geometryInstances: new Cesium.GeometryInstance({
        geometry: Cesium.CoplanarPolygonGeometry.fromPositions({
          vertexFormat: Cesium.VertexFormat.POSITION_NORMAL_AND_ST,
          positions,
          stRotation: Cesium.Math.toRadians(rotationAngle),
        }),
      }),
      appearance: materialAppearance,
      asynchronous: false,
    })
    return primitive
  }

  _getFixedFrameToEastNorthUpTransformFromWorldMatrix() {
    const enuToFixedFrame = Cesium.Transforms.eastNorthUpToFixedFrame(this._reflectorWorldPosition)
    const inverseEnuToFixedFrame = Cesium.Matrix4.inverse(enuToFixedFrame, new Cesium.Matrix4())
    return inverseEnuToFixedFrame
  }

  // @ts-expect-error Private property
  _createFramebuffer(context: Cesium.Scene['context'], width: number, height: number, hdrEnabled: boolean) {
    const colorTexture = this._colorTexture
    if (
      Cesium.defined(colorTexture)
      && colorTexture.width === width
      && colorTexture.height === height
      && this._hdr === hdrEnabled
    ) {
      return
    }

    this._destroyResource()
    this._hdr = hdrEnabled
    const pixelDatatype = hdrEnabled
      ? (context.halfFloatingPointTexture ? Cesium.PixelDatatype.HALF_FLOAT : Cesium.PixelDatatype.FLOAT)
      : Cesium.PixelDatatype.UNSIGNED_BYTE
    // @ts-expect-error Private property
    this._colorTexture = new Cesium.Texture({
      context,
      width,
      height,
      pixelFormat: Cesium.PixelFormat.RGBA,
      pixelDatatype,
      // @ts-expect-error Private property
      sampler: new Cesium.Sampler({
        // @ts-expect-error Private property
        wrapS: Cesium.TextureWrap.CLAMP_TO_EDGE,
        // @ts-expect-error Private property
        wrapT: Cesium.TextureWrap.CLAMP_TO_EDGE,
        minificationFilter: Cesium.TextureMinificationFilter.LINEAR,
        magnificationFilter: Cesium.TextureMagnificationFilter.LINEAR,
      }),
    })
    // @ts-expect-error Private property
    this._depthStencilTexture = new Cesium.Texture({
      context,
      width,
      height,
      pixelFormat: Cesium.PixelFormat.DEPTH_STENCIL,
      pixelDatatype: Cesium.PixelDatatype.UNSIGNED_INT_24_8,
    })
    // @ts-expect-error Private property
    this._colorFramebuffer = new Cesium.Framebuffer({
      context,
      colorTextures: [this._colorTexture],
      depthStencilTexture: this._depthStencilTexture,
      destroyAttachments: false,
    })
  }

  _destroyResource() {
    if (this._colorTexture)
      this._colorTexture.destroy()

    if (this._depthStencilTexture)
      this._depthStencilTexture.destroy()

    if (this._colorFramebuffer)
      this._colorFramebuffer.destroy()

    this._colorTexture = undefined
    this._depthStencilTexture = undefined
    this._colorFramebuffer = undefined
  }

  destroy() {
    this._scene.primitives.remove(this._primitive)
    this._scene.preRender.removeEventListener(this.preRender)

    // @ts-expect-error Private property
    Cesium.UniformState.prototype.updateFrustum = this.__UniformState_prototype_updateFrustum
    Cesium.PerspectiveFrustum.prototype.clone = this.__PerspectiveFrustum_prototype_clone

    this._destroyResource()
  }
}

// @ts-expect-error Private property
function createPlaceHolderTexture(ctx: Cesium.Scene['context']) {
  // @ts-expect-error - Private property
  const normalTexture = new Cesium.Texture({
    context: ctx,
    source: {
      width: 1,
      height: 1,
      arrayBufferView: new Uint8Array([255, 0, 0, 255]),
    },
    // @ts-expect-error - Private property
    sampler: new Cesium.Sampler({
      // @ts-expect-error - Private property
      wrapS: Cesium.TextureWrap.REPEAT,
      // @ts-expect-error - Private property
      wrapT: Cesium.TextureWrap.REPEAT,
      minificationFilter: Cesium.TextureMinificationFilter.LINEAR,
      magnificationFilter: Cesium.TextureMinificationFilter.LINEAR,
    }),
  })
  normalTexture.type = 'sampler2D'
  return normalTexture
}
function addTextureUniform(options: {
  // @ts-expect-error Private property
  context: Cesium.Scene['context']
  material: Cesium.Material
  uniformName: string
  imgSrc: string
  [k: string]: any
}) {
  const {
    context: ctx,
    material: mat,
    uniformName: uniform,
    imgSrc: src,
  } = options
  // @ts-expect-error Private property
  const wrapS = options.wrapS || Cesium.TextureWrap.REPEAT
  // @ts-expect-error Private property
  const wrapT = options.wrapT || Cesium.TextureWrap.REPEAT
  const minFilter = options.minificationFilter || Cesium.TextureMinificationFilter.LINEAR
  const magFilter = options.magnificationFilter || Cesium.TextureMagnificationFilter.LINEAR
  const image = new Image()
  image.src = src
  image.addEventListener('load', () => {
    const textureOptions = {
      wrapS,
      wrapT,
      minificationFilter: minFilter,
      magnificationFilter: magFilter,
    }
    // @ts-expect-error Private property
    const texture = new Cesium.Texture({
      context: ctx,
      source: image,
      // @ts-expect-error Private property
      sampler: new Cesium.Sampler(textureOptions),
    })
    texture.type = 'sampler2D'
    if ((image.width & image.width - 1) === 0 && image.width !== 0 && (image.height & image.height - 1) === 0 && image.height !== 0)
      // @ts-expect-error Private property
      texture.generateMipmap(Cesium.MipmapHint.NICEST)

    mat.uniforms[uniform] = texture
  })
}

function reflect(vector: Cesium.Cartesian3, normal: Cesium.Cartesian3) {
  const reflectedNormal = normal.clone()
  const incidentVector = vector.clone()
  const dotProduct = 2 * Cesium.Cartesian3.dot(vector, normal)
  Cesium.Cartesian3.multiplyByScalar(normal, dotProduct, reflectedNormal)
  return Cesium.Cartesian3.subtract(vector, reflectedNormal, incidentVector)
}

// @ts-expect-error Private property
const renderTilesetPassState = new Cesium.Cesium3DTilePassState({
  // @ts-expect-error Private property
  pass: Cesium.Cesium3DTilePass.RENDER,
})

const scratchBackgroundColor = new Cesium.Color()
function render(scene: any, framebuffer: any) {
  const frameState = scene._frameState
  const context = scene.context
  const uniformState = context.uniformState
  const defaultView = scene._defaultView
  scene._view = defaultView
  scene.updateFrameState()
  frameState.passes.render = true
  frameState.passes.postProcess = scene.postProcessStages.hasSelected
  frameState.tilesetPassState = renderTilesetPassState
  let backgroundColor = Cesium.defaultValue(scene.backgroundColor, Cesium.Color.BLACK)
  if (scene._hdr) {
    backgroundColor = Cesium.Color.clone(backgroundColor, scratchBackgroundColor)
    backgroundColor.red = backgroundColor.red ** scene.gamma
    backgroundColor.green = backgroundColor.green ** scene.gamma
    backgroundColor.blue = backgroundColor.blue ** scene.gamma
  }
  frameState.backgroundColor = backgroundColor
  scene.fog.update(frameState)
  uniformState.update(frameState)
  const shadowMap = scene.shadowMap
  if (Cesium.defined(shadowMap) && shadowMap.enabled) {
    if (!Cesium.defined(scene.light) || scene.light instanceof Cesium.SunLight)
      Cesium.Cartesian3.negate(uniformState.sunDirectionWC, scene._shadowMapCamera.direction)
    else
      Cesium.Cartesian3.clone(scene.light.direction, scene._shadowMapCamera.direction)

    frameState.shadowMaps.push(shadowMap)
  }
  scene._computeCommandList.length = 0
  scene._overlayCommandList.length = 0
  const viewport = defaultView.viewport
  viewport.x = 0
  viewport.y = 0
  viewport.width = context.drawingBufferWidth
  viewport.height = context.drawingBufferHeight
  const passState = defaultView.passState
  passState.framebuffer = framebuffer
  passState.blendingEnabled = undefined
  passState.scissorTest = undefined
  passState.viewport = Cesium.BoundingRectangle.clone(viewport, passState.viewport)
  if (Cesium.defined(scene.globe))
    scene.globe.beginFrame(frameState)

  scene.updateEnvironment()
  scene.updateAndExecuteCommands(passState, backgroundColor)
  scene.resolveFramebuffers(passState)
  if (Cesium.defined(scene.globe)) {
    scene.globe.endFrame(frameState)
    if (!scene.globe.tilesLoaded)
      scene._renderRequested = true
  }
  context.endFrame()
}
