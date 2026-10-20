import express from "express";
import { MongoClient, ObjectId } from 'mongodb';
import 'dotenv/config';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());


const client = new MongoClient(`mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@ac-b8awnm2-shard-00-00.3my9dya.mongodb.net:27017,ac-b8awnm2-shard-00-01.3my9dya.mongodb.net:27017,ac-b8awnm2-shard-00-02.3my9dya.mongodb.net:27017/?ssl=true&replicaSet=atlas-stpg8f-shard-0&authSource=admin`);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}
const mongoClient = await connectToMongoDB();

const db = mongoClient.db("product-db");
const productCollection = db.collection("products");

app.post("/products", async (req, res) => {
  const data = req.body;
  const result = await productCollection.insertOne(data);

  console.log(result);

  res.send(result);
})

app.get("/products", async (req, res) => {
  const result = await productCollection.find().toArray();
  res.send(result);
})

app.get("/products/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await productCollection.findOne(query);
  res.send(result);
});

app.get("/", (req, res) => {
    res.send({msg: "Product server is running"});
})


app.listen(port, () => {
    console.log(`Product app listening from port ${port}`);
})