const video = document.createElement('video');
video.src = 'your-video.mp4';
video.autoplay = true;
video.loop = true;
video.muted = true;

const canvas = document.getElementById('logo-canvas');
const ctx = canvas.getContext('2d');

video.addEventListener('loadeddata', () => {
  function drawFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаем канвас
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height); // Рисуем кадр видео
    requestAnimationFrame(drawFrame); // Повторяем цикл
  }
  video.play();
  drawFrame();
});