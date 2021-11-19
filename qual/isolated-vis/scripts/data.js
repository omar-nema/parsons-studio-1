let data = [{ path: './assets/data/omar.json', label: 'Viewer 5' }];
let dataToFetch = data.filter((d) => d.path);
let dataFetched = [];

async function fetchJson(jsonFile) {
  let r = await fetch(jsonFile);
  return await r.json();
}

//async fetch all the data
let promises = [];
let timePerPoint, numParticipants;
data.forEach((d) => {
  promises.push(fetchJson(d.path));
});

export async function prepareData() {
  return await Promise.all(promises)
    //prepare data array
    .then(async (values) => {
      values.forEach((d, i) => {
        dataFetched.push({
          data: d,
          label: data[i].label,
        });
      });
      dataFetched.push({ data: d3.merge(values), label: 'All Participants' });
      return dataFetched;
    })
    .then(async (values) => {
      //clean data
      dataFetched.forEach((arr) => {
        arr.data = arr.data.filter((d) => {
          return d.xPct >= 0 && d.xPct <= 100 && d.yPct >= 0 && d.yPct <= 100;
        });
        return;
      });
      return dataFetched;
    });
}
