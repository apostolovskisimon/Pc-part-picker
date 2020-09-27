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
  if (userToFind === null) {
    return res.status(400).send("Cant find user");
  }
  try {
    if (await bcrypt.compare(req.body.password, userToFind.password)) {
      res.send(userToFind);
      console.log("login");
    } else {
      res.send("No GO");
      console.log("fail");
    }
  } catch {
    res.status(500).send();
  }
});

router.route("/:email").get((req, res) => {
  User.findOne({ email: req.params.email })
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error" + err));
});

// router.route("/:id").delete((req, res) => {
//   User.findByIdAndDelete(req.params.id)
//     .then(() => res.json("User deleted"))
//     .catch((err) => res.status(400).json("Error" + err));
// });

// da se zacuva vo contextot
router.route("/addToCart/:email").post(async (req, res) => {
  await User.findOne({ email: req.params.email }).then((user) => {
    const item = user.cart.find((el) => el.id === req.body[0].id);
    if (item) {
      res.send("That item is already in your cart!");
      return;
    } else {
      user.cart.push(req.body[0]);
      user
        .save()
        .then(() => {
          res.json(user.cart);
        })
        .catch((err) => res.status(400).json("Error" + err));
    }
  });
});

router.route("/deleteItem/:email").post(async (req, res) => {
  await User.findOne({ email: req.params.email }).then((user) => {
    const itemToDelete = user.cart.find((el) => el.id === req.body.id);
    const newCart = user.cart.filter((el) => el.id !== itemToDelete.id);
    console.log(newCart);
    user.cart = newCart;
    user
      .save()
      .then(() => res.json(user.cart))
      .catch((err) => res.status(400).json("Error" + err));
  });
});

module.exports = router;
