import {tabDestination} from './interaction-model.mjs';

export function initializeInteractions(gsap){
 const root=document.documentElement;
 const enabled=()=>root.dataset.motion==='on';
 const overlay=document.querySelector('.panel-transition');
 const sheets=overlay?[...overlay.querySelectorAll('.transition-sheet')]:[];
 let navigation=null,photoTween=null,photoOpener=null,closing=false;
 const dialog=document.querySelector('#photo-dialog');
 const image=dialog?.querySelector('img');
 // Optional highlights follow stable record ids. Adding an employer does not require JS edits.
 const careerProof=selector=>[...document.querySelectorAll(selector)].map(entry=>({
  key:entry.id,label:entry.dataset.proofLabel,note:entry.dataset.proofNote,
  section:'#'+entry.id,source:'#'+entry.id,copy:'#'+entry.id+'>.body-copy',photo:'#'+entry.id+' .documentary'
 }));
 const registry=[
  ...careerProof('#pengalaman .career-entry[data-proof-label]'),
  {key:'alzi-petshop',label:'Alzi Petshop',note:'E-Commerce & Midtrans API',section:'#proyek',source:'#alzi-petshop',copy:'#alzi-petshop>.body-copy',photo:'#alzi-petshop .documentary'}
 ].filter(item=>document.querySelector(item.copy)&&document.querySelector(item.photo));
 const explorer=document.querySelector('[data-proof-explorer]');
 const tabs=[],panels=[];let selected=-1,proofTween=null,hoverTimer=0;
 const orientation=matchMedia('(max-width:700px)');
 const picks=explorer?.querySelector('.proof-picks');
 const view=explorer?.querySelector('.proof-view');
 function selectProof(index,focus=false){
  if(index<0||index>=tabs.length||dialog?.open)return;
  if(index===selected){if(focus)tabs[index].focus({preventScroll:true});return;}
  const previous=selected;selected=index;
  tabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1;});
  proofTween?.kill();
  panels.forEach((panel,i)=>{const active=i===index;panel.hidden=!active;panel.tabIndex=active?0:-1;gsap.set(panel,{clearProps:'opacity,transform,clipPath'});});
  const panel=panels[index];
  const lazyImg=panel.querySelector('.proof-preview-media img');if(lazyImg)lazyImg.loading='eager';
  if(previous>=0&&enabled()){
   const media=panel.querySelector('.proof-preview-media');
   gsap.set(media,{clipPath:'inset(0 100% 0 0 round 16px)'});
   proofTween=gsap.timeline().to(media,{clipPath:'inset(0 0% 0 0 round 16px)',duration:.5,ease:'power3.inOut'})
    .fromTo(panel.querySelector('.proof-preview-copy'),{y:12,opacity:.55},{y:0,opacity:1,duration:.32,ease:'power2.out'},.14);
  }
  if(focus)tabs[index].focus({preventScroll:true});
  document.dispatchEvent(new Event('portfolio:layout'));
  document.dispatchEvent(new Event('portfolio:proof-change'));
 }
 if(explorer&&picks&&view&&registry.length){
  registry.forEach((item,index)=>{
   const original=document.querySelector(item.photo),picture=original.querySelector('picture'),origImg=original.querySelector('img');
   const tab=document.createElement('button');tab.type='button';tab.className='proof-pick';tab.id='proof-tab-'+item.key;
   tab.setAttribute('role','tab');tab.setAttribute('aria-controls','proof-panel-'+item.key);
   const thumb=document.createElement('img');
   const origSrc=origImg.getAttribute('src')||'';
   const thumbSrc=origSrc.replace(/\.(jpe?g|png|avif)$/i,'-240.avif');
   thumb.src=thumbSrc;thumb.width=origImg.width;thumb.height=origImg.height;thumb.alt='';thumb.loading=index===0?'eager':'lazy';thumb.decoding='async';thumb.fetchPriority='low';
   if(thumbSrc!==origSrc)thumb.addEventListener('error',()=>{if(thumb.src!==origSrc)thumb.src=origSrc;},{once:true});
   const text=document.createElement('span'),title=document.createElement('b'),note=document.createElement('small'),arrow=document.createElement('i');
   title.textContent=item.label;note.textContent=item.note;text.append(title,note);arrow.textContent='↗';arrow.setAttribute('aria-hidden','true');tab.append(thumb,text,arrow);
   const panel=document.createElement('div');panel.id='proof-panel-'+item.key;panel.className='proof-panel';panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby',tab.id);panel.tabIndex=index===0?0:-1;
   const media=document.createElement('a');media.className='proof-preview-media';media.href=original.querySelector('a').href;media.dataset.lightbox='';media.setAttribute('aria-label','Perbesar dokumentasi '+item.label);
   const clone=picture.cloneNode(true);const cloneImg=clone.querySelector('img');if(cloneImg){cloneImg.loading=index===0?'eager':'lazy';cloneImg.decoding='async';cloneImg.fetchPriority='low';}media.append(clone);
   const content=document.createElement('div');content.className='proof-preview-copy';
   const heading=document.createElement('h3'),sourceHeading=document.querySelector(item.source).querySelector('h3,h2').cloneNode(true);
   sourceHeading.querySelectorAll('br').forEach(br=>br.replaceWith(document.createTextNode(' ')));
   heading.textContent=sourceHeading.textContent.replace(/\s+/g,' ').trim();
   const copy=document.createElement('p');copy.textContent=document.querySelector(item.copy).textContent;
   const link=document.createElement('a');link.className='proof-read';link.href=item.section;link.textContent='Baca bagian lengkap ↗';content.append(heading,copy,link);panel.append(media,content);
   picks.append(tab);view.append(panel);tabs.push(tab);panels.push(panel);
   tab.addEventListener('click',()=>selectProof(index));
   tab.addEventListener('focus',()=>selectProof(index));
   tab.addEventListener('pointerenter',event=>{if(event.pointerType!=='mouse'||dialog?.open||explorer.contains(document.activeElement))return;clearTimeout(hoverTimer);hoverTimer=setTimeout(()=>selectProof(index),110);});
   tab.addEventListener('pointerleave',()=>clearTimeout(hoverTimer));
   tab.addEventListener('keydown',event=>{const next=tabDestination(index,event.key,tabs.length,picks.getAttribute('aria-orientation'));if(next!==null){event.preventDefault();selectProof(next,true);}});
  });
  explorer.addEventListener('focusin',()=>clearTimeout(hoverTimer));
  let labelSize=0,orientFrame=0;
  const orient=width=>{
   if(!labelSize)labelSize=parseFloat(getComputedStyle(tabs[0].querySelector('b')).fontSize)||14;
   const w=typeof width==='number'?width:picks.clientWidth;
   const stacked=orientation.matches&&w/3<labelSize*6+10;
   picks.classList.toggle('is-stacked',stacked);
   picks.setAttribute('aria-orientation',orientation.matches&&!stacked?'horizontal':'vertical');
  };
  const scheduleOrient=w=>{if(orientFrame)cancelAnimationFrame(orientFrame);orientFrame=requestAnimationFrame(()=>{orientFrame=0;orient(w);});};
  orientation.addEventListener('change',()=>scheduleOrient());selectProof(0);explorer.hidden=false;scheduleOrient();new ResizeObserver(entries=>scheduleOrient(entries[0]?.contentRect?.width)).observe(picks);
 }
 function resetCurtain(){
  navigation?.kill();navigation=null;
  if(overlay){overlay.classList.remove('is-active');gsap.set(sheets,{clearProps:'transform'});}
 }
 function arrive(link,target){
  history.pushState(null,'',link.getAttribute('href'));
  if(!target.hasAttribute('tabindex'))target.setAttribute('tabindex','-1');
  target.scrollIntoView({block:'start',behavior:'instant'});target.focus({preventScroll:true});
  document.dispatchEvent(new Event('portfolio:layout'));
 }
 function navigate(link,target){
  resetCurtain();
  if(document.hidden){arrive(link,target);return;}
  overlay.querySelector('[data-transition-label]').textContent=(link.textContent||'').replace(/[↗↓]/g,'').trim();
  overlay.classList.add('is-active');
  gsap.set(sheets,{yPercent:105,skewY:-5});
  navigation=gsap.timeline({onComplete:()=>{resetCurtain();}})
   .to(sheets,{yPercent:0,skewY:0,duration:.25,stagger:.035,ease:'power3.inOut'})
   .call(()=>arrive(link,target),null,.3)
   .to(sheets,{yPercent:-105,skewY:4,duration:.3,stagger:.025,ease:'power3.inOut'},.34);
 }
 function resetPhoto(){
  photoTween?.kill();photoTween=null;closing=false;
  if(image)gsap.set(image,{clearProps:'transform,opacity'});
  if(dialog){dialog.classList.remove('is-zooming');dialog.style.removeProperty('--dialog-shade');}
 }
 function originTransform(){
  const from=photoOpener.getBoundingClientRect(),to=image.getBoundingClientRect();
  return {x:from.left+from.width/2-to.left-to.width/2,y:from.top+from.height/2-to.top-to.height/2,scale:Math.max(.08,Math.min(from.width/to.width,from.height/to.height))};
 }
 function openPhoto(opener){
  clearTimeout(hoverTimer);resetPhoto();photoOpener=opener;
  const original=opener.querySelector('img');if(!original)return;
  image.src=opener.href;image.alt=original.alt;
  const caption=opener.closest('figure')?.querySelector('figcaption')?.textContent||original.alt;
  dialog.querySelector('p').textContent=caption;dialog.setAttribute('aria-label',caption);dialog.querySelector('[data-original-image]').href=opener.href;
  opener.focus({preventScroll:true});dialog.showModal();
  if(document.hidden)return;
  dialog.classList.add('is-zooming');
  const from=originTransform();
  photoTween=gsap.timeline({onComplete:()=>{dialog.classList.remove('is-zooming');}})
   .fromTo(dialog,{'--dialog-shade':0},{'--dialog-shade':.9,duration:.4},0)
   .fromTo(image,{...from,opacity:.5},{x:0,y:0,scale:1,opacity:1,duration:.48,ease:'power3.out'},0);
 }
 function closePhoto(){
  if(closing||!dialog.open)return;
  photoTween?.kill();gsap.set(image,{clearProps:'transform,opacity'});
  if(!enabled()||document.hidden||!photoOpener?.isConnected){dialog.close();resetPhoto();return;}
  closing=true;dialog.classList.add('is-zooming');const to=originTransform();
  photoTween=gsap.timeline({onComplete:()=>{dialog.close();resetPhoto();}})
   .to(image,{...to,opacity:.25,duration:.25,ease:'power2.in'},0)
   .to(dialog,{'--dialog-shade':0,duration:.25},0);
 }
 function isBackdropClick(event){
  if(event.target!==dialog)return false;
  const r=dialog.getBoundingClientRect();
  return event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom;
 }
 document.addEventListener('click',event=>{
  if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey||event.button>0)return;
  if(dialog?.open&&enabled()&&(isBackdropClick(event)||event.target.closest('#photo-dialog button'))){event.preventDefault();event.stopPropagation();closePhoto();return;}
  const photo=event.target.closest('a[data-lightbox]');
  if(photo&&enabled()&&dialog){event.preventDefault();event.stopPropagation();openPhoto(photo);return;}
  const link=event.target.closest('a[href]');if(!link||!enabled()||!overlay||link.matches('.skip-link')||link.hasAttribute('download')||link.target==='_blank')return;
  const url=new URL(link.href,location.href);if(url.origin!==location.origin||url.pathname!==location.pathname||url.search!==location.search||!url.hash)return;
  const target=document.getElementById(decodeURIComponent(url.hash.slice(1)));if(!target||!target.closest('main'))return;
  event.preventDefault();event.stopPropagation();navigate(link,target);
 },true);
 dialog?.addEventListener('cancel',event=>{if(enabled()&&!document.hidden){event.preventDefault();closePhoto();}});
 dialog?.addEventListener('close',()=>{const opener=photoOpener;photoOpener=null;opener?.focus({preventScroll:true});resetPhoto();});
 document.addEventListener('keydown',event=>{if(event.key==='Escape'){if(dialog?.open){event.preventDefault();closePhoto();}if(navigation)resetCurtain();}});
 addEventListener('popstate',resetCurtain);
 const buttons=document.querySelector('.path-buttons');let indicator=null;
 if(buttons){indicator=document.createElement('span');indicator.className='path-indicator';indicator.setAttribute('aria-hidden','true');buttons.prepend(indicator);buttons.classList.add('has-indicator');}
 function updatePath(animate=false){
  if(!indicator)return;
  const button=buttons.querySelector('[aria-pressed=true]');if(!button)return;
  const values={x:button.offsetLeft,y:button.offsetTop,width:button.offsetWidth,height:button.offsetHeight};
  gsap.to(indicator,{...values,duration:animate&&enabled()?0.3:0,ease:'power3.out',overwrite:true});
  const panel=document.querySelector('[data-path-panel="'+button.dataset.path+'"]');
  if(animate&&enabled())gsap.fromTo(panel.querySelectorAll('.path-flow>span'),{y:8,opacity:.65},{y:0,opacity:1,duration:.28,stagger:.065,ease:'power2.out',overwrite:true});
 }
 document.addEventListener('portfolio:path-change',()=>updatePath(true));
 let pathFrame=0;
 const schedulePath=()=>{if(!pathFrame)pathFrame=requestAnimationFrame(()=>{pathFrame=0;updatePath();});};
 if(buttons)new ResizeObserver(schedulePath).observe(buttons);schedulePath();
 const stage=document.querySelector('.hero-character');
 const avatar=document.querySelector('.contact-illustration');
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.dataset.inView=String(entry.isIntersecting)),{threshold:.05});
 if(stage)observer.observe(stage);if(avatar)observer.observe(avatar);
 const visibility=()=>root.dataset.pageVisible=String(!document.hidden);visibility();document.addEventListener('visibilitychange',visibility);
 let tiltTween=null;
 stage?.addEventListener('pointermove',event=>{
  if(!enabled()||event.pointerType!=='mouse')return;
  const r=stage.getBoundingClientRect(),x=(event.clientX-r.left)/r.width-.5,y=(event.clientY-r.top)/r.height-.5;
  tiltTween=gsap.to(stage.querySelector('.hero-parallax'),{rotationY:x*7,rotationX:-y*4,x:x*7,y:y*3,duration:.45,ease:'power2.out',overwrite:true});
 });
 stage?.addEventListener('pointerleave',()=>{if(enabled())tiltTween=gsap.to(stage.querySelector('.hero-parallax'),{rotationX:0,rotationY:0,x:0,y:0,duration:.5,overwrite:true});});
 return {sync(){
  if(!enabled()){
   resetCurtain();proofTween?.kill();tiltTween?.kill();
   panels.forEach(p=>gsap.set(p.querySelectorAll('.proof-preview-media,.proof-preview-copy'),{clearProps:'transform,opacity,clipPath'}));
   if(stage)gsap.set(stage.querySelector('.hero-parallax'),{clearProps:'transform'});
   if(dialog?.open){photoTween?.kill();gsap.set(image,{clearProps:'transform,opacity'});dialog.classList.remove('is-zooming');dialog.style.removeProperty('--dialog-shade');closing=false;}
   gsap.killTweensOf('.path-flow>span');gsap.set('.path-flow>span',{clearProps:'transform,opacity'});
  }
  updatePath();
 }};
}
