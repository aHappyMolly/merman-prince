document.addEventListener('DOMContentLoaded', () => {
  const cardPairs = document.querySelectorAll('.expand-card-complete');
  const videoOverlay = document.querySelector('.video-overlay');
  const popupVideo = document.getElementById('popup-video');
  const videoSource = document.getElementById('video-source');
  const closeBtn = document.querySelector('.close-video');

  cardPairs.forEach(pair => {
    pair.addEventListener('click', () => {
      const videoPath = pair.getAttribute('data-video');
      if (videoPath) {
        videoSource.src = videoPath;
        popupVideo.load();
        videoOverlay.classList.remove('hidden');
        popupVideo.play();
      }
    });
  });

  closeBtn.addEventListener('click', () => {
    popupVideo.pause();
    popupVideo.currentTime = 0;
    videoOverlay.classList.add('hidden');
  });

  popupVideo.addEventListener('ended', () => {
    videoOverlay.classList.add('hidden');
  });
});



/* ================
   ▶ 使用者行為偵測
   ================ */

