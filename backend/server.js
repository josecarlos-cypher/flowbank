require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

/*
  CONEXÃO MONGO
*/

mongoose.connect(process.env.MONGO_URI)

.then(() => {

  console.log("MongoDB conectado");

})

.catch((err) => {

  console.log(err);

});

/*
  ROTAS
*/

app.use(
  "/auth",
  require("./routes/auth")
);

app.use(
  "/transacoes",
  require("./routes/transacoes")
);

app.listen(

  process.env.PORT,

  () => {

    console.log(
      "Servidor rodando"
    );

  }

);