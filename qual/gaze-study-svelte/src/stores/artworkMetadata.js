import { readable, writable } from 'svelte/store';
let artworkData = {
  mehretuUntitled: {
    artist: 'Julie Mehretu',
    title: 'Local Calm',
    url: './assets/img/mehretuCropped.png',
    sessionData: {},
    key: 'mehretuUntitled',
    dimWidthToHt: 1.42,
  },
  rothko: {
    key: 'rothko',
    artist: 'Mark Rothko',
    title: 'Record Number 24',
    url: './assets/img/rothko.png',
    sessionData: {},
    dimWidthToHt: 0.65,
  },
};

export let artworkMetadata = writable(artworkData);
