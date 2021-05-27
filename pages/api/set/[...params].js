import { MongoClient } from "mongodb";
export default async function handler(req, res) {
  let ret = null;
  let params = req.query.params;
  if (params.length > 2) {
    return res
      .status(400)
      .json({ message: "Too many params for this api call" });
  }
  if (params.length === 1 && req.method === "GET") {
    let userName = params[0];
    ret = await getMethod(req, res, userName);
  } else if (params.length === 2 && req.method === "DELETE") {
    let userName = params[0];
    let setId = params[1];
    ret = await deleteMethod(req, res, userName, setId);
  } else {
    ret = res.status(400).json({ message: "Wrong api call" });
  }
  return ret;
}

async function getMethod(req, res, userName) {
  let client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  let db = client.db();

  let user = await db.collection("users").find({ name: userName }).toArray();
  let setsId = user[0].setsId;
  let sets = await db
    .collection("sets")
    .find({ _id: { $in: setsId } })
    .toArray();
  client.close();
  if (sets.length > 0) {
    return res.status(200).json(sets);
  } else {
    return res.status(400).json({ message: "set is not exist" });
  }
}

async function deleteMethod(req, res, userName, setId) {
  let client = await MongoClient.connect(url);
  let db = client.db();

  db.collection("users").updateOne(
    { name: userName },
    { $pull: { setsId: parseInt(setId) } }
  );
  db.collection("sets")
    .deleteOne({ _id: parseInt(setId) })
    .then((_) => client.close);
  return res.status(201).json({ message: "set has been deleted" });
}

let url =
  "mongodb+srv://pyloo:Salamander.123@cluster0.t25mg.mongodb.net/WordApp?retryWrites=true&w=majority";
