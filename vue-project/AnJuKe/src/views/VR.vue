<template>
    <div class="home">
        <div class="view-container" ref="threeDBox"></div>
        <div class="tooltip-box" :style="{ top: tooltipPosition.top, left: tooltipPosition.left }" ref="tooltipBox">
            <div class="container">
                <div class="title">标题：{{ tooltopContent.title }}</div>
                <div class="explain">说明：{{ tooltopContent.text }}</div>
            </div>
        </div>
        <p class="title-text" ref="titleBox" :style="titlePosition">
            {{ tooltopContent.title }}
        </p>
    </div>
</template>
  
<script setup>
import * as THREE from "three";
import { ref, reactive, onMounted, toRefs } from 'vue'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import tip from '@/assets/images/tip.png';
import livingRoomImg from "@/assets/images/livingRoom.jpg";
import kitchenImg from "@/assets/images/kitchen.jpg";
import gsap from "gsap";

const threeDBox = ref(null)

const tooltipBox = ref(null)

const titleBox = ref(null)


const dataList = [
    {
        image: livingRoomImg,
        tipsList: [
            {
                position: { x: -200, y: -4, z: -147 },
                content: {
                    title: "进入厨房",
                    text: "",
                    image: 1,
                    showTip: false,
                    showTitle: true,
                },
            },
            {
                position: { x: -100, y: 0, z: -231 },
                content: {
                    title: "信息点",
                    text: "画",
                    showTip: true,
                    showTitle: false,
                },
            },
            {
                position: { x: 150, y: -50, z: -198 },
                content: {
                    title: "信息点3",
                    text: "灯",
                    showTip: true,
                    showTitle: false,
                },
            },
            {
                position: { x: 210, y: 11, z: -140 },
                content: {
                    title: "信息点4",
                    text: "很多画",
                    showTip: true,
                    showTitle: false,
                },
            },
            {
                position: { x: 208, y: -12, z: 140 },
                content: {
                    title: "信息点5",
                    text: "电视",
                    showTip: true,
                    showTitle: false,
                },
            },
            {
                position: { x: 86, y: -9, z: 236 },
                content: {
                    title: "进入房间",
                    text: "",
                    showTip: false,
                    showTitle: true,
                },
            },
        ],
    },
    {
        image: kitchenImg,
        tipsList: [
            {
                position: { x: -199, y: -24, z: 145 },
                content: {
                    title: "进入大厅",
                    text: "",
                    image: 0,
                    showTip: false,
                    showTitle: true,
                },
            },
        ],
    },
]
const tipsSpriteList = []
const tooltipPosition = reactive({
    top: "-100%",
    left: "-100%",
})
const titlePosition = reactive({
    top: "-100%",
    left: "-100%",
})
// console.log(tooltipPosition);
// console.log(tooltopContent.title);
let tooltopContent = ref({})
// console.log(tooltopContent);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x101010);

const camera = new THREE.PerspectiveCamera(
    45,
    threeDBox.clientWidth / threeDBox.clientHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });

function initContent(index = 0) {
    const sphereGeometry = new THREE.SphereGeometry(16, 50, 50);
    sphereGeometry.scale(16, 16, -16);
    const texture = new THREE.TextureLoader().load(dataList[index].image);
    // console.log(dataList[index].image);
    const sphereMaterial = new THREE.MeshBasicMaterial({ map: texture });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);
    addTipsSprite();
}
function addTipsSprite(index = 0) {
    const tipTexture = new THREE.TextureLoader().load(tip)
    const material = new THREE.SpriteMaterial({ map: tipTexture, color: 0xffffff, size: 20, font: 'Arial' });
    dataList[index].tipsList.forEach((item) => {
        const sprite = new THREE.Sprite(material);
        sprite.scale.set(10, 10, 10);
        sprite.position.set(item.position.x, item.position.y, item.position.z);
        sprite.content = item.content;
        tipsSpriteList.push(sprite);
        // console.log(sprite);
        // console.log(tipsSpriteList);
        scene.add(sprite);
    });
}
function changeContentAndtips(imagePath) {
    scene.children = scene.children.filter(
        (item) => String(item.type) !== "Sprite"
    );
    const sphereGeometry = new THREE.SphereGeometry(16, 50, 50);
    sphereGeometry.scale(16, 16, -16);
    const texture = new THREE.TextureLoader().load(imagePath);
    const sphereMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.material = sphereMaterial;
    gsap.to(sphereMaterial, { transparent: true, opacity: 1, duration: 2 });
    camera.updateProjectionMatrix();
    scene.add(sphere);
    addTipsSprite(imagePath);
}

function onMouseClick(e) {
    e.preventDefault();
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    mouse.x = (e.clientX / threeDBox.value.clientWidth) * 2 - 1;
    mouse.y = -(e.clientY / threeDBox.value.clientHeight) * 2 + 1;
    // console.log(mouse.x);
    // console.log(e);
    // console.log(element);
    // console.log(threeDBox.value.clientHeight);
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(tipsSpriteList, true);
    if (intersects.length > 0 && intersects[0].object.content.showTitle) {
        const index = intersects[0].object.content.index;
        changeContentAndtips(index);
        handleTooltipHide(e);
    }
}

