const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const CamposSchema = new Schema(
  {
    name: {
      type: String,
    },
    value: {
      type: String,
    },
    parteMaquina: {
      type: Array,
      name: {
        type: String,
      },
    },
  },
  {
    collection: "campos",
  }
);

module.exports = Campos = mongoose.model("Campos", CamposSchema);
