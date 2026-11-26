import {surfaceLevel,riseLevel,surfacePolygon,surfacePath} from './surface-model.mjs';

/* Signal surfaces split a stage into a light upper room and a plum depth. Decorative:
   the stage reads the same without them; motion only raises the level and adds a ripple. */
const surfaces=new Map();
let ripple=false,frame=0,last=0,time=0;

function measure(item){
 const {stage}=item,box=stage.getBoundingClientRect();
 item.width=stage.offsetWidth;item.height=stage.offsetHeight;
 item.rest=item.restFrom(stage,box);
 item.clones=[...stage.querySelectorAll('[data-surface-clone]')].map(el=>{
  const r=el.getBoundingClientRect();return {el,box:{left:r.left-box.left,top:r.top-box.top,width:r.width,height:r.height}};
 });
}

function render(item){
 const {width,height,progress,amplitude,phase}=item;if(!width||!height)return;
 const level=(item.rise?riseLevel:surfaceLevel)(progress,{rest:item.rest,height});item.level=level;
 const a=amplitude(width);
 item.back.style.clipPath=surfacePolygon({width,height,level:level-a*1.25,time:time*.8,amplitude:a*.85,phase:phase+1.9});
 item.front.style.clipPath=surfacePolygon({width,height,level,time,amplitude:a,phase});
 item.line.setAttribute('viewBox',`0 0 ${width} ${height}`);
 item.line.firstElementChild.setAttribute('d',surfacePath({width,level,time,amplitude:a,phase}));
 for(const {el,box} of item.clones)el.style.clipPath=surfacePolygon({width,height,level,time,amplitude:a,phase,box});
 item.stage.dataset.surfaceCovered=String(level<=0);
}

function loop(now){
 frame=0;const dt=Math.min(.05,(now-(last||now))/1000);last=now;time+=dt;
 let active=false;
 for(const item of surfaces.values())if(item.visible){render(item);active=true;}
 if(ripple&&active&&!document.hidden)frame=requestAnimationFrame(loop);else last=0;
}
function wake(){if(ripple&&!frame&&!document.hidden){last=0;frame=requestAnimationFrame(loop);}}

export function registerSurface(name,stage,{restFrom,amplitude=w=>Math.max(8,Math.min(18,w*.012)),phase=0,rise=false}={}){
 if(!stage||surfaces.has(name))return;
 const layer=document.createElement('div');layer.className='signal-surface';layer.setAttribute('aria-hidden','true');
 layer.innerHTML='<div class="surface-back"></div><div class="surface-front"></div><svg class="surface-line" preserveAspectRatio="none"><path/></svg>';
 stage.prepend(layer);
 const item={name,stage,restFrom,amplitude,phase,rise,progress:rise?1:0,visible:true,back:layer.children[0],front:layer.children[1],line:layer.children[2]};
 surfaces.set(name,item);
 const update=()=>{measure(item);render(item);};
 new ResizeObserver(update).observe(stage);
 new IntersectionObserver(([entry])=>{item.visible=entry.isIntersecting;if(item.visible)wake();}).observe(stage);
 document.fonts?.ready.then(update);
 update();stage.classList.add('surface-ready');
}

export const surfaceControl={
 setProgress(name,progress){const item=surfaces.get(name);if(!item)return;item.progress=progress;if(!frame)render(item);},
 setRipple(on){ripple=Boolean(on);if(ripple)wake();else if(frame){cancelAnimationFrame(frame);frame=0;last=0;}},
 refresh(){for(const item of surfaces.values()){measure(item);render(item);}},
 level(name){return surfaces.get(name)?.level;}
};
document.addEventListener('visibilitychange',wake);
