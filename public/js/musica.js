const canciones = [
  "audios/music/LaGloriaEresTu.mp3",
  "audios/music/Bleed.mp3",
  "audios/music/NightsLikeThis.mp3",
  "audios/music/IllShowYou.mp3",
  "audios/music/NadieMas.mp3",
  "audios/music/ISmokedAwayMyBrain.mp3",
  "audios/music/WeFellInLoveInOctober.mp3",
  "audios/music/DimeSiTeAcuerdas.mp3",
  "audios/music/TuChat.mp3",
];

const audio = document.getElementById("musica");
const btn = document.getElementById("btnMusica");

let listaActual = [...canciones];
let reproduciendo = true;

function mezclar(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function siguienteCancion() {
  if (listaActual.length === 0) {
    listaActual = [...canciones];
    mezclar(listaActual);
  }

  const siguiente = listaActual.shift();
  audio.src = siguiente;
  audio.play();
}

audio.addEventListener("ended", () => {
  siguienteCancion();
});

// Iniciar
mezclar(listaActual);
btn.classList.add("playing");
siguienteCancion();


// Pausa/reanudar
btn.addEventListener("click", () => {
  if (reproduciendo) {
    audio.pause();
    btn.classList.remove("playing");
  } else {
    audio.play();
    btn.classList.add("playing");
  }
  reproduciendo = !reproduciendo;
});
