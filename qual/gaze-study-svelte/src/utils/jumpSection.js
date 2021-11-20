import * as animateScroll from 'svelte-scrollto';

export default (section) => {
  let el = document.querySelector('#' + section);
  animateScroll.scrollTo({ element: el });
};
