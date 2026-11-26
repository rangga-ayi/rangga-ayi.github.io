export function tabDestination(current,key,count,orientation='vertical'){
 if(!Number.isInteger(count)||count<1)return null;
 if(key==='Home')return 0;
 if(key==='End')return count-1;
 const next=orientation==='vertical'?'ArrowDown':'ArrowRight';
 const previous=orientation==='vertical'?'ArrowUp':'ArrowLeft';
 if(key===next)return (current+1)%count;
 if(key===previous)return (current-1+count)%count;
 return null;
}
