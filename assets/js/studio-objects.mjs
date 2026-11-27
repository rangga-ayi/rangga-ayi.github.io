/* 10.2 — crafted miniatures: sage-opal, deep forest charcoal and vibrant emerald.
   Decorative metaphors only; no raster images, filters or external fetches. */
const NS='http://www.w3.org/2000/svg';
let serial=0;
export function createStudioObject(kind='data'){
 const id='rangga-sculpture-'+serial++;
 const paint=name=>`url(#${id}-${name})`;
 const plum=paint('plum'),side=paint('side'),opal=paint('opal'),gold=paint('gold'),glass=paint('glass');
 const edge='stroke="#E1E4DF" stroke-opacity=".5" stroke-width="1.5" stroke-linejoin="round"';
 const line=(d,color='#8B938B',width=3,extra='')=>`<path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;
 const seal=(x,y,r=27)=>`<g><circle cx="${x+2}" cy="${y+5}" r="${r}" fill="#0B0E0D" opacity=".42"/><circle cx="${x}" cy="${y}" r="${r}" fill="${gold}" stroke="#D9FCEB" stroke-width="1.5"/><circle cx="${x}" cy="${y}" r="${r-5}" fill="none" stroke="#003825" stroke-opacity=".42"/>${line(`M${x-r*.4} ${y}l${r*.27} ${r*.28}l${r*.57} -${r*.6}`,'#002114',3)}</g>`;
 const plinth=`<ellipse cx="220" cy="363" rx="141" ry="31" fill="${side}"/><ellipse cx="220" cy="355" rx="141" ry="31" fill="${glass}" stroke="#8AF8C6" stroke-opacity=".55"/>${line('M101 366Q220 406 340 366',gold,1.7)}`;
 const slab=(y,light=false)=>`<g class="scene-layer">
  <path d="M83 ${y}Q83 ${y-8} 96 ${y-14}L207 ${y-69}Q220 ${y-76} 234 ${y-69}L345 ${y-15}Q358 ${y-8} 358 ${y}V${y+17}Q358 ${y+25} 345 ${y+31}L235 ${y+85}Q220 ${y+92} 207 ${y+85}L96 ${y+32}Q83 ${y+25} 83 ${y+17}Z" fill="${side}" ${edge}/>
  <path d="M96 ${y-14}L207 ${y-69}Q220 ${y-76} 234 ${y-69}L345 ${y-15}Q368 ${y-4} 345 ${y+8}L235 ${y+62}Q220 ${y+69} 207 ${y+62}L96 ${y+8}Q73 ${y-3} 96 ${y-14}Z" fill="${light?opal:plum}" ${edge}/>
  ${line(`M94 ${y+14}L208 ${y+70}Q220 ${y+75} 232 ${y+70}L346 ${y+15}`,'#8AF8C6',1.4)}${line(`M263 ${y+61}l43 -21`,gold,4)}
  <g class="object-fine-detail">${[113,126,139].map((x,i)=>`<circle cx="${x}" cy="${y+26+i*6}" r="2.4" fill="#6FDBAC"/>`).join('')}</g>
 </g>`;
 const port=(x,y)=>`<g><ellipse cx="${x}" cy="${y+5}" rx="28" ry="18" fill="${side}"/><ellipse cx="${x}" cy="${y}" rx="28" ry="18" fill="${opal}" ${edge}/><ellipse cx="${x}" cy="${y}" rx="14" ry="8" fill="${gold}"/>${line(`M${x-18} ${y-8}q18 -9 36 0`,'#FAFDF9',1.4)}</g>`;
 const person=(x,y,scale=1,light=false)=>`<g transform="translate(${x} ${y}) scale(${scale})"><ellipse cx="0" cy="91" rx="49" ry="17" fill="${side}"/><path d="M-43 75V40Q-43 12 0 12T43 40V75Q40 95 0 95T-43 75Z" fill="${light?opal:plum}" ${edge}/>${line('M-32 65V43Q-32 26 -12 24',light?'#FAFDF9':'#8AF8C6',2)}<ellipse cx="0" cy="-18" rx="29" ry="34" fill="${light?paint('pearl'):paint('sphere')}" ${edge}/><path d="M-18 -29Q-12 -45 5 -45" stroke="#FAFDF9" stroke-opacity=".65" stroke-width="2.5" stroke-linecap="round"/><path d="M-11 17Q0 24 11 17" stroke="${gold}" stroke-width="5" stroke-linecap="round"/></g>`;
 const motifs={
  data:slab(269)+slab(209)+slab(149,true)+`<g class="scene-layer"><path d="M131 143L209 105Q220 99 231 105L303 140Q312 145 302 151L227 187Q218 191 209 186L132 149Q125 146 131 143Z" fill="${glass}" stroke="#6FDBAC"/>${line('M153 143l54 -26M168 151l70 -34M184 159l50 -24','#8AF8C6',2.6)}${seal(305,190,31)}</g>`,
  ledger:`<g class="scene-layer"><g transform="rotate(-8 220 220)">
   <rect x="119" y="76" width="210" height="282" rx="27" fill="${side}" stroke="#2D4A3B"/><rect x="109" y="66" width="210" height="282" rx="27" fill="${plum}" ${edge}/><rect x="124" y="82" width="180" height="249" rx="16" fill="${opal}" stroke="#FAFDF9"/>
   <rect x="172" y="62" width="86" height="35" rx="12" fill="#0B0E0D" opacity=".18"/><rect x="168" y="55" width="88" height="34" rx="12" fill="${gold}" stroke="#D9FCEB"/><rect x="186" y="64" width="52" height="8" rx="4" fill="#003825" opacity=".45"/>
   ${line('M147 119H235','#006C4C',6)}${line('M147 135H274','#717972',3)}
   ${[174,224,274].map(y=>`<rect x="146" y="${y-12}" width="27" height="27" rx="9" fill="${plum}"/>${line(`M153 ${y+1}l5 5l9 -11`,'#D9FCEB',2.5)}${line(`M188 ${y-3}h82`,'#414942',4)}${line(`M188 ${y+9}h58`,'#717972',3)}`).join('')}
   ${line('M120 97V313Q120 339 144 339','#8AF8C6',1.5)}
  </g></g><g class="scene-layer"><g transform="rotate(21 330 231)"><rect x="322" y="144" width="16" height="161" rx="8" fill="${gold}"/><rect x="325" y="148" width="4" height="129" rx="2" fill="#D9FCEB" opacity=".65"/><path d="M322 300L330 319L338 300Z" fill="${side}"/></g></g>`,
  device:`${plinth}<g class="scene-layer"><g transform="rotate(-6 220 220)">
   <rect x="126" y="70" width="195" height="263" rx="31" fill="${side}" stroke="#2D4A3B"/><rect x="112" y="58" width="195" height="263" rx="31" fill="${plum}" ${edge}/><rect x="126" y="73" width="167" height="235" rx="22" fill="${glass}" stroke="#8AF8C6" stroke-opacity=".6"/>
   <rect x="138" y="86" width="143" height="79" rx="13" fill="${side}" stroke="#2D4A3B"/><path d="M144 93H273V119L144 147Z" fill="${paint('shine')}"/>${line('M151 129h24l11 -17l17 34l16 -25h48',gold,3)}
   <rect x="138" y="181" width="76" height="92" rx="18" fill="${side}" stroke="#41755A"/>${line('M151 251v-34c0 -28 49 -28 49 0v35M160 250v-33c0 -16 31 -16 31 0v37M169 248v-29q6 -9 13 0v34','#8AF8C6',2.5)}
   <circle cx="248" cy="213" r="27" fill="${gold}" stroke="#D9FCEB"/><circle cx="248" cy="213" r="20" fill="${side}"/><circle cx="248" cy="213" r="12" fill="${paint('lens')}"/><circle cx="244" cy="208" r="4" fill="#FAFDF9" opacity=".85"/>${line('M236 255h24',gold,4)}
   <g class="object-fine-detail">${[156,168,180].map(x=>`<circle cx="${x}" cy="291" r="2.7" fill="#6FDBAC"/>`).join('')}${line('M235 289h31','#41755A',2)}</g>${line('M120 90V282Q120 311 142 313','#8AF8C6',1.3)}
  </g></g>`,
  network:`<g class="scene-layer">
   ${line('M110 138V191Q110 206 127 212L220 245L314 212Q331 206 331 190V137',side,13)}${line('M110 138V191Q110 206 127 212L220 245L314 212Q331 206 331 190V137',gold,3)}${line('M220 245L116 300M220 245L330 300',side,13)}${line('M220 245L116 300M220 245L330 300',gold,3)}
   ${port(110,129)}${port(331,129)}${port(110,307)}${port(331,307)}
   <path d="M156 204L212 176Q220 172 229 176L286 205V268Q286 275 278 279L229 305Q220 309 212 305L164 280Q156 276 156 269Z" fill="${side}" ${edge}/><path d="M156 204L213 176Q220 172 229 176L286 205L230 236Q220 242 210 236Z" fill="${plum}" ${edge}/><path d="M220 242L286 205V268Q286 275 278 279L220 309Z" fill="${glass}"/>
   <path d="M178 205L217 185Q221 183 225 185L264 205L224 226Q220 228 216 226Z" fill="${gold}"/><path d="M191 204L221 189L251 204L221 220Z" fill="${opal}"/>${line('M171 244l29 15M171 258l29 15','#8AF8C6',3)}<g class="object-fine-detail">${[247,259,271].map((x,i)=>`<circle cx="${x}" cy="${263-i*6}" r="2.6" fill="#6FDBAC"/>`).join('')}</g>
  </g>`,
  database:`<g class="scene-layer"><path d="M112 130H328V302C328 359 112 359 112 302Z" fill="${side}" ${edge}/>
   ${[268,203,138].map(y=>`<path d="M112 ${y}V${y+38}C112 ${y+91} 328 ${y+91} 328 ${y+38}V${y}Z" fill="${paint('cylinder')}" stroke="#6FDBAC" stroke-width="1.4"/><ellipse cx="220" cy="${y}" rx="108" ry="36" fill="${plum}" ${edge}/>${line(`M128 ${y+42}C162 ${y+76} 290 ${y+76} 315 ${y+42}`,'#8AF8C6',1.3)}<path d="M141 ${y+22}V${y+53}Q156 ${y+64} 168 ${y+66}V${y+32}Z" fill="#FAFDF9" opacity=".12"/>${line(`M271 ${y+58}l21 -8`,gold,4)}`).join('')}
   <ellipse cx="220" cy="138" rx="85" ry="27" fill="${opal}" stroke="#FAFDF9"/><ellipse cx="220" cy="138" rx="48" ry="15" fill="${glass}" stroke="#8AF8C6"/>${line('M205 137l10 5l20 -10',gold,3.5)}
  </g>`,
  papers:`<g class="scene-layer"><g transform="rotate(9 220 220)"><rect x="122" y="75" width="204" height="281" rx="19" fill="${plum}" ${edge}/>${line('M140 92h169v246','#6FDBAC',1.5)}</g></g><g class="scene-layer"><g transform="rotate(-7 220 220)">
   <path d="M128 73H266L308 116V332Q308 350 290 350H128Q110 350 110 331V92Q110 73 128 73Z" fill="${side}" transform="translate(5 7)"/><path d="M128 73H266L308 116V332Q308 350 290 350H128Q110 350 110 331V92Q110 73 128 73Z" fill="${opal}" ${edge}/><path d="M266 73V103Q266 116 280 116H308" fill="#C1C8C0" stroke="#FAFDF9"/>
   ${line('M128 99v231h160V137','#717972',1.5)}${line('M151 126h73','#006C4C',5)}${line('M151 145h111','#414942',3)}${line('M151 181h113M151 196h96M151 211h113M151 226h69','#717972',3)}<path d="M210 280l-10 58l24 -14l23 17l-4 -62" fill="${plum}" stroke="#6FDBAC"/>${seal(226,275,34)}
  </g></g>`,
  people:`<g class="scene-layer">${plinth}${line('M113 290Q220 346 327 290',gold,2.5)}${person(120,205,.84)}${person(319,205,.84)}</g><g class="scene-layer">${person(220,239,1.03,true)}</g>`,
  contact:`<g class="scene-layer"><g transform="rotate(-7 220 220)">
   <path d="M86 166L206 79Q220 68 235 79L354 166V320H86Z" fill="${side}" ${edge}/><rect x="127" y="92" width="184" height="224" rx="17" fill="${opal}" ${edge}/>${line('M150 123h91','#006C4C',5)}${line('M150 145h134M150 163h114','#414942',3)}
   <path d="M86 164L220 252L354 164V318Q354 340 332 340H108Q86 340 86 318Z" fill="${plum}" ${edge}/><path d="M88 170L199 252L89 323M352 170L241 252L351 323" fill="${glass}" stroke="#8AF8C6" stroke-width="1.4"/><path d="M99 331L205 248Q220 237 235 248L342 331" fill="${plum}" stroke="#8AF8C6" stroke-width="1.4"/>${line('M105 333h229','#D9FCEB',1)}
  </g></g><g class="scene-layer"><circle cx="319" cy="292" r="37" fill="${gold}" stroke="#D9FCEB" stroke-width="2"/><circle cx="319" cy="292" r="30" fill="none" stroke="#003825" stroke-opacity=".5"/>${line('M303 292h29M321 280l12 12l-12 12','#002114',3.5)}</g>`
 };
 const selected=Object.hasOwn(motifs,kind)?kind:'data';
 const svg=document.createElementNS(NS,'svg');
 svg.setAttribute('viewBox','0 0 440 440');svg.setAttribute('fill','none');
 svg.setAttribute('aria-hidden','true');svg.setAttribute('focusable','false');
 svg.setAttribute('data-object-kind',selected);svg.classList.add('studio-object');
 svg.innerHTML=`<defs>
  <linearGradient id="${id}-plum" x1="0" y1="0" x2=".8" y2="1"><stop stop-color="#8AF8C6"/><stop offset=".22" stop-color="#6FDBAC"/><stop offset=".56" stop-color="#006C4C"/><stop offset="1" stop-color="#003825"/></linearGradient>
  <linearGradient id="${id}-side" x1="0" y1="0" x2="1" y2=".85"><stop stop-color="#252A27"/><stop offset=".45" stop-color="#171B19"/><stop offset="1" stop-color="#0B0E0D"/></linearGradient>
  <linearGradient id="${id}-opal" x1=".1" y1="0" x2=".9" y2="1"><stop stop-color="#FFFFFF"/><stop offset=".42" stop-color="#F3F7F1"/><stop offset="1" stop-color="#D6DBD4"/></linearGradient>
  <linearGradient id="${id}-gold" x1="0" y1="0" x2="1" y2=".8"><stop stop-color="#D9FCEB"/><stop offset=".3" stop-color="#8AF8C6"/><stop offset=".62" stop-color="#00855E"/><stop offset="1" stop-color="#6FDBAC"/></linearGradient>
  <linearGradient id="${id}-glass" x1="0" y1="0" x2=".85" y2="1"><stop stop-color="#D9FCEB" stop-opacity=".9"/><stop offset=".48" stop-color="#26A679" stop-opacity=".75"/><stop offset="1" stop-color="#0B261C" stop-opacity=".95"/></linearGradient>
  <linearGradient id="${id}-cylinder" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#17271F"/><stop offset=".22" stop-color="#44B88A"/><stop offset=".48" stop-color="#006C4C"/><stop offset=".8" stop-color="#101412"/><stop offset="1" stop-color="#1B2D24"/></linearGradient>
  <linearGradient id="${id}-shine" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#FAFDF9" stop-opacity=".28"/><stop offset="1" stop-color="#FAFDF9" stop-opacity="0"/></linearGradient>
  <radialGradient id="${id}-sphere" cx=".3" cy=".2" r=".85"><stop stop-color="#D9FCEB"/><stop offset=".35" stop-color="#6FDBAC"/><stop offset=".72" stop-color="#006C4C"/><stop offset="1" stop-color="#0B261C"/></radialGradient>
  <radialGradient id="${id}-pearl" cx=".3" cy=".2" r=".85"><stop stop-color="#FFFFFF"/><stop offset=".4" stop-color="#EDF2EB"/><stop offset="1" stop-color="#8B938B"/></radialGradient>
  <radialGradient id="${id}-lens" cx=".3" cy=".25" r=".85"><stop stop-color="#8AF8C6"/><stop offset=".35" stop-color="#00855E"/><stop offset="1" stop-color="#0B0E0D"/></radialGradient>
  <radialGradient id="${id}-shadow"><stop stop-color="#0B0E0D" stop-opacity=".48"/><stop offset="1" stop-color="#0B0E0D" stop-opacity="0"/></radialGradient>
  <radialGradient id="${id}-halo"><stop stop-color="#6FDBAC" stop-opacity=".15"/><stop offset="1" stop-color="#006C4C" stop-opacity="0"/></radialGradient>
 </defs><ellipse cx="220" cy="383" rx="158" ry="26" fill="${paint('shadow')}"/>
 <g class="scene-orbits"><circle cx="220" cy="220" r="195" fill="${paint('halo')}"/><circle cx="220" cy="220" r="187" stroke="#8AF8C6" stroke-opacity=".2"/>${line('M56 132A187 187 0 0 1 116 64',gold,1.5,'opacity=".6"')}<circle cx="359" cy="94" r="3.5" fill="${gold}" opacity=".85"/></g>
 <circle class="scene-stream" cx="220" cy="220" r="187" stroke="${gold}" stroke-width="1.7" stroke-dasharray="26 1150" stroke-opacity=".55"/>
 <circle class="scene-packet" cx="220" cy="220" r="3.2" fill="${gold}"/>
 <g class="scene-object">${motifs[selected]}</g>`;
 return svg;
}

const SKILL_SPECS={
 mikrotik:{
  tag:'TCP/IP · VLAN · ROUTER',
  lines:['/interface vlan add name=vlan-lan vlan-id=10','/ip dhcp-server setup · subnet /24 [OK]'],
  draw:(c,m,t)=>`
   <rect x="20" y="16" width="84" height="32" rx="6" fill="#171B19" stroke="${c}" stroke-width="1.5"/>
   <text x="62" y="36" text-anchor="middle" fill="#E1E4DF" font-size="10" font-family="${t}">ISP / WAN</text>
   <line x1="104" y1="32" x2="146" y2="32" stroke="${c}" stroke-width="1.6"/>
   <rect x="146" y="10" width="96" height="44" rx="7" fill="#1B201D" stroke="#8AF8C6" stroke-width="1.8"/>
   <text x="194" y="29" text-anchor="middle" fill="#FFFFFF" font-size="10.5" font-weight="600" font-family="${t}">MikroTik</text>
   <text x="194" y="43" text-anchor="middle" fill="${c}" font-size="8.5" font-family="${t}">NAT · Firewall</text>
   <path d="M194 54 V70 M90 70 H298 M90 70 V82 M194 70 V82 M298 70 V82" fill="none" stroke="${m}" stroke-width="1.4" stroke-dasharray="3 2"/>
   <rect x="44" y="82" width="92" height="24" rx="5" fill="#101412" stroke="${c}" stroke-width="1.3"/>
   <text x="90" y="98" text-anchor="middle" fill="#8AF8C6" font-size="9" font-family="${t}">VLAN 10 · Office</text>
   <rect x="148" y="82" width="92" height="24" rx="5" fill="#101412" stroke="${c}" stroke-width="1.3"/>
   <text x="194" y="98" text-anchor="middle" fill="#8AF8C6" font-size="9" font-family="${t}">VLAN 20 · CCTV</text>
   <rect x="252" y="82" width="92" height="24" rx="5" fill="#101412" stroke="${m}" stroke-width="1.3"/>
   <text x="298" y="98" text-anchor="middle" fill="#D5E2D7" font-size="9" font-family="${t}">DHCP .0/24</text>`
 },
 cabling:{
  tag:'UTP · T568B · CCTV',
  lines:['EIA/TIA-568B · PIN 1-2-3-6 LINK UP','PATCH CABLE UTP -> RJ-45 -> CCTV [OK]'],
  draw:(c,m,t)=>`
   <rect x="24" y="16" width="134" height="82" rx="7" fill="#101412" stroke="${c}" stroke-width="1.5"/>
   <rect x="42" y="10" width="98" height="10" rx="2" fill="#1B201D" stroke="#8AF8C6" stroke-width="1.2"/>
   ${['#fde68a','#f97316','#bbf7d0','#38bdf8','#bae6fd','#22c55e','#d6c4b0','#9a6b49'].map((col,i)=>`
    <rect x="${34+i*14}" y="22" width="10" height="44" rx="2" fill="${col}" fill-opacity=".85"/>
    <text x="${39+i*14}" y="82" text-anchor="middle" fill="#C1C8C1" font-size="8.5" font-family="${t}">${i+1}</text>`).join('')}
   <text x="91" y="93" text-anchor="middle" fill="${c}" font-size="8" font-family="${t}">RJ-45 T568B</text>
   <path d="M158 57 H212" fill="none" stroke="${c}" stroke-width="2" stroke-dasharray="4 3"/>
   <circle cx="185" cy="57" r="4" fill="#6FDBAC"/>
   <rect x="212" y="18" width="126" height="32" rx="6" fill="#1B201D" stroke="#8AF8C6" stroke-width="1.5"/>
   <text x="275" y="38" text-anchor="middle" fill="#FFFFFF" font-size="10" font-family="${t}">LAN Tester · 1..8 OK</text>
   <rect x="212" y="64" width="126" height="32" rx="6" fill="#101412" stroke="${m}" stroke-width="1.4"/>
   <text x="275" y="84" text-anchor="middle" fill="#8AF8C6" font-size="9.5" font-family="${t}">CCTV &amp; Rak Switch</text>`
 },
 backend:{
  tag:'PHP · MYSQL · API',
  lines:['$stmt = $pdo->prepare("SELECT ... WHERE id=?");','RBAC SESSION + MIDTRANS WEBHOOK SHA-512'],
  draw:(c,m,t)=>`
   <rect x="22" y="16" width="90" height="80" rx="6" fill="#101412" stroke="${c}" stroke-width="1.4"/>
   <rect x="22" y="16" width="90" height="22" rx="6" fill="#1B201D"/>
   <text x="67" y="30" text-anchor="middle" fill="#FFFFFF" font-size="9.5" font-family="${t}">users (RBAC)</text>
   <text x="32" y="52" fill="${c}" font-size="8.5" font-family="${t}">PK id_user</text>
   <text x="32" y="67" fill="#C1C8C1" font-size="8.5" font-family="${t}">role enum</text>
   <text x="32" y="82" fill="#8B938B" font-size="8.5" font-family="${t}">hash pass</text>
   <line x1="112" y1="56" x2="140" y2="56" stroke="${c}" stroke-width="1.6"/>
   <rect x="140" y="16" width="96" height="80" rx="6" fill="#101412" stroke="#8AF8C6" stroke-width="1.6"/>
   <rect x="140" y="16" width="96" height="22" rx="6" fill="#252A27"/>
   <text x="188" y="30" text-anchor="middle" fill="#FFFFFF" font-size="9.5" font-family="${t}">orders (CRUD)</text>
   <text x="150" y="52" fill="${c}" font-size="8.5" font-family="${t}">PK id_order</text>
   <text x="150" y="67" fill="#C1C8C1" font-size="8.5" font-family="${t}">FK id_user</text>
   <text x="150" y="82" fill="#8B938B" font-size="8.5" font-family="${t}">status_bayar</text>
   <line x1="236" y1="56" x2="262" y2="56" stroke="${c}" stroke-width="1.6"/>
   <rect x="262" y="24" width="80" height="64" rx="6" fill="#171B19" stroke="${m}" stroke-width="1.4"/>
   <text x="302" y="47" text-anchor="middle" fill="#FFFFFF" font-size="9.5" font-family="${t}">Midtrans</text>
   <text x="302" y="63" text-anchor="middle" fill="${c}" font-size="8.5" font-family="${t}">Webhook</text>
   <text x="302" y="77" text-anchor="middle" fill="#8AF8C6" font-size="8.5" font-family="${t}">SHA-512</text>`
 },
 linux:{
  tag:'DEBIAN · LAMP · CLI',
  lines:['systemctl status apache2 mariadb · [active]','PORTS 80 / 443 / 3306 · DNS & LOG CHECK'],
  draw:(c,m,t)=>`
   <rect x="26" y="12" width="308" height="88" rx="8" fill="#0B0E0D" stroke="${c}" stroke-width="1.5"/>
   <path d="M26 30 H334" stroke="#253A2E" stroke-width="1"/>
   <circle cx="40" cy="21" r="3" fill="#6FDBAC"/><circle cx="51" cy="21" r="3" fill="#717972"/><circle cx="62" cy="21" r="3" fill="#3F4541"/>
   <text x="180" y="24" text-anchor="middle" fill="#D5E2D7" font-size="8.5" font-family="${t}">debian-server:~#</text>
   <text x="40" y="48" fill="${c}" font-size="9.5" font-family="${t}">$ systemctl status apache2 mariadb</text>
   <rect x="40" y="58" width="84" height="28" rx="4" fill="#171B19" stroke="#6FDBAC" stroke-width="1.2"/>
   <text x="82" y="76" text-anchor="middle" fill="#E1E4DF" font-size="9" font-family="${t}">apache2 :80</text>
   <rect x="136" y="58" width="88" height="28" rx="4" fill="#171B19" stroke="#8AF8C6" stroke-width="1.2"/>
   <text x="180" y="76" text-anchor="middle" fill="#E1E4DF" font-size="9" font-family="${t}">php-fpm</text>
   <rect x="236" y="58" width="84" height="28" rx="4" fill="#171B19" stroke="${m}" stroke-width="1.2"/>
   <text x="278" y="76" text-anchor="middle" fill="#E1E4DF" font-size="9" font-family="${t}">mysql :3306</text>`
 },
 pc:{
  tag:'ATX · POST · WINDOWS',
  lines:['DIAGNOSIS: BOOT · RAM · STORAGE · PSU','PC BUILD + WINDOWS OS & DRIVER CHECK'],
  draw:(c,m,t)=>`
   <rect x="28" y="14" width="144" height="86" rx="7" fill="#101412" stroke="${c}" stroke-width="1.5"/>
   <rect x="42" y="26" width="54" height="46" rx="4" fill="#1B201D" stroke="#8AF8C6" stroke-width="1.5"/>
   <text x="69" y="53" text-anchor="middle" fill="#FFFFFF" font-size="10" font-family="${t}">CPU</text>
   <rect x="108" y="26" width="16" height="46" rx="2" fill="#171B19" stroke="${c}" stroke-width="1.2"/>
   <rect x="130" y="26" width="16" height="46" rx="2" fill="#171B19" stroke="${c}" stroke-width="1.2"/>
   <text x="127" y="88" text-anchor="middle" fill="${c}" font-size="8.5" font-family="${t}">DIMM + NVMe</text>
   <path d="M172 38 H214 M172 72 H214" fill="none" stroke="${m}" stroke-width="1.5"/>
   <rect x="214" y="20" width="118" height="30" rx="5" fill="#171B19" stroke="#8AF8C6" stroke-width="1.4"/>
   <text x="273" y="39" text-anchor="middle" fill="#E1E4DF" font-size="9.5" font-family="${t}">PSU &amp; POST [OK]</text>
   <rect x="214" y="60" width="118" height="30" rx="5" fill="#101412" stroke="${c}" stroke-width="1.4"/>
   <text x="273" y="79" text-anchor="middle" fill="#8AF8C6" font-size="9.5" font-family="${t}">OS &amp; Driver</text>`
 },
 iot:{
  tag:'ESP32 · RFID · RELAY',
  lines:['SPI RC522 -> ESP32 -> RELAY -> SOLENOID 12V','VL53L0X + TELEGRAM OTP VERIFIED'],
  draw:(c,m,t)=>`
   <rect x="24" y="22" width="76" height="68" rx="6" fill="#101412" stroke="${m}" stroke-width="1.4"/>
   <text x="62" y="50" text-anchor="middle" fill="#FFFFFF" font-size="9.5" font-family="${t}">RFID</text>
   <text x="62" y="66" text-anchor="middle" fill="${c}" font-size="8.5" font-family="${t}">RC522 · SPI</text>
   <line x1="100" y1="56" x2="132" y2="56" stroke="${c}" stroke-width="1.6"/>
   <rect x="132" y="14" width="96" height="84" rx="7" fill="#1B201D" stroke="#8AF8C6" stroke-width="1.8"/>
   <text x="180" y="42" text-anchor="middle" fill="#FFFFFF" font-size="10.5" font-weight="600" font-family="${t}">ESP32</text>
   <text x="180" y="59" text-anchor="middle" fill="${c}" font-size="8.5" font-family="${t}">Wi-Fi + OTP</text>
   <text x="180" y="75" text-anchor="middle" fill="#C1C8C1" font-size="8.5" font-family="${t}">GPIO · I2C</text>
   <line x1="228" y1="56" x2="258" y2="56" stroke="${c}" stroke-width="1.6"/>
   <rect x="258" y="22" width="80" height="30" rx="5" fill="#101412" stroke="${c}" stroke-width="1.4"/>
   <text x="298" y="41" text-anchor="middle" fill="#8AF8C6" font-size="9" font-family="${t}">Relay 5V</text>
   <rect x="258" y="60" width="80" height="30" rx="5" fill="#101412" stroke="${m}" stroke-width="1.4"/>
   <text x="298" y="79" text-anchor="middle" fill="#E1E4DF" font-size="9" font-family="${t}">Lock 12V</text>`
 },
 sec:{
  tag:'VM · PFSENSE · LAB',
  lines:['[AKADEMIK] PROXMOX / VMWARE GUEST LAB','PFSENSE FIREWALL + WAZUH / SURICATA'],
  draw:(c,m,t)=>`
   <rect x="24" y="16" width="88" height="78" rx="6" fill="#171B19" stroke="#8AF8C6" stroke-width="1.5"/>
   <text x="68" y="47" text-anchor="middle" fill="#FFFFFF" font-size="10" font-family="${t}">pfSense</text>
   <text x="68" y="64" text-anchor="middle" fill="${c}" font-size="8.5" font-family="${t}">Firewall</text>
   <text x="68" y="78" text-anchor="middle" fill="#8B938B" font-size="8" font-family="${t}">WAN -> LAN</text>
   <line x1="112" y1="55" x2="140" y2="55" stroke="${c}" stroke-width="1.6"/>
   <rect x="140" y="14" width="110" height="82" rx="6" fill="#101412" stroke="${c}" stroke-width="1.5"/>
   <text x="195" y="32" text-anchor="middle" fill="#FFFFFF" font-size="9.5" font-family="${t}">VMware / Proxmox</text>
   <rect x="152" y="42" width="40" height="42" rx="4" fill="#1B201D" stroke="${m}" stroke-width="1.2"/>
   <text x="172" y="66" text-anchor="middle" fill="#8AF8C6" font-size="8.5" font-family="${t}">VM 1</text>
   <rect x="198" y="42" width="40" height="42" rx="4" fill="#1B201D" stroke="${m}" stroke-width="1.2"/>
   <text x="218" y="66" text-anchor="middle" fill="#8AF8C6" font-size="8.5" font-family="${t}">VM 2</text>
   <line x1="250" y1="55" x2="274" y2="55" stroke="${m}" stroke-width="1.5" stroke-dasharray="3 2"/>
   <rect x="274" y="24" width="64" height="62" rx="6" fill="#0B0E0D" stroke="${c}" stroke-width="1.3"/>
   <text x="306" y="49" text-anchor="middle" fill="#E1E4DF" font-size="9" font-family="${t}">Wazuh</text>
   <text x="306" y="64" text-anchor="middle" fill="${c}" font-size="8.5" font-family="${t}">Suricata</text>`
 }
};

export function getSkillSpec(key='mikrotik'){
 return SKILL_SPECS[key]||SKILL_SPECS.mikrotik;
}

export function createSkillBlueprint(key='mikrotik'){
 const spec=getSkillSpec(key);
 const svg=document.createElementNS(NS,'svg');
 svg.setAttribute('viewBox','0 0 360 112');
 svg.setAttribute('fill','none');
 svg.setAttribute('aria-hidden','true');
 svg.setAttribute('focusable','false');
 svg.setAttribute('data-skill-key',key in SKILL_SPECS?key:'mikrotik');
 svg.classList.add('blueprint-svg');
 svg.innerHTML=spec.draw('#6FDBAC','#3BA87C',"'JetBrains Mono', ui-monospace, monospace");
 return svg;
}
