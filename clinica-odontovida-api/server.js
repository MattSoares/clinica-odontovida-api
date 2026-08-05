const dns = require("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const mongoose = require("mongoose");

require('dotenv').config();
const app = require('./src/app');
const conectarBanco = require('./src/config/database');

const PORT = process.env.PORT || 3000;

conectarBanco().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});