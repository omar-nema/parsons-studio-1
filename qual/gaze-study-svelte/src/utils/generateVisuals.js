import * as d3 from 'd3';

export async function contourMapBlur(data, containerAll, containerSvg, url) {
  console.log(data);
  let bbox = d3.select(containerAll).node().getBoundingClientRect();
  let width = bbox.width;
  let height = 0.705 * width;

  let svg = d3.select(containerSvg);
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
    .domain([
      maxCoords,
      maxCoords * 0.75,
      ,
      maxCoords / 2,
      maxCoords / 3,
      minCoords,
    ])
    .range([0, 0.5, 1, 2, 8]);

  let opacityScale = d3
    .scaleLinear()
    .domain([maxCoords, minCoords])
    .range([1, 1]);

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
    // .attr('fill', (d) => fillScale(d.value))
    .attr('d', d3.geoPath());

  svg
    .selectAll('.clipPathGroup')
    // .data(contours)
    .append('image')
    .attr('clip-path', (d, i) => `url(#path-${i})`)
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('xlink:href', url)
    //.style('filter', (d) => `opacity(${opacityScale(d.value)}`);
    .style(
      'filter',
      (d) => `opacity(${opacityScale(d.value)}) blur(${blurScale(d.value)}px)`
    );
  //.style('filter', (d) => `blur(${blurScale(d.value)}px`);
}
