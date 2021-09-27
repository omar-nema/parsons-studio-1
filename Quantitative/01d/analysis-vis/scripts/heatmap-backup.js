//   numParticipants = values.length;
//   timePerPoint = (numParticipants * 60) / dataCombined.length;
//   let dataAgg = await aggregateData(dataCombined, timePerPoint);
//heatmap(dataAgg, timePerPoint);
let binInc = 10;
let numBins = (100 / binInc) * (100 / binInc);
let heatmapBinMax = d3.range(0, 100, binInc);
let pointToTime;
async function aggregateData(inputArray) {
  let scaleBins = d3.scaleQuantize().domain([0, 100]).range(heatmapBinMax);
  let dataRounded = inputArray.map((d) => {
    d.xPct = scaleBins(d.xPct);
    d.yPct = scaleBins(d.yPct);
    return d;
  });
  //x as 1st item, then y as second, and then values
  let dataAggregated = await d3.flatGroup(
    dataRounded,
    (d) => d.xPct,
    (d) => d.yPct
  );
  await dataAggregated.forEach(async (d) => {
    d.count = d[2].length;
    d.timeSpent = timePerPoint * d[2].length;
    d.timePerPerson = (timePerPoint * d[2].length) / numParticipants;
    d.timeExpected = 60 / numBins;
    d.timeComparison = d.timePerPerson / d.timeExpected;
    d.xPos = d[0];
    d.yPos = d[1];
    return;
  });
  await dataAggregated.sort((a, b) => b.count - a.count);
  return dataAggregated;
}

async function heatmap(data) {
  let svg = d3.select('#heatmap');
  let bbox = svg.node().getBoundingClientRect();
  let rectWidth = bbox.width / heatmapBinMax.length;
  let rectHeight = bbox.height / heatmapBinMax.length;

  let posDomain = [d3.min(heatmapBinMax), d3.max(heatmapBinMax)];
  let xPos = d3
    .scaleLinear()
    .domain(posDomain)
    .range([0, bbox.width - rectWidth]);
  let yPos = d3
    .scaleLinear()
    .domain(posDomain)
    .range([0, bbox.height - rectHeight]);

  let fillScale = d3
    .scaleQuantize()
    .domain([0, d3.max(data, (d) => d.count)])
    .range(d3.quantize(d3.interpolateHcl('#504d4d', '#67d0f1'), 6));

  svg
    .selectAll('rect')
    .data(data)
    .join('rect')
    .attr('fill', (d) => fillScale(d.count))
    .attr('width', rectWidth)
    .attr('height', rectHeight)
    .attr('x', (d) => xPos(d.xPos))
    .attr('y', (d) => yPos(d.yPos))
    .on('mouseover', (event, data) => {
      console.log(data.timeComparison);
    });
}
