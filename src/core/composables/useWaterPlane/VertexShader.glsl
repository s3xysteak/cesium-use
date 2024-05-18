in vec3 position3DHigh;
in vec3 position3DLow;
in vec3 normal;
in vec2 st;
in float batchId;

out vec3 v_positionEC;
out vec3 v_normalEC;
out vec2 v_st;

uniform mat4 reflectorProjectionMatrix;
uniform mat4 reflectorViewMatrix;
uniform mat4 reflectMatrix;
out vec4 v_worldPosition;  // 世界坐标
out vec4 v_uv;             // 纹理坐标

void main()
{
    vec4 p = czm_computePosition();

    v_positionEC = (czm_modelViewRelativeToEye * p).xyz;      // position in eye coordinates
    v_normalEC = czm_normal * normal;                         // normal in eye coordinates
    v_st = st;

    mat4 modelView = reflectorViewMatrix * reflectMatrix * czm_model;
    modelView[3][0] = 0.0;
    modelView[3][1] = 0.0;
    modelView[3][2] = 0.0;
    v_uv = reflectorProjectionMatrix * modelView * p;
    vec4 positionMC = vec4(position3DHigh + position3DLow, 1.0);
    v_worldPosition = czm_model * positionMC;

    gl_Position = czm_modelViewProjectionRelativeToEye * p;
}
