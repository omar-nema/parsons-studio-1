document.addEventListener('DOMContentLoaded', function () {
  // Your code goes here
  console.log('irun');

  webgazer
    .setGazeListener(function (data, elapsedTime) {
      console.log('uhhh');
      if (data == null) {
        return;
      }
      console.log(data.x, data.y, elapsedTime);
    })
    .begin();
});