function screenToWorld(x, y) {
    // 将屏幕坐标归一化为[-1, 1]的范围
    const mouseX = (x / window.innerWidth) * 2 - 1;
    const mouseY = -(y / window.innerHeight) * 2 + 1;
    // 创建一个新的三维向量，并使用unproject方法将屏幕坐标转换为三维坐标
    const vector = new THREE.Vector3(mouseX, mouseY, 0.5);
    vector.unproject(camera);
    // 创建一条从相机位置到转换后的三维坐标的射线
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera({ x: mouseX, y: mouseY }, camera);
    // 获取射线与场景中的所有物体的交点，并返回距离最近的交点的坐标
    const intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0) {
        return intersects[0].point;
    }
    // 如果没有交点，则返回相机的位置
    return camera.position;
}

function onMousemove(e) {
    e.preventDefault();
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    mouse.x = (e.clientX / threeDBox.value.clientWidth) * 2 - 1;
    mouse.y = -(e.clientY / threeDBox.value.clientHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    console.log(raycaster);
    const intersects = raycaster.intersectObjects(tipsSpriteList, true);

    // console.log(mouse);
    if (intersects.length > 0) {
        const elementWidth = threeDBox.value.clientWidth / 2;
        const elementHeight = threeDBox.value.clientHeight / 2;
        const worldVector = new THREE.Vector3(
            intersects[0].object.position.x,
            intersects[0].object.position.y,
            intersects[0].object.position.z
        );
        const position = worldVector.project(camera);
        tooltopContent.value = intersects[0].object.content;
        console.log(tooltopContent);
        // console.log(intersects);
        if (intersects[0].object.content.showTip) {
            const left = Math.round(
                elementWidth * position.x +
                elementWidth -
                tooltipBox.value.clientWidth / 2
            );
            const top = Math.round(
                -elementHeight * position.y +
                elementHeight -
                tooltipBox.value.clientHeight / 2
            );
            // console.log(top);
            tooltipPosition.top = `${top}px`;
            tooltipPosition.left = `${left}px`;
            // console.log(tooltipPosition);
            // return tooltipPosition
        } else if (intersects[0].object.content.showTitle) {
            const left = Math.round(
                elementWidth * position.x +
                elementWidth -
                titleBox.value.clientWidth / 2
            );
            const top = Math.round(-elementHeight * position.y + elementHeight);
            titlePosition.top = `${top}px`;
            titlePosition.left = `${left}px`;
            // return titlePosition;
        }
    } else {
        handleTooltipHide(e);
    }
}
function handleTooltipHide(e) {
    e.preventDefault();
    // 将 tooltipPosition 转换为普通对象的引用
    const { top, left } = toRefs(tooltipPosition);

    // 更改 tooltipPosition 对象的属性
    top.value = "-100%";
    left.value = "-100%";
    // titlePosition = {
    //     top: "-100%",
    //     left: "-100%",
    // };
    tooltopContent = {};
    // return tooltipPosition
    console.log(tooltipPosition);
}


onMounted(() => {
    threeDBox.value.appendChild(renderer.domElement);

    // console.log(element);
    // console.log(element.clientHeight);
    // console.log(element2.clientHeight);
    camera.position.set(50, 0, 40);
    camera.updateProjectionMatrix();
    // renderer.setClearColor(0x000000)
    // scene.background = new THREE.Color('#fff')
    // scene.environment = new THREE.Color('#fff')
    const render = () => {
        camera.aspect = threeDBox.value.offsetWidth / threeDBox.value.offsetHeight
        camera.updateProjectionMatrix()
        renderer.setSize(threeDBox.value.offsetWidth, threeDBox.value.offsetHeight)
        renderer.render(scene, camera)
        requestAnimationFrame(render)
        renderer.sortObjects = false;
    }
    render()
    initContent()
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 1;
    controls.maxDistance = 100;
    controls.enablePan = false
    controls.update()

    renderer.setSize(threeDBox.value.offsetWidth * 5, threeDBox.value.offsetHeight * 5);

    window.addEventListener("click", onMouseClick, false);
    renderer.domElement.addEventListener(
        "mousemove",
        onMousemove,
        false
    );
    tooltipBox.value.addEventListener(
        "mouseleave",
        handleTooltipHide,
        false
    );
})

</script>
  
<style lang="stylus" scoped>
.home 
    position relative
    width 100%
    height 100%
    overflow hidden
    .view-container 
        width 100%
        height 100%
        overflow hidden
    .title-text 
        position absolute
        width 66px
        color #382129
    .tooltip-box 
        position absolute
        padding 0px 0px 40px 0px
        line-height 30px
        border-radius 4px
        color #ffffff
        z-index 100
        cursor pointer
        .container 
            position relative
            width 240px
            max-height 200px
            padding 10px
            background-color rgba(0, 0, 0, 0.6)
            .title 
                width 100%
                padding 6px 0
            .explain 
                width 100%
                max-height 100px
                font-size 14px
                overflow-y auto
                &::-webkit-scrollbar 
                    width 4px
                    height 4px
                &::-webkit-scrollbar-track 
                    background #353535
                    border-radius: 2px
                &::-webkit-scrollbar-thumb 
                    background #cdcdcd
                    border-radius 2px
                &::-webkit-scrollbar-thumb:hover 
                    background #9c9c9c;
                &::-webkit-scrollbar-corner 
                    background #f6f6f6
</style>
  