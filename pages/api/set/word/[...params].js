import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import Set from "../../models/set";
export default async function handler(req, res) {
  let ret = null;
  if (req.query.params.length > 1) {
    return res
      .status(400)
      .json({ message: "Too many params for this api call" });
  }
  if (req.method === "GET") {
    let setId = req.query.params[0];
    ret = await getMethod(res, setId);
  } else {
    ret = res.status(400).json({ message: "Wrong api call" });
  }
  return ret;
}

// http://localhost:3000/api/set/word/[setId]
// get method to get all words of a set

async function getMethod(res, setId) {
  await mongoose.connect(process.env.MONGODB_URI_OFFLINE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  setId = mongoose.Types.ObjectId(setId);
  Set.findOne({ _id: setId })
    .then((set) => {
      return res.status(200).json(set);
    })
    .catch((err) => {
      return res.status(400).json({ message: err });
    });
}
