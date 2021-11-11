import { readable, writable } from 'svelte/store';

export let pageState = writable('gallery');
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
export let calibrationCutoff = readable(10);
export let stateIndex = writable(0);
export let loadingInd = writable(true);

// export let artworkID = writable(null); //is this used?
export let sessionID = writable(null);

export let screenWidth = writable(null);
export let screenHeight = writable(null);
