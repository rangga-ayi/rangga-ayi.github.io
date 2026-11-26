// Explicit visitor preference takes precedence; otherwise use the OS preference.
export function motionEnabled(preference,reducedMotion=false){
 if(preference==='off')return false;
 if(preference==='on')return true;
 return !reducedMotion;
}

// Only hold an intro that fits above the fold. Reading space wins on small screens.
export function introLayout({width,height,headerHeight,sceneHeight,enabled=true}){
 const values=[width,height,headerHeight,sceneHeight];
 if(!enabled||values.some(n=>!Number.isFinite(n)||n<0)||width<1000||sceneHeight<=0||sceneHeight+headerHeight+12>height)return {hold:false,travel:0};
 return {hold:true,travel:Math.min(420,Math.max(240,height*.42))};
}

// A numeric start avoids a negative viewport-relative start on short desktops.
export function introRange({sectionTop,headerHeight,height,width,travel=0}){
 const start=Math.max(0,(Number.isFinite(sectionTop)?sectionTop:0)-(Number.isFinite(headerHeight)?headerHeight:0));
 const distance=travel>0?travel:width<=700?Math.min(280,height*.3):Math.min(420,Math.max(220,height*.38));
 return {start,end:start+Math.max(1,Number.isFinite(distance)?distance:240)};
}
export function introPose(progress){
 const p=Number.isFinite(progress)?Math.max(0,Math.min(1,progress)):0;
 return p<.43?'wave':p<.75?'inspect':'present';
}
