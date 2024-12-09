const { MongoClient } = require('mongodb');

async function connectToDatabase() {
  const uri = process.env.REACT_APP_MONGO_URI;

  if (!uri) {
    throw new Error('MongoDB URI is not defined');
  }

  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log('Connected to MongoDB');
    return client;
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    throw error;
  }
}

module.exports = { connectToDatabase };
