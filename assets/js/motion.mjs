import {motionEnabled,introLayout,introRange,introPose} from './motion-model.mjs';
import {initializeInteractions} from './interactions.mjs';
import {initializeScrollScenes} from './scroll-scenes.mjs';
import {initializeStudio} from './studio.mjs';
import {surfaceControl} from './surface.mjs';
import {initializeDescent} from './descent.mjs';

function initializeMotion(){
 const {gsap,ScrollTrigger}=window;
 const hero=document.querySelector('.portfolio-hero'),scene=hero?.querySelector('.hero-scene'),stage=hero?.querySelector('.hero-character');
 const control=document.querySelector('[data-motion-control]'),root=document.documentElement;
 if(!gsap||!ScrollTrigger||!hero||!scene||!stage||!control)return;
 gsap.registerPlugin(ScrollTrigger);control.hidden=false;
 const interactions=initializeInteractions(gsap);
 const scenes=initializeScrollScenes(gsap,ScrollTrigger);
 const studio=initializeStudio();
 const descent=initializeDescent(gsap);
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let preference=null;try{preference=localStorage.getItem('rangga-motion');}catch{}
 let context=null,resizeFrame=0,restoreFrame=0,proofFrame=0,readingPosition=null,signature='';
 const poses=[...stage.querySelectorAll('.hero-pose')],captions=[...stage.querySelectorAll('.hero-scene-caption>span')];
 let currentPose='';
 function renderPose(progress){
  const pose=introPose(progress);hero.dataset.introProgress=progress.toFixed(3);hero.dataset.characterPose=pose;
  if(currentPose===pose)return;currentPose=pose;
  const index=['wave','inspect','present'].indexOf(pose);
  if(poses.length>1)poses.forEach((el,i)=>el.style.opacity=i===index?'1':'0');
  else poses.forEach(el=>el.style.opacity='1');
  captions.forEach((el,i)=>el.style.opacity=i===index?'1':'0');
 }
 function rebuild(){
  resizeFrame=0;
  const enabled=motionEnabled(preference,reduced.matches),header=document.querySelector('.portfolio-header');
  const headerHeight=header?.getBoundingClientRect().height||0,width=root.clientWidth,height=innerHeight;
  const next=[enabled,width,height,headerHeight,Math.round(scene.getBoundingClientRect().height)].join(':');if(next===signature)return;
  if(!readingPosition){const anchor=[...document.querySelectorAll('[data-portfolio-section]')].reverse().find(el=>el.getBoundingClientRect().top<=headerHeight+100);if(anchor&&anchor!==hero)readingPosition={anchor,top:anchor.getBoundingClientRect().top};}
  context?.revert();context=null;scenes.reset();descent.reset();currentPose='';poses.forEach(el=>el.style.removeProperty('opacity'));captions.forEach(el=>el.style.removeProperty('opacity'));
  root.dataset.motion=enabled?'on':'off';root.dataset.introHold='false';control.setAttribute('aria-pressed',String(enabled));control.querySelector('small').textContent=enabled?'aktif':'mati';
  const layout=introLayout({width,height,headerHeight,sceneHeight:scene.getBoundingClientRect().height,enabled});root.dataset.introHold=String(layout.hold);
  renderPose(0);interactions.sync();studio.sync();descent.sync();surfaceControl.setProgress('hero',0);surfaceControl.setProgress('contact',1);surfaceControl.setRipple(enabled);
  if(enabled){
   context=gsap.context(()=>{
    const compact=width<=700;
    const range=()=>introRange({sectionTop:hero.getBoundingClientRect().top+scrollY,headerHeight,height,width,travel:layout.travel});
    const intro=gsap.timeline({defaults:{ease:'none'},scrollTrigger:{id:'portfolio-intro',trigger:hero,start:()=>range().start,end:()=>range().end,pin:layout.hold?scene:false,pinSpacing:true,scrub:true,invalidateOnRefresh:true,onUpdate:self=>{renderPose(self.progress);surfaceControl.setProgress('hero',self.progress);}}});
    // The surface rises through the name while the character sinks into the depth and an object crosses behind.
    const camera=stage.querySelector('.hero-camera'),crossing=scene.querySelector('.descent-object');
    intro.fromTo(camera,{yPercent:0,scale:1,transformOrigin:'50% 100%'},{yPercent:compact?6:10,scale:compact?.94:.86,duration:1},0)
     .fromTo(stage.querySelector('.hero-character-halo'),{scale:.8,opacity:.6},{scale:1.35,opacity:1,duration:1},0);
    const greeting=stage.querySelector('.hero-greeting');
    if(greeting)intro.to(greeting,{y:-26,opacity:0,duration:.45},0);
    const overview=document.querySelector('#ringkasan');
    if(overview&&!compact){
     gsap.fromTo(stage,{opacity:1,y:0},{opacity:0,y:-18,ease:'none',scrollTrigger:{trigger:overview,start:'top 72%',end:'top 38%',scrub:true,invalidateOnRefresh:true}});
    }
    // Phones keep the crossing in the character's column so it never passes behind paragraphs.
    if(crossing)intro.set(crossing,{xPercent:compact?10:20,yPercent:compact?30:55,scale:.45,rotation:-18,opacity:0},0)
     .to(crossing,{xPercent:compact?0:-60,yPercent:compact?-40:-70,scale:compact?.8:1.25,rotation:6,opacity:compact?.85:1,duration:.55},0)
     .to(crossing,{xPercent:compact?-5:-150,yPercent:compact?-120:-190,scale:compact?1:1.7,rotation:24,opacity:0,duration:.45},.55);
    document.querySelectorAll('.portfolio-section').forEach(section=>{
     const heading=section.querySelector('.portfolio-section-heading'),depth=section.querySelector('.chapter-depth');
     if(depth)gsap.fromTo(depth,{y:35},{y:-40,ease:'none',scrollTrigger:{trigger:section,start:'top bottom',end:'bottom top',scrub:true}});
     const rule=heading?.querySelector('.section-rule i');if(rule)gsap.fromTo(rule,{scaleX:0},{scaleX:1,transformOrigin:'left center',ease:'none',scrollTrigger:{trigger:heading,start:'top 90%',end:'top 42%',scrub:true}});
     const leaf=heading?.querySelector('.chapter-leaf');if(leaf)gsap.fromTo(leaf,{xPercent:0},{xPercent:105,rotation:4,ease:'none',scrollTrigger:{trigger:heading,start:'top 100%',end:'top 38%',scrub:true}});
     const circuit=heading?.querySelector('.chapter-circuit');if(circuit)gsap.fromTo(circuit,{y:28,scale:.92},{y:-12,scale:1.04,ease:'none',scrollTrigger:{trigger:heading,start:'top bottom',end:'bottom top',scrub:true}});
    });
    scenes.animate({compact});descent.animate({compact});
    gsap.fromTo('.contact-illustration',{y:70,scale:.9},{y:0,scale:1,ease:'none',scrollTrigger:{trigger:'#kontak',start:'top 85%',end:'bottom bottom',scrub:true}});
    ScrollTrigger.create({trigger:'#kontak',start:'top 85%',end:'bottom bottom',onUpdate:self=>surfaceControl.setProgress('contact',self.progress),onRefresh:self=>surfaceControl.setProgress('contact',self.progress)});
    gsap.fromTo('.reading-progress i',{scaleX:0},{scaleX:1,transformOrigin:'left center',ease:'none',scrollTrigger:{start:0,end:'max',scrub:true}});
   },document.body);
  }
  ScrollTrigger.refresh();
  if(restoreFrame)cancelAnimationFrame(restoreFrame);
  const restore=()=>{if(readingPosition)scrollBy(0,readingPosition.anchor.getBoundingClientRect().top-readingPosition.top);};
  restoreFrame=requestAnimationFrame(()=>{restore();restoreFrame=requestAnimationFrame(()=>{restore();readingPosition=null;restoreFrame=0;});});
  signature=[enabled,width,height,header?.getBoundingClientRect().height||0,Math.round(scene.getBoundingClientRect().height)].join(':');document.dispatchEvent(new Event('portfolio:layout'));
 }
 const schedule=()=>{if(!resizeFrame)resizeFrame=requestAnimationFrame(rebuild);};
 const refreshLayout=()=>{if(!proofFrame)proofFrame=requestAnimationFrame(()=>{proofFrame=0;ScrollTrigger.refresh();});};
 document.addEventListener('portfolio:proof-change',refreshLayout);
 document.addEventListener('toggle',event=>{if(event.target.matches('details'))refreshLayout();},true);
 control.addEventListener('click',()=>{preference=motionEnabled(preference,reduced.matches)?'off':'on';try{localStorage.setItem('rangga-motion',preference);}catch{}signature='';if(resizeFrame){cancelAnimationFrame(resizeFrame);resizeFrame=0;}rebuild();});
 reduced.addEventListener('change',()=>{signature='';schedule();});addEventListener('resize',schedule);addEventListener('pageshow',schedule);
 const observer=new ResizeObserver(schedule);observer.observe(scene);observer.observe(document.querySelector('.portfolio-header'));document.fonts.ready.then(schedule);rebuild();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initializeMotion,{once:true});else initializeMotion();
