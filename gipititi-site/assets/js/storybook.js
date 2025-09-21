function dbg(msg){
  console.log("[STORYBOOK]", msg);
  const hint=document.getElementById("hint");
  if(hint){ clearTimeout(hint._t); hint.textContent="👉 "+msg;
    hint._t=setTimeout(()=>hint.textContent="Tipp: Wischen oder Pfeile tippen",2000); }
}

const pages=[
  {img:"assets/book/01.jpg", txt:"Noël sitzt am Tisch, müde, vor sich die Kokosnuss."},
  {img:"assets/book/02.jpg", txt:"Die Kokosnuss wippt hin und her. Noël staunt."},
  {img:"assets/book/03.jpg", txt:"Plopp – die Kokosnuss springt auf. Gipititi erscheint!"},
  {img:"assets/book/04.jpg", txt:"Gemeinsam zaubern sie Muffins voller Sternenstaub."},
  {img:"assets/book/05.jpg", txt:"Noël probiert einen Muffin. Er schmeckt nach Abenteuer."},
  {img:"assets/book/06.jpg", txt:"Sanft beginnt er zu schweben – Gedankenwölkchen ziehen."},
  {img:"assets/book/07.jpg", txt:"Gipititi wird zu einem Stern, der ihn beschützt."},
];

document.addEventListener("DOMContentLoaded",()=>{
  const flipbook=document.getElementById("flipbook");
  const dots=document.getElementById("dots");

  pages.forEach((p,i)=>{
    const page=document.createElement("div");
    page.classList.add("page");
    page.innerHTML=`<img src="${p.img}" alt=""><p>${p.txt}</p>`;
    flipbook.appendChild(page);

    const dot=document.createElement("span");
    dot.addEventListener("click",()=>$('#flipbook').turn('page',i+1));
    dots.appendChild(dot);
  });

  $('#flipbook').turn({
    width: Math.min(window.innerWidth-40,800),
    height: Math.min(window.innerHeight-80,600),
    autoCenter:true,
    display:'single',
    gradients:true,
    acceleration:true
  });

  $('#flipbook').bind('turned',(e,pageNum)=>{
    dbg("Seite "+pageNum);
    document.querySelectorAll('#dots span').forEach((d,i)=>d.classList.toggle('active',i===pageNum-1));
  });

  dbg("Storybook geladen");
});