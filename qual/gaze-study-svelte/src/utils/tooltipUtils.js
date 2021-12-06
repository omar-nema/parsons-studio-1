import {
  tooltipText,
  tooltipX,
  tooltipY,
  tooltipShow,
} from '../stores/pageState';
export function updateTooltip(xInput, yInput, text) {
  if (!text && !xInput && !yInput) {
    tooltipShow.set(false);
  } else {
    tooltipShow.set(true);
    tooltipX.set(xInput);
    tooltipY.set(yInput);
    if (text) {
      tooltipText.set(text);
    }
  }
}
