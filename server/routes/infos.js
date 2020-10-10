const router = require("express").Router();

const Info = require("../models/infos.model");

router.route("/push").post((req, res) => {
  console.log(req.body);
  try {
    const email = req.body.email;
    const text = req.body.text;
    const NewPushInfo = new Info({
      email,
      text,
    });
    NewPushInfo.save()
      .then(() => res.sendStatus(200))
      .catch((err) => res.status(400).json("Error" + err));
  } catch {
    res.status(500).send("Failed");
  }
});

module.exports = router;
