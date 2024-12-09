const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { emit } = require('nodemon');
const { Collection } = require('mongoose');
const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // JSON payload size limit
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// MongoDB connection
const uri = 'mongodb+srv://navsarjansih:navsarjansih@navsarjan.nqyo7.mongodb.net/?retryWrites=true&w=majority&appName=Navsarjan';
const client = new MongoClient(uri);
const dbName = 'navsarjan'; // Replace with your database name
let db; // Global variable to hold the database instance


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

const logHistory = async (db, { entityType, entityId, fieldChanged, changedBy, isVerification = false }) => {
  try {
    const historyData = {
      entityType,
      entityId,
      fieldChanged,
      changedBy,
      changeDate: new Date(),
      isVerification: isVerification,
    };
    await db.collection("history").insertOne(historyData);
    console.log("History entry added:", historyData);
  } catch (err) {
    console.error("Failed to log history:", err.message);
  }
};

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Connect to MongoDB users collection
    const usersCollection = db.collection('user');

    // Find user by email
    const user = await usersCollection.findOne({ email });

    if (!user) {
      // If user is not found
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Validate password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      // Login successful
      return res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role // assuming "name" exists in the user document
        },
      });
    } else {
      // Password mismatch
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});


app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password, address, phone, dob, social, role } = req.body;

    if (!email || !password || !name || !address || !phone || !dob || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const usersCollection = db.collection('user'); // Ensure you have a "users" collection
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Define role with a default value
     // Default role, e.g., "user", "admin", etc.

    const newUser = {
      name,
      email,
      password: hashedPassword,
      address,
      phone,
      dob,
      image: req.file ? req.file.path : null,
      social: social || null,
      role, // Include the default or dynamic role
    };

    const result = await usersCollection.insertOne(newUser);

    res.status(201).json({
      message: 'Account created successfully!',
      user: { ...newUser, _id: result.insertedId },
    });
    await logHistory(db, {entityType: 'user', entityId: email, fieldChanged: 'Account Regitered', changedBy: email})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating account', error: error.message });
  }
});

app.post('/api/insert', async (req, res) => {
  const { collectionName, data } = req.body;
  console.log(collectionName, data)
  if (!collectionName || !data) {
    return res.status(400).json({ success: false, message: 'Missing collection name or data' });
  }
  try {
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(data);
    res.status(200).json({ success: true, message: 'Data inserted successfully', result });
    await logHistory(db, {entityType: collectionName, entityId: result.insertedId, fieldChanged: (collectionName === 'startup')? 'New Startup Launched' : (collectionName === 'ipr') ? 'IPR Request' : 'New Project Open', changedBy: data?.ownerid || data?.founderuserid || 'admin'})
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
    await logHistory(db, {entityType: collectionName, entityId: data._id, fieldChanged:(collectionName==='startup') ? 'Startup Edit': (collectionName === 'ipr') ? 'IPR Request Changed' : 'Project Approval', changedBy: data?.ownerid || data?.founderuserid || 'admin', isVerification: (collectionName==='history')? true: false})
    if (collectionName === 'history' && data.isVerification === true)
    {
      let g = '_id'
      console.log('hello')
      if (data.entityType === 'user'){
        
        let resu = await db.collection(data.entityType).updateOne({ email: data.entityId}, {$set: {isVerification: true}})
      }
      else{
        console.log('byeee', data)
        let resu = await db.collection(data.entityType).updateOne({ _id: new ObjectId(data.entityId)}, {$set: {isVerification: true}})
      }
    }
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