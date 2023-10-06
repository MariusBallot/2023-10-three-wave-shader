uniform float u_time;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

#pragma glslify: fbm3d = require('glsl-fractal-brownian-noise/3d');


vec3 disp(vec3 d){
    vec3 disp = d;

    float t = u_time * 0.4;
    float bN = fbm3d(vec3(vUv*3., u_time*0.01), 6)*0.1;

    float sineZ = -1.*sin((vUv.x *5.) - t)*0.1;
    disp.z +=sineZ;
    disp.z +=bN;

    float sineX = -1.*sin((vUv.x *5.) - t)*0.1;
    disp.x +=sineX;


    return disp;
}

void main() {
    vUv = uv;
    vNormal = normal;
    vPosition = position;

    vec3 dispPos = disp(position);


    vec4 modelViewPosition = modelViewMatrix * vec4(dispPos, 1.0);
    gl_Position = projectionMatrix * modelViewPosition;
}