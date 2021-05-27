import { MongoClient } from "mongodb";
export default async function handler(req, res) {
  let ret = null;
  if (req.query.params.length > 1) {
    return res
      .status(400)
      .json({ message: "Too many params for this api call" });
  }
  if (req.method === "GET") {
    let userName = req.query.params[0];
    ret = await getMethod(req, res, userName);
  }
  return ret;
}

async function getMethod(req, res, userName) {
  let client = await MongoClient.connect(url);
  let db = client.db();

  let usersCollection = db.collection("users");
  let users = await usersCollection.find({ name: userName }).toArray();
  client.close();
  if (users.length > 0) {
    return res.status(200).json(users[0]);
  } else {
    return res.status(400).json({ message: "user is not exist" });
  }
}

let url =
  "mongodb+srv://pyloo:Salamander.123@cluster0.t25mg.mongodb.net/WordApp?retryWrites=true&w=majority";
