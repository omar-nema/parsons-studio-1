let data = [
  { path: './assets/data/colin.json', label: 'colin' },
  { path: './assets/data/jessie.json', label: 'jessie' },
  { path: './assets/data/molly.json', label: 'molly' },
  { path: './assets/data/shea.json', label: 'shea' },
  // { path: './assets/data/vira.json', label: 'vira' },
  { path: './assets/data/omar.json', label: 'omar' },
];
let dataToFetch = data.filter((d) => d.path);

async function fetchJson(jsonFile) {
  let r = await fetch(jsonFile);
  return await r.json();
}

//async fetch all the data
let promises = [];
let timePerPoint, numParticipants;
data.forEach((d) => {
  promises.push(fetchJson(d.path));
});
Promise.all(promises).then(async (values) => {
  values.forEach((arr) => {
    arr = arr.filter((d) => {
      return d.xPct >= 0 && d.xPct <= 100 && d.yPct >= 0 && d.yPct <= 100;
    });
  });
  let dataCombined = await d3.merge(values);
  dataCombined = dataCombined.filter((d) => {
    return d.xPct >= 0 && d.xPct <= 100 && d.yPct >= 0 && d.yPct <= 100;
  });

  contourMap('.contour-container', '#contour', dataCombined);
  contourMapBlur(
    '.contour-overlay-container',
    '#contour-overlay',
    dataCombined
  );
});

async function contourMapBlur(container, svgObj, data) {
  let bbox = d3.select(container).node().getBoundingClientRect();
  let width = bbox.width;
  let height = 0.705 * width;

  let svg = d3
    .select(svgObj)
    .attr('viewBox', [0, 0, width, height])
    .attr('preserveAspectRatio', 'xMinYMin meet');
  let margin = 30;

  //append individual images for each viewbox
  //apply filter
  //image, id, filter, blah

  let numSlices = 10;

  // svg
  //   .append('image')
  //   .attr('href', './assets/img/mehretuCropped.png')
  //   .attr('x', '0')
  //   .attr('y', '0')
  //   .attr('viewBox', '500 500 550 550');

  // let filter = svg
  //   .append('defs')
  //   .append('filter')
  //   .attr('id', 'blur')
  //   .append('feGaussianBlur')
  //   .attr('stdDeviation', 10)
  //   .attr('in', 'SourceGraphic')
  //   .attr('width', '100%')
  //   .attr('height', '100%');

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

  // console.log('contours', contours);

  let minCoords = d3.min(contours, (d) => d.value);
  let maxCoords = d3.max(contours, (d) => d.value);

  let blurScale = d3
    .scaleLinear()
    .domain([maxCoords, minCoords])
    .range([0, 10]);
  let fillScale = d3
    .scaleLinear()
    .domain([minCoords, maxCoords])
    .range(['#504d4d', '#67d0f1']);

  svg
    .append('g')
    .selectAll('clipPath')
    .data(contours)
    .join('clipPath')
    .attr('id', (d, i) => 'path-' + i)
    .append('path')
    // .attr('stroke', 'white')
    .attr('stroke-linejoin', 'round')
    .attr('fill', (d) => fillScale(d.value))

    // .attr('fill', (d) => fillScale(getContourPointCount(d)))
    // .attr('stroke-width', (d, i) => (i % 5 ? 0.25 : 1))
    .attr('stroke-width', 1)
    .attr('d', d3.geoPath());

  svg
    .append('g')
    .selectAll('clipPath')
    .data(contours)
    .join('image')
    .attr('clip-path', (d, i) => `url(#path-${i})`)
    .style('opacity', '0.3')
    .attr('xlink:href', './assets/img/mehretuCropped.png')
    .attr('stroke', 'black')
    .attr('stroke-width', 1);
}

async function contourMap(container, svgObj, data) {
  let bbox = d3.select(container).node().getBoundingClientRect();
  let width = bbox.width;
  let height = 0.705 * width;

  let svg = d3
    .select(svgObj)
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

  //25 and 20

  console.log('contours', contours);

  let minCoords = d3.min(contours, (d) => d.value);
  let maxCoords = d3.max(contours, (d) => d.value);
  let fillScale = d3
    .scaleLinear()
    .domain([minCoords, maxCoords])
    .range(['#535050', '#67d0f1']);

  svg
    .append('g')
    .selectAll('path')
    .data(contours)
    .join('path')
    // .attr('stroke', 'white')
    .attr('stroke-linejoin', 'round')
    .attr('fill', (d) => fillScale(d.value))
    .attr('stroke', 'rgba(0,0,0,.1)')
    // .attr('fill', (d) => fillScale(getContourPointCount(d)))
    // .attr('stroke-width', (d, i) => (i % 5 ? 0.25 : 1))
    .attr('stroke-width', 1)
    .attr('d', d3.geoPath())
    .on('mouseover', (event, data) => {
      console.log(data);
    });
  // svg
  //   .append('g')
  //   .selectAll('circle')
  //   .data(data)
  //   .join('circle')
  //   .attr('cx', (d) => xPos(d.xPct))
  //   .attr('cy', (d) => yPos(d.yPct))
  //   .attr('r', 3)
  //   .attr('fill', 'black')
  //   .attr('fill-opacity', '0.2')
  //   .on('mouseover', (event, data) => {
  //     console.log(data);
  //   });

  // .on('mouseover', (event, data) => {
  //   console.log('uh', data, getContourPointCount(data));
  // });
}
