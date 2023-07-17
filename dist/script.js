var scene, camera, renderer, container;
var Ambient, sunLight;
var objectArray;
container = document.getElementById('canvas-div');


function createScene(callee) {

    //scene
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 200000);
    camera.position.set(0, 10, 10);
    camera.lookAt(0, 0, 0);
    scene.add(camera);


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
    objectArray = [];
    // number of reflectors
    var numReflect = 1
    for (var i = 0; i < numReflect; i++) {
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

        Mash.rotation.set(
            0.5,
            -0.1,
            0.5
        );
        objectArray.push(Mash);
        scene.add(Mash);
    }



}

createScene("init")

function createLaserBeam(callee, y, len) {
    console.log("pkp:  ~ file: script.js:65 ~ createLaserBeam ~ callee:", callee)

    var myLaser = new LaserBeam({
        reflectMax: 1,
        length: len
    });
    myLaser.object3d.position.set(-1, y, 2);// start postion of laser beam
    return myLaser
}

function add2Scene(obj) {
    scene.add(obj.object3d);
    scene.add(obj.pointLight);

    if (obj.reflectObject != null) {
        add2Scene(obj.reflectObject);
    }
}
function animate() {
    requestAnimationFrame(animate);
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
}

var globalObject = {
    beamPosX: 1, //100-1
    len1: 4,
    len2: 10,
    rotation1: 1.5,
    rotation1: 1.5
}

function createBeams(callee) {

    var laser1 = createLaserBeam("beam 1", 0, globalObject.len1)
    var laser2 = createLaserBeam("beam 2", 1, globalObject.len2)

    add2Scene(laser1);
    add2Scene(laser2);

    laser1.intersect(
        new THREE.Vector3(-4.5, 0, -4.5),
        objectArray
    );
    laser2.intersect(
        new THREE.Vector3(-4.5, 0, -4.5),
        objectArray
    );

}

animate();
createBeams("create all")


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


/**
 * 
 * Laser:       initial pos,after wards length(after reflect)
 * Reflector:   pos(Debug),rot(Prod)
 * 
 */