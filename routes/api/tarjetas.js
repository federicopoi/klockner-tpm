const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const fileUpload = require("express-fileupload");
router.use(fileUpload());
// Ticket Model
const Tarjeta = require("../../models/Tarjeta");

// @route GET api/tarjetas/
// @desc Get All Tarjetas
// @access Public
router.get("/", (req, res) => {
  Tarjeta.find()
    .sort({ color: -1 })
    .then((tarjetas) => res.json(tarjetas))
    .catch((err) => res.status(400).json("Error: " + err));
});

// @route POST api/tarjetas/
// @desc Create A Tarjeta
// @access Public
router.post("/", (req, res) => {
  const {
    numero,
    descripcion,
    sugerencia,
    reparacion,
    color,
    detecto,
    prioridad,
    familia,
    maquina,
    parteMaquina,
    equipo,
    tipodeRiesgo,
    riesgoInicial,
    url,
  } = req.body;

  // Simple validation
  if (
    !numero ||
    !descripcion ||
    !sugerencia ||
    !reparacion ||
    !color ||
    !detecto ||
    !prioridad ||
    !familia ||
    !maquina ||
    !parteMaquina ||
    !equipo ||
    !tipodeRiesgo ||
    !riesgoInicial
  ) {
    return res.status(400).json({ msg: "Introduce todos los campos" });
  }

  const nuevaTarjeta = new Tarjeta({
    numero,
    descripcion,
    sugerencia,
    reparacion,
    color,
    detecto,
    prioridad,
    familia,
    maquina,
    parteMaquina,
    equipo,
    tipodeRiesgo,
    riesgoInicial,
    photo: url,
  });

  nuevaTarjeta.save().then((tarjeta) => res.json(tarjeta));
});

// @route POST api/tarjetas/amarilla
// @desc Create A Tarjeta
// @access Public
router.post("/amarilla", (req, res) => {
  const {
    numero,
    descripcion,
    color,
    detecto,
    prioridad,
    maquina,
    parteMaquina,
    equipo,
    familia,
    sustoExperimentado,
    sustoObservado,
    impactoAmbiente,
    sugerencia,
    reparacion,
    tipodeRiesgo,
    riesgoInicial,
    url,
  } = req.body;

  // Simple validation
  if (
    !numero ||
    !descripcion ||
    !color ||
    !detecto ||
    !prioridad ||
    !familia ||
    !maquina ||
    !parteMaquina ||
    !equipo ||
    !sugerencia ||
    !reparacion ||
    !tipodeRiesgo ||
    !riesgoInicial
  ) {
    return res.status(400).json({ msg: "Introduce todos los campos" });
  }

  const nuevaTarjeta = new Tarjeta({
    numero,
    descripcion,
    color,
    detecto,
    prioridad,
    maquina,
    parteMaquina,
    familia,
    equipo,
    sustoExperimentado,
    sustoObservado,
    impactoAmbiente,
    sugerencia,
    reparacion,
    tipodeRiesgo,
    riesgoInicial,
    photo: url,
  });

  nuevaTarjeta.save().then((tarjeta) => res.json(tarjeta));
});

// @route POST api/tarjetas/cerrar
// @desc Cerrar Tarjeta
// @access Public
router.post("/cerrar", (req, res) => {
  const {
    _id,
    inicioReparacion,
    finReparacion,
    responsable,
    areaResponsable,
    tiempoEmpleado,
    causa,
    tareaRealizada,
    tipoAccion,
    riesgoFinal,
    materialUtilizado,
    convertida,
  } = req.body;

  // Simple validation
  if (
    !_id ||
    !inicioReparacion ||
    !finReparacion ||
    !responsable ||
    !tiempoEmpleado ||
    !tipoAccion ||
    !causa ||
    !riesgoFinal ||
    !tareaRealizada ||
    !materialUtilizado
  ) {
    return res.status(400).json({ msg: "Introduce todos los campos" });
  }

  Tarjeta.findOne({ _id }).exec((err, tarjeta) => {
    if (err) console.log("Cerrar Tarjeta  ", err);

    tarjeta.inicioReparacion = inicioReparacion;
    tarjeta.finReparacion = finReparacion;
    tarjeta.responsable = responsable;
    tarjeta.areaResponsable = areaResponsable;
    tarjeta.tiempoEmpleado = tiempoEmpleado;
    tarjeta.causa = causa;
    tarjeta.tareaRealizada = tareaRealizada;
    tarjeta.materialUtilizado = materialUtilizado;
    tarjeta.estado = "Cerrada";
    tarjeta.riesgoFinal = riesgoFinal;
    tarjeta.convertida = convertida;
    tarjeta.tipoAccion = tipoAccion;
    tarjeta.save();
    res.json(tarjeta);
  });
});

// @route POST api/tarjetas/cerrar/amarilla
// @desc Cerrar Tarjeta Amarilla
// @access Public
router.post("/cerrar/amarilla", (req, res) => {
  const {
    _id,
    finReparacion,
    responsable,
    tareaRealizada,
    tipoAccion,
    riesgoFinal,
    causa,
    verificacion,
    accionesComplementarias,
    convertida,
  } = req.body;

  // Simple validation
  if (
    !_id ||
    !riesgoFinal ||
    !finReparacion ||
    !responsable ||
    !tipoAccion ||
    !causa ||
    !accionesComplementarias ||
    !tareaRealizada
  ) {
    return res.status(400).json({ msg: "Introduce todos los campos" });
  }

  Tarjeta.findOne({ _id }).exec((err, tarjeta) => {
    if (err) console.log("Cerrar Tarjeta  ", err);

    tarjeta.finReparacion = finReparacion;
    tarjeta.responsable = responsable;
    tarjeta.riesgoFinal = riesgoFinal;
    tarjeta.verificacion = verificacion;
    tarjeta.causa = causa;
    tarjeta.tareaRealizada = tareaRealizada;
    tarjeta.accionesComplementarias = accionesComplementarias;
    tarjeta.estado = "Cerrada";
    tarjeta.convertida = convertida;
    tarjeta.tipoAccion = tipoAccion;
    tarjeta.save();
    res.json(tarjeta);
  });
});

