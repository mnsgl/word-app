const mongoose = require("mongoose");

const wordSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  word: { type: String, require: true },
  pro: { type: String },
  tran: { type: String, require: true },
  kind: { type: String },
  fav: { type: Number },
  sent: { type: String, require: true },
  timeStamp: { type: Date },
});

mongoose.models = {};

const Word = mongoose.model("Word", wordSchema);
export default Word;
