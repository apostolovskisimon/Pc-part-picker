const router = require("express").Router();

const CPU = require("../models/cpus.model");

router.route("/").get((req, res) => {
  CPU.find()
    .then((cpus) => res.json(cpus))
    .catch((err) => res.status(400).json("Error" + err));
});

router.route("/add").post((req, res) => {
  const CPUname = req.body.CPUname;
  const description = req.body.description;
  const quantity = Number(req.body.quantity);
  const CPUid = Number(req.body.CPUid);
  const image = req.body.image;

  const NewCpu = new CPU({
    CPUname,
    description,
    quantity,
    CPUid,
    image,
  });

  NewCpu.save()
    .then(() => res.json("Added a CPU"))
    .catch((err) => res.status(400).json("Error" + err));
});

router.route("/:id").get((req, res) => {
  CPU.findById(req.params.id)
    .then((CPU) => res.json(CPU))
    .catch((err) => res.status(400).json("Error" + err));
});

router.route("/:id").delete((req, res) => {
  CPU.findByIdAndDelete(req.params.id)
    .then(() => res.json("CPU Deleted"))
    .catch((err) => res.status(400).json("Error" + err));
});

router.route("/update/:id").post((req, res) => {
  CPU.findById(req.params.id)
    .then((cp) => {
      CPUname = req.body.CPUname;
      description = req.body.description;
      quantity = Number(req.body.quantity);
      CPUid = Number(req.body.CPUid);
      image = req.body.image;

      cp.save()
        .then(() => res.json("CPU Updated!"))
        .catch((err) => res.status(400).json("Error" + err));
    })
    .catch((err) => res.status(400).json("Error" + err));
});

module.exports = router;
