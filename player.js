const video = document.querySelector('.video');
const progressRange = document.querySelector('.progress_range');
const progressBar = document.querySelector('.progress_bar');
const playBtn = document.getElementById('play-btn');
const stopBtn = document.getElementById('stop-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const speed = document.querySelector('.player-speed');
const currentTime = document.querySelector('.time_elapsed');
const duration = document.querySelector('.time_duration');
const fullscreenBtn = document.querySelector('.fullscreen');
const player = document.querySelector('.player');


function togglePlay() {
  if (video.paused) {
    video.play();
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
  }else{
    video.pause();
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
  }
}
function showPlayIcon() {
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
}

video.addEventListener('ended', showPlayIcon);

function stopVideo(){
  video.pause();
  video.currentTime = 0;

  return showPlayIcon();
}

// let lastVolume = 1;

// function changeVolume(e) {
//   let volume = e.offsetX / volumeRange.offsetWidth;
//   if (volume < 0.1){
//     volume = 0;
//   }
//   if (volume > 0.9){
//     volume = 1;
//   }
//   volumeBar.style.width = `${volume * 100}%`;
//   video.volume = volume;

//   volumeIcon.className = '';
//   if (volume > 0.5){
//     volumeIcon.classList.add('fas', 'fa-volume-up');
//   }else if (volume < 0.5 && volume > 0.2){
//     volumeIcon.classList.add('fas', 'fa-volume-down');
//   }else if (volume < 0.2){
//     volumeIcon.classList.add('fas', 'fa-volume-off');
//   }else if (volume === 0){
//     volumeIcon.classList.add('fas', 'fa-volume-mute');
//   }
//   lastVolume = volume;
// }

// function toggleMute() {
//   volumeIcon.className = '';
//   if (video.volume) {
//     lastVolume = video.volume;
//     video.volume = 0;
//     volume.style.width = 0;
//     volumeIcon.classList.add('fas', 'fa-volume-mute');
//     volumeIcon.setAttribute('title', 'Unmute');
//   }else{
//     video.volume = lastVolume;
//     volumeBar.style.width = `${lastVolume * 100}%`;
//     volumeIcon.classList.add('fas', 'fa-volume-up');
//     volumeIcon.setAttribute('title', 'Mute');
//   }
// }

// Volume Controls --------------------------- //

let lastVolume = 1;

// Mute
function toggleMute() {
  volumeIcon.className = '';
  if (video.volume) {
    lastVolume = video.volume;
    video.volume = 0;
    volumeIcon.classList.add('fas', 'fa-volume-mute');
    volumeIcon.setAttribute('title', 'Unmute');
    volumeBar.style.width = 0;
  } else {
    video.volume = lastVolume;
    volumeIcon.classList.add('fas', 'fa-volume-up');
    volumeIcon.setAttribute('title', 'Mute');
    volumeBar.style.width = `${lastVolume * 100}%`;
  }
}

// Volume Bar
function changeVolume(e) {
  let volume = e.offsetX / volumeRange.offsetWidth;
  // Rounding volume up or down
  if (volume < 0.1) {
    volume = 0;
  }
  if (volume > 0.9) {
    volume = 1;
  }
  volumeBar.style.width = `${volume * 100}%`;
  video.volume = volume;
  // Change icon depending on volume
  volumeIcon.className = '';
  if (volume > 0.7) {
    volumeIcon.classList.add('fas', 'fa-volume-up');
  } else if (volume < 0.7 && volume > 0) {
    volumeIcon.classList.add('fas', 'fa-volume-down');
  } else if (volume === 0) {
    volumeIcon.classList.add('fas', 'fa-volume-off');
  }
  lastVolume = volume;
}


function displayTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  seconds = seconds > 9 ? seconds : `0${seconds}`;
  return `${minutes}:${seconds}`;
}

function updateProgress() {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
  currentTime.textContent = `${displayTime(video.currentTime)} /`;
  duration.textContent = `${displayTime(video.duration)}`;
}

function setProgress(e) {
  const newTime = e.offsetX / progressRange.offsetWidth;
  progressBar.style.width = `${newTime * 100}%`;
  video.currentTime = newTime * video.duration;
}
// Change Playback Speed -------------------- //

function changeSpeed() {
  video.playbackRate = speed.value;
}
// Fullscreen ------------------------------- //

/* View in fullscreen */
function openFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    /* Firefox */
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    /* Chrome, Safari and Opera */
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    /* IE/Edge */
    element.msRequestFullscreen();
  }
  video.classList.add('video-fullscreen');
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE/Edge */
    document.msExitFullscreen();
  }
  video.classList.remove('video-fullscreen');
}

let fullscreen = false;

// Toggle fullscreen
function toggleFullscreen() {
  if (!fullscreen) {
    openFullscreen(player);
  } else {
    closeFullscreen();
  }
  fullscreen = !fullscreen;
}

playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);

stopBtn.addEventListener('click', stopVideo);

video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);

progressRange.addEventListener('click', setProgress);

volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', changeVolume);

speed.addEventListener('change', changeSpeed);
fullscreenBtn.addEventListener('click', toggleFullscreen);
