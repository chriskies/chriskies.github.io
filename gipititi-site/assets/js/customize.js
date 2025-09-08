(function(){
  const story = document.getElementById('geschichte');
  if (!story) return;

  // Original HTML speichern
  if (!story.dataset.originalHtml) {
    story.dataset.originalHtml = story.innerHTML;
  }

  const selRel   = document.getElementById('rel-select');
  const inpRel   = document.getElementById('rel-custom');
  const inpChild = document.getElementById('child-custom');
  const btnApply = document.getElementById('apply');
  const btnReset = document.getElementById('reset');

  function values(){
    const rel   = (inpRel.value.trim()   !== '') ? inpRel.value.trim()   : selRel.value;
    const child = (inpChild.value.trim() !== '') ? inpChild.value.trim() : 'Noël';
    return { rel, child };
  }

  function applyReplace(){
    let html = story.dataset.originalHtml;
    const {rel, child} = values();

    html = html.replace(/Mama/g, rel);
    html = html.replace(/Noël/g, child);

    story.innerHTML = html;
  }

  function reset(){
    story.innerHTML = story.dataset.originalHtml;
    selRel.value = 'Mama';
    inpRel.value = '';
    inpChild.value = '';
  }

  btnApply.addEventListener('click', applyReplace);
  btnReset.addEventListener('click', reset);
})();