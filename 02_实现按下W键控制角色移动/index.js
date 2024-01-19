import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { model } from './model.js';

// 场景
const scene = new THREE.Scene();
// 将模型添加到场景中
scene.add(model);

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
const render = () => {
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
