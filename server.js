// server.js
const express = require("express");
const session = require("express-session");
const path = require("path");
const { title } = require("process");
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 3000;

// --- Configuración ---
// 1. Decirle a Express que EJS es el motor de plantillas
app.set('view engine', 'ejs');
// 2. Decirle a Express dónde está la carpeta 'views'
app.set('views', path.join(__dirname, 'views'));

// --- Middleware ---
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

const USUARIO = process.env.APP_USER;
const PASSWORD = process.env.APP_PASSWORD; 

// --- Rutas ---

// 1. Ruta GET para mostrar la página de login
app.get("/", (req, res) => {
  // {error: null} para que la plantilla no falle la primera vez
  res.render("index", { error: null, title: "Siempre Nosotros" }); 
});

// 2. Ruta POST para procesar el login
app.post("/login", (req, res) => {
  const { user, pass } = req.body;
  if (user === USUARIO && pass === PASSWORD) {
    req.session.auth = true;
    return res.redirect("/home"); 
  }
  return res.render("index", { error: "Usuario o contraseña incorrecta", title: "Siempre Nosotros" });
});

// 3. Middleware de protección
app.use((req, res, next) => {
  if (req.session.auth) {
    return next(); // Si la sesión está activa, continúa
  } else {
    return res.redirect("/"); 
  }
});

// --- Rutas Protegidas ---
 
// 4. Ruta para el Home
app.get("/home", (req, res) => {
  res.render("home", { title: 'Inicio - Siempre Nosotros'});
});

// 5. Ruta para la Galería
app.get("/galeria", (req, res) => {
  res.render("galeria", { title: 'Galeria - Siempre Nosotros'});
});

// 6. Ruta para la Bitacora
app.get("/bitacora", (req, res) => {
  res.render("bitacora", { title: 'Bitacora - Siempre Nosotros'});
});

// 7. Ruta para los Juegos
app.get("/juegos", (req, res) => {
  res.render("juegos", { title: 'Juegos - Siempre Nosotros'});
});

// 8. Ruta para el Logout
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    res.redirect("/");
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});