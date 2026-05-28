const express = require("express");

const router = express.Router();

const Transacao = require("../models/Transacao");

/*
  LISTAR
*/

router.get("/", async (req, res) => {

  try {

    const transacoes =
      await Transacao.find()

      .sort({ createdAt: -1 });

    res.json(transacoes);

  }

  catch(err) {

    res.status(500).json(err);

  }

});

/*
  CRIAR
*/

router.post("/", async (req, res) => {

  try {

    const nova =
      new Transacao(req.body);

    await nova.save();

    res.json(nova);

  }

  catch(err) {

    res.status(500).json(err);

  }

});

/*
  DELETAR
*/

router.delete("/:id", async (req, res) => {

  try {

    await Transacao.findByIdAndDelete(
      req.params.id
    );

    res.json({
      msg: "Removida"
    });

  }

  catch(err) {

    res.status(500).json(err);

  }

});

module.exports = router;