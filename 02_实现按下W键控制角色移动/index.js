import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { group, player, mixer } from './model.js';

// 定义四个键位的枚举
const keyEnum = {
  W: false,
  A: false,
  S: false,
  D: false,
};

// 场景
const scene = new THREE.Scene();
// 将模型添加到场景中
scene.add(group);

// 相机
const camera = new THREE.PerspectiveCamera(
  30,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);

// 环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// WebGL渲染器设置
const renderer = new THREE.WebGLRenderer({
  antialias: true, // 开启抗锯齿
});

// 防止输出模糊
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// 渲染循环

const clock = new THREE.Clock();
// 用三维向量表示玩家角色运动漫游的速度
const v = new THREE.Vector3(0, 0, 3); // 按下w键对应人运动速度

const render = () => {
  const deltaTime = clock.getDelta();

  if (keyEnum.W) {
    const deltaTimePosition = v.clone().multiplyScalar(deltaTime);
    player.position.add(deltaTimePosition);
  }

  mixer.update(deltaTime); // 更新播放器相关时间
  renderer.render(scene, camera);
  window.requestAnimationFrame(render);
};

render();

// 添加一个辅助网格地面
const gridHelper = new THREE.GridHelper(30, 25, 0x004444, 0x004444);
scene.add(gridHelper);

// 辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

// 轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);

document.body.appendChild(renderer.domElement);

// canvas画布跟随窗口变化
window.onresize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};

// 监听键盘按下
window.addEventListener('keydown', (e) => {
  switch (e.key.toUpperCase()) {
    case 'W':
      keyEnum.W = true;
      console.log('W按下');
      break;
    case 'A':
      keyEnum.A = true;
      console.log('A按下');
      break;
    case 'S':
      keyEnum.S = true;
      console.log('S按下');
      break;
    case 'D':
      keyEnum.D = true;
      console.log('D按下');
      break;
  }
});

// 监听键盘抬起
document.addEventListener('keyup', (e) => {
  switch (e.key.toUpperCase()) {
    case 'W':
      keyEnum.W = false;
      console.log('W松开');
      break;
    case 'A':
      keyEnum.A = false;
      console.log('A松开');
      break;
    case 'S':
      keyEnum.S = false;
      console.log('S松开');
      break;
    case 'D':
      keyEnum.D = false;
      console.log('D松开');
      break;
  }
});
