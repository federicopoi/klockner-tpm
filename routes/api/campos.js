const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const fileUpload = require("express-fileupload");
router.use(fileUpload());
// Campo Model
const Campo = require("../../models/Campo");

// @route GET api/campo/
// @desc Get All campos
// @access Public
router.get("/", (req, res) => {
  Campo.find()
    .then((campos) => res.json(campos))
    .catch((err) => res.status(400).json("Error: " + err));
});

// @route POST api/campos/
// @desc Create A Campo
// @access Public
router.post("/", (req, res) => {
  const { name, value } = req.body;
  const nuevoCampo = new Campo({
    name,
    value,
  });
  nuevoCampo.save().then((Campo) => res.json(Campo));
});
// @route POST api/campos/
// @desc Create A Campo parte maquina
// @access Public
router.post("/parteMaquina", (req, res) => {
  const { _id, name } = req.body;

  Campo.findById({ _id }).exec((err, campo) => {
    if (err) console.log("Agregar Campo  ", err);

    const arr = campo.parteMaquina;

    const concatArr = arr.concat(name);
    campo.parteMaquina = concatArr;

    campo.save().then((campo) => res.json(campo));
  });
});

// @route DELETE api/campos/:id
// @desc Delete A Campo
// @access Public
router.delete("/:id", (req, res) => {
  Campo.findById(req.params.id)
    .then((campo) => campo.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

// @route POST api/campos/
// @desc Create A Campo parte maquina
// @access Public
router.post("/parteMaquinaDelete", (req, res) => {
  const { _id, name } = req.body;

  Campo.findById({ _id }).exec((err, campo) => {
    if (err) console.log("Agregar Campo  ", err);

    const arr = campo.parteMaquina;

    const index = arr.indexOf(name);
    if (index > -1) {
      arr.splice(index, 1);
    }
    campo.parteMaquina = arr;

    campo.save().then((campo) => res.json(campo));
  });
});
module.exports = router;
