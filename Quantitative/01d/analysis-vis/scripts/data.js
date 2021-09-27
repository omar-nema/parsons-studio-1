let data = [
  { path: './assets/data/colin.json', label: 'colin' },
  { path: './assets/data/jessie.json', label: 'jessie' },
  { path: './assets/data/molly.json', label: 'molly' },
  { path: './assets/data/shea.json', label: 'shea' },
  { path: './assets/data/vira.json', label: 'vira' },
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
  let dataCombined = await d3.merge(values);
  //   dataCombined = dataCombined.filter((d) => {
  //     return d.xPct >= 0 && d.xPct <= 100 && d.yPct >= 0 && d.yPct <= 100;
  //   });
  values.forEach((arr) => {
    arr = arr.filter((d) => {
      return d.xPct >= 0 && d.xPct <= 100 && d.yPct >= 0 && d.yPct <= 100;
    });
  });

  //clean small datasets tooooo

  contourmap(values[0]);
});

async function contourmap(data) {
  let bbox = d3.select('.svg-container').node().getBoundingClientRect();
  let width = bbox.width;
  let height = 0.705 * width;

  let svg = d3
    .select('#heatmap')
    .attr('viewBox', [0, 0, width, height])
    .attr('preserveAspectRatio', 'xMinYMin meet');
  let margin = 40;

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
    .bandwidth(30)
    .thresholds(30)(data);

  console.log(data, contours);

  let minCoords = d3.min(contours, (d) => d.value);
  let maxCoords = d3.max(contours, (d) => d.value);
  let fillScale = d3
    .scaleLinear()
    .domain([minCoords, maxCoords])
    .range(['#504d4d', '#67d0f1']);

  svg
    .append('g')
    .selectAll('path')
    .data(contours)
    .join('path')
    // .attr('stroke', 'white')
    .attr('stroke-linejoin', 'round')
    .attr('fill', (d) => fillScale(d.value))
    .attr('stroke', 'white')
    // .attr('fill', (d) => fillScale(getContourPointCount(d)))
    .attr('stroke-width', (d, i) => (i % 5 ? 0.25 : 1))
    .attr('d', d3.geoPath())
    .on('mouseover', (event, data) => {
      console.log(data);
    });
  svg
    .append('g')
    .selectAll('circle')
    .data(data)
    .join('circle')
    .attr('cx', (d) => xPos(d.xPct))
    .attr('cy', (d) => yPos(d.yPct))
    .attr('r', 3)
    .attr('fill', 'black')
    .attr('fill-opacity', '0.2')
    .on('mouseover', (event, data) => {
      console.log(data);
    });

  // .on('mouseover', (event, data) => {
  //   console.log('uh', data, getContourPointCount(data));
  // });
}
