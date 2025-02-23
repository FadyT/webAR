// Ensure MindAR is available
const { MindARThree } = mindarThree;

// Initialize MindAR with your target image
const mindarInstance = new MindARThree({
  container: document.querySelector("#ar-container"),
  imageTargetSrc: "targets.mind"
});

const { renderer, scene, camera } = mindarInstance;

// Load Video Texture
const video = document.querySelector("#ar-video");
const videoTexture = new THREE.VideoTexture(video);

// Create a Plane to Display Video
const geometry = new THREE.PlaneGeometry(1, 0.75);
const material = new THREE.MeshBasicMaterial({ map: videoTexture });
const videoPlane = new THREE.Mesh(geometry, material);

// Attach Video Plane to the First Anchor
const anchor = mindarInstance.addAnchor(0);
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

// Start the AR session
mindarInstance.start();

// Render Loop
renderer.setAnimationLoop(() => {
  renderer.render(scene, camera);
});
