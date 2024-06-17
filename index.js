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

app.post("/books/insertbook", (req, res) => {
  const title = req.body.title;
  const pagesqty = req.body.pagesqty;
  const sql = `INSERT INTO books (title, pageqty) VALUES ('${title}', '${pagesqty}')`;
  conn.query(sql, function (err) {
    if (err) {
      console.log("error", err);
      return;
    }
    res.redirect("/");
  });
});

app.get("/books", (req, res) => {
  const sql = "SELECT * FROM books";
  conn.query(sql, function (err, data) {
    if (err) {
      console.log("falha ao buscar books");
      return;
    }
    const books = data;
    console.log(books);
    res.render("books", { books });
  });
});

app.get("/books/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM books WHERE id = ${id}`;
  conn.query(sql, function (err, data) {
    if (err) {
      console.log("Erro ao buscar o livro por id");
    }
    const book = data[0];
    res.render("book", { book });
  });
});

app.get("/books/edit/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM books WHERE id = ${id}`;
  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    const book = data[0];
    res.render("editbook", { book });
  });
});

app.post("/books/updatebook", (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const pageqty = req.body.pageqty;

  const sql = `UPDATE books SET title = '${title}', pageqty = '${pageqty}' WHERE id = ${id}`;
  conn.query(sql, function (err) {
    if (err) {
      console.log(err);
      return;
    }
    res.redirect("/books");
  });
});

app.post("/books/remove/:id", (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM books WHERE id = ${id}`;
  conn.query(sql, function (err) {
    if (err) {
      console.log(err);
    }
    res.redirect("/books");
  });
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
