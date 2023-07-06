import { MongoClient } from 'mongodb';

if (!process.env.DB_URI) {
  throw new Error("Fam that 'DB_URI' is mythical! It doesn't exist");
}

const uri = process.env.DB_URI;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (!process.env.DB_URI) {
  throw new Error('Please add the URI to your .env.local file');
}

declare global {
  namespace globalThis {
    var _mongoClientPromise: Promise<MongoClient>;
  }
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  console.log(client);
  clientPromise = client.connect();
}

export default clientPromise;
