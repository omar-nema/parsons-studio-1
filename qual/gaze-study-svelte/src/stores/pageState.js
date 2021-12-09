import { readable, writable } from 'svelte/store';

//set to 0 for normal, 1 to prevent writing to db
export let testMode = readable(0);

export let pageState = writable('gallery');
export let modalState = writable('intro');

export let selectedImage = writable(null);
export let calibrationState = writable(null);
export let gazerRecordingTraining = writable([]);
export let gazerRecordingArt = writable([]);

//just the library loaded
export let gazerReady = writable(false);
//gazer initialized but video feed not set
export let gazerInitDone = writable(false);
//video feed fully loaded
export let gazerInitVideoDone = writable(false);

export let calibrationPct = writable(null);
export let calibrationCutoff = readable(70);
export let stateIndex = writable(0);
export let loadingInd = writable(true);
export let sessionID = writable(null);

//to get the right size of images
export let screenWidth = writable(null);
export let screenHeight = writable(null);

//for scrolling and naviating between cards
export let cardInView = writable(null);
export let jumpCard = writable(null);
export let scrollThresh = writable(false);

export let tooltipText = writable(null);
export let tooltipX = writable(null);
export let tooltipY = writable(null);
export let tooltipShow = writable(false);

//for the explanatory pop-ups in gallery card
export let infoTipIndex = writable(-1);
