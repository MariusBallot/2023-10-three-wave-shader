uniform float u_time;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
    vUv = uv;
    vNormal = normal;
    vPosition = position;

    float sine = -1.*sin((vUv.x *5.) - u_time * 0.4)*0.2;
    vec3 dispPos = position;
    dispPos.z +=sine;
    // dispPos.x += sin(vUv.x *5.- u_time * 0.4)*0.4;
    // sine = (sine + 1.) / 2.;


    vec4 modelViewPosition = modelViewMatrix * vec4(dispPos, 1.0);
    gl_Position = projectionMatrix * modelViewPosition;
}