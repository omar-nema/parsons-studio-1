import { cardInView } from '../stores/pageState';

export function initScroll() {
  window.addEventListener('scroll', (e) => {
    let ctrPt = window.innerHeight / 2;
    let cards = document.querySelectorAll('.card-outer');
    cards.forEach((d) => {
      let boundingRect = d.getBoundingClientRect();
      if (
        ctrPt >= boundingRect.top &&
        ctrPt < boundingRect.height + boundingRect.top
      ) {
        cardInView.set(d.id);
      }
    });
  });
}
