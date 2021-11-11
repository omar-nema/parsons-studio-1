<script>
  import { artworkMetadata } from '../stores/artworkMetadata';
  import {
    gazerRecordingArt,
    sessionID,
    loadingInd,
    stateIndex,
    pageState,
    selectedImage,
  } from '../stores/pageState';
  import {
    dbGet,
    dbWrite,
    postTest,
    appendData,
    uploadBlob,
  } from '../utils/firebaseUtils.js';

  //get data from stores
  let sessionId = $sessionID;
  let sessionData = $gazerRecordingArt;
  let artworkId = $selectedImage.key,
    artworkData = selectedImage;
  //name input ind
  let nameInputted = false;
  let userName;

  async function writeSessionToArtwork() {
    let res = await dbGet('works/' + artworkId);
    console.log(res);
    if (!res) {
      await dbWrite('works/' + artworkId, artworkData);
    }
    return await dbWrite('works/' + artworkId + '/sessionData/' + sessionId, {
      name: 'Anonymous',
    });
  }
  async function storeSessionData() {
    await dbWrite('sessionData/' + sessionId, sessionData);
    return await dbWrite('sessionData/' + sessionId, sessionData);
  }
  async function updateUserName() {
    nameInputted = true;
    await dbWrite(
      'works/' + artworkId + '/sessionData/' + sessionId + '/name',
      userName
    );
    pageState.set('gallery');
  }

  storeSessionData();
  writeSessionToArtwork();

  // async function writeAllData() {
  //   storeSessionData();
  //   writeSessionToArtwork();

  //   let vis = generateContour();
  //   let svgBlob = await new Blob([vis], {
  //     type: 'image/svg+xml;charset=utf-8',
  //   });
  //   await uploadBlob(
  //     'svgContours/' + artworkId + '/contours/' + sessionId + '.svg',
  //     svgBlob
  //   );
  //   console.log('made it ma');
  //   loadingInd.set(false);
  //   console.log($loadingInd);
  // }

  // writeAllData();

  // async function updateSVGUrl() {
  //   return await dbWrite(
  //     'works/' + artworkId + '/sessionData/' + sessionId + '/svgURL',
  //     svgURL
  //   );
  // }
</script>

<h3>Calibrate: Results</h3>
<p>
  Great work! We’re generating your custom visualization (it will take up to 30
  seconds). In the meantime, enter the name with which you’d like associate your
  visualization in the gallery!
</p>
<div class="input-wrapper">
  <input
    placeholder="Enter name here"
    bind:value={userName}
    on:keyup={(e) => {
      if (e.keyCode === 13) {
        updateUserName();
      } else {
        nameInputted = false;
      }
    }}
  />
  <div
    class="btn accent clickable"
    class:disabled-part={nameInputted == true}
    on:click={updateUserName}
  >
    Save & View
  </div>
</div>

<style>
  .input-wrapper {
    margin-top: 50px;
    display: flex;
    height: 50px;
    justify-content: center;
    width: 100%;
    align-items: center;
  }
  input {
    background: var(--bg-contrast-darker);
    color: white;
    min-width: 50%;
    padding: 0 20px;
  }
  input,
  .btn {
    height: 100%;
    border-radius: 0;
    margin: 0;
    box-sizing: border-box;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
