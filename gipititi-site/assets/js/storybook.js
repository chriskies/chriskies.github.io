/* ==================== Storybook – Interaktive Bilderbuch-Logik ==================== */
/* Konfiguration ------------------------------------------------------------------- */
const TOTAL = 7;                 // Anzahl der Seiten
const PATH  = 'assets/book/';    // Ordner der Bilder
const EXT   = 'jpg';             // 'jpg' oder 'jpeg'

// Kurze Bildtexte (kindgerecht)
const CAPTIONS = [
  `Noël sitzt am Tisch. Müde ist er zwar – aber ins Bett will er noch nicht.
   Aus der Kokosnuss darf er mit einem Röhrchen trinken. Mama hat dafür ein
   kleines Loch hineingebohrt und ist kurz aus der Küche gegangen.`,

  `Die Kokosnuss wippt leise hin und her. Noël staunt – bewegt sie sich wirklich?
   Er schaut ganz genau hin und wartet gespannt, was gleich passiert.`,

  `Plötzlich macht es „plopp“ – die Kokosnuss springt auf! Ein kleines,
   warmherziges Wesen erscheint: Gipititi.`,

  `„Lass uns die Kokosnuss retten und etwas Leckeres daraus machen!“ sagt Gipititi.
   Gemeinsam backen sie Kokos-Bananen-Muffins – und die Küche duftet herrlich.`,

  `Noël probiert einen Muffin. Er schmeckt nach Abenteuer, Sonne und Meer.
   „Jetzt ist Schlafenszeit“, sagt Gipititi freundlich. „Ich begleite dich.“`,

  `Noël fühlt sich ganz leicht. Seine Gedanken werden zu kleinen Wölkchen
   und schweben davon. Sanft kuschelt er sich in sein Bett.`,

  `Gipititi verwandelt sich in einen leuchtenden Stern. Das Zimmer wird warm
   und ruhig. Noël weiß: Wenn Gedanken kommen, ist Gipititi da – und er kann
   friedlich einschlafen.`
];

/* Hilfszugriffe ------------------------------------------------------------------- */
const $      = (s) => document.querySelector(s);
const img    = $('#pageimg');
const cap    = $('#caption');
const dotsEl = $('#dots');
const prevBt = $('#prev');
const nextBt = $('#next');
const hint   = $('#hint');

let page = 1;
let startX = 0, startY = 0;

/* Dots bauen & aktualisieren ------------------------------------------------------ */
function buildDots(){
  dotsEl.innerHTML = '';
  for(let i=1;i<=TOTAL;i++){
    const d = document.createElement('span');
    d.className = 'dot' + (i===page ? ' active' : '');
    dotsEl.appendChild(d);
  }
}
function setDots(){
  [...dotsEl.children].forEach((d, i)=>{
    d.classList.toggle('active', (i+1) === page);
  });
}

/* Bildpfad ------------------------------------------------------------------------ */
function srcFor(n){
  return `${PATH}${String(n).padStart(2,'0')}.${EXT}`;
}

/* Vorladen (einfach) -------------------------------------------------------------- */
function preload(){
  for(let i=1;i<=TOTAL;i++){
    const im = new Image();
    im.src = srcFor(i);
  }
}

/* Seite zeigen ------------------------------------------------------------------- */
function show(n){
  page = Math.max(1, Math.min(TOTAL, n));

  // sanfte Animation
  img.classList.remove('fade');
  img.src = srcFor(page);
  img.onload = () => img.classList.add('fade');

  // Caption
  cap.innerText = CAPTIONS[page-1] || '';

  // UI-Status
  setDots();
  prevBt.disabled = (page === 1);
  nextBt.disabled = (page === TOTAL);
}

/* Navigation --------------------------------------------------------------------- */
function next(){ show(page + 1); }
function prev(){ show(page - 1); }

/* Events ------------------------------------------------------------------------- */
// Buttons
prevBt.addEventListener('click', prev);
nextBt.addEventListener('click', next);

// Tastatur
window.addEventListener('keydown', (e)=>{
  if(e.key === 'ArrowRight') next();
  if(e.key === 'ArrowLeft')  prev();
});

// Wischen (Touch)
img.addEventListener('touchstart', (e)=>{
  const t = e.changedTouches[0];
  startX = t.clientX;
  startY = t.clientY;
}, {passive:true});

img.addEventListener('touchend', (e)=>{
  const t = e.changedTouches[0];
  const dx = t.clientX - startX;
  const dy = t.clientY - startY;
  // nur horizontale, kurze Wischgesten akzeptieren
  if(Math.abs(dx) > 40 && Math.abs(dy) < 60){
    if(dx < 0) next(); else prev();
  }
}, {passive:true});

// Tipp-Hinweis ausblenden
setTimeout(()=> { if(hint) hint.style.display = 'none'; }, 2500);

/* Start -------------------------------------------------------------------------- */
buildDots();
preload();
show(1);
