import { MongoClient } from "mongodb";
import mongoose from "mongoose";

export default async function handler(req, res) {
  let ret = null;
  if (req.method === "POST") {
    ret = await postMethod(req, res);
  } else {
    ret = res.status(400).json({ message: "Wrong api call" });
  }
}

// http://localhost:3000/api/set/set-name
// post method to get all set ids of user
//  body {
//      set : {
//        setName,
//      }
//      user: {
//        name,
//      }
//  }

async function postMethod(req, res) {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  let user = await db.collection("users").find({ name: userName }).toArray();
  let setsId = user[0].setsId;
  return res.status(400).json({ message: "Wrong api call" });
}
