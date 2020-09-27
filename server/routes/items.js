const router = require("express").Router();
const bcrypt = require("bcrypt");
const Items = require("../models/items.model");

router.route("/").get((req, res) => {
  Items.find()
    .then((item) => res.json(item))
    .catch((err) => res.status(400).json("Error" + err));
});

router.route("/add").post(async (req, res) => {
  try {
    const id = Number(req.body.id);
    const title = req.body.title;
    const category = req.body.category;
    const description = req.body.description;
    const quantity = Number(req.body.quantity);
    const rating = Number(req.body.rating);
    const price = Number(req.body.price);
    const NewItem = new Items({
      id,
      title,
      category,
      description,
      quantity,
      rating,
      price,
    });

    console.log(NewItem);

    NewItem.save()
      .then(() => res.json("Added an item"))
      .catch((err) => res.status(400).json("Error" + err));
  } catch {
    res.status(500).send();
  }
});

// router.route("/delete").delete(async (req, res) => {
//   const itemToDelete = await Items.findOneAndDelete({ cart: req.body });
//   console.log(itemToDelete);
// });

// router.route("/:id").get((req, res) => {
//   User.findById(req.params.id)
//     .then((user) => res.json(user))
//     .catch((err) => res.status(400).json("Error" + err));
// });

// router.route("/:id").delete((req, res) => {
//   User.findByIdAndDelete(req.params.id)
//     .then(() => res.json("User deleted"))
//     .catch((err) => res.status(400).json("Error" + err));
// });

// router.route("/update/:id").post((req, res) => {
//   User.findById(req.params.id)
//     .then((user) => {
//       user.displayName = req.body.displayName;
//       user.email = req.body.email;
//       user.password = req.body.password;
//       user
//         .save()
//         .then(() => res.json("USer updated"))
//         .catch((err) => res.status(400).json("Error" + err));
//     })
//     .catch((err) => res.status(400).json("Error" + err));
// });

module.exports = router;
