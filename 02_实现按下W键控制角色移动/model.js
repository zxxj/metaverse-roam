import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const model = new THREE.Group();

const loader = new GLTFLoader();
loader.load('../人.glb', (gltf) => {
  console.log(gltf);
  model.add(gltf.scene);

  // 骨骼辅助显示
  const skeletonHelper = new THREE.SkeletonHelper(gltf.scene);
  model.add(skeletonHelper);

  // 实现骨骼动画
  const mixer = new THREE.AnimationMixer(gltf.scene);
  gltf.animations[0]; // 走路
  const clipAction = mixer.clipAction(gltf.animations[0]);
  clipAction.play(); // 播放动画

  // 动画循环
  const clock = new THREE.Clock();

  const loop = () => {
    window.requestAnimationFrame(loop);
    const time = clock.getDelta();
    mixer.update(time);
  };
  loop();
});

export { model };
