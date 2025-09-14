// server.js
const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
  secret: "clave-ultra-secreta",
  resave: false,
  saveUninitialized: false
}));

// Login simulado
const USUARIO = "amor";
const PASSWORD = "1121"; // luego será encriptada

// Ruta principal (login)
app.post("/login", (req, res) => {
  const { user, pass } = req.body;
  if (user === USUARIO && pass === PASSWORD) {
    req.session.auth = true;
    return res.redirect("/home.html");
  }
  return res.redirect("/index.html");
});

// Middleware de protección
app.use((req, res, next) => {
  if (req.session.auth || req.path === "/index.html" || req.path === "/login") {
    return next();
  } else {
    return res.redirect("/index.html");
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});
