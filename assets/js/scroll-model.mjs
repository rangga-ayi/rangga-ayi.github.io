// Distance, rather than time, makes the visual retrace its path on reverse scroll.
export function continuousScene(distance,compact=false){
 const d=Number.isFinite(distance)?distance:0;
 const phase=d/(compact?310:430),range=compact?18:44,radius=compact?118:150;
 return {
  x:Math.sin(phase*.73)*range*.65,
  y:Math.sin(phase)*range,
  rotation:Math.sin(phase*.61)*(compact?7:13),
  layerX:Math.sin(phase*.91)*(compact?7:16),
  layerY:Math.cos(phase*.79)*(compact?10:23),
  orbitRotation:d/(compact?16:24),
  packetX:Math.cos(phase*1.2)*radius,
  packetY:Math.sin(phase*1.2)*radius,
  streamOffset:-d*.28
 };
}
