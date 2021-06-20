import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import Set from "../../models/set";
import User from "../../models/user";
import Word from "../../models/word";

export default async function handler(req, res) {
  let ret = null;
  if (req.method === "POST") {
    ret = await postMethod(req, res);
  } else if (req.method === "DELETE") {
    ret = await deleteMethod(req, res);
  } else if (req.method === "PATCH") {
    ret = await patchMethod(req, res);
  } else {
    ret = res.status(400).json({ message: "Wrong api call" });
  }

  return ret;
}

// http://localhost:3000/api/set/word/
// post method to create a word
//  body : {
//      newWord : {
//          _id,
//          word,
//          pro,
//          tran,
//          kind,
//          fav,
//          sent,
//          timeStamp,
//       }
//      set: {
//        setId,
//      }
//  }

async function postMethod(req, res) {
  if (!req?.body) {
    return res.status(400).json({ msg: "body is empty" });
  }
  let wordInfo = req.body.newWord;
  wordInfo._id = mongoose.Types.ObjectId(wordInfo._id);
  let setInfo = req.body.set;
  await mongoose.connect(process.env.MONGODB_URI_OFFLINE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  Set.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(setInfo.setId) },
    { $push: { words: wordInfo } }
  )
    .then((_) => {
      return res.status(201).json({ msg: "word was added" });
    })
    .catch((err) => {
      return res.status(400).json({ error: err });
    });
}

// http://localhost:3000/api/set/word/
// delete method to delete a word in a set
//  body: {
//      word: {
//        wordId,
//      },
//      set: {
//        setId,
//      },
//  }

async function deleteMethod(req, res) {
  if (!req?.body) {
    return res.status(400).json({ msg: "body is empty" });
  }

  let wordInfo = req.body.word;
  let setInfo = req.body.set;
  await mongoose.connect(process.env.MONGODB_URI_OFFLINE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  Set.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(setInfo.setId) },
    { $pull: { words: { _id: mongoose.Types.ObjectId(wordInfo.wordId) } } }
  )
    .then((_) => {
      return res.status(201).json({ msg: "word was deleted" });
    })
    .catch((err) => {
      return res.status(400).json({ error: err });
    });
}

// http://localhost:3000/api/set/word/
// patch method to update a word in a set
//  body: {
//      newWord: {
//          _id,
//          word,
//          pro,
//          tran,
//          kind,
//          fav,
//          sent,
//          timeStamp,
//      },
//  }

async function patchMethod(req, res) {
  if (!req?.body) {
    return res.status(400).json({ msg: "body is empty" });
  }
  let wordInfo = req.body.newWord;
  wordInfo._id = mongoose.Types.ObjectId(wordInfo._id);
  await mongoose.connect(process.env.MONGODB_URI_OFFLINE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  Set.updateOne(
    { "words._id": wordInfo._id },
    {
      "words.$": {
        ...wordInfo,
      },
    }
  )
    .then((_) => {
      return res.status(201).json({ msg: "word was patched" });
    })
    .catch((err) => {
      return res.status(400).json({ error: err });
    });
}
