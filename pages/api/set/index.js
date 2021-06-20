import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import Set from "../models/set";
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

// http://localhost:3000/api/set/
// post method to create a empty set
//  body {
//      set : {
//        setName,
//        created,
//        isPublic,
//      }
//  }

async function patchMethod(req, res) {
  if (!req?.body) {
    return res.status(400).json({ msg: "body is empty" });
  }
  let setInfo = req.body.set;
  await mongoose.connect(process.env.MONGODB_URI_OFFLINE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
}

async function postMethod(req, res) {
  if (!req?.body) {
    return res.status(400).json({ msg: "body is empty" });
  }
  let setInfo = req.body.set;
  await mongoose.connect(process.env.MONGODB_URI_OFFLINE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  let set = {
    _id: new mongoose.Types.ObjectId(),
    timeStamp: Date.now(),
    words: [],
    ...setInfo,
  };
  new Set(set)
    .save()
    .then(async (_) => {
      await User.findOneAndUpdate(
        { name: setInfo.created },
        { $push: { setIds: set._id } }
      );
      return res.status(201).json(set);
    })
    .catch((err) => {
      return res.status(400).json({ error: err });
    });
}
