const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// token verify

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ee5t8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const collection = client.db("todoCollection").collection("todo");

async function run() {
  try {
    await client.connect()
    console.log('database connect');
    app.get("/todo", async (req, res) => {
      const result = await collection.find().toArray();
      res.send(result);
    });
    app.delete("/todo/:id", async (req, res) => {
      const id = req.params.id;
      const result = await collection.deleteOne({ _id: ObjectId(id) });
      res.send(result);
    });
    app.post("/todo", async (req, res) => {
      const todo = req.body;
      const result = await collection.insertOne({ todo });
      res.send(result);
    });
    app.put("/todo/:id", async (req, res) => {
      const id = req.params.id;
      const done = req.body;
      const filter = { _id: ObjectId(id) };
      const update = { $set: { done } };
      const result = await collection.updateOne(filter, update, {
        upsert: true,
      });
      res.send(result);
    });

    // finally
  } finally {
  }
}
run().catch(console.dir);

//tora sobar niche thakbi
app.get("/", (req, res) => {
  res.send("database is running");
});

app.listen(port, () => {
  console.log("data base running on", port);
});
