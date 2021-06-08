import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import User from "../models/user";
import Set from "../models/set";

export default async function handler(req, res) {
  let ret = null;
  let params = req.query.params;
  if (params.length > 2) {
    return res
      .status(400)
      .json({ message: "Too many params for this api call" });
  }
  if (params.length === 1 && req.method === "GET") {
    let userName = params[0];
    ret = await getMethod(res, userName);
  } else if (params.length === 2 && req.method === "DELETE") {
    let userName = params[0];
    let setId = params[1];
    ret = await deleteMethod(res, userName, setId);
  } else {
    ret = res.status(400).json({ message: "Wrong api call" });
  }
  return ret;
}

// http://localhost:3000/api/set/[userName]
// get method to get set by user name

async function getMethod(res, userName) {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  User.findOne({ name: userName })
    .populate("setIds")
    .then((user) => {
      return res.status(200).json(user.setIds);
    });
  /*
  User.findOne({ name: userName }).then(async (user) => {
    let sets = await Set.find({ _id: user.setIds });
    if (sets.length > 0) {
      return res.status(200).json(sets);
    } else {
      return res.status(400).json({ message: "set not exist" });
    }
  });
  */
}

// http://localhost:3000/api/set/[userName]/[setId]
// delete method to delete a set by user name and set id

async function deleteMethod(res, userName, setId) {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  User.updateOne(
    { name: userName },
    { $pull: { setIds: mongoose.Types.ObjectId(setId) } }
  )
    .then(async (_) => {
      await Set.deleteOne({ _id: mongoose.Types.ObjectId(setId) });
      return res.status(201).json({ message: "set has been deleted" });
    })
    .catch((err) => {
      return res.status(400).json({ error: err });
    });
}
