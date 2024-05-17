//const video = document.getElementById('video');
const selectedImage = document.getElementById('pic.png');
const carModel = document.getElementById('scene.gltf');
//const markerRoot = new THREE.Object3D();

// Function to handle user image selection
function handleImageSelection(event) {
  const image = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    selectedImage.src = e.target.result;
    selectedImage.style.display = 'block'; // Make the image visible
  };
  reader.readAsDataURL(image);
}

// Request user camera access
navigator.mediaDevices.getUserMedia({ video: true })
  .then((stream) => {
    video.srcObject = stream;
  })
  .catch((err) => {
    console.error('Error accessing camera:', err);
  });


AFRAME.registerComponent('trackImage', {
  init() {
    const hitTestOptions = {
      recursive: true, // Check for intersection with child elements
      collisionFilter: 'visible', // Only consider visible elements
    };
    this.el.addEventListener('click', (e) => {
      const intersection = this.el.sceneEl.renderer.hitTest(e.detail.x, e.detail.y, hitTestOptions);
      if (intersection.length > 0) {
        const marker = intersection[0].object; // Get the intersected object
        if (marker.parent === markerRoot) { // Check if it's a child of the marker root
          const intersectionPoint = intersection[0].point; // Get the intersection point
          // Adjust car position based on intersection point (replace with your logic)
          carModel.setAttribute('position', `${intersectionPoint.x} 1 ${intersectionPoint.z}`);
        }
      }
    });
  }
}); 

selectedImage.setAttribute('trackImage', '');

markerRoot.add(selectedImage.object3D);

// Placeholder positioning for car model (adjust as needed)
carModel.setAttribute('position', '0 1.5 -2');

// Add event listener for image selection
document.getElementById('fileInput').addEventListener('change', handleImageSelection);

