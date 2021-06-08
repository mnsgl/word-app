const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, require: true },
  mail: { type: String, require: true },
  pass: { type: String, require: true },
  setIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Set" }],
  date: { type: Date },
});

mongoose.models = {};

const User = mongoose.model("User", userSchema);
export default User;

//module.exports = mongoose.models.Users || mongoose.model("User", userSchema);
