'use strict';
(() => {
 const nav = document.getElementById('site-nav');
 const menu = document.getElementById('menu-toggle');
 if (nav && menu) {
  menu.addEventListener('click', () => {
   const open = nav.classList.toggle('open');
   menu.setAttribute('aria-expanded', String(open));
   menu.setAttribute('aria-label', open ? 'Cerrar navegación' : 'Abrir navegación');
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}));
  document.addEventListener('keydown', e => {if(e.key==='Escape'){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}});
 }
 const search = document.getElementById('library-search');
 const cards = [...document.querySelectorAll('#resource-grid .resource-card')];
 const chips = [...document.querySelectorAll('[data-filter]')];
 const status = document.getElementById('search-status');
 const empty = document.getElementById('empty-state');
 let filter = 'all';
 const normalize = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
 function update(){
  const query = normalize(search.value);
  let count = 0;
  for (const card of cards){const match = (filter === 'all' || card.dataset.category === filter) && normalize(card.dataset.search).includes(query);card.hidden = !match;if(match) count++;}
  status.textContent = `${count} ${count===1?'recurso disponible':'recursos disponibles'}`;
  empty.hidden = count !== 0;
 }
 if(search){
  search.addEventListener('input',update);
  chips.forEach(button=>button.addEventListener('click',()=>{
   filter=button.dataset.filter;
   chips.forEach(c=>{const active=c===button;c.classList.toggle('is-active',active);c.setAttribute('aria-pressed',String(active));});
   update();
  }));
  document.getElementById('reset-search')?.addEventListener('click',()=>{search.value='';chips[0].click();search.focus();});
  document.addEventListener('keydown',e=>{if(e.key==='/'&&!['INPUT','TEXTAREA'].includes(document.activeElement?.tagName)&&!e.metaKey&&!e.ctrlKey){e.preventDefault();search.focus();}});
 }
})();
