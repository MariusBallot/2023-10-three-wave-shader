import * as THREE from "three";
import dummyFrag from "./shaders/dummyFrag.glsl"
import dummyVert from "./shaders/dummyVert.glsl"
import RAF from "@/utils/RAF"

class Wave {
  private scene: THREE.Scene | undefined;
  private texLoader: THREE.TextureLoader;
  private waveMesh: THREE.Mesh;
  private waveMat: THREE.ShaderMaterial;

  constructor() {
    this.bind()
    this.texLoader = new THREE.TextureLoader()

    const matcapTex1 = this.texLoader.load("/assets/textures/black-metal-matcap.png")
    matcapTex1.colorSpace = THREE.SRGBColorSpace

    this.waveMat = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms: {
        u_metalMatCap: {
          value: matcapTex1
        },
        u_time: {
          value: 0,
        },
        u_blue:{
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

  update(dt:number) {
    this.waveMat.uniforms.u_time.value += 0.015*dt;
  }

  bind() {
  }

}

const _instance = new Wave()
export default _instance