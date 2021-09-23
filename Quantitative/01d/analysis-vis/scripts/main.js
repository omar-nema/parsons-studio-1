console.log('HEEEEEEY');

//select element
var element = document.querySelector('body');

//attach mousemove event listener
element.addEventListener('mousemove', function (event) {
  // Cursor x position
  var x = event.clientX;
  // Cursor y position
  var y = event.clientY;
  console.log(x, y);
});
