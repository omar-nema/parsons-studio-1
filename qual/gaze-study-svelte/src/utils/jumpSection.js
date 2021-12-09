import * as animateScroll from 'svelte-scrollto';

animateScroll.setGlobalOptions({
  offset: -10,
});

export default (section) => {
  let el = document.querySelector('#' + section);
  animateScroll.scrollTo({ element: el });
};
