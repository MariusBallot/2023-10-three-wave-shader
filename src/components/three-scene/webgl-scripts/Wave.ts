import * as THREE from "three";
import dummyFrag from "./shaders/dummyFrag.glsl"
import dummyVert from "./shaders/dummyVert.glsl"
import RAF from "@/utils/RAF"

class Wave {
  private scene: THREE.Scene | undefined;
  private waveMesh: THREE.Mesh;
  private waveMat: THREE.ShaderMaterial;

  constructor() {
    this.bind()

    this.waveMat = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms: {

        u_time: {
          value: 0,
        },
        u_blue: {
          value: new THREE.Color("rgb( 0, 89,	179)").convertLinearToSRGB()
        }
      },
      vertexShader: dummyVert,
      fragmentShader: dummyFrag,
    })


    this.waveMesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 20, 20), this.waveMat)
    this.waveMesh.rotateX(-Math.PI / 2)
  }

  init(scene: THREE.Scene) {
    this.scene = scene
    this.scene.add(this.waveMesh)
  }

  update() {
    this.waveMat.uniforms.u_time.value += 0.015 * RAF.dt;
  }

  bind() {
  }

}

const _instance = new Wave()
export default _instance