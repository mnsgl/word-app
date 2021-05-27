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
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  let db = client.db();

  let setsCollection = db.collection("sets");
  let usersCollection = db.collection("users");
  let sets = await setsCollection.find().sort({ _id: -1 }).toArray();
  let id = null;
  if (sets.length > 0) {
    id = sets[0]._id + 1;
  } else {
    id = 1;
  }
  let set = {
    _id: id,
    setName: req.body.setName,
    date: new Date().toLocaleString(),
    words: [],
  };
  setsCollection.insertOne(set).then((_) => {
    usersCollection
      .updateOne({ name: req.body.userName }, { $push: { setsId: id } })
      .then((_) => client.close());
  });
  return res.status(201).json({ msg: "set created", id });
}
let url =
  "mongodb+srv://pyloo:Salamander.123@cluster0.t25mg.mongodb.net/WordApp?retryWrites=true&w=majority";
