document.addEventListener("DOMContentLoaded", () => {
  const alertSound = new Audio("assets/sound/alert.mp3");
  let lastTitle = "";

  function checkQuakes() {
    fetchEarthquakeData().then(items => {
      if (items.length && items[0].title !== lastTitle) {
        lastTitle = items[0].title;
        addHistory(items[0]);
        alertSound.volume = document.getElementById("volume").value || 0.5;
        alertSound.play();
        animateQuake(items[0]);
      }
    });
  }

  document.getElementById("download-btn").onclick = downloadHistory;
  document.getElementById("settings-btn").onclick = () => {
    document.getElementById("settings-modal").classList.remove("hidden");
  };
  document.getElementById("close-settings").onclick = () => {
    document.getElementById("settings-modal").classList.add("hidden");
  };

  setInterval(checkQuakes, 60000);
  checkQuakes();
});

function animateQuake(item) {
  const map = document.getElementById("map");
  map.style.background = "#ffaaaa";
  setTimeout(() => map.style.background = "#eee", 1000);
}

function simulateQuake(item) {
  animateQuake(item);
}
