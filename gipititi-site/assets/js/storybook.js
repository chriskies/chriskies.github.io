const dbg = (msg)=>{ const el = document.getElementById('dbg'); if(el) el.textContent = 'debug: ' + msg; };
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

const pageFigure = document.querySelector('.page');

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
function show(n) {
  if (n < 1) n = TOTAL;
  if (n > TOTAL) n = 1;
  page = n;

  const src = `${PATH}${String(page).padStart(2, '0')}.${EXT}`;
  dbg('zeige Seite ' + page + ' → ' + src);

  const img = document.getElementById('pageimg');
  img.src = src;
  img.onerror = () => dbg('Bild fehlt: ' + img.src);

  const cap = document.getElementById('caption');
  cap.textContent = CAPTIONS[page - 1] || '';
}
dbg('JS geladen');
…
function show(n){
  …
  dbg('zeige Seite ' + page + ' → ' + srcFor(page));
  img.onerror = ()=> dbg('Bild fehlt: ' + img.src);
  …
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

/* ----- Drag/Swipe: echtes Ziehen und „Umblättern“ ----- */
/* ----- Drag/Swipe mit „Umblätter“-Optik ----- */
let dragging = false;
let startX = 0;
let currentX = 0;

function setTurnVisual(dx) {
  const W = img.clientWidth || 1;
  const ratio = Math.min(1, Math.abs(dx) / (W * 0.9)); // 0..1
  const dirLeft = dx < 0;

  // 3D-Kippwinkel (max ~14°)
  const angle = (dx / W) * 14;

  // Kippung + Verschiebung
  img.style.transform = `translateX(${dx * 0.9}px) rotateY(${angle}deg)`;
  // Schattenkante ausrichten und Intensität setzen
  pageFigure.classList.toggle('turn-left',  dirLeft);
  pageFigure.classList.toggle('turn-right', !dirLeft);
  pageFigure.style.setProperty('--turn', ratio.toString());
  img.classList.add('gloss');
}

function clearTurnVisual() {
  img.style.transform = '';
  pageFigure.classList.remove('turn-left','turn-right');
  pageFigure.style.removeProperty('--turn');
  img.classList.remove('gloss');
}

function onPointerDown(e){
  dragging = true;
  const p = e.touches ? e.touches[0] : e;
  startX = p.clientX;
  currentX = startX;
  document.querySelector('.stage').classList.add('grabbing');
  img.style.transition = 'none';
}

function onPointerMove(e){
  if(!dragging) return;
  const p = e.touches ? e.touches[0] : e;
  currentX = p.clientX;
  const dx = currentX - startX;
  setTurnVisual(dx);
  if(e.cancelable) e.preventDefault();
}

function onPointerUp(){
  if(!dragging) return;
  dragging = false;

  const dx = currentX - startX;
  const W = img.clientWidth || 1;
  const TH = 0.55 * W;

  img.style.transition = 'transform .25s ease, opacity .25s ease';

  if(dx <= -TH && page < TOTAL){
    // nach links blättern
    img.style.transform = `translateX(${-W}px) rotateY(-12deg)`;
    setTimeout(()=>{ clearTurnVisual(); next(); }, 180);
  } else if(dx >= TH && page > 1){
    // nach rechts blättern
    img.style.transform = `translateX(${W}px) rotateY(12deg)`;
    setTimeout(()=>{ clearTurnVisual(); prev(); }, 180);
  } else {
    // zurückschnappen
    img.style.transform = '';
    setTimeout(clearTurnVisual, 200);
  }
  document.querySelector('.stage').classList.remove('grabbing');
}

/* Events */
img.addEventListener('touchstart', onPointerDown, {passive:false});
img.addEventListener('touchmove',  onPointerMove, {passive:false});
img.addEventListener('touchend',   onPointerUp,   {passive:true});
img.addEventListener('pointerdown', onPointerDown);
window.addEventListener('pointermove', onPointerMove);
window.addEventListener('pointerup', onPointerUp);

  // Schwelle: mindestens 55% der Breite wischen
  const TH = 0.55 * W;

  // Rückkehr-Transition wieder aktivieren
  img.style.transition = 'transform .25s ease, opacity .25s ease';

  if(dx <= -TH && page < TOTAL){
    // nach links weit genug -> nächste Seite
    img.style.transform = `translateX(${-W}px)`;
    setTimeout(()=>{ img.style.transform = ''; next(); }, 180);
  } else if(dx >= TH && page > 1){
    // nach rechts weit genug -> vorige Seite
    img.style.transform = `translateX(${W}px)`;
    setTimeout(()=>{ img.style.transform = ''; prev(); }, 180);
  } else {
    // nicht weit genug -> zurückschnappen
    img.style.transform = '';
  }
  document.querySelector('.stage').classList.remove('grabbing');
}

/* Events registrieren – Touch und Maus/Pointer */
img.addEventListener('touchstart', onPointerDown, {passive:false});
img.addEventListener('touchmove',  onPointerMove, {passive:false});
img.addEventListener('touchend',   onPointerUp,   {passive:true});

img.addEventListener('pointerdown', onPointerDown);
window.addEventListener('pointermove', onPointerMove);
window.addEventListener('pointerup', onPointerUp);

// Tipp-Hinweis ausblenden
setTimeout(()=> { if(hint) hint.style.display = 'none'; }, 2500);

/* Start -------------------------------------------------------------------------- */
buildDots();
preload();
show(1);
