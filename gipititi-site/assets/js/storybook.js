function dbg(msg){
  console.log("[STORYBOOK]", msg);
  const hint = document.getElementById("hint");

  if(hint){
    clearTimeout(hint._t);
    hint.textContent = "👉 " + msg;
    hint._t = setTimeout(() => {
      hint.textContent = "Tipp: Tippe oder wische zum Umblättern";
    }, 2000);
  }
}

const pages = [
  {img:"assets/book/01.jpg", txt:"Noël sitzt am Tisch, müde, vor sich die Kokosnuss."},
  {img:"assets/book/02.jpg", txt:"Die Kokosnuss wippt hin und her. Noël staunt."},
  {img:"assets/book/03.jpg", txt:"Plopp – die Kokosnuss springt auf. Gipititi erscheint!"},
  {img:"assets/book/04.jpg", txt:"Gemeinsam zaubern sie Muffins voller Sternenstaub."},
  {img:"assets/book/05.jpg", txt:"Noël probiert einen Muffin. Er schmeckt nach Abenteuer."},
  {img:"assets/book/06.jpg", txt:"Sanft beginnt er zu schweben – Gedankenwölkchen ziehen."},
  {img:"assets/book/07.jpg", txt:"Gipititi wird zu einem Stern, der ihn beschützt."},
];

document.addEventListener("DOMContentLoaded", () => {
  const flipbook = document.getElementById("flipbook");
  const dots = document.getElementById("dots");

  if(!flipbook){
    dbg("Fehler: #flipbook nicht gefunden");
    return;
  }

  if(typeof jQuery === "undefined"){
    dbg("Fehler: jQuery wurde nicht geladen");
    return;
  }

  if(typeof jQuery.fn.turn !== "function"){
    dbg("Fehler: Turn.js wurde nicht geladen");
    return;
  }

  pages.forEach((p, i) => {
    const page = document.createElement("div");
    page.className = "page";
    page.innerHTML = `
      <div class="book-page-inner">
        <img src="${p.img}" alt="">
        <p>${p.txt}</p>
      </div>
    `;
    flipbook.appendChild(page);

    if(dots){
      const dot = document.createElement("span");
      dot.addEventListener("click", () => $("#flipbook").turn("page", i + 1));
      dots.appendChild(dot);
    }
  });

  const width = Math.min(window.innerWidth - 32, 760);
  const height = Math.min(window.innerHeight - 120, 560);

  $("#flipbook").turn({
    width: width,
    height: height,
    autoCenter: true,
    display: "single",
    gradients: true,
    acceleration: true,
    duration: 900
  });

  $("#flipbook").bind("turned", (e, pageNum) => {
    if(dots){
      document.querySelectorAll("#dots span").forEach((d, i) => {
        d.classList.toggle("active", i === pageNum - 1);
      });
    }
  });

  if(dots && dots.firstChild){
    dots.firstChild.classList.add("active");
  }

  // Tap links/rechts
  flipbook.addEventListener("click", (e) => {
    const rect = flipbook.getBoundingClientRect();
    const x = e.clientX - rect.left;

    if(x < rect.width / 2){
      $("#flipbook").turn("previous");
    } else {
      $("#flipbook").turn("next");
    }
  });

  // Swipe
  let startX = 0;

  flipbook.addEventListener("touchstart", (e) => {
    startX = e.changedTouches[0].screenX;
  }, { passive: true });

  flipbook.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].screenX;
    const diff = endX - startX;

    if(Math.abs(diff) > 50){
      if(diff < 0){
        $("#flipbook").turn("next");
      } else {
        $("#flipbook").turn("previous");
      }
    }
  }, { passive: true });

  dbg("Storybook geladen");
});