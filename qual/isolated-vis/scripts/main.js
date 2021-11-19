import { prepareData } from './data.js';

document.addEventListener('DOMContentLoaded', async () => {
  let data = await prepareData();
  let dataSample = data[0].data;

  async function createClips() {
    let numClips = 20;
    let clipMaxSize = 20;
    let clipMinR = 8;
    let clipInc = (clipMaxSize - clipMinR) / numClips;
    let blurMax = 3;
    let blurInc = blurMax / numClips;
    let opacityInc = 1 / numClips;
    let imgHolder = document.querySelector('.imgs');

    for (let i = numClips; i > 0; i--) {
      let r = clipInc * i + clipMinR;
      let blur = blurInc * i;
      let opacity = opacityInc * (numClips - i);
      let ctrx = 50;
      let ctry = 50;
      imgHolder.innerHTML += `
     <img id="overlay" 
     class="clip"   
     style="clip-path: circle(${r}% at ${ctrx}% ${ctry}%); filter: blur(${blur}px);opacity: ${opacity}"
     src="./assets/img/mehretuCropped.png"/>  
     `;
    }
    return;
  }

  //createclips(imgUrl)

  function moveClips(centerx, centery) {
    let clips = document.querySelectorAll('.clip');
    clips.forEach((d) => {
      let currClipPath = d.style['clip-path'];
      let split = currClipPath.split('at ');
      let prefix = split[0];
      let newCtr = `at ${centerx}% ${centery}%)`;
      d.style['clip-path'] = prefix + newCtr;
    });
  }

  await createClips();
  //   let i = 0;
  //   function iter() {
  //     console.log(i);
  //     setTimeout(() => {
  //       let d = dataSample[i];

  //       moveClips(d.xPct, d.yPct);
  //       i++;
  //       if (i < dataSample.length) {
  //         iter();
  //       }
  //     }, 50);
  //   }

  //if currFrame changes
  //reactive:
  //if play, currFrame should increase every 5ms

  let pause = false;
  let currFrame = 0;
  function play() {
    if (!pause && currFrame < 200) {
      let d = dataSample[currFrame];
      setTimeout(moveClips(d.xPct, d.yPct), 50);
      currFrame++;
    }
  }

  play();

  //play animation
  //get currAnimationFrame == i

  //   iter();

  //   dataSample.slice(0, 100).forEach(async (d) => {
  //     await setTimeout(moveClips(d.xPct, d.yPct), 100);
  //   });
});
