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
  // rothko: {
  //   key: 'rothko',
  //   artist: 'Mark Rothko',
  //   title: 'Record Number 24',
  //   url: './assets/img/rothko.png',
  //   sessionData: {},
  //   dimWidthToHt: 0.65,
  //   width: 1021,
  //   height: 1571,
  // },
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
  kahlo: {
    key: 'kahlo',
    artist: 'Magda Pach',
    title: 'Frida Kahlo',
    url: './assets/img/kahlo.jpg',
    sessionData: {},
    dimWidthToHt: 3212 / 4000,
    width: 3212,
    height: 4000,
    origLink: 'https://www.si.edu/object/frida-kahlo:npg_NPG.2015.136',
  },
  dewittHardy: {
    key: 'dewittHardy',
    artist: 'DeWitt Hardy',
    title: 'Nude',
    url: './assets/img/dewittHardy.png',
    sessionData: {},
    width: 1194,
    height: 1697,
    dimWidthToHt: 1194 / 1697,
    origLink: 'https://www.si.edu/object/nude:hmsg_86.2482',
  },

  hockney: {
    key: 'hockney',
    artist: 'David Hockney',
    title: 'Ordinary Picture',
    url: './assets/img/hockney.png',
    sessionData: {},
    width: 1691,
    height: 1704,
    dimWidthToHt: 1691 / 1704,
    origLink: 'https://www.si.edu/object/ordinary-picture:hmsg_66.2472',
  },
};

export let artworkMetadata = writable(artworkData);
export let loadedWorksKeys = writable(null);
export let loadedWorksArray = writable(null);
