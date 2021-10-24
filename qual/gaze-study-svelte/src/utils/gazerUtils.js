import { gazerInit } from '../stores/pageState';

export function moveGazerVideo(pos) {
  let vidContainer = document.querySelector('#webgazerVideoContainer');
  let vidSize = 320;
  if (pos == 'top') {
    vidSize = 110;
    webgazer.setVideoViewerSize(vidSize, vidSize);
    vidContainer.style.top = '0%';
    vidContainer.style.left = '90%';
    vidContainer.style.width = `${vidSize}px`;
    vidContainer.style.height = 'auto';
  } else if (pos == 'middle') {
    webgazer.setVideoViewerSize(vidSize, vidSize);
    vidContainer.style.width = `${vidSize}px`;
    vidContainer.style.height = 'auto';
    vidContainer.style.position = 'absolute';
    vidContainer.style.left = '50%';
    vidContainer.style.top = '30%';
    vidContainer.style.transform = 'translate(-50%, -50%)';
  }
}

export async function checkGazerLoad() {
  if (!webgazer.isReady()) {
    await setTimeout(checkGazerLoad, 100);
  } else {
    console.log('gazer fully loaded');
    webgazer.pause();
    webgazer.setVideoViewerSize(300, 300);
    let vidContainer = document.querySelector('#webgazerVideoContainer');
    document.querySelector('.container-body').append(vidContainer);

    setTimeout(() => {
      gazerInit.set(true);
    }, 1500);
  }
}
