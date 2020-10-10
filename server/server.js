const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MONGO DB connection established yay");
});

const cpusRouter = require("./routes/cpus");
const userRouter = require("./routes/users");
const itemsRouter = require("./routes/items");
const InfosRouter = require("./routes/infos");

app.use("/cpus", cpusRouter);
app.use("/users", userRouter);
app.use("/items", itemsRouter);
app.use("/infos", InfosRouter);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
