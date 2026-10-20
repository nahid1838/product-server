import express from "express";
import { MongoClient } from 'mongodb';
import 'dotenv/config';

const app = express();
const port = 5000;


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
connectToMongoDB();

app.get("/", (req, res) => {
    res.send({msg: "Product server is running"});
})

app.listen(port, () => {
    console.log(`Product app listening from port ${port}`);
})