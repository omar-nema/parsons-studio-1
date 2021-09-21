document.addEventListener('DOMContentLoaded', function () {
  // Your code goes here
  console.log('irun');
  webgazer.begin();

  let btnResume = document.querySelector('#resume');
  btnResume.addEventListener('click', (d) => {
    webgazer.resume();
  });

  let btnPause = document.querySelector('#pause');
  btnPause.addEventListener('click', (d) => {
    webgazer.pause();
  });

  let img = document.querySelector('#mainpic');
  let btnRecord = document.querySelector('#rec');
  btnRecord.addEventListener('click', (d) => {
    console.log('reccc');
    webgazer.resume();
    img.classList.add('show');
    recordingBegin();
  });

  let recordings = [];
  let runId = new Date().getTime();
  let bbox = img.getBoundingClientRect();
  function recordingBegin() {
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
  }

  let btnEnd = document.querySelector('#end');
  btnEnd.addEventListener('click', (d) => {
    webgazer.pause();
    console.log('data points: ', recordings.length);
    writeFile(recordings);
  });

  function writeFile(arr) {
    var jsonString = JSON.stringify(arr);
    var blob = new Blob([jsonString], { type: 'application/json' });
    var saveAs = window.saveAs;
    saveAs(blob, 'imgPath.json');
  }
});
