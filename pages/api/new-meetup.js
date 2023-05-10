import { MongoClient } from "mongodb";

// /api/new-meetup

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    // const { title, image, address, description } = data;

    const client = await MongoClient.connect(
      "mongodb+srv://jadapalliyaswanth2000:ZQ2sIlzpGQDi9JuS@cluster0.yp5zoyv.mongodb.net/meetups?retryWrites=true&w=majority"
    );

    const db = client.db();
    const meetupsCollection = db.collection("meetups");

    const response = await meetupsCollection.insertOne({ data });
    console.log(response);

    client.close();

    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
