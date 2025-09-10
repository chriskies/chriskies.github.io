/* ========== Debug-Helfer ========== */
function dbg(msg) {
  console.log("[STORYBOOK]", msg);
  const hint = document.getElementById("hint");
  if (hint) {
    hint.textContent = "👉 " + msg;
    setTimeout(() => (hint.textContent = "Tipp: Wischen oder Pfeile tippen"), 2000);
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
}

/* ========== Start ========== */
document.addEventListener("DOMContentLoaded", () => {
  dbg("Seitenbuch geladen");

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

  // Wischgesten (Touch)
  let startX = 0;
  document.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });
  document.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;
    if (endX < startX - 50) {
      dbg("Wisch nach links erkannt");
      show(page + 1);
    }
    if (endX > startX + 50) {
      dbg("Wisch nach rechts erkannt");
      show(page - 1);
    }
  });

  // Erste Seite anzeigen
  show(0);
});