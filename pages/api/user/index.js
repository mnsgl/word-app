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
  let client = await MongoClient.connect(url);
  let db = client.db();

  let usersCollection = db.collection("users");
  let isExist = await usersCollection.find({ name: req.body.name }).toArray();
  if (isExist.length > 0) {
    return res.status(203).json({ message: "user already exist" });
  }
  let users = await usersCollection.find().sort({ _id: -1 }).toArray();
  let id = null;
  if (users.length > 0) {
    id = users[0]._id + 1;
  } else {
    id = 1;
  }
  let user = {
    _id: id,
    name: req.body.name,
    pass: req.body.pass,
    date: new Date().toLocaleString(),
    setsId: [],
  };
  usersCollection.insertOne(user).then((_) => client.close());
  return res.status(201).json({ msg: "user created" });
}
let url =
  "mongodb+srv://pyloo:Salamander.123@cluster0.t25mg.mongodb.net/WordApp?retryWrites=true&w=majority";
