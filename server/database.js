import path from 'path';
import fs from 'fs';
import dns from 'dns';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

dns.setServers(['8.8.8.8', '8.8.4.4']);

mongoose.connect(process.env.VITE_MONGO_URI)
  .then(() => console.log('Connected to database'))
  .catch(error => console.error(error))

async function updateCollection(collectionName) {
  const currentModulePath = new URL(import.meta.url).pathname;
  const currentDir = path.dirname(currentModulePath);
  const filePath = path.join(currentDir, `collections/${collectionName}.json`);
  const data = JSON.parse(fs.readFileSync(filePath));

  const schema = schemaObj[collectionName];

  const model = mongoose.model(collectionName, schema);

  model.deleteMany({})
    .then(() => {
      console.log('Deleted all documents');
      model.insertMany(data.quotes)
        .then(() => console.log('Inserted all documents'))
    })
    .catch(error => console.error(error));
}

export async function getVillainQuote() {
  const model = mongoose.model('villains');
  const villain = await model.aggregate([{ $sample: { size: 1 } }]);
  return villain[0];
}

const schemaObj = {
  villains: new mongoose.Schema({
    name: { type: String, required: true },
    quote: { type: String, required: true }
  })
}

updateCollection('villains');