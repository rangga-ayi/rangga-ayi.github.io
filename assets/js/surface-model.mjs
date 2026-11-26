// The signal surface: two slow sine waves around a level that scroll can raise.
export function waveY(x,{level,width,time=0,amplitude=14,phase=0}){
 const w=Math.max(1,width),a=Number.isFinite(amplitude)?amplitude:0;
 return level+a*Math.sin(x/w*Math.PI*2*1.15+phase+time*.9)+a*.45*Math.sin(x/w*Math.PI*2*2.7+phase*1.7-time*1.3);
}

// Rest level crosses the title's last line; full progress lifts it above the stage.
export function surfaceLevel(progress,{rest,height}){
 const p=Number.isFinite(progress)?Math.max(0,Math.min(1,progress)):0;
 const eased=p*p*(3-2*p),top=-.14*Math.max(1,height);
 return rest+(top-rest)*eased;
}

// A closing surface rises from below the stage to its rest level as the stage arrives.
export function riseLevel(progress,{rest,height}){
 const p=Number.isFinite(progress)?Math.max(0,Math.min(1,progress)):1;
 const eased=p*p*(3-2*p),bottom=Math.max(1,height)+Math.max(40,height*.08);
 return bottom+(rest-bottom)*eased;
}

// Polygon below the wave, in the coordinates of a box placed at (left, top) inside the stage.
export function surfacePolygon({width,height,level,time=0,amplitude=14,phase=0,steps=28,box=null}){
 const b=box||{left:0,top:0,width,height},points=[];
 const n=Math.max(4,Math.round(steps));
 for(let i=0;i<=n;i++){
  const x=b.left+b.width*i/n,y=waveY(x,{level,width,time,amplitude,phase})-b.top;
  points.push(`${round(x-b.left)}px ${round(y)}px`);
 }
 points.push(`${round(b.width)}px ${round(Math.max(b.height,0)+2)}px`,`0px ${round(Math.max(b.height,0)+2)}px`);
 return `polygon(${points.join(',')})`;
}

export function surfacePath({width,level,time=0,amplitude=14,phase=0,steps=28}){
 const n=Math.max(4,Math.round(steps));let d='';
 for(let i=0;i<=n;i++){const x=width*i/n;d+=(i?'L':'M')+round(x)+' '+round(waveY(x,{level,width,time,amplitude,phase}));}
 return d;
}

function round(n){return Number.isFinite(n)?Math.round(n*10)/10:0;}
