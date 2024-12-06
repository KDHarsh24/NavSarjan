// server.js
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = 'mongodb+srv://navsarjansih:navsarjansih@navsarjan.nqyo7.mongodb.net/?retryWrites=true&w=majority&appName=Navsarjan';
const client = new MongoClient(uri);
const dbName = 'navsarjan'; // Replace with your database name

async function connectToDatabase() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    db = client.db(dbName);
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1); // Exit the application if the connection fails
  }
}

app.post('/api/insert', async (req, res) => {
  const { collectionName, data } = req.body;
  if (!collectionName || !data) {
    return res.status(400).json({ success: false, message: 'Missing collection name or data' });
  }
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(data);
    res.status(200).json({ success: true, message: 'Data inserted successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to insert data', error });
  }
});

app.post('/api/fetch', async (req, res) => {
    const { collectionName, condition, projection } = req.body;
    if (!collectionName) {
      return res.status(400).json({ success: false, message: 'Collection name is required' });
    }
    try {
      const db = client.db(dbName);
      const collection = db.collection(collectionName);
      const queryCondition = condition || {};
      const queryProjection = projection || {};  
      const data = await collection.find(queryCondition).project(queryProjection).toArray();
      console.log(data)
      res.status(200).json({ success: true, data: data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Failed to fetch data', error });
    }
  });

app.post('/api/fetchone', async (req, res) => {
    const { collectionName, condition, projection } = req.body;

    if (condition && condition._id) {
      // Ensure '_id' is treated as a Mongo ObjectId if it's passed as a string
      condition._id = new ObjectId(condition._id);
    }
    console.log(collectionName, condition, projection)
    if (!collectionName) {
      return res.status(400).json({ success: false, message: 'Collection name is required' });
    }
  
    try {
      const db = client.db(dbName);
      const collection = db.collection(collectionName);
      const queryCondition = condition || {};
      const queryProjection = projection || {};  
      const data = await collection.findOne(queryCondition, queryProjection);
      console.log(data)
      res.status(200).json({ success: true, data: data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Failed to fetch data', error });
    }
});

app.post("/api/replace", async (req, res) => {
  const { collectionName, condition, data } = req.body;
  console.log("Received: ", collectionName, condition, data)
  if (condition._id) {
    condition._id = new ObjectId(condition._id);
    if (data._id){
      data._id = new ObjectId(data._id)
    }
  }
  if (!collectionName || !condition || !data) {
    return res.status(400).json({ success: false, message: "Invalid input." });
  }

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Convert _id to ObjectId if present in the condition
   

    const result = await collection.replaceOne(condition, data);

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Document not found." });
    }

    res.status(200).json({
      success: true,
      message: "Document replaced successfully.",
      result,
    });
  } catch (err) {
    console.error("Error replacing document:", err);
    res.status(500).json({ success: false, message: "Server error." });
  } finally {
    await client.close();
  }
});
  
// Start the server
connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});