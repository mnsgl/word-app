import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  let ret = null;
  if (req.method === "DELETE") {
    ret = await deleteMethod(req, res);
  } else {
    ret = res.status(400).json({ message: "Wrong api call" });
  }

  return ret;
}

async function deleteMethod(req, res) {
  if (!req?.body) {
    return res.status(400).json({ msg: "body is empty" });
  }
  let client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  let db = client.db();

  let aggregate = await db
    .collection("users")
    .aggregate([
      {
        $lookup: {
          from: "sets",
          localField: "setsId",
          foreignField: "_id",
          as: "ids",
        },
      },
    ])
    .toArray();
  let setId = null;
  aggregate.map((user) => {
    if (user.name === req.body.userName) {
      user.ids.map((set) => {
        if (set.setName === req.body.setName) {
          setId = set._id;
        }
      });
    }
  });

  db.collection("sets")
    .updateOne(
      { _id: setId },
      {
        $pull: { words: { _id: parseInt(req.body.wordId) } },
      }
    )
    .then((_) => client.close());

  return res.status(201).json({ msg: "word was successfuly removed" });
}
let url =
  "mongodb+srv://pyloo:Salamander.123@cluster0.t25mg.mongodb.net/WordApp?retryWrites=true&w=majority";
