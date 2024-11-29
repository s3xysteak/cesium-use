uniform sampler2D reflexTexture; // 反射贴图
uniform sampler2D normalTexture; // 法线贴图
uniform float time;

uniform mat4 fixedFrameToEastNorthUpTransform; // 水面的东北天矩阵的逆矩阵

// 从顶点着色器传来的
in vec4 v_worldPosition; // 当前像素的世界坐标
in vec4 v_uv; // 原本的纹理坐标乘以贴图矩阵

// 可配置的参数
uniform float size; // 波纹大小（数值越大波纹越密集）
uniform vec4 waterColor; // 水面颜色
uniform float waterAlpha; // 水面透明度
uniform float rf0; // 水面反射率
uniform vec3 lightDirection; // 光照方向
uniform float sunShiny; // 光照强度
uniform float distortionScale; // 倒影的扭曲程度

const vec3 sunColor = vec3(1.0);

// 获取噪声
vec4 getNoise(sampler2D normalMap, vec2 uv) {
  vec2 uv0 = (uv / 103.0) + vec2(time / 17.0, time / 29.0);
  vec2 uv1 = uv / 107.0 - vec2(time / -19.0, time / 31.0);
  vec2 uv2 = uv / vec2(8907.0, 9803.0) + vec2(time / 101.0, time / 97.0);
  vec2 uv3 = uv / vec2(1091.0, 1027.0) - vec2(time / 109.0, time / -113.0);
  vec4 noise = texture(normalMap, uv0) +
    texture(normalMap, uv1) +
    texture(normalMap, uv2) +
    texture(normalMap, uv3);
  return noise * 0.5 - 1.0;
}

void sunLight(const vec3 surfaceNormal, const vec3 eyeDirection, float shiny, float spec, float diffuse, inout vec3 diffuseColor, inout vec3 specularColor) {
  vec3 sunDirection = normalize(lightDirection);
  vec3 reflection = normalize(reflect(-sunDirection, surfaceNormal));
  float direction = max(0.0, dot(eyeDirection, reflection));
  specularColor += pow(direction, shiny) * sunColor * spec;
  diffuseColor += max(dot(sunDirection, surfaceNormal), 0.0) * sunColor * diffuse;
}

czm_material czm_getMaterial(czm_materialInput materialInput) {
  czm_material material = czm_getDefaultMaterial(materialInput);

  vec2 transformedSt = materialInput.st * 2.0 - 1.0;
  vec4 noise = getNoise(normalTexture, transformedSt * size);
  vec3 surfaceNormal = normalize(noise.xzy);

  vec3 diffuseLight = vec3(0.0);
  vec3 specularLight = vec3(0.0);

  vec3 eye = (czm_inverseView * vec4(vec3(0.0), 1.0)).xyz;
  eye = (fixedFrameToEastNorthUpTransform * vec4(eye, 1.0)).xyz;
  vec3 world = (fixedFrameToEastNorthUpTransform * vec4(v_worldPosition.xyz, 1.0)).xyz;

  vec3 worldToEye = eye - world;
  worldToEye = vec3(worldToEye.x, worldToEye.z, -worldToEye.y);
  vec3 eyeDirection = normalize(worldToEye);

  float shiny = sunShiny;
  float spec = 2.0;
  float diffuse = 0.5;
  sunLight(surfaceNormal, eyeDirection, shiny, spec, diffuse, diffuseLight, specularLight);

  float distance = length(worldToEye);
  float distortionScale = distortionScale;
  vec2 distortion = surfaceNormal.xz * (0.001 + 1.0 / distance) * distortionScale;
  vec3 reflectionSample = vec3(texture(reflexTexture, (v_uv.xy / v_uv.w) * 0.5 + 0.5 + distortion));

  float theta = max(dot(eyeDirection, surfaceNormal), 0.0);
  float rf0 = rf0;
  float reflectance = mix(rf0, 1.0, pow(1.0 - theta, 5.0));

  vec3 waterColor = waterColor.rgb;

  vec3 scatter = max(0.0, dot(surfaceNormal, eyeDirection)) * waterColor;
  vec3 albedo = mix(
    sunColor * diffuseLight * 0.3 + scatter,
    vec3(0.1) + reflectionSample * 0.9 + reflectionSample * specularLight,
    reflectance
  );
  material.diffuse = albedo.rgb;
  material.alpha = waterAlpha;

  return material;
}
