import mongoose from "mongoose";
import User from "../models/user";
import Set from "../models/set";
import param from "../lib/param";

export default async function handler(req, res) {
  let query = {};
  req.query.params.map((el) => {
    let parse = el.split("=");
    query[parse[0]] = parse[1];
  });

  switch (req.method) {
    case "GET":
      if (param("/:userName", query)) {
        return await getMethod(res, query);
      }
      if (param("/:userName/:page", query)) {
        return await getMethodForAllSets(res, query.userName, query.page);
      }
    case "DELETE":
      if (param("/:userName/:setId", query)) {
        return await deleteMethod(res, query.userName, query.setId);
      }
    default:
      return res.status(400).json({ message: "Wrong api call" });
  }
}

// http://localhost:3000/api/set/[userName]
// get method to get set by user name

async function getMethod(res, { userName }) {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  User.findOne({ name: userName })
    .populate("setIds")
    .then((user) => {
      return res.status(200).json(user.setIds);
    });
}

// http://localhost:3000/api/set/[userName]/[page]
// get method to get all sets except of user

async function getMethodForAllSets(res, userName) {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  Set.find().then((sets) => {
    return res
      .status(200)
      .json(sets.filter((set) => set.isPublic && set.created !== userName));
  });
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
