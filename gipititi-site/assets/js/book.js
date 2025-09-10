// === Konfiguration =========================================================
const TOTAL = 7;                 // Anzahl deiner Seiten
const PATH  = 'assets/book/';    // Ordner mit den Bildern
const EXT   = 'jpeg';            // 'jpeg' oder 'jpg'

// Bildtexte (kurz & kindgerecht)
const CAPTIONS = [
  // 1
  `Noël sitzt am Tisch. Müde ist er zwar – aber ins Bett will er noch nicht. 
   Aus der Kokosnuss darf er mit einem Röhrchen trinken. Mama hat dafür ein
   kleines Loch hineingebohrt und ist kurz aus der Küche gegangen.`,

  // 2
  `Die Kokosnuss wippt leise hin und her. Noël staunt – bewegt sie sich wirklich?
   Er schaut ganz genau hin und wartet gespannt, was gleich passiert.`,

  // 3
  `Plötzlich macht es „plopp“ – die Kokosnuss springt auf! Ein kleines,
   warmherziges Wesen erscheint: Gipititi.`,

  // 4
  `„Lass uns die Kokosnuss retten und etwas Leckeres daraus machen!“ sagt Gipititi.
   Gemeinsam backen sie Kokos-Bananen-Muffins – und die Küche duftet herrlich.`,

  // 5
  `Noël probiert einen Muffin. Er schmeckt nach Abenteuer, Sonne und Meer.
   „Jetzt ist Schlafenszeit“, sagt Gipititi freundlich. „Ich begleite dich.“`,

  // 6
  `Noël fühlt sich ganz leicht. Seine Gedanken werden zu kleinen Wölkchen
   und schweben davon. Sanft kuschelt er sich in sein Bett.`,

  // 7
  `Gipititi verwandelt sich in einen leuchtenden Stern. Das Zimmer wird warm
   und ruhig. Noël weiß: Wenn Gedanken kommen, ist Gipititi da – und er kann
   friedlich einschlafen.`
];

// === Hilfen ================================================================
const $ = sel => document.querySelector(sel);
const img = $('#pageimg');
const cap = $('#caption');
const dotsBox = $('#dots');
const btnPrev = $('#prev');
const btnNext = $('#next');
const hint = $('#hint');

let page = 1;
let touchStartX = 0;
let touchStartY = 0;

// Dots bauen
function buildDots(){
  dotsBox.innerHTML = '';
  for(let i=1;i<=TOTAL;i++){
    const d = document.createElement('span');
    d.className = 'dot' + (i===page ? ' active' : '');
    dotsBox.appendChild(d);
  }
}
function setDots(){
  [...dotsBox.children].forEach((d, i)=>{
    d.classList.toggle('active', (i+1)===page);
  });
}

function srcFor(n){
  const nn = String(n).padStart(2,'0');
  return `${PATH}${nn}.${EXT}`;
}

// Preload (einfach)
function preload(){
  for(let i=1;i<=TOTAL;i++){
    const im = new Image();
    im.src = srcFor(i);
  }
}

function show(p){
  page = Math.min(Math.max(1, p), TOTAL);
  img.classList.remove('fade');
  img.src = srcFor(page);
  img.onload = ()=> img.classList.add('fade');

  // Caption (Fallback, falls weniger Texte)
  const text = CAPTIONS[page-1] || '';
  cap.textContent = ''; // reset
  cap.innerText = text;

  setDots();
  btnPrev.disabled = (page===1);
  btnNext.disabled = (page===TOTAL);
}

function next(){ show(page+1); }
function prev(){ show(page-1); }

// Events: Buttons
btnPrev.addEventListener('click', prev);
btnNext.addEventListener('click', next);

// Events: Tastatur
window.addEventListener('keydown', (e)=>{
  if(e.key === 'ArrowRight') next();
  if(e.key === 'ArrowLeft')  prev();
});

// Events: Wischen
img.addEventListener('touchstart', (e)=>{
  const t = e.changedTouches[0];
  touchStartX = t.clientX;
  touchStartY = t.clientY;
}, {passive:true});

img.addEventListener('touchend', (e)=>{
  const t = e.changedTouches[0];
  const dx = t.clientX - touchStartX;
  const dy = t.clientY - touchStartY;
  // nur horizontale, kurze Wischgesten
  if(Math.abs(dx) > 40 && Math.abs(dy) < 60){
    if(dx < 0) next(); else prev();
  }
}, {passive:true});

// Tipp-Hinweis nach kurzer Zeit ausblenden
setTimeout(()=> { if(hint) hint.style.display='none'; }, 2500);

// Start
buildDots();
preload();
show(1);