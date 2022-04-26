const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const FilterSchema = new Schema(
  {
    nombre: {
      type: String,
    },
    color: {
      type: String,
    },
    descripcion: {
      type: String,
    },
    detecto: {
      type: String,
    },
    equipo: {
      type: String,
    },
    estado: {
      type: String,
    },
    familia: {
      type: String,
    },
    fecha: {
      type: String,
    },
    maquina: {
      type: String,
    },
    numero: {
      type: String,
    },
    prioridad: {
      type: String,
    },
    qrcode: {
      type: Boolean,
    },
    alerta: {
      type: Boolean,
    },

    selectedOption: {
      type: Array,
      value: {
        type: String,
      },
      label: {
        type: String,
      },
    },
  },
  {
    collection: "filter",
  }
);

module.exports = Filter = mongoose.model("filter", FilterSchema);
