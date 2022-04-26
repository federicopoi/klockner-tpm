const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TarjetaKaizenSchema = new Schema(
  {
    numero: {
      type: String,
    },
    linea: {
      type: String,
    },
    maquina: {
      type: String,
    },
    estado: {
      type: String,
      default: "Abierta",
    },
    codigo: {
      type: String,
    },
    preTarjeta: {
      type: Array,
      color: {
        type: String,
      },
      numero: {
        type: String,
      },
    },
    tema: {
      type: String,
    },
    perdidaAtacada: {
      type: String,
    },
    pilar: {
      type: String,
    },
    lider: {
      type: String,
    },
    fecha: {
      type: Date,
      default: Date.now,
    },
    // Kaizen Cerrada

    // Planificar
    descripcionProblema: {
      type: String,
    },
    objetivo: {
      type: String,
    },
    causas: {
      type: String,
    },
    acciones: {
      type: String,
    },

    // Hacer
    tarjetasHacer: {
      type: Array,
      color: {
        type: String,
      },
      numero: {
        type: String,
      },
    },
    // Chequear
    objectivoCompletado: {
      type: String,
    },

    // Estandarizar
    documentos: {
      type: String,
    },
    otraMaquina: {
      type: String,
    },

    // Afuera
    responsableSeguimiento: {
      type: String,
    },
    fechaFinalizacionMejora: {
      type: Date,
    },
    costo: {
      type: String,
    },
    beneficio: {
      type: String,
    },
    verificacion: {
      type: String,
    },
    imagenFrontUrl: {
      type: String,
    },
    imagenBackUrl: {
      type: String,
    },
    implementacion: {
      type: Boolean,
    },
  },

  {
    collection: "tarjetaskaizen",
  }
);

module.exports = TarjetaKaizen = mongoose.model(
  "tarjetaskaizen",
  TarjetaKaizenSchema
);
