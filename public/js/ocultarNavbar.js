// Ocultar navbar al hacer scroll hacia abajo

let lastScrollTop = 0;
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
    // Use window.pageYOffset for most browsers; fallback to document.documentElement.scrollTop for older browsers
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (navbar) {
        if (currentScroll > lastScrollTop) {
            navbar.classList.add("fade-out");
            navbar.classList.remove("fade-in");
        } else {
            navbar.classList.add("fade-in");
            navbar.classList.remove("fade-out");
        }
    // Reset negative scroll values to zero to avoid unexpected behavior
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}}, false);