// @route DELETE api/tarjetas/:id
// @desc Delete A Tarjeta
// @access Public
router.delete("/:id", (req, res) => {
  Tarjeta.findById(req.params.id)
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

// @route POST api/tarjetas/editar
// @desc Editar Tarjeta
// @access Public
router.post("/editar", (req, res) => {
  const {
    _id,
    descripcion,
    detecto,
    prioridad,
    reparacion,
    maquina,
    parteMaquina,
    familia,
    equipo,
    riesgoInicial,
    responsable,
    tiempoEmpleado,
    causa,
    tipoAccion,
    riesgoFinal,
    tareaRealizada,
    tipodeRiesgo,
    materialUtilizado,
  } = req.body;

  // Simple validation

  Tarjeta.findOne({ _id }).exec((err, tarjeta) => {
    if (err) console.log("Editar Tarjeta  ", err);

    tarjeta.descripcion = descripcion;
    tarjeta.detecto = detecto;
    tarjeta.responsable = responsable;
    tarjeta.tiempoEmpleado = tiempoEmpleado;
    tarjeta.causa = causa;
    tarjeta.parteMaquina = parteMaquina;
    tarjeta.tareaRealizada = tareaRealizada;
    tarjeta.materialUtilizado = materialUtilizado;
    tarjeta.riesgoFinal = riesgoFinal;
    tarjeta.prioridad = prioridad;
    tarjeta.maquina = maquina;
    tarjeta.tipodeRiesgo = tipodeRiesgo;
    tarjeta.familia = familia;
    tarjeta.tipoAccion = tipoAccion;
    tarjeta.equipo = equipo;
    tarjeta.riesgoInicial = riesgoInicial;
    tarjeta.reparacion = reparacion;

    tarjeta.save();
    res.json(tarjeta);
  });
});

// @route POST api/tarjetas/editar
// @desc Editar Tarjeta
// @access Public
router.post("/editarAmarilla", (req, res) => {
  const {
    _id,
    descripcion,
    detecto,
    prioridad,
    reparacion,
    maquina,
    parteMaquina,
    familia,
    equipo,
    sugerencia,
    tipodeRiesgo,
    riesgoInicial,
    responsable,
    tareaRealizada,
    riesgoFinal,
    tipoAccion,
    accionesComplementarias,
  } = req.body;

  // Simple validation

  Tarjeta.findOne({ _id }).exec((err, tarjeta) => {
    if (err) console.log("Editar Tarjeta  Amarilla", err);

    tarjeta.descripcion = descripcion;
    tarjeta.detecto = detecto;
    tarjeta.responsable = responsable;
    tarjeta.sugerencia = sugerencia;
    tarjeta.tareaRealizada = tareaRealizada;
    tarjeta.accionesComplementarias = accionesComplementarias;
    tarjeta.riesgoFinal = riesgoFinal;
    tarjeta.parteMaquina = parteMaquina;
    tarjeta.prioridad = prioridad;
    tarjeta.maquina = maquina;
    tarjeta.tipodeRiesgo = tipodeRiesgo;
    tarjeta.familia = familia;
    tarjeta.tipoAccion = tipoAccion;
    tarjeta.equipo = equipo;
    tarjeta.riesgoInicial = riesgoInicial;
    tarjeta.reparacion = reparacion;

    tarjeta.save();
    res.json(tarjeta);
  });
});

// @route POST api/tarjetas/planificacion
// @desc Agregar planificacion
// @access Public
router.post("/agregarplanificacion", (req, res) => {
  const {
    _id,
    previstaCierre,
    responsableSeguimiento,
    recursos,
    materiales,
    solicitudCompras,
    comprometidaCompras,
    tareaRealizar,
    responsableTarea,
    comentario1,
    comentario2,
    comentario3,
  } = req.body;

  Tarjeta.findOne({ _id }).exec((err, tarjeta) => {
    if (err) console.log("Actualizar Tarjeta  ", err);

    tarjeta.previstaCierre = previstaCierre;
    tarjeta.responsableSeguimiento = responsableSeguimiento;
    tarjeta.recursos = recursos;
    tarjeta.materiales = materiales;
    tarjeta.solicitudCompras = solicitudCompras;
    tarjeta.comprometidaCompras = comprometidaCompras;
    tarjeta.tareaRealizar = tareaRealizar;
    tarjeta.responsableTarea = responsableTarea;
    tarjeta.comentario1 = comentario1;
    tarjeta.comentario2 = comentario2;
    tarjeta.comentario3 = comentario3;
    tarjeta.planificacion = true;

    tarjeta.save();
    res.json(tarjeta);
  });
});

// @route POST api/tickets/agregarimagen
// @desc Agregar imagen
// @access Public
router.post("/agregarimagen", (req, res) => {
  const { _id, imagenUrl } = req.body;

  Tarjeta.findOne({ _id }).exec((err, tarjeta) => {
    if (err) console.log("Update Ticket  ", err);

    tarjeta.imagenUrl = imagenUrl;
    tarjeta.save();
    res.json(tarjeta);
  });
});

module.exports = router;
