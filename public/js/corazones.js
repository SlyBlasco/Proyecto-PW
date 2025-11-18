tsParticles.load("particles", {
  fullScreen: { enable: false },
  particles: {
    number: { value: 40 },
    shape: {
      type: "image",
      image: {
        src: "https://cdn-icons-png.flaticon.com/512/833/833472.png",
        width: 32,
        height: 32
      }
    },
    opacity: {
      value: 0.7
    },
    size: {
      value: { min: 6, max: 14 }
    },
    move: {
      enable: true,
      speed: 1,
      direction: "bottom",
      outModes: { default: "out" }
    }
  },
  background: {
    color: "#030303ff"
  }
});
