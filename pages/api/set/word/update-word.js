import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  let ret = null;
  if (req.method === "PATCH") {
    ret = await patchMethod(req, res);
  } else {
    ret = res.status(400).json({ message: "Wrong api call" });
  }

  return ret;
}

async function patchMethod(req, res) {
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
          as: "test",
        },
      },
    ])
    .toArray();
  let setId = null;
  aggregate.map((user) => {
    if (user.name === req.body.userName) {
      user.test.map((set) => {
        if (set.setName === req.body.setName) {
          setId = set._id;
        }
      });
    }
  });

  console.log(req.body);
  db.collection("sets").update(
    { _id: setId, "words._id": req.body._id },
    {
      $set: {
        "words.$": {
          word: req.body.word,
          pro: req.body.pro,
          tran: req.body.tran,
          _id: req.body._id,
          date: new Date().toLocaleString(),
        },
      },
    }
  );
  return res.status(201).json({ msg: "word added" });
}
let url =
  "mongodb+srv://pyloo:Salamander.123@cluster0.t25mg.mongodb.net/WordApp?retryWrites=true&w=majority";
