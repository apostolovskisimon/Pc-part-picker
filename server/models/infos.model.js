const mongoose = require("mongoose");

const Shema = mongoose.Schema;

const Infos = new Shema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
});
const Info = mongoose.model("infos", Infos);
module.exports = Info;
