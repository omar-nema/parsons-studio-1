import { readable } from 'svelte/store';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, child, get } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCFE8TqTBWCDSBee0CuT9HXLnNNRtSA4S8',
  authDomain: 'eye-tracking-8adeb.firebaseapp.com',
  databaseURL: 'https://eye-tracking-8adeb-default-rtdb.firebaseio.com',
  projectId: 'eye-tracking-8adeb',
  storageBucket: 'eye-tracking-8adeb.appspot.com',
  messagingSenderId: '214459503975',
  appId: '1:214459503975:web:ff62018ff95cb21cfe8bc2',
  measurementId: 'G-55T3T75PPR', // For Firebase JS SDK v7.20.0 and later, measurementId is optional
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(app);
export async function getItem(childPath) {
  return await get(child(ref(db), childPath))
    .then((snapshot) => {
      if (snapshot.exists()) {
        // console.log(snapshot.val());
        return snapshot.val();
      } else {
        console.log('No data available');
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
