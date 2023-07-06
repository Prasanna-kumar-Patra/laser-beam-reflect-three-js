var scene, camera, renderer, container;
var Ambient, sunLight;
var LaserBeam1;

container = document.getElementById('canvas-div');

//scene
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 200000);
camera.position.set(0, 10, 10);
camera.lookAt(0, 0, 0);
scene.add(camera);

//Mouse evnet
var mouse = {
    x: 0,
    y: 0
}
document.addEventListener('mousemove', function (event) {
    mouse.x = (event.clientX / window.innerWidth) - 0.5
    mouse.y = (event.clientY / window.innerHeight) - 0.5
}, false);

//renderer
renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x222222);
container.appendChild(renderer.domElement);
window.addEventListener('resize', onWindowResize, false);

//AmbientLight
Ambient = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(Ambient);

//DirectionalLight
sunLight = new THREE.DirectionalLight(0xffffff, 0.5);
sunLight.position.set(5, 2, -10);
scene.add(sunLight);

//All object
var Geometry, Material;
var objectArray = [];
for (var i = 0; i < 2; i++) {
    Geometry = new THREE.BoxGeometry(1, 2, 4);
    Material = new THREE.MeshPhongMaterial({
        color: 0x00ff00
    });
    var Mash = new THREE.Mesh(Geometry, Material);

    Mash.position.set(
        (i % 2) * 5 - 2.5,
        0,
        i * -5
    );
    objectArray.push(Mash);
    scene.add(Mash);
}
var LaserBeam1 = new LaserBeam({
    reflectMax: 5
});
add2Scene(LaserBeam1);

function add2Scene(obj) {
    scene.add(obj.object3d);
    scene.add(obj.pointLight);

    if (obj.reflectObject != null) {
        add2Scene(obj.reflectObject);
    }
}

function animate() {

    requestAnimationFrame(animate);

    LaserBeam1.object3d.position.set(-2, 0, 1);// start postion of laser beam
    LaserBeam1.intersect(
        new THREE.Vector3(-4.5, 0, -4.5 + Math.cos(Date.now() * 0.05 * Math.PI / 180) * 2),
        objectArray
    );

    camera.position.x += (mouse.x * 30 - camera.position.x) * 0.05
    camera.position.y += (mouse.y * -10 - camera.position.y + 5) * 0.05
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}
animate();
/**
 * Steps:
 * 
 * Load GLB Model
 * Create 2 laser beam
 * create 2 reflectors individually
 * position laser beam and reflector
 * check and make angle correct of laser beam and object
 * make the length of the laser beam to correctly focus on center of retina
 */
