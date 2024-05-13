const express = require("express");
const path = require("path");
const app = express();
const exphbs = require("express-handlebars");
app.listen(3002, () => {
    console.log("el servidor esta iniciado en el puerto 3002, ruta -> http://localhost:3002");    
});

app.engine(
  ".hbs",
  exphbs.engine({
    extname: ".hbs",
    helpers: {
      formatearNumber: function (numberString) {
        return (+numberString).toLocaleString();
      },
      primeraMayuscula: function (texto) {
        return texto.charAt(0).toUpperCase() + texto.slice(1);
      },
      boldHeroTitle: function (options) {
        return '<h1 class="fw-bold">' + options.fn(this) + "</h1>";
      },
    },
  })
);
app.set("view engine", ".hbs");
app.set("public", "/public");
app.use("/bootstrap_css", express.static("./node_modules/bootstrap/dist/css"));
app.use("/bootstrap_js", express.static("./node_modules/bootstrap/dist/js"));
app.use("/jquery", express.static("./node_modules/jquery/dist"));
app.use("/public", express.static("./public"));
const datos = [
  { articulo: "Banana", precio: "800", medida: "1", unidad: "kg" },
  { articulo: "cebollas", precio: "500", medida: "1", unidad: "kg" },
  { articulo: "lechuga", precio: "200", medida: "1", unidad: "unidad" },
  { articulo: "papas", precio: "1200", medida: "1", unidad: "kg" },
  { articulo: "pimenton", precio: "300", medida: "1", unidad: "unidad" },
  { articulo: "tomate", precio: "720", medida: "1", unidad: "kg" },
];

app.get("/", (req, res) => {
  res.render("inicio", { datos });
});
