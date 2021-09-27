import './data.js';

document.addEventListener('DOMContentLoaded', () => {
  //create nav
  // sections = d3.selectAll('section').nodes();
  // sections.forEach(d=> {

  // })

  //add stats
  let statImgWidthMoved = 31;
  d3.select('#pixel-value').text(statImgWidthMoved + 'x');

  for (let i = 0; i < statImgWidthMoved; i++) {
    d3.select('#img-travel').append('div').attr('class', 'abstract-img');
  }
});
