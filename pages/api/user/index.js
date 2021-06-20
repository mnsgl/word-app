import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import User from "../models/user";

export default async function handler(req, res) {
  let ret = null;
  if (req.method === "POST") {
    ret = await postMethod(req, res);
  } else {
    ret = res.status(400).json({ message: "Wrong api call" });
  }

  return ret;
}

// http://localhost:3000/api/user
// post method to create a user
//  body {
//     name,
//     mail,
//     pass,
//  }

async function postMethod(req, res) {
  if (!req?.body) {
    return res.status(400).json({ msg: "body is empty" });
  }
  let userInfo = req.body;
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  User.find({
    $or: [{ name: userInfo.name }, { mail: userInfo.mail }],
  }).then((user) => {
    if (user.length > 0) {
      return res.status(203).json({ message: "user already exist" });
    }
    new User({
      _id: new mongoose.Types.ObjectId(),
      date: new Date().toLocaleString(),
      ...userInfo,
    })
      .save()
      .then((_) => {
        return res.status(201).json({ msg: "user was created" });
      })
      .catch((err) => {
        return res.status(400).json({ error: err });
      });
  });
}
