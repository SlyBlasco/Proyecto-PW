const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const track = document.getElementById('track');
const slides = Array.from(track.children);

const allAudios = document.querySelectorAll('audio');
const audioCassette1 = document.getElementById('audioCassette1');
const audioCassette2 = document.getElementById('audioCassette2');
const audioCassette3 = document.getElementById('audioCassette3');
const audioCassette4 = document.getElementById('audioCassette4');

const audioSrc1 = "audios/bitacora/9Junio.mp3";
const audioSrc2 = "audios/bitacora/4Octubre.mp3";
const audioSrc3 = "audios/bitacora/31Octubre.mp3";
const audioSrc4 = "audios/bitacora/4Noviembre.mp3";

let slideActual = 0;
const slideSize = slides.length;

prevBtn.addEventListener('click', () => {
    if (slideActual > 0) {
        slideActual--;
        actualizarCarrusel();
    }
});

nextBtn.addEventListener('click', () => {
    if (slideActual < slideSize - 1) {
        slideActual++;
        actualizarCarrusel();
    }
});

function actualizarCarrusel() {
    const desplazamiento = -(slideActual * 100);
    track.style.transform = `translateX(${desplazamiento}%)`;
    track.style.transition = 'transform 1s ease-in-out';
}

function pararAllAudio(){
	allAudios.forEach(function(audio){
		audio.pause();
	});
}

function reproduccionCassette(index, audioCassette, audioSrc) {
    if (audioCassette && slides.length > 0 && slides[index]) {
        slides[index].addEventListener('click', () => {
            if (audioCassette.getAttribute('src') !== audioSrc) {
                audioCassette.setAttribute('src', audioSrc);
                audioCassette.currentTime = 0;
            }

            if (audioCassette.paused) {
                pararAllAudio();
                audioCassette.play().catch((err) => {
                    console.error('Error reproduciendo audio:', err);
                });
            } else {
                audioCassette.pause();
            }
        });
    }
}

reproduccionCassette(0, audioCassette1, audioSrc1);
reproduccionCassette(1, audioCassette2, audioSrc2); 
reproduccionCassette(2, audioCassette3, audioSrc3);
reproduccionCassette(3, audioCassette4, audioSrc4);