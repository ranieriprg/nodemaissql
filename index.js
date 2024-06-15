const express = require("express");
const { engine } = require("express-handlebars");

const mysql = require("mysql");

const app = express();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("hello teste");
});

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodemysql",
});

conn.connect(function (err) {
  if (err) {
    console.log('erro ao conectar com o banco',err);
  }
  console.log("banco de dados conectado");
});

app.listen(3000, () => {
  console.log("servidor rodando na porta 3000");
});
