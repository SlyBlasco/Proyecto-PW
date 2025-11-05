const dias = document.getElementById("dias");
const horas = document.getElementById("horas");
const minutos = document.getElementById("minutos");
const segundos = document.getElementById("segundos");


function actualizarContador() {
    
    const ahora = new Date();
    let anioActual = ahora.getFullYear();
    let fechaObjetivo = new Date(`${anioActual}-11-21T00:00:00`);

    if(ahora>fechaObjetivo){
        fechaObjetivo = new Date(`${anioActual + 1}-11-21T00:00:00`);
    }

    const diferencia = fechaObjetivo - ahora;
    let d = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    let h = Math.floor(diferencia / (1000 * 60 * 60) % 24);
    let m = Math.floor(diferencia / (1000 * 60) % 60);
    let s = Math.floor(diferencia / 1000  % 60);

    if(d<10){d = "0" + d}
    if(h<10){h = "0" + h}
    if(m<10){m = "0" + m}
    if(s<10){s = "0" + s}

    dias.innerText = d;
    horas.innerText = h;
    minutos.innerText = m;
    segundos.innerText = s;
}

actualizarContador();
setInterval(actualizarContador, 1000);

