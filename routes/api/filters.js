const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const fileUpload = require("express-fileupload");
router.use(fileUpload());
// Filter Model
const Filter = require("../../models/Filter");

// @route GET api/filter/
// @desc Get All Filters
// @access Public
router.get("/", (req, res) => {
  Filter.find()
    .then((filters) => res.json(filters))
    .catch((err) => res.status(400).json("Error: " + err));
});

// @route POST api/filters/
// @desc Create A Filter
// @access Public
router.post("/", (req, res) => {
  const {
    nombre,
    selectedOption,
    numero,
    color,
    equipo,
    prioridad,
    fecha,
    descripcion,
    estado,
    maquina,
    detecto,
    familia,
    qrcode,
    alerta,
  } = req.body;

  const nuevoFilter = new Filter({
    nombre,
    selectedOption,
    numero,
    color,
    equipo,
    prioridad,
    fecha,
    descripcion,
    estado,
    maquina,
    detecto,
    familia,
    qrcode,
    alerta,
  });

  nuevoFilter.save().then((filter) => res.json(filter));
});
module.exports = router;
