const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb+srv://navsarjansih:navsarjansih@navsarjan.nqyo7.mongodb.net/?retryWrites=true&w=majority&appName=Navsarjan", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Define schema and model
const startupSchema = new mongoose.Schema({
  name: String,
  startupid: String,
  description: String,
  pitchplan: String,
  logo: String,
  founderid: String,
  incorporated: String,
  registerdate: Date,
  field: String,
  businessmodel: String,
  verified: String,
  address: String,
});

const Startup = mongoose.model("startup", startupSchema, "startup");

app.get("/api/startups", async (req, res) => {
    try {
      const startups = await Startup.find();
      console.log("Fetched startups:", startups); // Debugging log
      res.json(startups);
    } catch (err) {
      console.error("Error fetching startups:", err);
      res.status(500).send("Server Error");
    }
  });
  

(async () => {
    try {
      const result = await Startup.find();
      console.log("Test query result:", result);
    } catch (error) {
      console.error("Manual query test error:", error);
    }
  })();
  

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
