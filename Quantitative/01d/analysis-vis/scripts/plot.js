export function plotBoxes(numberBoxes) {
  d3.select('#pixel-value').text(numberBoxes + 'x');

  for (let i = 0; i < numberBoxes; i++) {
    d3.select('#img-travel').append('div').attr('class', 'abstract-img');
  }
}

export async function contourMapBlur(data) {
  console.log(data);
  let bbox = d3
    .select('.contour-overlay-container')
    .node()
    .getBoundingClientRect();
  let width = bbox.width;
  let height = 0.705 * width;

  let svg = d3
    .select('#contour-overlay')
    .attr('viewBox', [0, 0, width, height])
    .attr('preserveAspectRatio', 'xMinYMin meet');
  let margin = 30;

  let xPos = d3
    .scaleLinear()
    .domain([0, 100])
    .range([margin, width - margin]);
  let yPos = d3
    .scaleLinear()
    .domain([0, 100])
    .range([margin, height - margin]);

  let contours = d3
    .contourDensity()
    .x((d) => xPos(d.xPct))
    .y((d) => yPos(d.yPct))
    .size([width, height])
    .bandwidth(25)
    .thresholds(20)(data);

  let minCoords = d3.min(contours, (d) => d.value);
  let maxCoords = d3.max(contours, (d) => d.value);

  let blurScale = d3
    .scaleLinear()
    .domain([maxCoords, maxCoords / 2, minCoords])
    .range([0, 0.5, 4]);
  let fillScale = d3
    .scaleLinear()
    .domain([minCoords, maxCoords])
    .range(['#504d4d', '#67d0f1']);

  console.log(contours.length);

  //, function (d) {
  // return d.coordinates[0].length;

  let clipPathG = svg
    .selectAll('.clipPathGroup')
    .data(contours, (d) => d.coordinates[0])
    .join('g')
    .attr('class', 'clipPathGroup');

  svg
    .selectAll('.clipPathGroup')
    .append('clipPath')
    .attr('id', (d, i) => 'path-' + i)
    .append('path')
    .attr('stroke-linejoin', 'round')
    .attr('fill', (d) => fillScale(d.value))
    .attr('d', d3.geoPath());

  svg
    .selectAll('.clipPathGroup')
    // .data(contours)
    .append('image')
    .attr('clip-path', (d, i) => `url(#path-${i})`)
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('xlink:href', './assets/img/mehretuCropped.png')
    .style('filter', (d) => `blur(${blurScale(d.value)}px`);
}

export async function contourMap(data, elementsToShow) {
  let bbox = d3.select('.contour-container').node().getBoundingClientRect();
  let width = bbox.width;
  let height = 0.705 * width;

  let svg = d3
    .select('#contour')
    .attr('viewBox', [0, 0, width, height])
    .attr('preserveAspectRatio', 'xMinYMin meet');
  let margin = 30;

  let xPos = d3
    .scaleLinear()
    .domain([0, 100])
    .range([margin, width - margin]);
  let yPos = d3
    .scaleLinear()
    .domain([0, 100])
    .range([margin, height - margin]);

  let contours = d3
    .contourDensity()
    .x((d) => xPos(d.xPct))
    .y((d) => yPos(d.yPct))
    .size([width, height])
    // .cellSize(4)
    .bandwidth(35)
    .thresholds(15)(data);

  let minCoords = d3.min(contours, (d) => d.value);
  let maxCoords = d3.max(contours, (d) => d.value);
  let fillScale = d3
    .scaleLinear()
    .domain([minCoords, maxCoords])
    .range(['#4a4646', '#e0ef4c']);

  let contourClassName = 'contour',
    pointClassName = 'point';
  if (elementsToShow == 'Contours & Points') {
    contourClassName += ' show';
    pointClassName += ' point';
  } else if (elementsToShow == 'Contours') {
    contourClassName += ' show';
  } else if (elementsToShow == 'Points') {
    pointClassName += ' point';
  }

  svg
    .append('g')
    .selectAll('path')
    .data(contours)
    .join('path')
    .attr('stroke-linejoin', 'round')
    .attr('fill', (d) => fillScale(d.value))
    // .attr('stroke', 'rgba(0,0,0,.1)')
    // .attr('stroke-width', 1)
    .attr('stroke', 'rgba(0,0,0,.3)')
    .attr('d', d3.geoPath())
    .attr('class', contourClassName);

  svg
    .append('g')
    .selectAll('circle')
    .data(data)
    .join('circle')
    .attr('cx', (d) => xPos(d.xPct))
    .attr('cy', (d) => yPos(d.yPct))
    .attr('r', 1.3)
    .attr('fill', 'white')
    .attr('fill-opacity', '0.5')
    .attr('class', pointClassName);
}
