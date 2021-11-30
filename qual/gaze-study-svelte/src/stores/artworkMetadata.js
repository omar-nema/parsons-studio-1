import { readable, writable } from 'svelte/store';
let artworkData = {
  mehretuUntitled: {
    artist: 'Julie Mehretu',
    title: 'Local Calm',
    url: './assets/img/mehretuCropped.png',
    sessionData: {},
    key: 'mehretuUntitled',
    dimWidthToHt: 1.42,
    width: 1745,
    height: 1228,
  },
  rothko: {
    key: 'rothko',
    artist: 'Mark Rothko',
    title: 'Record Number 24',
    url: './assets/img/rothko.png',
    sessionData: {},
    dimWidthToHt: 0.65,
    width: 1021,
    height: 1571,
  },
  nevelson: {
    key: 'nevelson',
    artist: 'Louise Nevelson',
    title: 'Untitled (Self-Portrait)',
    url: './assets/img/nevelson.jpg',
    sessionData: {},
    dimWidthToHt: 0.756,
    width: 378,
    height: 500,
    origLink:
      'https://www.si.edu/object/untitled-self-portrait:npg_NPG.2002.307',
  },
};

export let artworkMetadata = writable(artworkData);
export let loadedWorksKeys = writable(null);
export let loadedWorksArray = writable(null);
