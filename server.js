// server.js
const express = require("express");
const session = require("express-session");
const path = require("path");
const { title } = require("process");

const app = express();
const PORT = 3000;

// --- Configuración ---
// 1. Decirle a Express que EJS es el motor de plantillas
app.set('view engine', 'ejs');
// 2. Decirle a Express dónde está la carpeta 'views'
app.set('views', path.join(__dirname, 'views'));

// --- Middleware ---
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); // Sirve CSS, JS, Imágenes
app.use(session({
  secret: "clave-ultra-secreta",
  resave: false,
  saveUninitialized: false
}));

// --- Lógica de Login (la tuya) ---
const USUARIO = "amor";
const PASSWORD = "1121"; 

// --- Rutas ---

// 1. Ruta GET para mostrar la página de login
// Renderiza views/index.ejs
app.get("/", (req, res) => {
  // {error: null} para que la plantilla no falle la primera vez
  res.render("index", { error: null }); 
});

// 2. Ruta POST para procesar el login
app.post("/login", (req, res) => {
  const { user, pass } = req.body;
  if (user === USUARIO && pass === PASSWORD) {
    req.session.auth = true;
    // ¡Corregido! Redirigimos a la *ruta* /home, no al archivo
    return res.redirect("/home"); 
  }
  // ¡Mejorado! Renderiza la página de login con un mensaje de error
  return res.render("index", { error: "Usuario o contraseña incorrecta" });
});

// 3. Middleware de protección
//    Se ejecutará para TODAS las rutas definidas DEBAJO de él.
app.use((req, res, next) => {
  if (req.session.auth) {
    return next(); // Si la sesión está activa, continúa
  } else {
    // Si no, redirige al login
    return res.redirect("/"); 
  }
});

// --- Rutas Protegidas (Solo se accede si req.session.auth es true) ---
 
// 4. Ruta para el Home
app.get("/home", (req, res) => {
  // Renderiza views/home.ejs
  res.render("home", { title: 'Inicio - Nuestro Amor'});
});

// 5. Ruta para la Galería
app.get("/galeria", (req, res) => {
  // Renderiza views/galeria.ejs
  res.render("galeria", { title: 'Galeria - Nuestro Amor'});
});

// 6. Ruta para la Bitacora
app.get("/bitacora", (req, res) => {
  // Renderiza views/bitacora.ejs
  res.render("bitacora", { title: 'Bitacora - Nuestro Amor'});
});


// 7. Ruta para el Logout (¡Importante!)
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    res.redirect("/"); // Redirige al login
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});