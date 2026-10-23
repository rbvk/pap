'use strict';
(() => {
 const $ = selector => document.querySelector(selector);
 const orienter = $('#orientation-tool');
 if(orienter){
  let step=0, answers={};
  const body=$('#orienter-live'), back=$('#orienter-back'), reset=$('#orienter-reset');
  const bars=[...orienter.querySelectorAll('.tool-stepbar span')];
  function show(){
   bars.forEach((b,i)=>b.classList.toggle('on',i<=Math.min(step,2)));
   back.hidden=step===0||step===4;reset.hidden=step!==4;
   if(step===0) body.innerHTML=`<p class="eyebrow">Paso 1 de 3 · Seguridad</p><h2>¿La situación es segura?</h2><p>Antes de ofrecer ayuda, considera si hay peligro inmediato, lesiones o necesidad de atención médica.</p><div class="choices"><button class="choice" data-safe="danger">Hay peligro inmediato o necesidad médica</button><button class="choice" data-safe="uncertain">No puedo descartarlo</button><button class="choice" data-safe="safe">Es seguro acercarse</button></div>`;
   if(step===1) body.innerHTML=`<p class="eyebrow">Paso 2 de 3 · Necesidad</p><h2>¿Qué necesita ahora?</h2><p>Selecciona el tipo de apoyo que parece más relevante. Puedes modificar esta elección después.</p><div class="choices"><button class="choice" data-need="basic">Resolver algo físico o práctico</button><button class="choice" data-need="listen">Estar acompañado/a y ser escuchado/a</button><button class="choice" data-need="connect">Contactar a alguien o un servicio</button><button class="choice" data-need="unknown">Todavía no lo sé</button></div>`;
   if(step===2) body.innerHTML=`<p class="eyebrow">Paso 3 de 3 · Preferencias</p><h2>¿La persona desea esa ayuda?</h2><p>Respetar su autonomía es parte de PAP, salvo cuando existe un peligro que exige asistencia urgente.</p><div class="choices"><button class="choice" data-consent="yes">Sí, acepta el apoyo</button><button class="choice" data-consent="space">Prefiere espacio o no hablar</button><button class="choice" data-consent="unknown">No se lo he preguntado</button></div>`;
   if(step===4){
    const danger=answers.safe!=='safe';
    const recommendations={
     basic:['Pregunta qué necesita primero: agua, abrigo, un lugar seguro o atención médica.','Ofrece ayuda práctica sin asumir decisiones por la persona.'],
     listen:['Ofrece escuchar o estar presente sin insistir.','Haz preguntas abiertas y evita pedir detalles del episodio.'],
     connect:['Pregunta si quiere hablar con alguien de confianza.','Facilita el contacto o la orientación a servicios adecuados.'],
     unknown:['Pregunta qué sería útil en este momento.','Observa necesidades prácticas y ofrece opciones concretas.']
    };
    const points=danger
    ?['No te expongas ni interfieras con los equipos de respuesta.','Si hay urgencia médica o peligro vital, llama al 131 (SAMU).','Para incendio o rescate corresponde 132 (Bomberos), y emergencias policiales 133.','Si existe una crisis asociada al suicidio sin una emergencia que requiera ambulancia, también existe *4141.']
    :[...(recommendations[answers.need]||recommendations.unknown),...(answers.consent==='space'?['Respeta su deseo de espacio. Explica cómo puede pedir ayuda si cambia de opinión.']:answers.consent==='unknown'?['Pregunta si quiere recibir ayuda antes de intervenir.']:['Acompaña al ritmo que la persona acepte.']), 'Si aparecen señales de peligro, vuelve a priorizar la seguridad y los servicios competentes.'];
    body.innerHTML=`<p class="eyebrow">Orientación completada</p><h2>${danger?'Prioridad: seguridad y servicios competentes':'Prioridad: apoyo respetuoso y concreto'}</h2><div class="tool-result"><h3>${danger?'No continúes con ejercicios de autoayuda':'Acciones posibles'}</h3><ul>${points.map(x=>'<li>'+x+'</li>').join('')}</ul>${danger?'<a class="help-link" href="tel:131">Llamar a SAMU 131 ↗</a>':'<a href="../biblioteca/mirar-escuchar-conectar.html">Revisar Mirar, Escuchar y Conectar ↗</a>'}</div><p>Orientación educativa, no un diagnóstico, protocolo de triaje ni valoración de riesgo. No se han guardado respuestas.</p>`;
   }
  }
  orienter.addEventListener('click',e=>{
   const b=e.target.closest('button[data-safe],button[data-need],button[data-consent]');if(!b)return;
   if(b.dataset.safe){answers.safe=b.dataset.safe;step=answers.safe==='safe'?1:4;}
   else if(b.dataset.need){answers.need=b.dataset.need;step=2;}
   else if(b.dataset.consent){answers.consent=b.dataset.consent;step=4;}
   show();
  });
  back.addEventListener('click',()=>{step=Math.max(0,step-1);show();});
  reset.addEventListener('click',()=>{step=0;answers={};show();});
  show();
 }
 const grounding=$('#grounding-tool');
 if(grounding){
  const stages=[
   {n:5,h:'Observa cinco cosas a tu alrededor.',p:'Mira a tu ritmo. Puedes nombrarlas mentalmente o simplemente percibirlas.'},
   {n:4,h:'Percibe cuatro sensaciones de contacto.',p:'Por ejemplo, el suelo bajo los pies, la ropa o una superficie cómoda. Si observar el cuerpo incomoda, omite esta parte.'},
   {n:3,h:'Escucha tres sonidos cercanos o lejanos.',p:'No necesitas identificarlos con precisión; nota lo que escuchas en este momento.'},
   {n:2,h:'Percibe dos olores, si los hay.',p:'Si no percibes olores o este sentido no está disponible, puedes saltar este paso.'},
   {n:1,h:'Nota un sabor o una sensación neutral.',p:'Puedes sustituir este paso por observar un color o una textura. Termina cuando quieras.'}
  ];
  let pos=0;
  function showSense(){
   const s=stages[pos];$('#sense-body').innerHTML=`<div class="sense-number">${s.n}</div><h2 class="sense-prompt">${s.h}</h2><p>${s.p}</p>`;
   grounding.querySelectorAll('.sense-index').forEach((el,i)=>el.classList.toggle('is-active',i===pos));
   $('#sense-back').disabled=pos===0;$('#sense-next').textContent=pos===4?'Terminar ✓':'Siguiente ↗';
  }
  $('#sense-next').addEventListener('click',()=>{if(pos<4){pos++;showSense();}else{$('#sense-body').innerHTML='<div class="sense-number">✓</div><h2 class="sense-prompt">Puedes terminar aquí.</h2><p>Observa cómo estás. Si el ejercicio no te resultó útil, no hay obligación de repetirlo.</p>';$('#sense-next').disabled=true;}});
  $('#sense-back').addEventListener('click',()=>{pos=Math.max(0,pos-1);$('#sense-next').disabled=false;showSense();});
  $('#sense-reset').addEventListener('click',()=>{pos=0;$('#sense-next').disabled=false;showSense();});
  showSense();
 }
 const checklist=$('#checklist-tool');
 if(checklist){
  const boxes=[...checklist.querySelectorAll('input[type=checkbox]')];
  const status=$('#tool-count');
  const refresh=()=>{const n=boxes.filter(b=>b.checked).length;status.textContent=`${n} de ${boxes.length} acciones marcadas`;};
  boxes.forEach(b=>b.addEventListener('change',refresh));
  $('#checklist-reset').addEventListener('click',()=>{boxes.forEach(b=>b.checked=false);refresh();});
  $('#checklist-print').addEventListener('click',()=>window.print());
 }
})();
