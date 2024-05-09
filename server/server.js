import express from "express";
import { promises as fs } from "fs";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collectionName = process.env.MONGO_DB_COLLECTION;

const app = express();
app.use(cors());
const PORT = 3000;

app.use(express.json());

// Endpoint to read and send JSON file content
app.get("/socks", async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const socks = await collection.find({}).toArray();
    res.json(socks);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Hmmm, something smells... No socks for you! ☹");
  }
});

app.get("/socks/:color", async (req, res) => {
  try {
    // Console log the entire request object
    console.log(req);
    const { color } = req.params;
    // Console log specific parts of the request
    console.log("Req params - color:", color);

    const data = await fs.readFile("../data/socks.json", "utf8");
    const jsonObj = JSON.parse(data);

    const correctSocks = jsonObj.filter((sock) => sock.color === color);

    console.log("right socks?", correctSocks);

    correctSocks.length === 0
      ? res.status(404).send("No socks found with that color")
      : res.json(correctSocks);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Hmmm, something smells... No socks for you! ☹");
  }
});

app.post("/socks", async (req, res) => {
  try {
    // Obligatory reference to POST Malone
    console.log(
      "If POST Malone were a sock, he'd be the one with the most colorful pattern."
    );
    // Simulate creating a user
    const { username, email } = req.body;
    if (!username || !email) {
      // Bad request if username or email is missing
      return res
        .status(400)
        .send({ error: "Username and email are required." });
    }

    // Respond with the created user information and a 201 Created status
    res.status(201).send({
      status: "success",
      location: "http://localhost:3000/users/1234", // This URL should point to the newly created user
      message: "User created successfully.",
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Hmmm, something smells... No socks for you! ☹");
  }
});

// POST Search Route Handler
app.post("/socks/search", async (req, res) => {
  try {
    const searchColor = req.body.searchTerm;
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const socks = await collection
      .find({ "sockDetails.color": searchColor })
      .toArray();
    res.json(socks);
  } catch (err) {
    console.error("Error:", err);
    res
      .status(500)
      .send("Hmm, something doesn't smell right... Error searching for socks");
  }
});

app.delete("/socks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Deleting sock with ID:", id);
    res.status(200).send("Sock deleted successfully");
  } catch (err) {
    console.error("Error:", err);
    res
      .status(500)
      .send("Hmm, something doesn't smell right... Error deleting sock");
  }
});

app.put("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;
    console.log("Updating email for user with ID:", id);
    res.status(200).send({
      status: "success",
      data: email, // This URL should point to the newly created user
      message: "User updated successfully.",
    });
  } catch (err) {
    console.error("Error:", err);
    res
      .status(500)
      .send("Hmm, something doesn't smell right... Error deleting sock");
  }
});

app.listen(PORT, function (err) {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", PORT);
});
