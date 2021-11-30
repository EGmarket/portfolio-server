const express = require("express");
const cors = require("cors");
require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@mangomarketecom.gzttn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("egTravels");
    const offerCollection = database.collection("contact");
  
   

    //Get Api offer
    app.get("/offers", async (req, res) => {
      const cursor = offerCollection.find({});
      const offers = await cursor.toArray();
      res.json(offers);
    });
   

    
    /* ----------------------------POST-route-start-------------------------------------- */
    //POST Honeymoon API
    app.post("/contact", async (req, res) => {
      const newMessage = req.body;
      const result = await offerCollection.insertOne(newMessage);
      console.log("got new user", req.body);
      console.log("Added user", result);
      res.json(result);
    });
    

    /* -------------------- Delete --------------------- */
    
   

  } finally {
    //   await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.listen(process.env.PORT || port, () => {
  console.log("Server Running on Port", process.env.PORT || port);
});
