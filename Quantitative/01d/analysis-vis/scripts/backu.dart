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
    let dataCombined = d3.merge(values);
    dataCombined = dataCombined.filter((d) => {
      return d.xPct >= 0 && d.xPct <= 100 && d.yPct >= 0 && d.yPct <= 100;
    });
  
    //clean small datasets tooooo
  
    contourmap(dataCombined);
  });
  
  async function contourmap(data) {
    let svg = d3.select('#heatmap');
    let bbox = svg.node().getBoundingClientRect();
    let width = bbox.width,
      height = bbox.height;
  
    let xPos = d3.scaleLinear().domain([0, 100]).range([0, width]);
    let yPos = d3.scaleLinear().domain([0, 100]).range([0, height]);
  
    let contours = d3
      .contourDensity()
      .x((d) => xPos(d.xPct))
      .y((d) => yPos(d.yPct))
      .size([width, height])
      .bandwidth(30)
      .thresholds(10)(data);
  
    console.log(contours);
  
    let minCoords = d3.min(contours, (d) => d.value);
    let maxCoords = d3.max(contours, (d) => d.value);
    let fillScale = d3
      .scaleLinear()
      .domain([minCoords, maxCoords])
      .range(['#504d4d', '#67d0f1']);
  
    console.log(data);
  
    svg
      .append('g')
      .selectAll('path')
      .data(contours)
      .join('path')
      // .attr('stroke', 'white')
      .attr('stroke-linejoin', 'round')
      .attr('fill', (d) => fillScale(d.value))
      // .attr('fill', (d) => fillScale(getContourPointCount(d)))
      .attr('stroke-width', (d, i) => (i % 5 ? 0.25 : 1))
      .attr('d', d3.geoPath());
  
    svg
      .append('g')
      .attr('stroke', 'white')
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr('cx', (d) => xPos(d.xPct))
      .attr('cy', (d) => yPos(d.yPct))
      .attr('r', 2)
      .on('mouseover', (evt, data) => {
        console.log(data);
      });
  
    // .on('mouseover', (event, data) => {
    //   console.log('uh', data, getContourPointCount(data));
    // });
  }
  
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