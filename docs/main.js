// Import MindAR module from global scope
const { MindARThree } = window.MINDAR;

// Initialize MindAR
const mindarThree = new MindARThree({
  container: document.querySelector("#ar-container"),
  imageTargetSrc: "targets.mind"
});

const { renderer, scene, camera } = mindarThree;

// Load Video Texture
const video = document.querySelector("#ar-video");
const videoTexture = new THREE.VideoTexture(video);

// Create a Plane to Display Video
const geometry = new THREE.PlaneGeometry(1, 0.75); // Adjust size as needed
const material = new THREE.MeshBasicMaterial({ map: videoTexture });
const videoPlane = new THREE.Mesh(geometry, material);

// Add Video Plane to the First Anchor
const anchor = mindarThree.addAnchor(0);
anchor.group.add(videoPlane);

// Play video when the target is found
anchor.onTargetFound = () => {
  video.play();
  console.log("🎯 Target Found: Playing Video");
};

// Pause video when the target is lost
anchor.onTargetLost = () => {
  video.pause();
  console.log("❌ Target Lost: Pausing Video");
};

// Start AR Session
mindarThree.start();

// Render Loop
renderer.setAnimationLoop(() => {
  renderer.render(scene, camera);
});
