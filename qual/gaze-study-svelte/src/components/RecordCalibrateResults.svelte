<script>
  import { artworkMetadata } from '../stores/artworkMetadata';
  import {
    gazerRecordingArt,
    sessionID,
    loadingInd,
    stateIndex,
    pageState,
    selectedImage,
    jumpCard,
    testMode,
  } from '../stores/pageState';
  import {
    dbGet,
    dbWrite,
    postTest,
    appendData,
    uploadBlob,
  } from '../utils/firebaseUtils.js';
  import { hideGazerForLater } from '../utils/gazerUtils';

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
  async function submitSession() {
    nameInputted = true;

    if ($testMode == 0) {
      await dbWrite(
        'works/' + artworkId + '/sessionData/' + sessionId + '/name',
        userName
      );
    }

    //switch pages only after video container is moved to body
    let observer = new MutationObserver((mutationRecords) => {
      if (mutationRecords[0].removedNodes.length > 0) {
        jumpCard.set($selectedImage.key);
        pageState.set('gallery');
      }
    });
    // observe everything except attributes
    observer.observe(document.querySelector('.container-body'), {
      childList: true, // observe direct children
      subtree: false, // lower descendants too
      characterDataOldValue: true, // pass old data to callback
    });

    hideGazerForLater();
  }

  $: {
  }

  if ($testMode == 0) {
    storeSessionData();
    writeSessionToArtwork();
  }
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
        submitSession();
      } else {
        nameInputted = false;
      }
    }}
  />
  <div
    class="btn accent clickable"
    class:disabled-part={nameInputted == true}
    on:click={submitSession}
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
