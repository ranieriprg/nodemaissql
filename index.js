const express = require("express");
const { engine } = require("express-handlebars");

const mysql = require("mysql");

const app = express();
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.engine(
  "handlebars",
  engine({
    defaultLayout: "main",
    layoutsDir: __dirname + "/views/layouts",
  })
);
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/books/insertbook", (req, res, next) => {
  const title = req.body.title
  const pagesqty = req.body.pagesqty;
  console.log(`O titulo do livro é ${title} e ele possui ${pagesqty}`);
const sql = `INSERT INTO books (title, pageqty) VALUES ('${title}', '${pagesqty}')`;
conn.query(sql, function(err) {
  if(err){
    console.log('error', err);
  }
  res.redirect('/')
})
});

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodemysql",
});

conn.connect(function (err) {
  if (err) {
    console.log("erro ao conectar com o banco", err);
  }
  console.log("banco de dados conectado");
});

app.listen(3000, () => {
  console.log("servidor rodando na porta 3000");
});
