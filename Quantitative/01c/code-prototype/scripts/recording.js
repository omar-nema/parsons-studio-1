let recordings = [];
let runId = new Date().getTime();
let img = d3.select('#mainpic');
let bbox = img.node().getBoundingClientRect();

function initViewInstructions() {
  //   d3.select("[id ^= 'webgazer']").style('display', 'none');
  webgazer.showVideoPreview(false);
  d3.select('#webgazerGazeDot').style('opacity', '0');
  d3.select('#initView').on('click', initView);
}

function initView() {
  d3.select('#viewInst').style('display', 'none');
  webgazer.resume();
  d3.select('#mainpic').classed('show', true);
  webgazer.setGazeListener(function (data, elapsedTime) {
    if (data == null) {
      return;
    }
    let recordingObj = {
      time: elapsedTime,
      x: data.x - bbox.x,
      y: data.y - bbox.y,
      xPct: (100 * (data.x - bbox.x)) / bbox.width,
      yPct: (100 * (data.y - bbox.y)) / bbox.height,
      xMin: bbox.left,
      xMax: bbox.right,
      yMin: bbox.top,
      yMax: bbox.bottom,
      series: runId,
    };
    recordings.push(recordingObj);
  });
  //60000
  setTimeout(end, 6000);
}

function end() {
  console.log('ended');
  webgazer.pause();
  changePageState('results');
}
function initDownload() {
  d3.select('#mainpic').classed('show', false);
  d3.select('#download').on('click', download);
  d3.select('resultsInst').style('display', 'block');
}

function download() {
  var jsonString = JSON.stringify(recordings);
  var blob = new Blob([jsonString], { type: 'application/json' });
  var saveAs = window.saveAs;
  saveAs(blob, 'imgPath.json');
}
