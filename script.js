var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.SphereGeometry( .5, 32, 32 );
var planetTex = new THREE.TextureLoader().load( "neptune.png" );
planetTex.wrapS = planetTex.wrapT = THREE.MirroredRepeatWrapping;
planetTex.repeat.set( 2, 2 );
var material = new THREE.MeshBasicMaterial( { map: planetTex } );
var planet = new THREE.Mesh( geometry, material );
scene.add( planet );

camera.position.z = 10;

var texture = new THREE.TextureLoader().load( "star.png" );
var stars = [];

for (let i = 0; i < 200; i++) {
  let geometry = new THREE.PlaneGeometry( .5, .5, .5 );
  let material = new THREE.MeshBasicMaterial( { map: texture } );
  let star = new THREE.Mesh( geometry, material );
  star.position.set(getRandom(), getRandom(), getRandom());
  stars.push(star);
}

for (let j = 0; j < stars.length; j++) {
  scene.add(stars[j]);
}

var brightness = 0;
var rotSpeed = .01;

function animate() {
  
  // Rotate and change saturation lightness of each star
  for (let k = 0; k < stars.length; k++) {
    let star = stars[k];
    star.rotation.x += 0.01;
    star.rotation.y += 0.01;
    brightness > 100 ? brightness = 0 : brightness++;
    star.material.color = new THREE.Color("hsl(255, 100%, " + brightness + "%)");
  }
  
    // Rotate camera
    // source: http://mikeheavers.com/tutorials/webgl_circular_camera_rotation_around_a_single_axis_in_threejs/
    let x = camera.position.x;
    let z = camera.position.z;
    camera.position.x = x * Math.cos(rotSpeed) + z * Math.sin(rotSpeed);
    camera.position.z = z * Math.cos(rotSpeed) - x * Math.sin(rotSpeed);
    camera.lookAt(scene.position);
    
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();

function getRandom() {
  // source: https://stackoverflow.com/questions/13455042/random-number-between-negative-and-positive-value
  var num = Math.floor(Math.random()*10) + 1; // this will get a number between 1 and x;
  num *= Math.floor(Math.random()*2) == 1 ? 1 : -1; // this will add minus sign in 50% of cases
  return num;
}
