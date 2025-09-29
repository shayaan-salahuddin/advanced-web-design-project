import fs from 'fs';
import csv from 'csv-parser';
import mbxDatasets from '@mapbox/mapbox-sdk/services/datasets.js';

//ater0528's unique Mapbox Token and Dataset ID! 
const MAPBOX_TOKEN = 'sk.eyJ1IjoiY3VjdW1iZXIxNjc4IiwiYSI6ImNtYjAwMmtqMjBsNzMya3BzbDd1azR4dWoifQ.Ms22GD0X7KQTz6fEpTNyIA';
const DATASET_ID = 'cmazzzko734t31pryymraishg';

/*
  Essentially, all the data from the form is saved in this local CSV file. 
  But to be able to update the Mapbox Map on the webpage, there needs to be a 
  mechanism to transfer data from the local CSV to the Mapbox webpage that is 
  hosted from the Mapbox service. This is the backend code to do so. 

  Console.log functionality is utilized to be able to monitor activity and ensure 
  the program is working as intended. 
*/

const client = mbxDatasets({ accessToken: MAPBOX_TOKEN });

const uploadCsvToDataset = async (filePath) => {
  const features = [];

  const readStream = fs.createReadStream(filePath)
    .pipe(csv(['name', 'description', 'address', 'lat', 'lng']));

  for await (const row of readStream) {
    features.push({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [parseFloat(row.lng), parseFloat(row.lat)]
      },
      properties: {
        name: row.name,
        description: row.description,
        address: row.address
      }
    });
  }

  console.log(`Uploading ${features.length} features...`);

  for (const feature of features) {
    const featureId = `${feature.geometry.coordinates.join('-')}`;

    try {
      await client.putFeature({
        datasetId: DATASET_ID,
        featureId,
        feature
      });
      console.log(`Uploaded feature: ${featureId}`);
    } catch (err) {
      console.error(`Error uploading feature ${featureId}:`, err.message);
    }
  }

  console.log('Upload complete!');
};

uploadCsvToDataset('locations.csv');