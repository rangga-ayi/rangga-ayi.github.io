import {continuousScene} from './scroll-model.mjs';

import {createStudioObject as symbol} from './studio-objects.mjs';

export function initializeScrollScenes(gsap,ScrollTrigger){
 const root=document.documentElement;
 const registry=[['.portfolio-overview','data'],['.proof-explorer','data'],['#pengalaman','data'],['#proyek','device'],['#keahlian','network'],['#pendidikan','ledger'],['#sertifikat','papers'],['#organisasi-relawan','people'],['#kontak','contact']];
 const worlds=[];
 for(const [selector,kind] of registry){
  const section=document.querySelector(selector);if(!section)continue;
  section.classList.add('has-scroll-scene');
  const world=document.createElement('div');world.className='scroll-world';world.setAttribute('aria-hidden','true');
  const viewport=document.createElement('div');viewport.className='world-viewport';const visual=symbol(kind);visual.classList.add('world-symbol');viewport.append(visual);world.append(viewport);section.prepend(world);
  const heading=section.querySelector('.portfolio-section-heading');
  let art=null;
  if(heading){heading.querySelector('.chapter-circuit')?.remove();art=symbol(kind);art.classList.add('scene-heading-art');heading.append(art);}
  worlds.push({section,world,visual,art});
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
   for(const {section,visual,art} of worlds){
    const objects=[visual,art].filter(Boolean).map(svg=>({
     svg,
     amount:svg===art?.4:.65,
     obj:svg.querySelector('.scene-object'),
     layers:svg.querySelectorAll('.scene-layer'),
     orbits:svg.querySelector('.scene-orbits'),
     packet:svg.querySelector('.scene-packet'),
     stream:svg.querySelector('.scene-stream')
    }));
    for(const item of objects)gsap.set([item.obj,item.orbits].filter(Boolean),{transformOrigin:'220px 220px',transformBox:'view-box'});
    const render=distance=>{
     const s=continuousScene(distance,compact);
     for(const {amount,obj,layers,orbits,packet,stream} of objects){
      if(obj)gsap.set(obj,{x:s.x*amount,y:s.y*amount,rotation:s.rotation*.35});
      if(layers.length)gsap.set(layers,{x:i=>s.layerX*.2*i,y:i=>s.layerY*.15*i});
      if(orbits)gsap.set(orbits,{rotation:s.orbitRotation});
      if(packet)gsap.set(packet,{x:s.packetX,y:s.packetY});
      if(stream)gsap.set(stream,{strokeDashoffset:s.streamOffset});
     }
    };
    const update=self=>{const d=self.progress*(self.end-self.start);section.dataset.sceneProgress=self.progress.toFixed(4);section.dataset.sceneDistance=d.toFixed(1);render(d);};
    ScrollTrigger.create({trigger:section,start:'top bottom',end:'bottom top',onUpdate:update,onRefresh:update});
   }
   const frameHeights=new Map(frames.map(({frame})=>[frame,frame.offsetHeight]));
   ScrollTrigger.addEventListener('refreshInit',()=>{for(const {frame} of frames)frameHeights.set(frame,frame.offsetHeight);});
   for(const {frame,rail} of frames){
    const tl=gsap.timeline({defaults:{ease:'none'},scrollTrigger:{trigger:frame,start:'top 75%',end:'bottom 30%',scrub:true,invalidateOnRefresh:true}});
    tl.fromTo(rail.querySelector('i'),{scaleY:0},{scaleY:1,transformOrigin:'top',duration:1},0)
      .fromTo(rail.querySelector('b'),{y:0},{y:()=>Math.max(0,(frameHeights.get(frame)??frame.offsetHeight)-8),duration:1},0);
    const title=frame.querySelector(':scope>h3,:scope>.journal-heading h3,:scope>.split-story h3');if(title)gsap.fromTo(title,{x:compact?-10:-24},{x:0,ease:'none',scrollTrigger:{trigger:title,start:'top 96%',end:'top 48%',scrub:true}});
   }
   for(const {figure,plane,picture,index} of photos){
    const direction=index%2?-1:1;
    const tween=gsap.timeline({defaults:{ease:'none'},scrollTrigger:{trigger:figure,start:'top bottom',end:'bottom top',scrub:true,invalidateOnRefresh:true}});
    tween.fromTo(plane,{y:compact?22:52,rotation:direction*(compact?0.35:1.25),scale:compact?0.98:0.94},{y:compact?-12:-30,rotation:-direction*(compact?0.25:0.7),scale:1,duration:1},0);
    if(picture&&!figure.closest('.career-entry'))tween.fromTo(picture,{scale:compact?1.07:1.14,yPercent:compact?-2.7:-5.7},{scale:compact?1.07:1.14,yPercent:compact?2.7:5.7,duration:1},0);
   }
   ScrollTrigger.batch(cards,{start:'top 92%',once:true,onEnter:batch=>gsap.fromTo(batch,{y:24,opacity:.9},{y:0,opacity:1,duration:.45,stagger:.05,ease:'power2.out',clearProps:'transform,opacity'})});
   document.querySelectorAll('.numbers-row').forEach(row=>gsap.fromTo(row,{'--figure-progress':0},{'--figure-progress':1,ease:'none',scrollTrigger:{trigger:row,start:'top 90%',end:'bottom 40%',scrub:true}}));
   const view=document.querySelector('.proof-view');if(view)gsap.fromTo(view,{y:compact?18:44},{y:compact?-8:-32,ease:'none',scrollTrigger:{trigger:'.proof-layout',start:'top bottom',end:'bottom top',scrub:true}});
  }
 };
}
