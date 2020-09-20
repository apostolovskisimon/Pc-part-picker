const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/users.model");

router.route("/").get((req, res) => {
  User.find()
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error" + err));
});

router.route("/add").post(async (req, res) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    // const hashEmail = await bcrypt.hash(req.body.email, 10);

    // const email = hashEmail;
    const email = req.body.email;

    const password = hashPassword;
    const displayName = req.body.displayName;
    const NewUser = new User({
      displayName,
      email,
      password,
    });

    console.log(NewUser);

    NewUser.save()
      .then(() => res.json("Added a user"))
      .catch((err) => res.status(400).json("Error" + err));
  } catch {
    res.status(500).send();
  }
});

router.route("/login").post(async (req, res) => {
  const userToFind = await User.findOne({ email: req.body.email });
  console.log(userToFind.password);
  if (userToFind === null) {
    return res.status(400).send("Cant find user");
  }
  try {
    if (await bcrypt.compare(req.body.password, userToFind.password)) {
      res.send("YAY UR IN");
      console.log("login");
    } else {
      res.send("No GO");
      console.log("fail");
    }
  } catch {
    res.status(500).send();
  }
});

router.route("/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error" + err));
});

router.route("/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("User deleted"))
    .catch((err) => res.status(400).json("Error" + err));
});

router.route("/update/:id").post((req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      user.displayName = req.body.displayName;
      user.email = req.body.email;
      user.password = req.body.password;
      user
        .save()
        .then(() => res.json("USer updated"))
        .catch((err) => res.status(400).json("Error" + err));
    })
    .catch((err) => res.status(400).json("Error" + err));
});

module.exports = router;
