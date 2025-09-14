document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", (e) => {
    const aura = document.createElement("div");
    aura.className = "aura";
    aura.style.left = `${e.clientX - 15}px`;
    aura.style.top = `${e.clientY - 15}px`;
    document.body.appendChild(aura);
    setTimeout(() => aura.remove(), 600);
  });
});
