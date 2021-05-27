import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  let ret = null;
  if (req.method === "POST") {
    ret = await postMethod(req, res);
  } else {
    ret = res.status(400).json({ message: "Wrong api call" });
  }

  return ret;
}

async function postMethod(req, res) {
  if (!req?.body) {
    return res.status(400).json({ msg: "body is empty" });
  }
  let client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  let db = client.db();
  let setsCollection = db.collection("sets");
  let sets = await setsCollection.find({ setName: req.body.setName }).toArray();
  let id = null;
  if (sets[0].words.length > 1) {
    id = sets[0].words.sort((a, b) => a - b)[sets[0].words.length - 1]._id + 1;
  } else {
    id = 1;
  }
  let word = {
    _id: id,
    word: req.body.word,
    pro: req.body.pro,
    tran: req.body.tran,
    date: new Date().toLocaleString(),
  };
  setsCollection
    .updateOne({ setName: req.body.setName }, { $push: { words: word } })
    .then((_) => client.close());
  return res.status(201).json({ msg: "word added" });
}
let url =
  "mongodb+srv://pyloo:Salamander.123@cluster0.t25mg.mongodb.net/WordApp?retryWrites=true&w=majority";
