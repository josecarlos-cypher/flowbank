const express = require("express");

const router = express.Router();

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const Usuario = require("../models/Usuario");

/*
  CADASTRO
*/

router.post("/cadastro", async (req, res) => {

  try {

    const {
      nome,
      email,
      senha
    } = req.body;

    /*
      VERIFICAR
    */

    const existe = await Usuario.findOne({
      email
    });

    if(existe) {

      return res.status(400).json({
        msg: "Usuário já existe"
      });

    }

    /*
      CRIPTOGRAFAR
    */

    const senhaHash =
      await bcrypt.hash(senha, 10);

    /*
      CRIAR
    */

    const novoUsuario =
      new Usuario({

        nome,

        email,

        senha: senhaHash

      });

    await novoUsuario.save();

    res.json({
      msg: "Usuário criado"
    });

  }

  catch(err) {

    res.status(500).json(err);

  }

});

/*
  LOGIN
*/

router.post("/login", async (req, res) => {

  try {

    const {
      email,
      senha
    } = req.body;

    /*
      BUSCAR
    */

    const usuario =
      await Usuario.findOne({
        email
      });

    if(!usuario) {

      return res.status(400).json({
        msg: "Usuário não encontrado"
      });

    }

    /*
      SENHA
    */

    const senhaOk =
      await bcrypt.compare(
        senha,
        usuario.senha
      );

    if(!senhaOk) {

      return res.status(400).json({
        msg: "Senha inválida"
      });

    }

    /*
      TOKEN
    */

    const token = jwt.sign(

      {
        id: usuario._id
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d"
      }

    );

    res.json({

      token,

      usuario: {

        id: usuario._id,

        nome: usuario.nome,

        email: usuario.email

      }

    });

  }

  catch(err) {

    res.status(500).json(err);

  }

});

module.exports = router;