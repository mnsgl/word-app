import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import User from "../models/user";
export default async function handler(req, res) {
  let ret = null;
  if (req.method === "GET" && req.query.params.length === 1) {
    let userName = req.query.params[0];
    ret = await getMethod(res, userName);
  } else {
    ret = res
      .status(400)
      .json({ message: "Too many params for this api call" });
  }
  return ret;
}

// http://localhost:3000/api/user/[userName]
// get method to check a user

async function getMethod(res, userName) {
  await mongoose.connect(process.env.MONGODB_URI_OFFLINE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  User.findOne({ name: userName }).then((user) => {
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(300).json({ msg: "user not exist" });
    }
  });
}
