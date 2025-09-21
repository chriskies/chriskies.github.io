const pages = [
  { img: "assets/book/01.jpg", txt: "Noël sitzt am Tisch, müde, vor sich die Kokosnuss." },
  { img: "assets/book/02.jpg", txt: "Die Kokosnuss wippt hin und her. Noël staunt." },
  { img: "assets/book/03.jpg", txt: "Plopp – die Kokosnuss springt auf. Gipititi erscheint!" },
  { img: "assets/book/04.jpg", txt: "Gemeinsam zaubern sie Muffins voller Sternenstaub." },
  { img: "assets/book/05.jpg", txt: "Noël probiert einen Muffin. Er schmeckt nach Abenteuer." },
  { img: "assets/book/06.jpg", txt: "Sanft beginnt er zu schweben – Gedankenwölkchen ziehen." },
  { img: "assets/book/07.jpg", txt: "Gipititi wird zu einem Stern, der ihn beschützt." },
];

document.addEventListener("DOMContentLoaded", () => {
  const flipbook = document.getElementById("flipbook");

  // Alle Seiten erzeugen
  pages.forEach(p => {
    const page = document.createElement("div");
    page.classList.add("page");
    page.innerHTML = `<img src="${p.img}" alt=""><p>${p.txt}</p>`;
    flipbook.appendChild(page);
  });

  // Turn.js initialisieren
  $('#flipbook').turn({
    width: Math.min(window.innerWidth - 40, 800),
    height: Math.min(window.innerHeight - 80, 600),
    autoCenter: true,
    display: 'single',
    gradients: true,
    acceleration: true
  });

  // Debug: aktuelle Seite
  $('#flipbook').bind('turned', function(e, page) {
    console.log("[TURN] Seite", page);
  });
});