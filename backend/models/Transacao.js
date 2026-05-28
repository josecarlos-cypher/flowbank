const mongoose = require("mongoose");

const TransacaoSchema = new mongoose.Schema({

  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario"
  },

  nome: String,

  valor: Number,

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model(
  "Transacao",
  TransacaoSchema
);