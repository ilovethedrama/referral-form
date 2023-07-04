import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error("Fam that 'MONGODB_URI' is mythical! It doesn't exist");
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add the URI to your .env.local file');
}

declare global {
  namespace globalThis {
    var _mongoClientPromise: Promise<MongoClient>;
  }
}

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  console.log('this is PRODUCTION, and the uri is:', uri);
  clientPromise = client.connect();
}

export default clientPromise;
