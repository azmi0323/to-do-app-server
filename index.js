const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// token verify
const tokenVerify = (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, process.env.SECRETE_CODE, function (err, decoded) {
    if (err) {
      console.log(err);
      res.send({ message: err }); //have to done
      return;
    }
    req.decoded = decoded;
    next();
  });
};

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ee5t8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
   

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
