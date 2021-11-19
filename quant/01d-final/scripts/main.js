import { prepareData } from './data.js';
import { contourMap, contourMapBlur, plotBoxes } from './plot.js';

document.addEventListener('DOMContentLoaded', async () => {
  //add stats
  let statImgWidthMoved = 31;
  plotBoxes(statImgWidthMoved);

  //plot
  let dataCombined = helperGetDataFromLabel('All Participants', data);
  contourMap(dataCombined, 'Contours');
  contourMapBlur(dataCombined);

  //add filters and dropdowns
  let contourSelector = '#dropdown-contour';
  createDropdown(
    contourSelector,
    ['Contours', 'Points', 'Contours & Points'],
    'Contours'
  );
  d3.select(contourSelector).on('change', (d) => {
    let newVal = document.querySelector(contourSelector + ' select').value;
    if (newVal == 'Contours & Points') {
      d3.selectAll('.contour').classed('show', true);
      d3.selectAll('.point').classed('show', true);
    } else if (newVal == 'Contours') {
      d3.selectAll('.contour').classed('show', true);
      d3.selectAll('.point').classed('show', false);
    } else if (newVal == 'Points') {
      d3.selectAll('.contour').classed('show', false);
      d3.selectAll('.point').classed('show', true);
    }
  });

  let overlayDropdownSelector = '#dropdown-overlay';
  createDropdown(
    overlayDropdownSelector,
    data.map((d) => (d = d.label)),
    'All Participants'
  );

  d3.select(overlayDropdownSelector).on('change', (d) => {
    let newVal = document.querySelector(
      overlayDropdownSelector + ' select'
    ).value;
    contourMapBlur(helperGetDataFromLabel(newVal, data));
  });
});

function helperGetDataFromLabel(label, data) {
  return data.filter((d) => d.label == label)[0].data;
}

function createDropdown(selector, labels, defaultValue) {
  let dropdown = d3.select(selector).append('select');

  var options = dropdown
    .selectAll('option')
    .data(labels)
    .join('option')
    .text((d) => d)
    .attr('value', (d) => d);

  document.querySelector(selector + ' select').value = defaultValue;
}
