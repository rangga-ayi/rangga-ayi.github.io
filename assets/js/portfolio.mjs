import {registerSurface} from './surface.mjs';

// Native anchor links and scrolling share one document and one location marker.
const navigation=document.querySelector('.section-navigation');
const header=document.querySelector('.portfolio-header');
const sections=[...document.querySelectorAll('[data-portfolio-section]')];
const links=[...navigation.querySelectorAll('a[href^="#"]')];
let frame=0;
function updateLocation(){
 frame=0;
 const height=header?.getBoundingClientRect().height||0;
 const tall=height>innerHeight*.35||innerHeight<=500;
 header?.classList.toggle('is-tall',tall);
 document.documentElement.style.setProperty('--reading-offset',tall?'0px':height+'px');
 const boundary=Math.max(0,header?.getBoundingClientRect().bottom||0)+72;
 let current=sections[0];
 for(const section of sections){
  if(section.getBoundingClientRect().top<=boundary)current=section;
  else break;
 }
 if(scrollY+innerHeight>=document.documentElement.scrollHeight-2)current=sections.at(-1);
 for(const link of links){
  if(link.hash==='#'+current.id)link.setAttribute('aria-current','location');
  else link.removeAttribute('aria-current');
 }
 revealCurrent();
}
// On phones the links scroll sideways; keep the current section's link inside that strip.
function revealCurrent(){
 const strip=navigation.querySelector('.section-links');
 // Preserve the keyboard reader's position while scrolling the document.
 const link=strip?.contains(document.activeElement)?document.activeElement:strip?.querySelector('[aria-current]');
 if(!link||strip.scrollWidth<=strip.clientWidth)return;
 const box=strip.getBoundingClientRect(),own=link.getBoundingClientRect();
 const left=own.left-box.left+strip.scrollLeft,right=left+own.width;
 if(left<strip.scrollLeft+16)strip.scrollLeft=left-16;
 else if(right>strip.scrollLeft+strip.clientWidth-28)strip.scrollLeft=right-strip.clientWidth+28;
}
function schedule(){if(!frame)frame=requestAnimationFrame(updateLocation);}
addEventListener('scroll',schedule,{passive:true});
addEventListener('resize',schedule);
addEventListener('pageshow',schedule);
document.addEventListener('portfolio:layout',schedule);
navigation.addEventListener('focusin',schedule);
if(header)new ResizeObserver(schedule).observe(header);
navigation.addEventListener('click',event=>{
 const link=event.target.closest('a');
 if(!link||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
 const section=document.getElementById(link.hash.slice(1));
 if(section)requestAnimationFrame(()=>section.focus({preventScroll:true}));
});
schedule();
// The hero surface rests across the title's last line, in every motion mode.
registerSurface('hero',document.querySelector('[data-surface-stage=hero]'),{restFrom(stage,box){
 const title=stage.querySelector('.title-ink');if(!title)return stage.offsetHeight*.5;
 const r=title.getBoundingClientRect(),line=parseFloat(getComputedStyle(title).lineHeight)||r.height/2;
 return r.bottom-box.top-line*.42;
}});
// The same surface closes the page: it rises under the contact room into the footer's depth.
registerSurface('contact',document.querySelector('.portfolio-contact'),{rise:true,phase:2.4,restFrom(stage){return stage.offsetHeight-(innerWidth<=700?132:150);}});
