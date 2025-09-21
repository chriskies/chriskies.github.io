document.addEventListener("DOMContentLoaded", () => {
  const $flipbook = $("#flipbook");

  // Turn.js initialisieren
  $flipbook.turn({
    width: Math.min(window.innerWidth - 40, 800),
    height: Math.min(window.innerHeight - 80, 600),
    autoCenter: true,
    elevation: 50,        // Schattenhöhe
    gradients: true,      // schöne Schattierungen beim Umblättern
    acceleration: true,   // Hardwarebeschleunigung
    display: 'single'     // Einzelne Seiten
  });

  // Debug: aktuelle Seite
  $flipbook.bind('turned', function(e, page, view) {
    console.log("[TURN]", "Seite", page);
  });

  // Touch/Swipe werden automatisch von Turn.js unterstützt
});