var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    0.1,
    1000                
);
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("#10131F");
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
});

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

var geometry = new THREE.BoxGeometry(1, 1, 1); // X, Y, Z
var material = new THREE.MeshLambertMaterial({color: 0xFFE394});

meshX = -10;
for (var i = 0; i < 50; i++) {
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = (Math.random() - 0.5) * 10;
    mesh.position.y = (Math.random() - 0.5) * 10;
    mesh.position.z = (Math.random() - 0.5) * 10;
    scene.add(mesh);
    meshX+=1;
}

var light = new THREE.PointLight(0xFFFFFF, 1, 1000); // Color, Intensity, Distance
light.position.set(0, 0, 0); // X, Y, Z
scene.add(light);

var light = new THREE.PointLight(0xFFFFFF, 2, 1000); // Color, Intensity, Distance
light.position.set(0, 0, 25); // X, Y, Z
scene.add(light);

var render = () => {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

function onMOuseMove(event) {
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    var intersects  = raycaster.intersectObjects(scene.children, true);
    for (var i = 0; i < intersects.length; i++) {
        this.tl = new TimelineMax();
        this.tl.to(intersects[i].object.scale, 1, {x: 2, ease: Expo.easeOut});
        this.tl.to(intersects[i].object.scale, .5, {x: 1, ease: Expo.easeOut});
        this.tl.to(intersects[i].object.rotation, .5, {y: Math.PI*5, ease: Expo.easeOut});
    }
}

render();

window.addEventListener('mousemove', onMOuseMove);