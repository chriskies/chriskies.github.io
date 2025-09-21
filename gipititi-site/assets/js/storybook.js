/* ========== Debug-Helfer ========== */
function dbg(msg) {
  console.log("[STORYBOOK]", msg);
  const hint = document.getElementById("hint");
  if (hint) {
    hint.textContent = "👉 " + msg;
    clearTimeout(hint._t);
    hint._t = setTimeout(() => (hint.textContent = "Tipp: Wischen oder Pfeile tippen"), 2000);
  }
}

/* ========== Seiten-Daten ========== */
const pages = [
  { img: "assets/book/01.jpg", txt: "Noël sitzt am Tisch, müde, vor sich die Kokosnuss." },
  { img: "assets/book/02.jpg", txt: "Die Kokosnuss wippt hin und her. Noël staunt." },
  { img: "assets/book/03.jpg", txt: "Plopp – die Kokosnuss springt auf. Gipititi erscheint!" },
  { img: "assets/book/04.jpg", txt: "Gemeinsam zaubern sie Muffins voller Sternenstaub." },
  { img: "assets/book/05.jpg", txt: "Noël probiert einen Muffin. Er schmeckt nach Abenteuer." },
  { img: "assets/book/06.jpg", txt: "Sanft beginnt er zu schweben – Gedankenwölkchen ziehen." },
  { img: "assets/book/07.jpg", txt: "Gipititi wird zu einem Stern, der ihn beschützt." },
];

let page = 0;

/* ========== Anzeige aktualisieren ========== */
function show(n) {
  if (n < 0 || n >= pages.length) return;
  page = n;

  const p = pages[n];
  document.getElementById("pageimg").src = p.img;
  document.getElementById("caption").textContent = p.txt;

  dbg("Seite " + (n + 1) + " angezeigt");

  // Punkte markieren
  document.querySelectorAll(".dots span").forEach((d, i) => {
    d.classList.toggle("active", i === n);
  });

  // Reset Page-Turn Styles
  const pg = document.querySelector(".page");
  pg.style.setProperty("--turn", 0);
  pg.classList.remove("turn-left", "turn-right");
}

/* ========== Start ========== */
document.addEventListener("DOMContentLoaded", () => {
  dbg("Seitenbuch geladen");

  const pg = document.querySelector(".page");
  const img = document.getElementById("pageimg");

  // Navigation Buttons
  document.getElementById("next").addEventListener("click", () => {
    dbg("› Button gedrückt");
    show(page + 1);
  });
  document.getElementById("prev").addEventListener("click", () => {
    dbg("‹ Button gedrückt");
    show(page - 1);
  });

  // Seitenpunkte aufbauen
  const dots = document.getElementById("dots");
  pages.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.addEventListener("click", () => {
      dbg("Punkt " + (i + 1) + " geklickt");
      show(i);
    });
    dots.appendChild(dot);
  });

  // Wischgesten mit echtem Ziehen
  let startX = 0;
  let dragging = false;

  pg.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    dragging = true;
    pg.classList.add("grabbing");
  });

  pg.addEventListener("touchmove", (e) => {
    if (!dragging) return;
    const deltaX = e.touches[0].clientX - startX;
    const width = pg.offsetWidth;
    const turn = Math.min(1, Math.max(-1, deltaX / width)); // -1 bis 1

    // Setze CSS-Variable für Schattenbreite
    pg.style.setProperty("--turn", Math.abs(turn).toFixed(3));

    if (turn < 0) {
      pg.classList.add("turn-left");
      pg.classList.remove("turn-right");
      img.style.transform = `rotateY(${turn * 25}deg)`;
    } else if (turn > 0) {
      pg.classList.add("turn-right");
      pg.classList.remove("turn-left");
      img.style.transform = `rotateY(${turn * 25}deg)`;
    }
  });

  pg.addEventListener("touchend", (e) => {
    if (!dragging) return;
    dragging = false;
    pg.classList.remove("grabbing");

    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;

    // Schwellwert zum Umblättern
    if (diff < -60) {
      dbg("Umblättern nach links");
      show(page + 1);
    } else if (diff > 60) {
      dbg("Umblättern nach rechts");
      show(page - 1);
    } else {
      dbg("Zug zu klein – zurückspringen");
      img.style.transform = "";
      pg.style.setProperty("--turn", 0);
      pg.classList.remove("turn-left", "turn-right");
    }
  });

  // Erste Seite anzeigen
  show(0);
});