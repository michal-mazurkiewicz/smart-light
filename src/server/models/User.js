const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  name: String,
  devices: Array,
});

mongoose.model("users", userSchema);
