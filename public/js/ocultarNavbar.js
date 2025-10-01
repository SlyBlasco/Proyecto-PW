// Ocultar navbar al hacer scroll hacia abajo

let lastScrollTop = 0;
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScroll > lastScrollTop) {
        navbar.classList.add("fade-out");
        navbar.classList.remove("fade-in");
    } else {
        navbar.classList.add("fade-in");
        navbar.classList.remove("fade-out");
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}, false);