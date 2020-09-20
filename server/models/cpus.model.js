const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CPUSchema = new Schema(
  {
    CPUname: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    CPUid: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CPU = mongoose.model("cpus", CPUSchema);
module.exports = CPU;
