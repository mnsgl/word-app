import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  let ret = null
  if(req.method === "POST") {
    ret = await postMethod(req, res)
  } else {
    ret = res.status(400).json({message: "Wrong api call"})
  }
}

async export default function postMethod(req, res) {
  let client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  let db = client.db();
  let user = await db.collection("users").find({ name: userName }).toArray();
  let setsId = user[0].setsId;
  console.log(setsId);
  return res.status(400).json({message: "Wrong api call"})
}



let url =
  "mongodb+srv://pyloo:Salamander.123@cluster0.t25mg.mongodb.net/WordApp?retryWrites=true&w=majority";
