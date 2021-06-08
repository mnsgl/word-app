const mongoose = require("mongoose");

const setSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  setName: { type: String, require: true },
  timeStamp: { type: Date },
  words: { type: Array, require: true },
});

mongoose.models = {};
const Set = mongoose.model("Set", setSchema);
export default Set;
