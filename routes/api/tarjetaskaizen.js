const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const fileUpload = require("express-fileupload");
router.use(fileUpload());
// Ticket Model
const TarjetaKaizen = require("../../models/TarjetaKaizen");

// @route GET api/tarjetaslkaizen/
// @desc Get All Tarjetas Kaizen
// @access Public
router.get("/", (req, res) => {
  TarjetaKaizen.find()
    .sort({ color: -1 })
    .then((tarjetas) => res.json(tarjetas))
    .catch((err) => res.status(400).json("Error: " + err));
});

// @route POST api/tarjetaslkaizen/
// @desc Create A Tarjeta Kaizen
// @access Public
router.post("/", (req, res) => {
  const {
    numero,
    linea,
    maquina,
    codigo,
    preTarjeta,
    tema,
    perdidaAtacada,
    pilar,
    lider,
  } = req.body;

  // Simple validation
  if (
    !numero ||
    !linea ||
    !maquina ||
    !codigo ||
    !preTarjeta ||
    !tema ||
    !perdidaAtacada ||
    !pilar ||
    !lider
  ) {
    return res.status(400).json({ msg: "Introduce todos los campos" });
  }

  const nuevaTarjeta = new TarjetaKaizen({
    numero,
    linea,
    maquina,
    codigo,
    preTarjeta,
    tema,
    perdidaAtacada,
    pilar,
    lider,
  });

  nuevaTarjeta.save().then((tarjeta) => res.json(tarjeta));
});

// @route POST api/tarjetaskaizen/cerrar
// @desc Cerrar Kaizen
// @access Public
router.post("/cerrar", (req, res) => {
  const {
    _id,
    descripcionProblema,
    objetivo,
    causas,
    acciones,
    tarjetasHacer,
    implementacion,
    objectivoCompletado,
    documentos,
    otraMaquina,
    responsableSeguimiento,
    fechaFinalizacionMejora,
    costo,
    beneficio,
    verificacion,
  } = req.body;

  TarjetaKaizen.findOne({ _id }).exec((err, tarjeta) => {
    if (err) console.log("Cerrar Tarjeta  ", err);

    if (implementacion) {
      tarjeta.estado = "Abierta";
    } else {
      tarjeta.estado = "Cerrada";
    }

    tarjeta.descripcionProblema = descripcionProblema;
    tarjeta.objetivo = objetivo;
    tarjeta.causas = causas;
    tarjeta.acciones = acciones;
    tarjeta.implementacion = implementacion;
    tarjeta.tarjetasHacer = tarjetasHacer;
    tarjeta.objectivoCompletado = objectivoCompletado;
    tarjeta.documentos = documentos;
    tarjeta.otraMaquina = otraMaquina;
    tarjeta.responsableSeguimiento = responsableSeguimiento;
    tarjeta.fechaFinalizacionMejora = fechaFinalizacionMejora;
    tarjeta.costo = costo;
    tarjeta.beneficio = beneficio;
    tarjeta.verificacion = verificacion;

    tarjeta.save();
    res.json(tarjeta);
  });
});

// @route DELETE api/tarjetas/:id
// @desc Delete A Tarjeta
// @access Public
router.delete("/:id", (req, res) => {
  TarjetaKaizen.findById(req.params.id)
    .then((tarjeta) => tarjeta.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

// @route DELETE api/tarjetas/upload
// @desc Agregar imagen al server
// @access Public
router.post("/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "Sin imagen adjunta" });
  }

  const file = req.files.file;

  file.mv(
    `${__dirname}/../../client/public/uploads/${file.name}.png`,
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }

      res.json({ file, filePath: `/uploads/${file.name}` });
    }
  );
});

// @route POST api/tickets/agregarimagenback
// @desc Agregar imagen kaizen back
// @access Public
router.post("/agregarimagenback", (req, res) => {
  const { _id, imagenUrl } = req.body;

  TarjetaKaizen.findOne({ _id }).exec((err, tarjeta) => {
    if (err) console.log("Update Ticket  ", err);

    tarjeta.imagenBackUrl = imagenUrl;
    tarjeta.save();
    res.json(tarjeta);
  });
});

// @route POST api/tickets/agregarimagenfront
// @desc Agregar imagen front
// @access Public
router.post("/agregarimagenfront", (req, res) => {
  const { _id, imagenUrl } = req.body;

  TarjetaKaizen.findOne({ _id }).exec((err, tarjeta) => {
    if (err) console.log("Update Ticket  ", err);

    tarjeta.imagenFrontUrl = imagenUrl;
    tarjeta.save();
    res.json(tarjeta);
  });
});

// @route POST api/campos/
// @desc Create A Campo parte maquina
// @access Public
router.post("/tarjetasHacer", (req, res) => {
  const { _id, numero, color } = req.body;

  const tarjetasHacer = {
    color,
    numero,
  };

  TarjetaKaizen.findById({ _id }).exec((err, tarjetakaizen) => {
    if (err) console.log("Agrear tarjeta y numero error  ", err);

    const arr = tarjetakaizen.tarjetasHacer;

    const concatArr = arr.concat(tarjetasHacer);
    tarjetakaizen.tarjetasHacer = concatArr;

    tarjetakaizen.save().then((tarjetakaizen) => res.json(tarjetakaizen));
  });
});

// @route POST api/tarjetas/editar
// @desc Editar Tarjeta
// @access Public
router.post("/editarkaizen", (req, res) => {
  const {
    _id,
    linea,
    maquina,
    codigo,
    tema,
    perdidaAtacada,
    pilar,
    lider,
    descripcionProblema,
    objetivo,
    causas,
    acciones,
    objectivoCompletado,
    documentos,
    otraMaquina,
    responsableSeguimiento,
    fechaFinalizacionMejora,
    costo,
    beneficio,
    verificacion,
  } = req.body;

  // Simple validation

  TarjetaKaizen.findOne({ _id }).exec((err, tarjeta) => {
    if (err) console.log("Editar Tarjeta  ", err);

    tarjeta.linea = linea;
    tarjeta.maquina = maquina;
    tarjeta.codigo = codigo;
    tarjeta.tema = tema;
    tarjeta.perdidaAtacada = perdidaAtacada;
    tarjeta.pilar = pilar;
    tarjeta.lider = lider;
    tarjeta.descripcionProblema = descripcionProblema;
    tarjeta.objetivo = objetivo;
    tarjeta.causas = causas;
    tarjeta.acciones = acciones;
    tarjeta.objectivoCompletado = objectivoCompletado;
    tarjeta.documentos = documentos;
    tarjeta.otraMaquina = otraMaquina;
    tarjeta.responsableSeguimiento = responsableSeguimiento;
    tarjeta.fechaFinalizacionMejora = fechaFinalizacionMejora;
    tarjeta.costo = costo;
    tarjeta.beneficio = beneficio;
    tarjeta.verificacion = verificacion;

    tarjeta.save();
    res.json(tarjeta);
  });
});

module.exports = router;
