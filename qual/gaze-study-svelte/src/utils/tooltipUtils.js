import { tooltipText, tooltipX, tooltipY } from '../stores/pageState';
export function updateTooltip(xInput, yInput, text) {
  if (!text && !xInput && !yInput) {
    tooltipText.set(null);
  } else {
    tooltipX.set(xInput);
    tooltipY.set(yInput);
    if (text) {
      tooltipText.set(text);
    }
  }
}
