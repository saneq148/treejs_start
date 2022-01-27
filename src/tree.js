import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('scene')
});

camera.position.setZ(100)

renderer.setPixelRatio(window.devicePixelRatio / 1.5)
renderer.setSize( window.innerWidth, window.innerHeight );

const geometry = new THREE.SphereGeometry(20, 100, 100)
const texture = new THREE.TextureLoader().load( 'http://127.0.0.1:5500/build/image.jpg' );
const material = new THREE.MeshBasicMaterial( { map: texture } )

const torus = new THREE.Mesh(geometry, material)

scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50)
scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement)

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24)
    const material = new THREE.MeshStandardMaterial({color: 0xffffff})
    const star = new THREE.Mesh(geometry, material)

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(500))
    star.position.set(x, y, z)
    scene.add(star)
}

Array(5000).fill().forEach(addStar)

const spaceTexture = new THREE.MeshStandardMaterial({color: 0xffffff})
scene.background = spaceTexture

function animate() {
    requestAnimationFrame(animate)

    torus.rotation.x += 0.02


    controls.update()

    renderer.render(scene, camera)
}

animate()



