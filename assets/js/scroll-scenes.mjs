import {continuousScene} from './scroll-model.mjs';

import {createStudioObject as symbol} from './studio-objects.mjs';

export function initializeScrollScenes(gsap,ScrollTrigger){
 const root=document.documentElement;
 const registry=[['.portfolio-overview','data'],['.proof-explorer','data'],['#pengalaman','data'],['#proyek','device'],['#keahlian','network'],['#sertifikat','papers'],['#organisasi-relawan','people'],['#kontak','contact']];
 const worlds=[];
 for(const [selector,kind] of registry){
  const section=document.querySelector(selector);if(!section)continue;
  section.classList.add('has-scroll-scene');
  const world=document.createElement('div');world.className='scroll-world';world.setAttribute('aria-hidden','true');
  const viewport=document.createElement('div');viewport.className='world-viewport';const visual=symbol(kind);visual.classList.add('world-symbol');viewport.append(visual);world.append(viewport);section.prepend(world);
  const seam=document.createElement('div');seam.className='scene-seam';seam.setAttribute('aria-hidden','true');seam.innerHTML='<i></i><b></b>';section.prepend(seam);
  const heading=section.querySelector('.portfolio-section-heading');
  let art=null;
  if(heading){heading.querySelector('.chapter-circuit')?.remove();art=symbol(kind);art.classList.add('scene-heading-art');heading.append(art);}
  worlds.push({section,world,visual,seam,art});
 }
 const frames=[...document.querySelectorAll('.portfolio-section .editorial-block,.portfolio-section .career-entry')].map(frame=>{
  frame.classList.add('reading-frame');const rail=document.createElement('div');rail.className='frame-rail';rail.setAttribute('aria-hidden','true');rail.innerHTML='<i></i><b></b>';frame.prepend(rail);return {frame,rail};
 });
 const photos=[...document.querySelectorAll('.portfolio-page .documentary:not(.expand-photo)')].map((figure,index)=>{
  const link=figure.querySelector('a[data-lightbox]');if(!link)return null;
  const plane=document.createElement('div');plane.className='media-plane';const window=document.createElement('div');window.className='media-window';link.before(plane);plane.append(window);window.append(link);figure.classList.add('media-scene');return {figure,plane,picture:link.querySelector('picture'),index};
 }).filter(Boolean);
 // Skill cards and pipeline steps are positioned by their own scenes.
 const cards=[...document.querySelectorAll('.certificate-card,.education-card,.project-summary')];
 return {
  reset(){
   root.dataset.continuousScenes='off';
   for(const {section,visual,art} of worlds){delete section.dataset.sceneProgress;delete section.dataset.sceneDistance;gsap.set([visual,art].filter(Boolean).flatMap(svg=>[...svg.querySelectorAll('.scene-object,.scene-layer,.scene-orbits,.scene-packet,.scene-stream')]),{clearProps:'transform,strokeDashoffset'});}
  },
  animate({compact=false}={}){
   root.dataset.continuousScenes='on';
   for(const {section,visual,seam,art} of worlds){
    const objects=[visual,art].filter(Boolean);
    for(const svg of objects)gsap.set(svg.querySelectorAll('.scene-object,.scene-orbits'),{svgOrigin:'220 220',smoothOrigin:false});
    const render=distance=>{
     const s=continuousScene(distance,compact);
     for(const svg of objects){
      // Keep the sculpture assembled; depth is a small parallax, not an explosion.
      const amount=svg===art ? .4 : .65;
      gsap.set(svg.querySelector('.scene-object'),{x:s.x*amount,y:s.y*amount,rotation:s.rotation*.35});
      gsap.set(svg.querySelectorAll('.scene-layer'),{x:i=>s.layerX*.2*i,y:i=>s.layerY*.15*i});
      gsap.set(svg.querySelector('.scene-orbits'),{rotation:s.orbitRotation});
      gsap.set(svg.querySelector('.scene-packet'),{x:s.packetX,y:s.packetY});
      gsap.set(svg.querySelector('.scene-stream'),{strokeDashoffset:s.streamOffset});
     }
    };
    const update=self=>{const d=self.progress*(self.end-self.start);section.dataset.sceneProgress=self.progress.toFixed(4);section.dataset.sceneDistance=d.toFixed(1);render(d);};
    ScrollTrigger.create({trigger:section,start:'top bottom',end:'bottom top',onUpdate:update,onRefresh:update});
    gsap.fromTo(seam.querySelector('i'),{xPercent:-8,rotation:-4,scaleY:1.8},{xPercent:8,rotation:2,scaleY:.4,ease:'none',scrollTrigger:{trigger:section,start:'top bottom',end:'top 12%',scrub:true}});
    gsap.fromTo(seam.querySelector('b'),{xPercent:8,rotation:3},{xPercent:-8,rotation:-2,ease:'none',scrollTrigger:{trigger:section,start:'top bottom',end:'top 12%',scrub:true}});
   }
   for(const {frame,rail} of frames){
    const shared={trigger:frame,start:'top 75%',end:'bottom 30%',scrub:true,invalidateOnRefresh:true};
    gsap.fromTo(rail.querySelector('i'),{scaleY:0},{scaleY:1,transformOrigin:'top',ease:'none',scrollTrigger:shared});
    gsap.fromTo(rail.querySelector('b'),{y:0},{y:()=>Math.max(0,frame.offsetHeight-8),ease:'none',scrollTrigger:{...shared}});
    const title=frame.querySelector(':scope>h3,:scope>.journal-heading h3,:scope>.split-story h3');if(title)gsap.fromTo(title,{x:compact?-10:-24},{x:0,ease:'none',scrollTrigger:{trigger:title,start:'top 96%',end:'top 48%',scrub:true}});
   }
   for(const {figure,plane,picture,index} of photos){
    const direction=index%2?-1:1;
    const tween=gsap.timeline({defaults:{ease:'none'},scrollTrigger:{trigger:figure,start:'top bottom',end:'bottom top',scrub:true,invalidateOnRefresh:true}});
    tween.fromTo(plane,{y:compact?22:52,rotation:direction*(compact?0.35:1.25),scale:compact?0.98:0.94},{y:compact?-12:-30,rotation:-direction*(compact?0.25:0.7),scale:1,duration:1},0);
    if(picture&&!figure.closest('.career-entry'))tween.fromTo(picture,{scale:compact?1.07:1.14,yPercent:compact?-2.7:-5.7},{scale:compact?1.07:1.14,yPercent:compact?2.7:5.7,duration:1},0);
   }
   cards.forEach((card,index)=>gsap.fromTo(card,{y:(compact?25:42)+(index%3)*5},{y:compact?-6:-18,ease:'none',scrollTrigger:{trigger:card,start:'top bottom',end:'bottom top',scrub:true}}));
   document.querySelectorAll('.numbers-row').forEach(row=>gsap.fromTo(row,{'--figure-progress':0},{'--figure-progress':1,ease:'none',scrollTrigger:{trigger:row,start:'top 90%',end:'bottom 40%',scrub:true}}));
   const view=document.querySelector('.proof-view');if(view)gsap.fromTo(view,{y:compact?18:44},{y:compact?-8:-32,ease:'none',scrollTrigger:{trigger:'.proof-layout',start:'top bottom',end:'bottom top',scrub:true}});
  }
 };
}
