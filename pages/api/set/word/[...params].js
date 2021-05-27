import { MongoClient } from "mongodb";
export default async function handler(req, res) {
  let ret = null;
  if (req.query.params.length > 2) {
    return res
      .status(400)
      .json({ message: "Too many params for this api call" });
  }
  if (req.method === "GET") {
    let userName = req.query.params[0];
    let setName = req.query.params[1];
    ret = await getMethod(req, res, userName, setName);
  } else {
    ret = res.status(400).json({ message: "Wrong api call" });
  }
  return ret;
}

async function getMethod(req, res, userName, setName) {
  let client = await MongoClient.connect(url);
  let db = client.db();

  let user = await db.collection("users").find({ name: userName }).toArray();
  let setsId = user[0].setsId;
  let sets = await db
    .collection("sets")
    .find({ _id: { $in: setsId } })
    .toArray();
  client.close();
  let words = sets.filter((item) => item.setName === setName);
  if (words.length > 0) {
    return res.status(200).json(words[0].words);
  } else {
    return res.status(200).json([]);
  }
}

let url =
  "mongodb+srv://pyloo:Salamander.123@cluster0.t25mg.mongodb.net/WordApp?retryWrites=true&w=majority";
