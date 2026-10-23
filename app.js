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


/* PAP_VISUAL_V13: visual guides and accessible minimal reading */
(() => {
  if (document.documentElement.dataset.papVisualV13) return;
  document.documentElement.dataset.papVisualV13 = '1';
  const $ = (q, within=document) => within.querySelector(q);
  const $$ = (q, within=document) => [...within.querySelectorAll(q)];
  const toNode = (html) => {const t=document.createElement('template');t.innerHTML=html;return t.content.firstElementChild;};
  const assets = {
    'que-son':['🧠','foundations','📘 Fundamentos','Primera ayuda, sin convertirlo en terapia.','Qué son los primeros auxilios psicológicos, qué buscan y cuáles son sus límites.',['🧠 Apoyo humano','🛟 Necesidades actuales','🚫 No reemplaza terapia'],'Comprender el propósito y los límites de PAP.','Ofrece apoyo humano y práctico según necesidades actuales.','No diagnostiques, presiones ni prometas resultados.'],
    'mirar-escuchar-conectar':['🧭','foundations','📘 Fundamentos','Tres verbos para orientarte en momentos difíciles.','Mirar, escuchar y conectar: una secuencia flexible para apoyar con criterio y respeto.',['👀 Mirar','👂 Escuchar','🤝 Conectar'],'Recordar la secuencia Mirar -> Escuchar -> Conectar.','Observa la seguridad, pregunta y ayuda a contactar apoyos.','No interfieras con rescate ni exijas relatos.'],
    'escuchar-sin-presionar':['👂','foundations','📘 Fundamentos','Acompañar sin invadir también es ayuda.','Frases, silencios y límites para estar presente sin empujar relatos ni emociones.',['💬 Frases útiles','🤫 Silencios válidos','🧱 Límites sanos'],'Aprender a escuchar sin interrogar.','Ofrece escucha y respeta las preferencias.','No minimices el dolor ni fuerces el contacto físico.'],
    'ansiedad-intensa':['🌬️','crisis','⚠️ Situaciones de crisis','Cuando alguien está desbordado, menos es más.','Prioriza seguridad, apoyo concreto y atención médica cuando corresponda.',['⚕️ Seguridad física','🪑 Menos estímulos','🌿 Apoyo opcional'],'Orientarte ante ansiedad o agitación intensa.','Comprueba primero si existen señales de urgencia médica.','No asumas que síntomas físicos graves son solo pánico.'],
    'despues-de-una-emergencia':['🚒','crisis','⚠️ Situaciones de crisis','Después del impacto, primero lo básico.','Qué puede ayudar en las primeras horas o días tras un evento crítico.',['🛏️ Descanso','📄 Información clara','🤝 Apoyo cotidiano'],'Apoyar tras un evento estresante reciente.','Facilita necesidades básicas, información y vínculos.','No impongas debriefing ni descripciones detalladas.'],
    'duelo-y-perdidas':['🕯️','crisis','⚠️ Situaciones de crisis','El duelo no se apura: se acompaña.','Ideas para sostener una pérdida con respeto y presencia humana.',['🕯️ Pérdida','🤍 Presencia','⏳ Ritmos distintos'],'Acompañar pérdidas sin imponer un ritmo.','Escucha y ofrece ayuda práctica.','No impongas plazos ni etapas rígidas del duelo.'],
    'riesgo-suicida':['🆘','crisis','⚠️ Situaciones de crisis','Ante riesgo suicida, la prioridad es la seguridad.','En una posible emergencia suicida, el apoyo y la derivación urgente van primero.',['🆘 Riesgo inmediato','📞 Activa ayuda','👥 Acompaña'],'Orientarte para activar ayuda ante posible riesgo suicida.','Ante peligro inmediato solicita asistencia de emergencia (SAMU 131); acompaña a la persona si es seguro hacerlo.','No dejes sola a una persona en peligro inmediato ni sustituyas servicios de emergencia con esta guía.'],
    'ninos-y-adolescentes':['🧒','populations','👥 Poblaciones y equipos','Niños y adolescentes necesitan apoyo a su medida.','Lenguaje accesible, rutinas y adultos protectores en situaciones de crisis.',['🧒 Lenguaje simple','🧩 Rutinas','👨‍👩‍👧 Protección'],'Adaptar el apoyo a menores y cuidadores.','Escucha a su nivel y facilita acompañamiento protector.','No abrumes con preguntas ni detalles innecesarios.'],
    'primera-respuesta':['🧑‍🚒','populations','👥 Poblaciones y equipos','Quien ayuda primero también necesita claridad.','Pautas breves para equipos de primera respuesta: priorizar, coordinar y relevar.',['📍 Coordinar','📣 Comunicar','🔄 Relevar'],'Apoyar el trabajo de equipos en incidentes críticos.','Comunica de forma clara y respeta roles operativos.','No descuides seguridad física ni relevo del equipo.'],
    'cuidado-del-ayudante':['🫶','populations','👥 Poblaciones y equipos','Cuidarte también forma parte de ayudar.','Límites, pausas y relevo para personas que acompañan a otras.',['🫶 Cuidado','🔄 Relevo','🛑 Límites'],'Proteger la capacidad de apoyo del acompañante.','Reconoce señales de fatiga y busca relevo.','No normalices el agotamiento continuo.'],
    'evidencia-y-limites':['📚','evidence','🔎 Evidencia y redes','La evidencia importa, y también sus límites.','Distinguir consenso profesional, recomendaciones y resultados de investigación.',['📚 Guías','🔬 Investigación','⚖️ Límites'],'Entender el respaldo científico y sus limitaciones.','Consulta las fuentes y distingue evidencia de recomendaciones.','No presentes PAP como prevención garantizada del TEPT.'],
    'ayuda-en-chile':['🇨🇱','evidence','🔎 Evidencia y redes','Números y rutas de ayuda, claros y a mano.','Contactos oficiales para urgencias, crisis suicida y orientación en Chile.',['📞 Contactos','🇨🇱 Chile','🚨 Urgencias'],'Encontrar vías oficiales de ayuda en Chile.','Ante urgencia médica: 131; crisis suicida: *4141; rescate: 132; policía: 133.','No demores la atención de una emergencia.']
  };
  const categoryClass = {'fundamentos':'foundations','situaciones':'crisis','poblaciones':'populations','referencias':'evidence'};
  const navNames = {'Biblioteca':'📚 Biblioteca','Herramientas':'🧰 Herramientas','Evidencia':'🔎 Evidencia','Ayuda en Chile':'🇨🇱 Ayuda en Chile','Sobre el creador':'👤 Sobre el creador'};
  $$('#site-nav a').forEach(a=>{const txt=a.textContent.trim();if(navNames[txt])a.textContent=navNames[txt]});
  const resourceIcons = {'que-son':'🧠','mirar-escuchar-conectar':'🧭','escuchar-sin-presionar':'👂','ansiedad-intensa':'🌬️','despues-de-una-emergencia':'🚒','duelo-y-perdidas':'🕯️','riesgo-suicida':'🆘','ninos-y-adolescentes':'🧒','primera-respuesta':'🧑‍🚒','cuidado-del-ayudante':'🫶','evidencia-y-limites':'📚','ayuda-en-chile':'🇨🇱','orientador':'🧭','anclaje':'🌿','lista-apoyo':'📝'};
  $$('.resource-card').forEach(card=>{const href=card.getAttribute('href')||'';const slug=href.split('/').pop().replace('.html','');const icon=$('.resource-icon',card);if(icon&&resourceIcons[slug])icon.textContent=resourceIcons[slug];if(card.closest('#resource-grid')){const type=categoryClass[card.dataset.category];if(type)card.classList.add('pap-card-'+type)}});
  if($('#resource-grid')){
    const heading=$('#biblioteca .section-heading');
    if(heading&&!$('.pap-color-legend')){
      heading.insertAdjacentHTML('afterend','<div class="pap-color-legend" aria-label="Colores de la biblioteca"><span class="pap-legend-foundations">📘 Fundamentos</span><span class="pap-legend-crisis">⚠️ Crisis</span><span class="pap-legend-populations">👥 Poblaciones</span><span class="pap-legend-evidence">🔎 Evidencia</span></div>');
    }
    const quick=$('.quickstrip');
    if(quick&&!$('.pap-entry')){
      const routes=[['😰','Estoy muy activado/a','Orientación para ansiedad intensa o síntomas preocupantes.','biblioteca/ansiedad-intensa.html'],['🤝','Quiero ayudar a alguien','Escucha y acompañamiento sin presionar.','biblioteca/escuchar-sin-presionar.html'],['🧒','Apoyo para niños','Recursos para niñas, niños y adolescentes.','biblioteca/ninos-y-adolescentes.html'],['🚨','Necesito orientación rápida','Orientador PAP y teléfonos de emergencia.','herramientas/orientador.html']];
      const html='<section class="pap-entry" aria-labelledby="pap-entry-title"><div class="wrap"><p class="eyebrow">00 / Empieza aquí</p><h2 id="pap-entry-title">Lee menos, oriéntate más rápido.</h2><p class="pap-entry-lead">Elige una situación para llegar directamente al recurso más útil.</p><div class="pap-entry-grid">'+routes.map(x=>'<a class="pap-entry-card" href="'+x[3]+'"><span class="pap-entry-emoji" aria-hidden="true">'+x[0]+'</span><strong>'+x[1]+'</strong><p>'+x[2]+'</p><em>Abrir recurso ↗</em></a>').join('')+'</div></div></section>';
      quick.insertAdjacentHTML('afterend',html);
    }
  }
  const hero=$('.article-hero');
  const article=$('.article-content');
  const canonical=$('link[rel="canonical"]');
  const slug=(canonical?canonical.getAttribute('href'):location.pathname).split('/').pop().replace('.html','');
  const info=assets[slug];
  if(hero&&article&&info){
    const [emoji,group,category,title,desc,illustrations,summary,action,avoid]=info;
    document.body.classList.add('pap-cat-'+group);
    if(slug==='riesgo-suicida')document.body.classList.add('pap-safety-critical');
    hero.insertAdjacentHTML('afterbegin','<div class="pap-guide-emoji" aria-hidden="true">'+emoji+'</div>');
    const meta=$('.article-meta',hero)||$('h1',hero);
    const controls=toNode('<div class="pap-reading-control"><button id="pap-minimal-mode" class="pap-mode-btn" type="button" aria-pressed="false">🪶 Modo lectura mínima</button><span class="pap-mode-caption">Resume esta guía sin eliminar las alertas esenciales.</span></div>');
    meta.insertAdjacentElement('afterend',controls);
    const icons='<div class="pap-guide-icons">'+illustrations.map(s=>{const sep=s.indexOf(' ');return '<div class="pap-guide-icon"><span aria-hidden="true">'+s.slice(0,sep)+'</span>'+s.slice(sep+1)+'</div>'}).join('')+'</div>';
    const cover=toNode('<section class="pap-guide-cover" aria-label="Portada visual de la guía"><div class="pap-cover-art"><div class="pap-cover-symbol" aria-hidden="true">'+emoji+'</div><span class="pap-cover-category">'+category+'</span></div><div class="pap-cover-text"><span class="eyebrow">Portada visual</span><h2>'+title+'</h2><p>'+desc+'</p>'+icons+'</div></section>');
    controls.insertAdjacentElement('afterend',cover);
    const progress=toNode('<div class="pap-progress-box"><div class="pap-progress-head"><span>📍 Avance de lectura</span><span id="pap-progress-percent">0%</span></div><progress id="pap-reading-progress" max="100" value="0" aria-label="Progreso de lectura de esta guía">0%</progress></div>');
    cover.insertAdjacentElement('afterend',progress);
    progress.insertAdjacentHTML('afterend','<div class="pap-glance"><div class="pap-glance-card"><span>🧭</span><strong>Ruta rápida</strong><p>'+summary+'</p></div><div class="pap-glance-card"><span>✅</span><strong>Qué hacer</strong><p>'+action+'</p></div><div class="pap-glance-card"><span>⚠️</span><strong>Qué evitar</strong><p>'+avoid+'</p></div></div>');
    const layout=$('.article-layout');
    if(layout){
      layout.insertAdjacentHTML('beforebegin','<section class="pap-mini-panel" id="pap-mini-panel" aria-labelledby="pap-mini-title"><p class="eyebrow">🪶 Lectura mínima</p><h2 id="pap-mini-title">Versión breve</h2><p>'+summary+'</p><div class="pap-mini-grid"><div><strong>✅ Qué hacer primero</strong><p>'+action+'</p></div><div><strong>⚠️ Qué evitar</strong><p>'+avoid+'</p></div><div><strong>📞 Si existe una urgencia</strong><p>Contacta servicios competentes: SAMU 131 ante urgencia médica; *4141 para orientación en crisis suicida.</p></div></div></section>');
    }
    const btn=$('#pap-minimal-mode');
    const updateMode = on=>{document.body.classList.toggle('pap-minimal',on);btn.setAttribute('aria-pressed',String(on));btn.textContent=on?'📖 Ver versión completa':'🪶 Modo lectura mínima';window.dispatchEvent(new Event('resize'))};
    btn.addEventListener('click',()=>updateMode(!document.body.classList.contains('pap-minimal')));
    const sections=$$('.article-content .article-section, .article-content .sources-panel');
    const aside=$('.article-aside');
    const toc=[];
    if(aside&&sections.length){
      const panel=toNode('<div class="pap-aside-progress"><span class="eyebrow">Lectura</span><strong>Tu recorrido</strong><progress id="pap-progress-side" max="100" value="0" aria-label="Avance de esta guía">0%</progress><small id="pap-progress-side-label">0% leído</small><nav class="pap-aside-toc" aria-label="Secciones de esta guía"></nav></div>');
      aside.insertAdjacentElement('afterbegin',panel);
      sections.forEach((s,i)=>{const h=$('h2',s);if(!h)return;const id=s.id||'pap-seccion-'+(i+1);s.id=id;const a=document.createElement('a');a.href='#'+id;a.textContent=(i+1)+'. '+h.textContent.trim();$('.pap-aside-toc',panel).appendChild(a);toc.push([s,a])});
    }
    let pending=false;
    const update=()=>{
      pending=false;
      const rect=article.getBoundingClientRect();
      const start=window.scrollY+rect.top-150;
      const end=window.scrollY+rect.bottom-window.innerHeight*.45;
      const pct=Math.max(0,Math.min(100,Math.round(((window.scrollY-start)/Math.max(1,end-start))*100)));
      const pb=$('#pap-reading-progress'),side=$('#pap-progress-side');
      if(pb)pb.value=pct;if(side)side.value=pct;
      const ptxt=$('#pap-progress-percent'),stxt=$('#pap-progress-side-label');
      if(ptxt)ptxt.textContent=pct+'%';if(stxt)stxt.textContent=pct+'% leído';
      let active=null;toc.forEach(pair=>{if(pair[0].getBoundingClientRect().top<210)active=pair[1]});
      if(!active&&toc.length)active=toc[0][1];
      toc.forEach(pair=>{if(pair[1]===active)pair[1].setAttribute('aria-current','location');else pair[1].removeAttribute('aria-current')});
    };
    const schedule=()=>{if(!pending){pending=true;requestAnimationFrame(update)}};
    window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);update();
  }
  if($('.tool-hero')&&!$('.pap-tool-chips'))$('.tool-hero').insertAdjacentHTML('beforeend','<div class="pap-tool-chips"><span>🧩 Paso a paso</span><span>🔒 Sin enviar respuestas</span><span>🌿 Ejercicio opcional</span></div>');
})();
