import {createSkillBlueprint,getSkillSpec} from './studio-objects.mjs';

/* 10.0 scenes. Content is complete without this module: it adds the skill stage, the
   pipeline's travelling signal, and scroll-driven framing. Selection works with motion off. */
export function initializeDescent(gsap){
 const root=document.documentElement;
 const enabled=()=>root.dataset.motion==='on';
 const decorative=(tag,className)=>{const el=document.createElement(tag);el.className=className;el.setAttribute('aria-hidden','true');return el;};

 const pipelines=[...document.querySelectorAll('.portfolio-page .work-steps')].map(row=>{
  const packet=decorative('span','pipe-packet');row.append(packet);
  return {row,steps:[...row.querySelectorAll('.work-step')]};
 });
 function light(pipeline,progress){
  const {row,steps}=pipeline;row.style.setProperty('--pipe',progress.toFixed(4));
  steps.forEach((step,i)=>step.dataset.lit=String(progress+.02>=i/Math.max(1,steps.length-1)));
 }

 const photos=[...document.querySelectorAll('.portfolio-page .expand-photo')];

 // Skills: one stage follows the active card. The cards keep their full text.
 const section=document.querySelector('.portfolio-page #capabilities');
 const cards=section?[...section.querySelectorAll('.capability')]:[];
 let stage=null,active=-1,hoverTimer=0,stageTween=null,held=0;
 if(section&&cards.length){
  stage=decorative('div','skill-stage');
  stage.innerHTML='<span class="skill-stage-index"></span><div class="skill-stage-object"></div><div class="skill-stage-spec"></div><span class="skill-stage-kind"></span><b class="skill-stage-title"></b><span class="skill-stage-dots"></span>';
  stage.querySelector('.skill-stage-dots').append(...cards.map(()=>document.createElement('i')));
  section.prepend(stage);section.classList.add('has-skill-stage');
  cards.forEach((card,index)=>{
   card.addEventListener('click',event=>{if(!event.target.closest('a'))choose(index);});
   card.addEventListener('focusin',()=>choose(index));
   // Content scrolling under a resting mouse must not override keyboard focus.
   card.addEventListener('pointerenter',event=>{if(event.pointerType!=='mouse'||section.contains(document.activeElement))return;clearTimeout(hoverTimer);hoverTimer=setTimeout(()=>choose(index),140);});
   card.addEventListener('pointerleave',()=>clearTimeout(hoverTimer));
  });
  // While reading, the card crossing the middle of the viewport becomes active, unless the
  // visitor just chose one or keyboard focus is inside the gallery.
  const observer=new IntersectionObserver(entries=>{
   if(performance.now()<held||section.contains(document.activeElement))return;
   for(const entry of entries)if(entry.isIntersecting)select(cards.indexOf(entry.target));
  },{rootMargin:'-46% 0px -46% 0px'});
  cards.forEach(card=>observer.observe(card));
  select(0);
  document.addEventListener('portfolio:skill-filter',()=>{
   const visibleIndex=cards.findIndex(c=>!c.hidden);
   stage?.querySelectorAll('.skill-stage-dots i').forEach((dot,i)=>{dot.hidden=cards[i]?.hidden||false;});
   if(visibleIndex>=0){active=-1;select(visibleIndex);}
  });
 }
 function choose(index){held=performance.now()+1200;select(index);}
 function select(index){
  if(index<0||index===active)return;active=index;
  cards.forEach((card,i)=>card.dataset.active=String(i===index));
  const card=cards[index];
  stage.querySelector('.skill-stage-index').textContent=String(index+1).padStart(2,'0');
  stage.querySelector('.skill-stage-kind').textContent=card.querySelector(':scope>span')?.textContent||'';
  stage.querySelector('.skill-stage-title').textContent=card.querySelector('h2,h3')?.textContent||'';
  stage.querySelectorAll('.skill-stage-dots i').forEach((dot,i)=>dot.dataset.on=String(i===index));
  const holder=stage.querySelector('.skill-stage-object');
  const key=card.dataset.skillKey||'mikrotik';
  const spec=getSkillSpec(key);
  const object=createSkillBlueprint(key);
  const specEl=stage.querySelector('.skill-stage-spec');
  if(specEl){specEl.innerHTML=spec.lines.map(l=>`<code>${l}</code>`).join('');}
  stageTween?.kill();holder.replaceChildren(object);
  if(enabled()&&getComputedStyle(stage).display!=='none')stageTween=gsap.fromTo(object,{scale:.96,opacity:0,y:8},{scale:1,opacity:1,y:0,duration:.36,ease:'power2.out'});
 }

 return {
  reset(){
   pipelines.forEach(p=>{p.row.removeAttribute('data-pipeline');light(p,1);});
   photos.forEach(photo=>{for(const name of ['--inset-x','--inset-y','--inset-r'])photo.style.removeProperty(name);gsap.set(photo.querySelector('picture'),{clearProps:'transform'});});
   document.querySelectorAll('.portfolio-page .chapter-panel').forEach(panel=>panel.style.removeProperty('--wave'));
  },
  animate({compact=false}={}){
   for(const pipeline of pipelines){
    pipeline.row.dataset.pipeline='on';light(pipeline,0);
    const state={p:0};
    gsap.to(state,{p:1,ease:'none',scrollTrigger:{trigger:pipeline.row,start:compact?'top 80%':'top 72%',end:compact?'bottom 45%':'bottom 52%',scrub:true,invalidateOnRefresh:true},onUpdate:()=>light(pipeline,state.p)});
   }
   for(const photo of photos){
    const timeline=gsap.timeline({defaults:{ease:'none'},scrollTrigger:{trigger:photo,start:'top 92%',end:compact?'top 30%':'top 12%',scrub:true,invalidateOnRefresh:true}});
    timeline.fromTo(photo,{'--inset-x':compact?'4px':'18px','--inset-y':'0px','--inset-r':'24px'},{'--inset-x':'0px','--inset-y':'0px','--inset-r':'16px',duration:1},0);
    // Reveal the whole original photo; movement belongs to the frame, not a crop.
   }
   document.querySelectorAll('.portfolio-page .chapter-panel').forEach(panel=>{
    gsap.fromTo(panel,{'--wave':compact?2:2.8},{'--wave':.45,ease:'none',scrollTrigger:{trigger:panel,start:'top bottom',end:'bottom 30%',scrub:true}});
   });
  },
  sync(){if(!enabled()){stageTween?.kill();clearTimeout(hoverTimer);}}
 };
}
