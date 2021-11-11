import { readable, writable } from 'svelte/store';
let artworkData = {
  mehretuUntitled: {
    artist: 'Julie Mehretu',
    title: 'Untitled',
    url: './assets/img/mehretuCropped.png',
    sessionData: {},
    key: 'mehretuUntitled',
  },
  rothko: {
    key: 'rothko',
    artist: 'Mark Rothko',
    title: 'Record Number 24',
    url: './assets/img/rothko.png',
    sessionData: {},
  },
};

export let artworkMetadata = writable(artworkData);
