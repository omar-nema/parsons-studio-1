// import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js';
// import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-analytics.js';
// import {
//   getDatabase,
//   ref,
//   set,
//   child,
//   get,
// } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js';

// //import {} from https://www.gstatic.com/firebasejs/9.1.3/firebase-
// // https://firebase.google.com/docs/web/setup#available-libraries

// const firebaseConfig = {
//   apiKey: 'AIzaSyCFE8TqTBWCDSBee0CuT9HXLnNNRtSA4S8',
//   authDomain: 'eye-tracking-8adeb.firebaseapp.com',
//   databaseURL: 'https://eye-tracking-8adeb-default-rtdb.firebaseio.com',
//   projectId: 'eye-tracking-8adeb',
//   storageBucket: 'eye-tracking-8adeb.appspot.com',
//   messagingSenderId: '214459503975',
//   appId: '1:214459503975:web:ff62018ff95cb21cfe8bc2',
//   measurementId: 'G-55T3T75PPR', // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const db = getDatabase(app);

//Test Calls

// get(child(ref(db), 'trackingRuns/anonymous-user-1'))
//   .then((snapshot) => {
//     if (snapshot.exists()) {
//       console.log(snapshot.val());
//     } else {
//       console.log('No data available');
//     }
//   })
//   .catch((error) => {
//     console.error(error);
//   });

//read data
//write data
//write file

//artwork. name, url, id
//tracking data, segmented by artwork?

//artwork, name, url, trackingIds: []
//trackingId, data: []

// set(ref(db, 'artwork/'), {
//   'carlos-1966': {
//     sessions: ['anonymous-user-1'],
//     url: 'testpainting.com',
//   },
// });

// set(ref(db, 'trackingRuns/'), {
//   'anonymous-user-1': [
//     {
//       time: 114822,
//       x: 431.92587460838524,
//       y: 330.5306756854518,
//       xPct: 51.085260154746926,
//       yPct: 55.55137406478181,
//       xMin: 217.25,
//       xMax: 1062.75,
//       yMin: 0,
//       yMax: 595,
//       series: 1632519923007,
//     },
//     {
//       time: 114822,
//       x: 431.92587460838524,
//       y: 330.5306756854518,
//       xPct: 51.085260154746926,
//       yPct: 55.55137406478181,
//       xMin: 217.25,
//       xMax: 1062.75,
//       yMin: 0,
//       yMax: 595,
//       series: 1632519923007,
//     },
//   ],
// });
