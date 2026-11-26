document.documentElement.classList.add('js');
const menu=document.querySelector('[data-profile-menu]');
if(menu){
 const close=()=>{menu.open=false;};
 menu.addEventListener('click',e=>{if(e.target.closest('a'))close();});
 document.addEventListener('click',e=>{if(!menu.contains(e.target))close();});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.open){e.preventDefault();close();menu.querySelector('summary').focus();}});
}
const header=document.querySelector('.site-header'),sentinel=document.querySelector('#top-sentinel');if(header&&sentinel)new IntersectionObserver(([e])=>header.classList.toggle('is-scrolled',!e.isIntersecting)).observe(sentinel);
if(header)new ResizeObserver(()=>document.documentElement.style.setProperty('--header-height',header.getBoundingClientRect().height+'px')).observe(header);
const dialog=document.querySelector('#photo-dialog');let opener;
if(dialog){document.addEventListener('click',e=>{const a=e.target.closest('a[data-lightbox]');if(!a||!dialog.showModal||e.defaultPrevented||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey||e.button>0)return;e.preventDefault();opener=a;const img=a.querySelector('img');dialog.querySelector('img').src=a.href;dialog.querySelector('img').alt=img.alt;const caption=a.closest('figure')?.querySelector('figcaption')?.textContent||img.alt;dialog.querySelector('p').textContent=caption;dialog.setAttribute('aria-label',caption);dialog.querySelector('[data-original-image]').href=a.href;a.focus({preventScroll:true});dialog.showModal();});dialog.querySelector('button').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>opener?.focus({preventScroll:true}));if(!('closedBy' in HTMLDialogElement.prototype)){dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom)return;dialog.close();});}}
const filters=[...document.querySelectorAll('[data-skill-filter]')];
const skillGrid=document.querySelector('.capability-grid');
filters.forEach(button=>button.addEventListener('click',()=>{
 const category=button.dataset.skillFilter;
 filters.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
 button.scrollIntoView({block:'nearest',inline:'nearest'});
 if(skillGrid)skillGrid.dataset.filtered=String(category!=='all');
 document.querySelectorAll('[data-skill-category]').forEach(card=>{card.hidden=category!=='all'&&card.dataset.skillCategory!==category;});
 document.dispatchEvent(new CustomEvent('portfolio:skill-filter',{detail:{category}}));
 document.dispatchEvent(new Event('portfolio:proof-change'));
}));
if(filters.length)document.querySelector('.skill-filters').hidden=false;
const certTabs=[...document.querySelectorAll('[data-cert-filter]')];
const certTabList=certTabs[0]?.closest('[role="tablist"]');
const certPanel=document.querySelector('#cert-panel');
const certStatus=document.querySelector('#cert-filter-status');
const certCards=[...document.querySelectorAll('[data-cert-category]')];
function activateCertTab(tab,{focus=false}={}){
 const category=tab.dataset.certFilter;
 certTabs.forEach(t=>{
  const on=t===tab;
  t.setAttribute('aria-selected',String(on));
  t.tabIndex=on?0:-1;
 });
 if(focus)tab.focus();
 tab.scrollIntoView({block:'nearest',inline:'nearest'});
 if(certPanel&&tab.id)certPanel.setAttribute('aria-labelledby',tab.id);
 let shown=0;
 certCards.forEach(card=>{
  const visible=category==='all'||card.dataset.certCategory===category;
  card.hidden=!visible;
  if(visible)shown++;
 });
 if(certStatus)certStatus.textContent=`Menampilkan ${shown} dari ${certCards.length} dokumen terverifikasi`;
 document.dispatchEvent(new Event('portfolio:proof-change'));
}
if(certTabs.length){
 certTabs.forEach((tab,index)=>{
  tab.addEventListener('click',()=>activateCertTab(tab));
  tab.addEventListener('keydown',e=>{
   let next=-1;
   if(e.key==='ArrowRight')next=(index+1)%certTabs.length;
   else if(e.key==='ArrowLeft')next=(index-1+certTabs.length)%certTabs.length;
   else if(e.key==='Home')next=0;
   else if(e.key==='End')next=certTabs.length-1;
   else return;
   e.preventDefault();
   activateCertTab(certTabs[next],{focus:true});
  });
 });
 if(certTabList)certTabList.closest('.cert-controls')?.removeAttribute('hidden');
}
const paths=[...document.querySelectorAll('[data-path]')];
function selectPath(key){paths.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.path===key)));document.querySelectorAll('[data-path-panel]').forEach(panel=>panel.hidden=panel.dataset.pathPanel!==key);document.dispatchEvent(new CustomEvent('portfolio:path-change',{detail:{key}}));}
paths.forEach(button=>button.addEventListener('click',()=>selectPath(button.dataset.path)));
if(paths.length){selectPath(paths.find(b=>b.getAttribute('aria-pressed')==='true')?.dataset.path||paths[0].dataset.path);document.querySelector('.path-buttons').hidden=false;}
