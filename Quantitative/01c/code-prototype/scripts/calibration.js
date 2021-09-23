async function initCalibration() {
  d3.select('.textContainer.calibration').style('display', 'none');
  webgazer.saveDataAcrossSessions(false);
  webgazer.begin();
  d3.select('.loading').classed('active', true);
  checkLoad();
}

//janky code
async function checkLoad() {
  if (!webgazer.isReady()) {
    await setTimeout(checkLoad, 200);
  } else {
    d3.select('.loading').classed('active', false);
    addCalibrationPoints();
  }
}

let calibrationPoints = [
  { top: '4%', right: '4%', numClicks: 0 },
  //   { top: '50%', right: '4%', numClicks: 0 },
  //   { top: '96%', right: '4%', numClicks: 0 },
  //   { top: '4%', right: 'calc(100% - 400px)', numClicks: 0 },
  //   { top: '50%', right: '96%', numClicks: 0 },
  //   { top: '96%', right: '96%', numClicks: 0 },
  //   { top: '4%', right: '50%', numClicks: 0 },
  //   { top: '96%', right: '50%', numClicks: 0 },
  //   { top: '50%', right: '50%', numClicks: 0 },
];

function addCalibrationPoints() {
  d3.select('#calibrationPts')
    .style('display', 'block')
    .selectAll('div')
    .data(calibrationPoints)
    .join('div')
    .attr('class', 'calibration-pt')
    .style('top', (d) => d.top)
    .style('right', (d) => d.right)
    .on('click', (clickTarget, data) => {
      let ptSel = d3.select(clickTarget.target);
      if (data.numClicks == 5) {
        ptSel.style('display', 'none');
      } else {
        data.numClicks++;
        ptSel.style('opacity', 1 - data.numClicks * 0.2);
      }
      let ptsWithLessThan5 = calibrationPoints.filter((d) => d.numClicks < 5);
      if (ptsWithLessThan5.length == 0) {
        webgazer.pause();
        webgazer.removeMouseEventListeners();
        changePageState('view');
      }
    });
}
