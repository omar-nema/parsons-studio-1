import { prepareData } from './data.js';
import { contourMap, contourMapBlur, plotBoxes } from './plot.js';

document.addEventListener('DOMContentLoaded', async () => {
  //add stats
  let statImgWidthMoved = 31;
  plotBoxes(statImgWidthMoved);

  //prepare data
  let data = await prepareData();
  //plot
  let dataCombined = helperGetDataFromLabel('All', data);
  contourMap(dataCombined);
  contourMapBlur(dataCombined);
  createDropdown(
    data.map((d) => (d = d.label)),
    'All',
    data
  );
});

function helperGetDataFromLabel(label, data) {
  return data.filter((d) => d.label == label)[0].data;
}

function createDropdown(subjectNames, defaultValue, data) {
  let dropdown = d3
    .select('#dropdown-container')
    .append('select')
    .attr('id', 'subjectSel')
    .attr('name', 'subjects');
  var options = dropdown
    .selectAll('option')
    .data(subjectNames)
    .join('option')
    .text((d) => d)
    .attr('value', (d) => d);

  document.querySelector('#subjectSel').value = 'All';

  d3.select('#subjectSel').on('change', (d) => {
    let newVal = document.querySelector('#subjectSel').value;
    contourMapBlur(helperGetDataFromLabel(newVal, data));
  });
}
