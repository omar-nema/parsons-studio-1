function changePageState(pageState) {
  d3.selectAll('.section').classed('active', false);
  d3.selectAll('nav div').classed('active', false);
  d3.selectAll(`.${pageState}`).classed('active', true);

  if (pageState == 'calibrate') {
    d3.select('#btn-calibrate-confirm').on('click', () => {
      initCalibration();
    });
  } else if (pageState == 'view') {
    initViewInstructions();
  } else if (pageState == 'results') {
    initDownload();
  }
}

document.addEventListener('DOMContentLoaded', function () {
  d3.select('#btn-calibrate').on('click', () => {
    changePageState('calibrate');
  });
});

// let pageStates = ['overview', 'calibrate', 'view', 'results'];
