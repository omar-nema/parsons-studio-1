import { readable, writable } from 'svelte/store';
let artworkData = {
  mehretuUntitled: {
    artist: 'Julie Mehretu',
    title: 'Untitled',
    url: './assets/img/mehretuCropped.png',
    sessionData: {},
  },
};

export let artworkMetadata = writable(artworkData);
