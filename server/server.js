import express from "express";
import { promises as fs } from "fs";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import pg from "pg";

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collectionName = process.env.MONGO_DB_COLLECTION;

const { Pool } = pg;
// PostgreSQL pool configuration
const pool = new Pool({
  user: "postgres",
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: "postgres",
  port: 5432,
});

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

//Add a new sock
app.post("/socks", async (req, res) => {
  try {
    const newSock = req.body;
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    collection.insertOne(newSock);

    // Respond with the created user information and a 201 Created status
    res.status(201).send({
      status: "success",
      message: "Sock created successfully.",
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
    const regex = new RegExp(searchColor, "i"); // Creates case-insensitive regex
    const socks = await collection
      .find({ "sockDetails.color": regex })
      .toArray();
    res.json(socks);
  } catch (err) {
    console.error("Error:", err);
    res
      .status(500)
      .send("Hmm, something doesn't smell right... Error searching for socks");
  }
});

//add users
app.post("/socks/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query(
      "SELECT uid FROM users WHERE username = $1 AND password = $2",
      [username, password]
    );
    if (result.rows.length > 0) {
      res.status(200).json({ uid: result.rows[0].uid });
    } else {
      res.status(401).json({ message: "Authentication failed" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// delete a sock
app.delete("/socks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    console.log("Deleting sock with ID:", id);
    collection.deleteOne({ _id: new ObjectId(id) });
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
