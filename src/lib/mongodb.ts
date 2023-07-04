import { MongoClient } from 'mongodb';

const uri = `mongodb+srv://${process.env.CLUSTER_NAME}_${process.env.DB_PRIMARY_USER}:${process.env.MONGODB_PASSWORD}@kyukdb.4q2mr66.mongodb.net/?retryWrites=true&w=majority`

if (!process.env.CLUSTER_NAME) {
  throw new Error("Fam that 'URI' is mythical, it's malformed due to the CLUSTER_NAME! It doesn't exist");
}
if (!process.env.DB_PRIMARY_USER) {
  throw new Error("Fam that 'URI' is mythical, it's malformed due to the DB_PRIMARY_USER! It doesn't exist");
}
if (!process.env.MONGODB_PASSWORD) {
  throw new Error("Fam that 'URI' is mythical, it's malformed due to the MONGODB_PASSWORD! It doesn't exist");
}

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
