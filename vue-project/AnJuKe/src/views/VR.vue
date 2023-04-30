<template>
    <div class="container">
        <div class="view-container" ref="threeDBox"></div>
    </div>
</template>
  
<script setup>
import * as THREE from 'three'
import { ref, onMounted } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const threeDBox = ref(null)

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x101010)

const camera = new THREE.PerspectiveCamera(
    45,
    threeDBox.clientWidth / threeDBox.clientHeight,
    0.1,
    1000
)
camera.position.set(50, 0, 40)
camera.updateProjectionMatrix()

const renderer = new THREE.WebGLRenderer({ antialias: true })

const render = () => {
    camera.aspect = threeDBox.value.offsetWidth / threeDBox.value.offsetHeight
    camera.updateProjectionMatrix()
    renderer.setSize(threeDBox.value.offsetWidth, threeDBox.value.offsetHeight)
    renderer.render(scene, camera)
    requestAnimationFrame(render)
}

const boxGeometry = new THREE.BoxGeometry(10, 10, 10)
const picList = ['left', 'right', 'top', 'bottom', 'front', 'back']
const boxMaterials = []
picList.forEach((item) => {
    let texture = new THREE.TextureLoader().load(`../img/${item}.png`)
    
    if(item === 'top' || item === 'bottom') {
        texture.rotation = Math.PI
        texture.center = new THREE.Vector2(0.5, 0.5)
        boxMaterials.push(new THREE.MeshBasicMaterial({ map: texture }))
    } else {
        boxMaterials.push(new THREE.MeshBasicMaterial({ map: texture }))
    }
})
const cube = new THREE.Mesh(boxGeometry, boxMaterials)
cube.geometry.scale(10, 10, -10)
scene.add(cube)

onMounted(() => {
    threeDBox.value.appendChild(renderer.domElement)
    renderer.setClearColor(0x000000)
    scene.background = new THREE.Color('#fff')
    scene.environment = new THREE.Color('#fff')
    render()

    renderer.setSize(threeDBox.value.offsetWidth * 5, threeDBox.value.offsetHeight * 5)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.minDistance = 1
    controls.maxDistance = 100
    controls.enablePan = false
    controls.update()
})
</script>
  
<style lang="stylus" scoped>
.container
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .view-container
        width 100%
        height 100%
        overflow hidden
</style>