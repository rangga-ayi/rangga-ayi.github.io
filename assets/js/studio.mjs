import {createStudioObject} from './studio-objects.mjs';

/* Enhancement only: reading, links, and document evidence are already in HTML. */
export function initializeStudio(){
 const root=document.documentElement;
 const enabled=()=>root.dataset.motion==='on';
 const decorative=(tag,className)=>{const el=document.createElement(tag);el.className=className;el.setAttribute('aria-hidden','true');return el;};
 const stage=document.querySelector('.hero-character');
 const descent=document.querySelector('.descent-hero .hero-scene');
 if(descent){const crossing=decorative('div','descent-object');crossing.append(createStudioObject('data'));descent.append(crossing);}
 if(stage&&!descent){
  const aperture=decorative('div','studio-aperture');aperture.innerHTML='<i></i><b></b><em></em>';stage.prepend(aperture);
  for(const [selector,kind] of [['.chip-data','data'],['.chip-device','device']]){
   const chip=stage.querySelector(selector);if(chip){chip.querySelector('svg')?.remove();chip.prepend(createStudioObject(kind));}
  }
 }
 document.querySelectorAll('.chapter-panel').forEach((heading,index)=>{
  heading.dataset.chapter=String(index+1).padStart(2,'0');
  const art=heading.querySelector('.scene-heading-art');if(art)heading.insertBefore(art,heading.querySelector('h2'));
  const serial=decorative('span','chapter-serial');serial.textContent=heading.dataset.chapter;heading.prepend(serial);
 });
 const kinds=['network','device','data','database','ledger','device','papers'];
 document.querySelectorAll('.capability').forEach((card,index)=>{
  const art=decorative('div','capability-object');art.append(createStudioObject(kinds[index]||'data'));
  const number=decorative('span','object-index');number.textContent=String(index+1).padStart(2,'0');art.append(number);card.prepend(art);card.classList.add('has-studio-object');
 });
 document.querySelectorAll('.proof-pick').forEach((card,index)=>card.dataset.order=String(index+1).padStart(2,'0'));
 document.querySelectorAll('.certificate-card').forEach((card,index)=>card.dataset.order=String(index+1).padStart(2,'0'));
 document.querySelectorAll('.media-plane').forEach(plane=>{
  const corners=decorative('span','photo-corners');corners.innerHTML='<i></i><i></i><i></i><i></i>';plane.append(corners);
  const link=plane.querySelector('a[data-lightbox]');const cue=decorative('span','photo-view-cue');cue.textContent='Perbesar foto ↗';link?.append(cue);
 });
 const footer=document.querySelector('.portfolio-page .site-footer');
 if(footer){const signature=decorative('div','footer-signature');signature.innerHTML='<span>rangga<span>.</span></span><i></i>';footer.append(signature);}
 document.querySelectorAll('.button>span[aria-hidden],.portfolio-header-actions>a>span,.hero-project-link>span').forEach(icon=>icon.classList.add('action-icon'));
 const surfaces=[...document.querySelectorAll('.capability,.certificate-card,.proof-pick,.media-plane,.social-link,.chapter-panel')];
 const watched=[...surfaces,stage].filter(Boolean);
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.dataset.studioVisible=String(entry.isIntersecting)),{threshold:.05});
 watched.forEach(el=>observer.observe(el));
 let active=null,pending=null,frame=0;
 function clear(surface){
  if(!surface)return;delete surface.dataset.pointerActive;
  for(const name of ['--pointer-x','--pointer-y','--object-rx','--object-ry'])surface.style.removeProperty(name);
 }
 function reset(){
  if(frame)cancelAnimationFrame(frame);frame=0;pending=null;clear(active);active=null;
  document.querySelectorAll('.press-wave').forEach(el=>el.remove());
 }
 document.addEventListener('pointermove',event=>{
  if(!enabled()||event.pointerType!=='mouse')return;
  const surface=event.target.closest('.capability,.certificate-card,.proof-pick,.media-plane,.social-link,.chapter-panel');
  if(surface!==active){clear(active);active=surface;pending=null;}
  if(!surface)return;
  pending={surface,x:event.clientX,y:event.clientY};
  if(frame)return;
  frame=requestAnimationFrame(()=>{
   frame=0;if(!pending||!enabled())return;
   const {surface,x,y}=pending,r=surface.getBoundingClientRect();
   const px=Math.max(0,Math.min(1,(x-r.left)/Math.max(1,r.width))),py=Math.max(0,Math.min(1,(y-r.top)/Math.max(1,r.height)));
   surface.dataset.pointerActive='true';surface.style.setProperty('--pointer-x',px*100+'%');surface.style.setProperty('--pointer-y',py*100+'%');
   surface.style.setProperty('--object-rx',(0.5-py)*9+'deg');surface.style.setProperty('--object-ry',(px-0.5)*13+'deg');pending=null;
  });
 },{passive:true});
 document.addEventListener('pointerout',event=>{if(!event.relatedTarget)reset();},{passive:true});
 document.addEventListener('focusin',reset);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)reset();});
 const actions=document.querySelectorAll('.portfolio-page .button,.portfolio-header-actions>a,.proof-pick,.path-buttons button');
 actions.forEach(action=>{
  action.addEventListener('pointerdown',event=>{
   if(!enabled()||event.button!==0)return;
   const r=action.getBoundingClientRect(),wave=decorative('span','press-wave'),size=Math.max(r.width,r.height)*2;
   wave.style.cssText=`width:${size}px;height:${size}px;left:${event.clientX-r.left}px;top:${event.clientY-r.top}px`;
   action.querySelector('.press-wave')?.remove();action.append(wave);
   const animation=wave.animate([{transform:'translate(-50%,-50%) scale(0)',opacity:.25},{transform:'translate(-50%,-50%) scale(1)',opacity:0}],{duration:460,easing:'ease-out'});
   animation.onfinish=()=>wave.remove();
  });
 });
 return {sync(){if(!enabled())reset();}};
}
