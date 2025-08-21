async function initCamera() {
  const video = document.getElementById('video');
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    video.srcObject = stream;
  } catch (err) {
    console.error('Error accessing camera:', err);
    alert('Unable to access camera. Please grant permission or use a compatible device.');
  }
}

function setupDressSelection() {
  const thumbs = document.querySelectorAll('.dress-thumb');
  const overlay = document.getElementById('dress-overlay');

  thumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      // Remove previous selection highlight
      document.querySelectorAll('.dress-thumb.selected').forEach((el) => el.classList.remove('selected'));

      // Highlight current
      thumb.classList.add('selected');

      // Set overlay source
      const dressSrc = thumb.getAttribute('data-src');
      overlay.src = dressSrc;
      overlay.style.display = 'block';
    });
  });
}

window.addEventListener('DOMContentLoaded', () => {
  initCamera();
  setupDressSelection();
});