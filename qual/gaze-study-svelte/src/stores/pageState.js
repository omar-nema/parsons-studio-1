//pageStates

import { writable } from 'svelte/store';

export let pageState = writable('record');
export let selectedImage = writable(null);
export let calibrationState = writable(null);

export let gazerInit = writable(false);

//   async function t() {
//     let t = await getItem('trackingRuns/anonymous-user-1');
//     console.log(t);
//   }
//   t();
