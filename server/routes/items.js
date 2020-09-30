const router = require("express").Router();
const Items = require("../models/items.model");

router.route("/").get((req, res) => {
  // try pagination
  // console.log(req.query.limit);
  // if (req.query.page && req.query.limit) {
  //   const page = parseInt(req.query.page);
  //   const limit = parseInt(req.query.limit);

  //   const startIndex = (page - 1) * limit;
  //   const endIndex = page * limit;

  //   const results = {};

  //   if (endIndex < Items.length) {
  //     results.next = {
  //       page: page + 1,
  //       limit: limit,
  //     };

  //     if (startIndex > 0) {
  //       results.previous = {
  //         page: page - 1,
  //         limit: limit,
  //       };
  //     }
  //     console.log(Items.slice(startIndex, endIndex));
  //     // results.results = Items.slice(startIndex, endIndex);
  //   }
  // } else {
  //   Items.find()
  //     .then((item) => res.json(item.slice(0, 6)))
  //     .catch((err) => res.status(400).json("Error" + err));
  // }
  Items.find()
    .then((item) => res.json(item))
    .catch((err) => res.status(400).json("Error" + err));
});

router.route("/add").post(async (req, res) => {
  try {
    const title = req.body.title;
    const image = req.body.image;
    const category = req.body.category;
    const shortDesc = req.body.shortDesc;
    const quantity = Number(req.body.quantity);
    const rating = Number(req.body.rating);
    const price = Number(req.body.price);
    const longDesc = req.body.longDesc;
    const NewItem = new Items({
      title,
      image,
      category,
      shortDesc,
      quantity,
      rating,
      price,
      longDesc,
    });

    console.log(NewItem);

    NewItem.save()
      .then(() => res.json(NewItem))
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
