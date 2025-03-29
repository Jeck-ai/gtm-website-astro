/**
 * Utility module for Three.js related helpers
 */

import * as THREE from 'three';

// Check for WebGL support
export function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && 
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    console.error('WebGL not supported:', e);
    return false;
  }
}

// Create a standard Three.js renderer
export function createRenderer(width, height, alpha = true) {
  const renderer = new THREE.WebGLRenderer({ 
    antialias: true, 
    alpha: alpha,
    powerPreference: 'high-performance' 
  });
  
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  
  if (alpha) {
    renderer.setClearColor(0x000000, 0);
  }
  
  return renderer;
}

// Standard scene setup with lighting
export function createSceneWithLighting() {
  const scene = new THREE.Scene();
  
  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0x404040, 2);
  scene.add(ambientLight);
  
  // Add directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 1, 1).normalize();
  scene.add(directionalLight);
  
  return scene;
}

// Create a perspective camera
export function createCamera(width, height, fov = 75) {
  const camera = new THREE.PerspectiveCamera(fov, width / height, 0.1, 1000);
  camera.position.z = 200;
  return camera;
}

// Handle window resize for Three.js
export function setupResizeHandler(camera, renderer, container) {
  function onWindowResize() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    
    renderer.setSize(width, height);
  }
  
  window.addEventListener('resize', onWindowResize);
  
  return () => {
    window.removeEventListener('resize', onWindowResize);
  };
}

// Add mouse/touch movement handlers
export function setupMouseTracking() {
  let mouseX = 0;
  let mouseY = 0;
  
  function onMouseMove(event) {
    mouseX = (event.clientX - window.innerWidth / 2);
    mouseY = (event.clientY - window.innerHeight / 2);
  }
  
  function onTouchMove(event) {
    if (event.touches.length > 0) {
      mouseX = (event.touches[0].clientX - window.innerWidth / 2);
      mouseY = (event.touches[0].clientY - window.innerHeight / 2);
    }
  }
  
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('touchmove', onTouchMove);
  
  return {
    getMouseX: () => mouseX,
    getMouseY: () => mouseY,
    cleanup: () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('touchmove', onTouchMove);
    }
  };
}

// Helper to clear a container
export function clearContainer(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}
