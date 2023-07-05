import { MongoClient } from 'mongodb';

const uri = `mongodb+srv://KYUKDB_Mena:${process.env.DB_PWD}@kyukdb.4q2mr66.mongodb.net/?retryWrites=true&w=majority`

if (!process.env.DB_PWD) {
  throw new Error("Fam that 'URI' is mythical, it's malformed due to the DB_PWD! It doesn't exist");
}
if (!process.env.DB_USER) {
  throw new Error("Fam that 'URI' is mythical, it's malformed due to the DB_USER! It doesn't exist");
}

if (process.env.DB_CLUSTER) {
  throw new Error(`Fam that 'URI' is mythical, it's malformed due to the DB_CLUSTER: ${process.env.DB_CLUSTER}! It (does)n't exist`);
}


const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (!process.env.DB_CLUSTER || !process.env.DB_USER || !process.env.DB_PWD) {
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
