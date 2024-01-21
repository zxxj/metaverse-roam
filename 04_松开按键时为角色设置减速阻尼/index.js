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
const v = new THREE.Vector3(0, 0, 0); // 初始速度设置为0
const a = 12; // 加速度: 调节按键加速的快慢
const maxV = 5; // 限制玩家角色的最高速度
const damping = -0.04; //  阻尼,当没有WASD加速的时候角色慢慢减速停下来

const render = () => {
  const deltaTime = clock.getDelta();

  // 在间隔deltaTime时间内,玩家角色位移变化的计算(速度 * 时间)
  const deltaTimePosition = v.clone().multiplyScalar(deltaTime);

  if (keyEnum.W) {
    // 先假设W键对应的运动方向为Z轴
    const front = new THREE.Vector3(0, 0, 1);

    // 通过v.length()计算速度v的值,限制最高速度
    if (v.length() < maxV) {
      // W键按下时,速度随着时间增加
      v.add(front.multiplyScalar(a * deltaTime));
    }
  }

  // 阻尼减速
  v.addScaledVector(v, damping);

  // 更新角色玩家的位置
  player.position.add(deltaTimePosition);

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
