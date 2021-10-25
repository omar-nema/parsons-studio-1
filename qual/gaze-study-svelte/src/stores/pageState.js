import { readable, writable } from 'svelte/store';
export let pageState = writable('record');
export let selectedImage = writable(null);
export let calibrationState = writable(null);
export let gazerRecordingTraining = writable([]);
export let gazerRecordingArt = writable([]);
export let gazerInit = writable(false);
export let gazerInitVideoDone = writable(false);
export let calibrationPct = writable(null);
export let calibrationCutoff = readable(10);
