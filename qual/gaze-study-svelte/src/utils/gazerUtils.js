import {
  gazerInitDone,
  gazerInitVideoDone,
  gazerRecordingTraining,
  calibrationPct,
  gazerRecordingArt,
  stateIndex,
  sessionID,
} from '../stores/pageState';
import { get } from 'svelte/store';
import * as localforage from 'localforage';

export function gazerMoveVideo(pos) {
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

export function hideGazerForLater() {
  webgazer.pause();
  webgazer.showVideo(false);
  let vidContainer = document.querySelector('#webgazerVideoContainer');
  document.querySelector('body').append(vidContainer);
}

export async function gazerResume() {
  let vidContainer = document.querySelector('#webgazerVideoContainer');
  document.querySelector('.container-body').append(vidContainer);
  await webgazer.resume();
  gazerHideCalDot();
  gazerPauseTraining();
}

export async function gazerInitVideo() {
  console.log('gazer video init');
  await webgazer.resume();
  gazerHideCalDot();
  gazerPauseTraining();
  gazerInitVideoDone.set(true);
  console.log('video done init');
}

export function gazerInitialize() {
  console.log('gazer first init');
  webgazer.showVideo(false);
  webgazer.begin();
  gazerLoadCheck();
}
async function gazerLoadCheck() {
  if (!webgazer.isReady()) {
    await setTimeout(gazerLoadCheck, 100);
  } else {
    console.log('gazer fully loaded');
    webgazer.pause();
    webgazer.setVideoViewerSize(300, 300);
    let vidContainer = document.querySelector('#webgazerVideoContainer');
    document.querySelector('.container-body').append(vidContainer);
    gazerInitDone.set(true);
    console.log('gazer initialized');
  }
}

export function gazerHideCalDot() {
  //document.querySelector('#webgazerGazeDot').style.opacity = 0;
}

export function gazerShowCalDot() {
  document.querySelector('#webgazerGazeDot').style.opacity = 1;
}

export function gazerPause() {
  webgazer.pause();
}

export async function gazerArtRecording() {
  let bbox = document.querySelector('#artView').getBoundingClientRect();
  webgazer.setGazeListener(function (data, elapsedTime) {
    if (data == null) {
      return;
    }
    let recordingObj = {
      time: elapsedTime,
      x: data.x - bbox.x,
      y: data.y - bbox.y,
      xPct: (100 * (data.x - bbox.x)) / bbox.width,
      yPct: (100 * (data.y - bbox.y)) / bbox.height,
      xMin: bbox.left,
      xMax: bbox.right,
      yMin: bbox.top,
      yMax: bbox.bottom,
      sessionID: get(sessionID),
    };

    let gazerArray = get(gazerRecordingArt); //this is prob not good
    gazerArray.push(recordingObj);
    gazerRecordingArt.set(gazerArray);
  });
  setTimeout(() => {
    webgazer.clearGazeListener();
    console.log(get(gazerRecordingArt));
    stateIndex.set(get(stateIndex) + 1);
  }, 4000);
}

export function gazerCalibrationRecording() {
  webgazer.setGazeListener(function (data, elapsedTime) {
    if (data == null) {
      return;
    }
    let gazerArray = get(gazerRecordingTraining);
    gazerArray.push({ x: data.x, y: data.y });
    gazerRecordingTraining.set(gazerArray);
  });
  setTimeout(() => {
    webgazer.clearGazeListener();
    calculateAccuracy();
  }, 4000);
}

function calculateAccuracy() {
  let centerPt = document.querySelector('.center-dot').getBoundingClientRect();
  //.x, .y, /width, ht
  let sum = 0;
  let gazerPts = get(gazerRecordingTraining);
  let diffs = gazerPts.map((d) => {
    let xDiff = d.x - centerPt.x + centerPt.width / 2;
    let yDiff = d.y - centerPt.y + centerPt.height / 2;
    let diff = Math.sqrt(yDiff * yDiff + xDiff * xDiff);
    sum += diff;
    return diff;
  });
  let meanDiff = sum / gazerPts.length;
  let pct =
    100 *
    (1 -
      meanDiff /
        (document.querySelector('.container-body').getBoundingClientRect()
          .width /
          2));
  console.log(pct);
  localforage.setItem('calibrationPct', Math.round(pct));
  calibrationPct.set(Math.round(pct));
  return;
}

export function gazerRestartCalibration() {
  console.log('uh restarting i guess');
  //webgazer.clearData();
  calibrationPct.set(null);
}

export async function gazerTrain() {
  webgazer.addMouseEventListeners();
}

export function gazerPauseTraining() {
  webgazer.removeMouseEventListeners();
}
