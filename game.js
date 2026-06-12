/* ===================== TINY EMPIRES (Phaser 3) ===================== */

/* ---------- palette ---------- */
const PARCH=0xf4e8cf, PARCH2=0xecdcb5, INK='#3a2c1a', HEAD='#5a3a12', MUTE='#5d4a2c';
const GREEN=0x4a7c3a, BLUE=0x2f6f8f, PURPLE=0x7a4a8f, GOLD=0xb8860b, RED=0xa23b2e, BORDER=0xcbb27e;
const FONT='Trebuchet MS, Segoe UI, sans-serif';

/* ---------- data: civilizations ---------- */
const AGES=["Antiquity","Exploration","Modern"];

const CIVS=[
  {id:"egypt",name:"Egypt",emoji:"🏺",bonus:{culture:2},desc:"Builders (+2 build/turn)"},
  {id:"rome",name:"Rome",emoji:"🏛️",bonus:{food:1,science:1,culture:1},desc:"Balanced (+1 to all)"},
  {id:"greece",name:"Greece",emoji:"🏺",bonus:{science:2},desc:"Thinkers (+2 science/turn)"},
  {id:"china",name:"China",emoji:"🐉",bonus:{science:2},desc:"Inventors (+2 science/turn)"},
  {id:"maya",name:"Maya",emoji:"🌽",bonus:{food:2},desc:"Maize farmers (+2 food/turn)"},
  {id:"mali",name:"Mali",emoji:"🏜️",bonus:{culture:3},desc:"Rich traders (+3 build/turn)"},
  {id:"mongolia",name:"Mongolia",emoji:"🐎",bonus:{pop:1},desc:"Fast start (+1 population)"},
  {id:"india",name:"India",emoji:"🕌",bonus:{science:1,culture:1},desc:"+1 science, +1 build"},
  {id:"persia",name:"Persia",emoji:"🦁",bonus:{food:1,culture:1},desc:"+1 food, +1 build"},
  {id:"mississippian",name:"Mississippian",emoji:"🌽",bonus:{food:2},home:true,desc:"Mound builders (+2 food)"},
  {id:"shawnee",name:"Shawnee",emoji:"🪶",bonus:{food:1,culture:1},home:true,desc:"+1 food, +1 build"},
  {id:"maritime",name:"Maritime Isles",emoji:"🌴",bonus:{food:2},home:true,desc:"Sea farmers (+2 food)"}
];

/* ---------- data: technologies ---------- */
const TECHS={
  agriculture:{name:"Agriculture",emoji:"🌾",age:0,cost:8,unlock:"farm",
    fact:"Around 10,000 BCE in the Fertile Crescent (modern Iraq and Syria), people learned to plant seeds on purpose instead of only hunting and gathering.",
    step:"This is called the Neolithic Revolution - maybe the biggest change in human history. More food meant more people, which meant the first villages and towns."},
  pottery:{name:"Pottery",emoji:"🏺",age:0,cost:10,unlock:"granary",
    fact:"The oldest clay pots ever found are over 18,000 years old, from China. Pots let people store grain and water for the first time.",
    step:"Stored surplus food is what let some people STOP farming and become priests, soldiers, or rulers. Storage quietly built the first societies."},
  writing:{name:"Writing",emoji:"✍️",age:0,cost:14,unlock:"library",
    fact:"Writing was invented around 3400 BCE in Sumer. The very first writing was not poetry - it was receipts for grain and beer!",
    step:"Their script is called cuneiform, made by pressing a reed into wet clay. Egypt's hieroglyphs and China's characters were invented completely separately."},
  wheel:{name:"The Wheel",emoji:"⚙️",age:0,cost:16,culBonus:1,
    fact:"The wheel appeared around 3500 BCE in Mesopotamia. Surprisingly, it was first used for shaping pottery, not for carts!",
    step:"The Maya and Inca built giant empires WITHOUT using wheels for travel, partly because they had no horses and lived in mountains and jungles."},
  currency:{name:"Currency",emoji:"🪙",age:0,cost:20,unlock:"market",
    fact:"The kingdom of Lydia (modern Turkey) made the first coins around 600 BCE. Before money, people bartered, trading goods for goods.",
    step:"Money only works because everyone AGREES it has value. China later invented paper money around 1000 CE, long before Europe."},

  sailing:{name:"Sailing",emoji:"⛵",age:1,cost:26,foodBonus:1,
    fact:"Polynesian sailors crossed thousands of miles of open Pacific Ocean using only the stars, the waves, and the flight paths of birds.",
    step:"They had no maps and no compass. Settling islands from Hawaii to New Zealand is one of the greatest navigation feats in all of human history."},
  mathematics:{name:"Mathematics",emoji:"🔢",age:1,cost:30,unlock:"university",
    fact:"The number zero and our digits 0-9 came from India, then spread through the Islamic world to Europe. We call them 'Arabic numerals.'",
    step:"Try multiplying with Roman numerals (XIV times VII) - it is a nightmare. The decimal system supercharged science, trade, and engineering."},
  compass:{name:"The Compass",emoji:"🧭",age:1,cost:34,
    fact:"The magnetic compass was invented in China around 200 BCE and was being used for sea navigation by about 1100 CE.",
    step:"The compass is what made the Age of Exploration possible. Sailors could finally find their way with no land or stars in sight."},
  gunpowder:{name:"Gunpowder",emoji:"💥",age:1,cost:38,
    fact:"Gunpowder was invented in China around the 800s CE, by alchemists who were actually trying to brew a potion for eternal LIFE!",
    step:"It changed war forever, making stone castles and armored knights mostly useless within a couple of centuries."},
  printing:{name:"Printing Press",emoji:"📜",age:1,cost:44,sciBonus:2,
    fact:"Around 1440, Johannes Gutenberg's printing press made books cheap and fast. Before, monks copied each book BY HAND over many months.",
    step:"Printing spread ideas like wildfire and helped spark the Reformation and the Scientific Revolution. China had block-printing even earlier."},

  steam:{name:"Steam Power",emoji:"🚂",age:2,cost:50,culBonus:2,
    fact:"In the 1700s-1800s, steam engines powered factories, trains, and ships. This was the Industrial Revolution, beginning in Britain.",
    step:"For the first time, machines did the work instead of muscles. It made some nations enormously rich, and made cities crowded and smoky."},
  electricity:{name:"Electricity",emoji:"⚡",age:2,cost:56,sciBonus:2,
    fact:"In the late 1800s, inventors like Edison and Tesla put electricity to work for lighting and machines.",
    step:"Tesla's 'alternating current' beat Edison's DC in the 'War of the Currents', and it is why power can travel for miles to reach your house."},
  medicine:{name:"Medicine",emoji:"💉",age:2,cost:62,foodBonus:2,
    fact:"Germ theory and vaccines (1800s) finally let doctors STOP diseases. Edward Jenner made the first vaccine in 1796 using cowpox.",
    step:"Before germ theory, doctors did not even wash their hands between patients. Understanding tiny germs roughly DOUBLED human life expectancy."},
  flight:{name:"Flight",emoji:"✈️",age:2,cost:70,
    fact:"The Wright brothers flew the first powered airplane in 1903. That very first flight lasted just 12 seconds!",
    step:"Only 66 years later, in 1969, humans walked on the Moon. That is a single lifetime from first flight to spaceflight."},
  computers:{name:"Computers",emoji:"💻",age:2,cost:80,unlock:"lab",
    fact:"Early computers in the 1940s filled entire rooms. Today a phone in your pocket is millions of times more powerful.",
    step:"The idea was dreamed up a century earlier by Charles Babbage and Ada Lovelace, who wrote the first program before computers even existed!"}
};

/* ---------- data: buildings ---------- */
const BUILDINGS={
  monument:{name:"Monument",emoji:"🗿",cost:12,culture:2,req:null,effect:"+2 build/turn"},
  farm:{name:"Farm",emoji:"🌾",cost:10,food:2,req:"agriculture",effect:"+2 food/turn"},
  granary:{name:"Granary",emoji:"🏠",cost:18,food:3,req:"pottery",effect:"+3 food/turn"},
  library:{name:"Library",emoji:"📚",cost:16,science:3,req:"writing",effect:"+3 science/turn"},
  market:{name:"Market",emoji:"🪙",cost:20,culture:3,req:"currency",effect:"+3 build/turn"},
  university:{name:"University",emoji:"🎓",cost:35,science:5,req:"mathematics",effect:"+5 science/turn"},
  lab:{name:"Lab",emoji:"🔬",cost:60,science:7,req:"computers",effect:"+7 science/turn"}
};

/* ---------- data: map / terrain ---------- */
const TERRAIN={
  river:{name:"River Valley",emoji:"🏞️",city:"Rivermeet",yields:{science:2,food:1},
    note:"The first cities in history rose along rivers like the Nile, Tigris, and Yellow River - water meant farming, drinking water, and trade routes all in one place."},
  coast:{name:"Coast",emoji:"🌊",city:"Harborside",yields:{food:3},
    note:"Coastal cities fished the sea and traded by ship, which let them feed and support huge populations."},
  mountains:{name:"Mountains",emoji:"⛰️",city:"Stonehold",yields:{culture:2,science:1},
    note:"Mountains gave stone and metal ore to build with, and their high passes protected cities from invaders."},
  plains:{name:"Plains",emoji:"🌾",city:"Goldfields",yields:{food:2,culture:1},
    note:"Wide flat plains were perfect for growing huge fields of grain to feed a growing city."},
  forest:{name:"Forest",emoji:"🌲",city:"Greenwood",yields:{culture:2},
    note:"Forests supplied the wood for homes, ships, tools, and fuel that every early city needed."},
  grassland:{name:"Grassland",emoji:"🌳",city:"Meadowgate",yields:{food:2,culture:1},
    note:"Grasslands fed both farm crops and grazing animals like cattle, sheep, and horses."}
};
const SPOTS=[
  {x:150,y:330,terrain:"river"},
  {x:330,y:300,terrain:"plains"},
  {x:510,y:340,terrain:"coast"},
  {x:160,y:540,terrain:"mountains"},
  {x:340,y:560,terrain:"forest"},
  {x:520,y:540,terrain:"grassland"}
];
function yieldStr(y){ const p=[]; if(y.food)p.push("🌾"+y.food); if(y.science)p.push("🔬"+y.science); if(y.culture)p.push("🏛️"+y.culture); return p.join("   "); }

const WONDER_COST=120, MAX_TURNS=30, PAR=260;

/* ---------- game math ---------- */
function newState(mode,civ){
  const s={mode,civ,turn:1,age:0,pop:1,foodStore:0,science:0,culture:12,
    techs:new Set(),buildings:{},sciBonus:0,culBonus:0,foodBonus:0,wonderBuilt:false,
    cities:[{spot:0,terrain:SPOTS[0].terrain,name:"Capital",capital:true}],log:[]};
  if(civ.bonus.pop) s.pop+=civ.bonus.pop;
  return s;
}
function growthCost(s){ return s.pop*12; }
function yields(s){
  const c=s.civ.bonus,b=s.buildings; let food=2+s.pop,science=1+s.pop,culture=1;
  s.cities.forEach(ct=>{ const ty=TERRAIN[ct.terrain].yields; food+=ty.food||0; science+=ty.science||0; culture+=ty.culture||0; });
  food+=(b.farm||0)*2+(b.granary||0)*3;
  science+=(b.library||0)*3+(b.university||0)*5+(b.lab||0)*7;
  culture+=(b.monument||0)*2+(b.market||0)*3;
  food+=(c.food||0)+s.foodBonus; science+=(c.science||0)+s.sciBonus; culture+=(c.culture||0)+s.culBonus;
  return {food,science,culture};
}
function buildCost(s,id){ const n=s.buildings[id]||0; return Math.round(BUILDINGS[id].cost*Math.pow(1.6,n)); }
function settleCost(s){ const n=s.cities.length; return {food:10*n, culture:8*n}; }
function score(s){ let bc=0; for(const k in s.buildings) bc+=s.buildings[k];
  return s.techs.size*10+s.pop*4+bc*3+s.cities.length*8+(s.wonderBuilt?150:0); }

/* ---------- sound (WebAudio synth, no files) ---------- */
const SFX={
  ctx:null, enabled:true,
  init(){ if(!this.ctx){ try{ this.ctx=new (window.AudioContext||window.webkitAudioContext)(); }catch(e){} }
    if(this.ctx&&this.ctx.state==='suspended') this.ctx.resume(); },
  tone(f,d,type='sine',v=0.18,when=0){
    if(!this.enabled||!this.ctx) return;
    const t=this.ctx.currentTime+when, o=this.ctx.createOscillator(), g=this.ctx.createGain();
    o.type=type; o.frequency.value=f;
    g.gain.setValueAtTime(0.0001,t); g.gain.linearRampToValueAtTime(v,t+0.01);
    g.gain.exponentialRampToValueAtTime(0.0001,t+d);
    o.connect(g); g.connect(this.ctx.destination); o.start(t); o.stop(t+d+0.03);
  },
  click(){ this.tone(420,0.08,'square',0.10); },
  discover(){ [523,659,784,1047].forEach((f,i)=>this.tone(f,0.18,'triangle',0.14,i*0.07)); },
  build(){ this.tone(160,0.16,'sine',0.22); this.tone(110,0.18,'sine',0.18,0.02); },
  found(){ [523,784,1047,1319].forEach((f,i)=>this.tone(f,0.22,'triangle',0.16,i*0.06)); },
  grow(){ this.tone(660,0.10,'sine',0.16); this.tone(880,0.12,'sine',0.14,0.06); },
  age(){ [392,523,659,784,1047].forEach((f,i)=>this.tone(f,0.30,'triangle',0.16,i*0.10)); },
  win(){ [523,659,784,1047,784,1047,1319].forEach((f,i)=>this.tone(f,0.32,'triangle',0.18,i*0.12)); },
  lose(){ [392,330,262].forEach((f,i)=>this.tone(f,0.30,'sine',0.18,i*0.12)); }
};

/* ---------- UI helpers ---------- */
function brighten(c,a=0.16){ const r=(c>>16)&255,g=(c>>8)&255,b=c&255;
  return (Math.min(255,r+(255-r)*a)<<16|Math.min(255,g+(255-g)*a)<<8|Math.min(255,b+(255-b)*a))&0xffffff; }

function panelGfx(sc,x,y,w,h,fill=PARCH,stroke=GOLD,r=14){
  const g=sc.add.graphics();
  g.fillStyle(fill,1); g.fillRoundedRect(x,y,w,h,r);
  g.lineStyle(3,stroke,1); g.strokeRoundedRect(x,y,w,h,r);
  return g;
}
function makeButton(sc,x,y,w,h,label,color,onClick,opts={}){
  const c=sc.add.container(x,y), g=sc.add.graphics();
  const r=Math.min(12,h/2);
  const draw=f=>{ g.clear(); g.fillStyle(f,1); g.fillRoundedRect(-w/2,-h/2,w,h,r); };
  draw(color);
  const t=sc.add.text(0,0,label,{fontFamily:FONT,fontSize:(opts.fontSize||20)+'px',
    color:'#ffffff',fontStyle:'bold',align:'center',wordWrap:{width:w-14}}).setOrigin(0.5);
  c.add([g,t]); c.setSize(w,h);
  if(opts.disabled){ c.setAlpha(0.4); }
  else{
    c.setInteractive(new Phaser.Geom.Rectangle(-w/2,-h/2,w,h),Phaser.Geom.Rectangle.Contains);
    c.on('pointerover',()=>{ draw(brighten(color)); sc.tweens.add({targets:c,scaleX:1.04,scaleY:1.04,duration:80}); });
    c.on('pointerout',()=>{ draw(color); sc.tweens.add({targets:c,scaleX:1,scaleY:1,duration:80}); });
    c.on('pointerdown',()=>{ SFX.init(); SFX.click();
      sc.tweens.add({targets:c,scaleX:0.95,scaleY:0.95,duration:60,yoyo:true,onComplete:()=>onClick&&onClick()}); });
  }
  return c;
}
function makeChip(sc,x,y,w,h,big,small,bigColor){
  const c=sc.add.container(x,y), g=sc.add.graphics();
  g.fillStyle(PARCH2,1); g.fillRoundedRect(-w/2,-h/2,w,h,10);
  g.lineStyle(2,BORDER,1); g.strokeRoundedRect(-w/2,-h/2,w,h,10);
  const bt=sc.add.text(0,-h/2+14,big,{fontFamily:FONT,fontSize:'19px',color:bigColor||INK,fontStyle:'bold'}).setOrigin(0.5);
  const st=sc.add.text(0,h/2-13,small,{fontFamily:FONT,fontSize:'11px',color:MUTE,align:'center',wordWrap:{width:w-8}}).setOrigin(0.5);
  c.add([g,bt,st]); return c;
}

/* ===================== SCENES ===================== */
class BootScene extends Phaser.Scene{
  constructor(){ super('Boot'); }
  create(){ this.scene.start('Title'); }
}

class TitleScene extends Phaser.Scene{
  constructor(){ super('Title'); }
  create(){
    const g=this.add.graphics();
    g.fillGradientStyle(0x2f6f8f,0x2f6f8f,0xb8860b,0xb8860b,1); g.fillRect(0,0,1280,800);
    g.fillStyle(0x241a12,0.55); g.fillRect(0,0,1280,800);
    ["🏛️","🏺","⚙️","📜","⚡","⛵","🌾","🪙"].forEach((e,i)=>{
      const x=120+Math.random()*1040, y=Math.random()*800;
      const o=this.add.text(x,y,e,{fontSize:(28+Math.random()*26)+'px'}).setAlpha(0.18);
      this.tweens.add({targets:o,y:y-60,duration:4000+Math.random()*3000,yoyo:true,repeat:-1,delay:i*200});
    });
    panelGfx(this,340,150,600,300,PARCH,GOLD,18);
    const title=this.add.text(640,235,"🌍 Tiny Empires",{fontFamily:FONT,fontSize:'52px',color:HEAD,fontStyle:'bold'}).setOrigin(0.5);
    this.tweens.add({targets:title,scaleX:1.04,scaleY:1.04,duration:1600,yoyo:true,repeat:-1,ease:'Sine.inOut'});
    this.add.text(640,300,"Grow a village into an empire - and learn how\nthe real world got built along the way.",
      {fontFamily:FONT,fontSize:'18px',color:MUTE,align:'center',fontStyle:'italic'}).setOrigin(0.5);
    makeButton(this,490,400,200,72,"🧭 Explorer",GREEN,()=>this.scene.start('CivSelect',{mode:'explorer'}),{fontSize:24});
    makeButton(this,790,400,200,72,"🏆 Challenge",GOLD,()=>this.scene.start('CivSelect',{mode:'challenge'}),{fontSize:24});
    this.sound=makeButton(this,1190,46,150,44,SFX.enabled?"🔊 Sound On":"🔇 Sound Off",PURPLE,()=>{
      SFX.enabled=!SFX.enabled; this.sound.list[1].setText(SFX.enabled?"🔊 Sound On":"🔇 Sound Off");
    });
  }
}

class CivSelectScene extends Phaser.Scene{
  constructor(){ super('CivSelect'); }
  init(d){ this.mode=d.mode; }
  create(){
    const g=this.add.graphics(); g.fillGradientStyle(0x3a2c1a,0x3a2c1a,0x241a12,0x241a12,1); g.fillRect(0,0,1280,800);
    this.add.text(640,38,"Choose your civilization",{fontFamily:FONT,fontSize:'34px',color:'#f4e8cf',fontStyle:'bold'}).setOrigin(0.5);
    this.add.text(640,74,(this.mode==='challenge'?"Challenge - "+MAX_TURNS+" turns":"Explorer - unlimited turns")+"     ❤️ marks your family homelands",
      {fontFamily:FONT,fontSize:'16px',color:'#e9d8b0',fontStyle:'italic'}).setOrigin(0.5);
    const cols=4,cw=295,ch=185,gx=20,gy=110,sp=8;
    CIVS.forEach((civ,i)=>{
      const cx=gx+(i%cols)*(cw+sp), cy=gy+Math.floor(i/cols)*(ch+sp);
      const card=this.add.container(cx+cw/2,cy+ch/2), bg=this.add.graphics();
      const draw=f=>{ bg.clear(); bg.fillStyle(f,1); bg.fillRoundedRect(-cw/2,-ch/2,cw,ch,12);
        bg.lineStyle(3,civ.home?RED:BORDER,1); bg.strokeRoundedRect(-cw/2,-ch/2,cw,ch,12); };
      draw(PARCH2);
      const em=this.add.text(0,-ch/2+42,civ.emoji,{fontSize:'46px'}).setOrigin(0.5);
      const nm=this.add.text(0,8,(civ.home?"❤️ ":"")+civ.name,{fontFamily:FONT,fontSize:'22px',color:HEAD,fontStyle:'bold'}).setOrigin(0.5);
      const ds=this.add.text(0,ch/2-34,civ.desc,{fontFamily:FONT,fontSize:'14px',color:MUTE,align:'center',wordWrap:{width:cw-26}}).setOrigin(0.5);
      card.add([bg,em,nm,ds]); card.setSize(cw,ch);
      card.setInteractive(new Phaser.Geom.Rectangle(-cw/2,-ch/2,cw,ch),Phaser.Geom.Rectangle.Contains);
      card.on('pointerover',()=>{ draw(PARCH); this.tweens.add({targets:card,scaleX:1.05,scaleY:1.05,duration:90}); });
      card.on('pointerout',()=>{ draw(PARCH2); this.tweens.add({targets:card,scaleX:1,scaleY:1,duration:90}); });
      card.on('pointerdown',()=>{ SFX.init(); SFX.click(); this.scene.start('Game',{mode:this.mode,civ}); });
    });
    makeButton(this,90,768,140,44,"← Back",RED,()=>this.scene.start('Title'));
  }
}

class GameScene extends Phaser.Scene{
  constructor(){ super('Game'); }
  init(d){ this.mode=d.mode; this.civ=d.civ; }
  create(){
    const bg=this.add.graphics(); bg.fillGradientStyle(0x3a2c1a,0x3a2c1a,0x241a12,0x241a12,1); bg.fillRect(0,0,1280,800);
    this.s=newState(this.mode,this.civ);
    this.tab='discover';
    this.spotConts={};
    this.log(`🚩 The ${this.civ.name} ${this.civ.emoji} begin in the Age of Antiquity.`);
    this.dyn=[];
    this.refresh();
  }
  log(m){ this.s.log.unshift(m); }
  track(o){ this.dyn.push(o); return o; }

  /* --- actions --- */
  research(id){
    const t=TECHS[id]; if(this.s.science<t.cost) return;
    this.s.science-=t.cost; this.s.techs.add(id);
    if(t.sciBonus) this.s.sciBonus+=t.sciBonus;
    if(t.culBonus) this.s.culBonus+=t.culBonus;
    if(t.foodBonus) this.s.foodBonus+=t.foodBonus;
    this.log(`🔬 Discovered ${t.name} ${t.emoji}!`); SFX.discover();
    this.checkAge(); this.refresh(); this.showHistory(id);
  }
  checkAge(){
    if(this.s.age>=2) return;
    const at=Object.keys(TECHS).filter(k=>TECHS[k].age===this.s.age);
    if(at.every(k=>this.s.techs.has(k))){ this.s.age++; SFX.age();
      this.log(`🌟 Your people advance into the Age of ${AGES[this.s.age]}!`); }
  }
  build(id){
    const c=buildCost(this.s,id); if(this.s.culture<c) return;
    this.s.culture-=c; this.s.buildings[id]=(this.s.buildings[id]||0)+1;
    this.log(`🏗️ Built a ${BUILDINGS[id].name} ${BUILDINGS[id].emoji}.`); SFX.build(); this.refresh();
  }
  buildWonder(){
    if(this.s.culture<WONDER_COST||this.s.age<2||this.s.wonderBuilt) return;
    this.s.culture-=WONDER_COST; this.s.wonderBuilt=true;
    this.log(`🏛️ You built a WORLD WONDER!`); SFX.win();
    this.refresh(); this.showWonderCard();
  }
  foundCity(i,name){
    const sp=SPOTS[i],terr=TERRAIN[sp.terrain],cost=settleCost(this.s);
    if(this.s.foodStore<cost.food||this.s.culture<cost.culture) return;
    if(this.s.cities.find(c=>c.spot===i)) return;
    this.s.foodStore-=cost.food; this.s.culture-=cost.culture;
    const finalName=(name||terr.city).trim().slice(0,18)||terr.city;
    this.s.cities.push({spot:i,terrain:sp.terrain,name:finalName});
    this.log(`🏘️ You founded ${finalName} on the ${terr.name}!`); SFX.found();
    this.refresh();
    this.poofAt(sp.x,sp.y);
    const cont=this.spotConts[i];
    if(cont){ cont.setScale(0); this.tweens.add({targets:cont,scaleX:1,scaleY:1,duration:480,ease:'Back.out'}); }
  }
  poofAt(x,y){
    for(let k=0;k<12;k++){
      const ang=(Math.PI*2/12)*k;
      const dot=this.add.text(x,y,"✨",{fontSize:'22px'}).setOrigin(0.5).setDepth(60);
      this.tweens.add({targets:dot,x:x+Math.cos(ang)*72,y:y+Math.sin(ang)*72,alpha:0,scale:0.2,
        duration:600,ease:'Quad.out',onComplete:()=>dot.destroy()});
    }
    const ring=this.add.graphics({x:x,y:y}).setDepth(59);
    ring.lineStyle(5,GOLD,1); ring.strokeCircle(0,0,28); ring.setScale(0.2);
    this.tweens.add({targets:ring,scaleX:2.4,scaleY:2.4,alpha:0,duration:600,ease:'Quad.out',onComplete:()=>ring.destroy()});
  }
  nextTurn(){
    const y=yields(this.s);
    this.s.science+=y.science; this.s.culture+=y.culture; this.s.foodStore+=y.food;
    let need=growthCost(this.s);
    while(this.s.foodStore>=need){ this.s.foodStore-=need; this.s.pop++; SFX.grow();
      this.log(`👶 Your population grows to ${this.s.pop}!`); need=growthCost(this.s); }
    this.s.turn++;
    if(this.s.mode==='challenge'&&this.s.turn>MAX_TURNS){ this.endGame(); return; }
    this.refresh();
  }
  endGame(){
    if(!this.s.wonderBuilt&&this.s.mode==='challenge') SFX.lose();
    this.scene.start('End',{mode:this.s.mode,civ:this.civ,won:this.s.wonderBuilt,
      score:score(this.s),techs:this.s.techs.size,pop:this.s.pop,cities:this.s.cities.length,age:this.s.age});
  }

  /* --- render --- */
  refresh(){
    this.tweens.killAll();
    this.dyn.forEach(o=>o.destroy()); this.dyn=[];
    this.spotConts={};
    const s=this.s,y=yields(s);

    /* header */
    this.track(panelGfx(this,16,10,1248,150));
    this.track(this.add.text(40,24,`${this.civ.emoji} ${this.civ.name}`,{fontFamily:FONT,fontSize:'30px',color:HEAD,fontStyle:'bold'}));
    this.track(this.add.text(42,64,`Turn ${s.turn}${s.mode==='challenge'?' / '+MAX_TURNS:''}   ·   Age of ${AGES[s.age]}`,{fontFamily:FONT,fontSize:'17px',color:MUTE}));
    if(s.mode==='challenge') this.track(this.add.text(900,40,`Score ${score(s)}  /  par ${PAR}`,{fontFamily:FONT,fontSize:'18px',color:HEAD,fontStyle:'bold'}));
    this.track(makeButton(this,1190,42,150,38,SFX.enabled?"🔊 On":"🔇 Off",PURPLE,()=>{ SFX.enabled=!SFX.enabled; this.refresh(); }));
    this.track(makeChip(this,95,120,150,58,`👥 ${s.pop}`,"people"));
    this.track(makeChip(this,255,120,150,58,`🌾 ${s.foodStore}`,`+${y.food}/turn · grow at ${growthCost(s)}`));
    this.track(makeChip(this,415,120,150,58,`🔬 ${s.science}`,`+${y.science}/turn`,'#2f6f8f'));
    this.track(makeChip(this,575,120,150,58,`🏛️ ${s.culture}`,`+${y.culture}/turn build`,'#7a4a8f'));
    AGES.forEach((a,i)=>{ const at=Object.keys(TECHS).filter(k=>TECHS[k].age===i),done=at.filter(k=>s.techs.has(k)).length,full=done===at.length,cx=770+i*175;
      const p=this.add.graphics(); p.fillStyle(full?GREEN:PARCH2,1); p.fillRoundedRect(cx-80,108,160,30,15); p.lineStyle(2,full?GREEN:BORDER,1); p.strokeRoundedRect(cx-80,108,160,30,15); this.track(p);
      this.track(this.add.text(cx,123,`${a} ${done}/${at.length}`,{fontFamily:FONT,fontSize:'14px',color:full?'#ffffff':INK,fontStyle:'bold'}).setOrigin(0.5)); });

    /* MAP (left) */
    this.track(panelGfx(this,16,172,612,508));
    this.track(this.add.text(40,184,`🗺️ Your Lands  (${s.cities.length}${s.cities.length===1?' city':' cities'})`,{fontFamily:FONT,fontSize:'22px',color:HEAD,fontStyle:'bold'}));
    this.track(this.add.text(40,214,"Tap a glowing spot to found a new city.",{fontFamily:FONT,fontSize:'13px',color:MUTE,fontStyle:'italic'}));
    SPOTS.forEach((sp,i)=>{
      const city=s.cities.find(c=>c.spot===i),terr=TERRAIN[sp.terrain];
      const cont=this.add.container(sp.x,sp.y); this.track(cont); this.spotConts[i]=cont;
      const ring=this.add.graphics();
      if(city){ ring.fillStyle(0xf3e7c6,1); ring.fillCircle(0,0,56); ring.lineStyle(5,GOLD,1); ring.strokeCircle(0,0,56); }
      else{ ring.fillStyle(0xe7d9b4,0.6); ring.fillCircle(0,0,56); ring.lineStyle(3,GREEN,0.9); ring.strokeCircle(0,0,56); }
      cont.add(ring);
      cont.add(this.add.text(0,-26,terr.emoji,{fontSize:'38px'}).setOrigin(0.5));
      if(city){
        cont.add(this.add.text(0,18,(city.capital?"⭐ ":"")+city.name,{fontFamily:FONT,fontSize:'14px',color:HEAD,fontStyle:'bold',align:'center',wordWrap:{width:108}}).setOrigin(0.5));
        cont.add(this.add.text(0,40,yieldStr(terr.yields),{fontFamily:FONT,fontSize:'11px',color:MUTE,align:'center'}).setOrigin(0.5));
      } else {
        cont.add(this.add.text(0,16,terr.name,{fontFamily:FONT,fontSize:'12px',color:INK,align:'center',wordWrap:{width:108}}).setOrigin(0.5));
        cont.add(this.add.text(0,40,"➕ Settle",{fontFamily:FONT,fontSize:'13px',color:'#2f6f8f',fontStyle:'bold'}).setOrigin(0.5));
        this.tweens.add({targets:ring,alpha:{from:0.55,to:1},duration:900,yoyo:true,repeat:-1});
      }
      cont.setSize(112,112);
      cont.setInteractive(new Phaser.Geom.Circle(0,0,56),Phaser.Geom.Circle.Contains);
      cont.on('pointerover',()=>this.tweens.add({targets:cont,scaleX:1.06,scaleY:1.06,duration:90}));
      cont.on('pointerout',()=>this.tweens.add({targets:cont,scaleX:1,scaleY:1,duration:90}));
      cont.on('pointerdown',()=>{ SFX.init(); SFX.click(); city?this.showCityInfo(city):this.showFoundCity(i); });
    });

    /* TABS + right content */
    this.track(makeButton(this,800,196,296,44,"🔬 Discover",this.tab==='discover'?BLUE:0x7e94a0,()=>{ this.tab='discover'; this.refresh(); },{fontSize:18}));
    this.track(makeButton(this,1104,196,296,44,"🏛️ Build",this.tab==='build'?GREEN:0x9aa07e,()=>{ this.tab='build'; this.refresh(); },{fontSize:18}));
    this.track(panelGfx(this,644,224,612,456));

    if(this.tab==='discover'){
      const avail=Object.keys(TECHS).filter(k=>TECHS[k].age===s.age&&!s.techs.has(k));
      if(avail.length===0){
        this.track(this.add.text(950,440,"Every "+AGES[s.age]+" discovery is made!",{fontFamily:FONT,fontSize:'18px',color:MUTE,fontStyle:'italic',align:'center',wordWrap:{width:540}}).setOrigin(0.5));
      } else avail.slice(0,5).forEach((id,i)=>{
        const t=TECHS[id],top=248+i*80,can=s.science>=t.cost;
        const g=this.add.graphics(); g.fillStyle(PARCH2,1); g.fillRoundedRect(660,top,580,70,10); g.lineStyle(2,BORDER,1); g.strokeRoundedRect(660,top,580,70,10); this.track(g);
        this.track(this.add.text(676,top+10,`${t.emoji} ${t.name}`,{fontFamily:FONT,fontSize:'18px',color:INK,fontStyle:'bold'}));
        let info=`🔬 ${t.cost} science`;
        if(t.unlock) info+=` · unlocks ${BUILDINGS[t.unlock].emoji} ${BUILDINGS[t.unlock].name}`;
        if(t.sciBonus) info+=` · +${t.sciBonus} sci/turn`;
        if(t.culBonus) info+=` · +${t.culBonus} build/turn`;
        if(t.foodBonus) info+=` · +${t.foodBonus} food/turn`;
        this.track(this.add.text(676,top+40,info,{fontFamily:FONT,fontSize:'13px',color:MUTE,wordWrap:{width:430}}));
        this.track(makeButton(this,1180,top+35,120,46,"Discover",BLUE,()=>this.research(id),{disabled:!can,fontSize:18}));
      });
    } else {
      let row=0;
      Object.keys(BUILDINGS).forEach(id=>{
        const b=BUILDINGS[id]; if(b.req&&!s.techs.has(b.req)) return;
        const top=248+row*50,cost=buildCost(s,id),can=s.culture>=cost,owned=s.buildings[id]||0; row++;
        const g=this.add.graphics(); g.fillStyle(PARCH2,1); g.fillRoundedRect(660,top,580,44,8); g.lineStyle(2,BORDER,1); g.strokeRoundedRect(660,top,580,44,8); this.track(g);
        this.track(this.add.text(676,top+5,`${b.emoji} ${b.name}${owned?'  ×'+owned:''}`,{fontFamily:FONT,fontSize:'16px',color:INK,fontStyle:'bold'}));
        this.track(this.add.text(676,top+25,`🏛️ ${cost} build · ${b.effect}`,{fontFamily:FONT,fontSize:'12px',color:MUTE}));
        this.track(makeButton(this,1180,top+22,100,36,"Build",GREEN,()=>this.build(id),{disabled:!can,fontSize:16}));
      });
      const wtop=248+row*50;
      if(s.age>=2&&!s.wonderBuilt){
        const g=this.add.graphics(); g.fillStyle(0xfff6df,1); g.fillRoundedRect(660,wtop,580,46,8); g.lineStyle(3,GOLD,1); g.strokeRoundedRect(660,wtop,580,46,8); this.track(g);
        this.track(this.add.text(676,wtop+6,"🏛️ World Wonder",{fontFamily:FONT,fontSize:'17px',color:HEAD,fontStyle:'bold'}));
        this.track(this.add.text(676,wtop+27,`🏛️ ${WONDER_COST} build · WINS THE GAME`,{fontFamily:FONT,fontSize:'12px',color:MUTE}));
        this.track(makeButton(this,1180,wtop+23,100,38,"Build",GOLD,()=>this.buildWonder(),{disabled:s.culture<WONDER_COST,fontSize:16}));
      } else if(s.wonderBuilt){
        const g=this.add.graphics(); g.fillStyle(GREEN,1); g.fillRoundedRect(660,wtop,580,40,8); this.track(g);
        this.track(this.add.text(950,wtop+20,"🏛️ World Wonder complete!",{fontFamily:FONT,fontSize:'17px',color:'#ffffff',fontStyle:'bold'}).setOrigin(0.5));
      }
    }

    /* NEXT TURN + CHRONICLE */
    const nt=makeButton(this,322,740,600,88,"⏭️  Next Turn",PURPLE,()=>this.nextTurn(),{fontSize:32}); this.track(nt);
    this.tweens.add({targets:nt,scaleX:1.02,scaleY:1.02,duration:900,yoyo:true,repeat:-1,ease:'Sine.inOut'});
    this.track(panelGfx(this,644,692,612,96));
    this.track(this.add.text(668,700,"📜 Chronicle",{fontFamily:FONT,fontSize:'16px',color:HEAD,fontStyle:'bold'}));
    s.log.slice(0,2).forEach((l,i)=>this.track(this.add.text(668,726+i*22,l,{fontFamily:FONT,fontSize:'12px',color:INK,wordWrap:{width:470}})));
    this.track(makeButton(this,1190,712,110,30,"↻ New",RED,()=>this.scene.start('Title')));
  }

  /* --- overlays --- */
  showHistory(id){ const t=TECHS[id]; this.makeModal(`${t.emoji} ${t.name}`,AGES[t.age],t.fact,t.step,"Cool! Keep building →"); }
  showWonderCard(){
    this.makeModal("🏛️ You built a World Wonder!","A Wonder of the World",
      "All through history, great civilizations built Wonders to show their greatness - the Pyramids of Giza, the Great Wall of China, the Colosseum, the Taj Mahal. Yours just joined that list.",
      "Of the famous 'Seven Wonders of the Ancient World,' only the Great Pyramid still stands today.",
      "See my legacy →",()=>this.endGame());
  }
  showCityInfo(city){
    const terr=TERRAIN[city.terrain];
    this.makeModal((city.capital?"⭐ ":"🏘️ ")+city.name,(city.capital?"Your Capital":"Your City")+" · "+terr.name,
      "This city makes "+yieldStr(terr.yields)+" every single turn.",terr.note,"Got it →");
  }
  showFoundCity(i){
    const sp=SPOTS[i],terr=TERRAIN[sp.terrain],cost=settleCost(this.s);
    const can=this.s.foodStore>=cost.food&&this.s.culture>=cost.culture;
    const o=this.add.container(0,0).setDepth(100);
    const back=this.add.rectangle(640,400,1280,800,0x140c04,0.7).setInteractive();
    const mw=620,mh=450,mx=640,my=400;
    const p=this.add.graphics(); p.fillStyle(PARCH,1); p.fillRoundedRect(mx-mw/2,my-mh/2,mw,mh,18); p.lineStyle(4,GOLD,1); p.strokeRoundedRect(mx-mw/2,my-mh/2,mw,mh,18);
    const em=this.add.text(mx,my-mh/2+58,terr.emoji,{fontSize:'54px'}).setOrigin(0.5);
    const tt=this.add.text(mx,my-mh/2+112,"Found a city on the "+terr.name+"?",{fontFamily:FONT,fontSize:'24px',color:HEAD,fontStyle:'bold',align:'center',wordWrap:{width:mw-60}}).setOrigin(0.5);
    const yld=this.add.text(mx,my-mh/2+152,"Makes each turn:   "+yieldStr(terr.yields),{fontFamily:FONT,fontSize:'17px',color:INK}).setOrigin(0.5);
    const note=this.add.text(mx,my-10,terr.note,{fontFamily:FONT,fontSize:'14px',color:MUTE,align:'center',wordWrap:{width:mw-80}}).setOrigin(0.5);
    const ct=this.add.text(mx,my+78,"Cost:   🌾 "+cost.food+" food    🏛️ "+cost.culture+" build",{fontFamily:FONT,fontSize:'16px',color:(can?HEAD:'#a23b2e'),fontStyle:'bold',align:'center'}).setOrigin(0.5);
    o.add([back,p,em,tt,yld,note,ct]);
    if(!can) o.add(this.add.text(mx,my+102,"(Not enough yet - grow a few turns and come back!)",{fontFamily:FONT,fontSize:'13px',color:'#a23b2e',fontStyle:'italic'}).setOrigin(0.5));
    o.add(makeButton(this,mx-105,my+mh/2-38,180,52,"🏘️ Found City",GREEN,()=>{ o.destroy(); this.showNameCity(i); },{disabled:!can,fontSize:18}));
    o.add(makeButton(this,mx+115,my+mh/2-38,150,52,"Not yet",RED,()=>o.destroy(),{fontSize:18}));
    o.setScale(0.92); o.setAlpha(0); this.tweens.add({targets:o,scale:1,alpha:1,duration:160,ease:'Back.out'});
  }
  showNameCity(i){
    const sp=SPOTS[i],terr=TERRAIN[sp.terrain];
    const o=this.add.container(0,0).setDepth(110);
    const back=this.add.rectangle(640,400,1280,800,0x140c04,0.72).setInteractive();
    const mw=580,mh=400,mx=640,my=400;
    const p=this.add.graphics(); p.fillStyle(PARCH,1); p.fillRoundedRect(mx-mw/2,my-mh/2,mw,mh,18); p.lineStyle(4,GOLD,1); p.strokeRoundedRect(mx-mw/2,my-mh/2,mw,mh,18);
    const em=this.add.text(mx,my-mh/2+56,terr.emoji,{fontSize:'52px'}).setOrigin(0.5);
    const tt=this.add.text(mx,my-mh/2+112,"Name your new town!",{fontFamily:FONT,fontSize:'26px',color:HEAD,fontStyle:'bold'}).setOrigin(0.5);
    const hint=this.add.text(mx,my-mh/2+150,"Founded on the "+terr.name+" · tap the box to type",{fontFamily:FONT,fontSize:'14px',color:MUTE,fontStyle:'italic'}).setOrigin(0.5);
    o.add([back,p,em,tt,hint]);
    /* DOM text input (lives above the canvas; destroyed manually) */
    const input=this.add.dom(mx,my+8,'input',
      'width:340px;height:48px;font-size:24px;text-align:center;border:3px solid #b8860b;border-radius:12px;padding:2px;font-family:Trebuchet MS,Segoe UI,sans-serif;color:#3a2c1a;background:#fffdf5;outline:none;').setDepth(120);
    input.node.value=terr.city; input.node.maxLength=18;
    input.node.setAttribute('autocapitalize','words');
    input.node.setAttribute('autocomplete','off');
    this.time.delayedCall(60,()=>{ try{ input.node.focus(); input.node.select(); }catch(e){} });
    const confirm=makeButton(this,mx-100,my+mh/2-40,180,54,"🏘️ Found It!",GREEN,()=>{
      const nm=(input.node.value||'').trim().slice(0,18)||terr.city;
      input.destroy(); o.destroy(); this.foundCity(i,nm);
    },{fontSize:18});
    const cancel=makeButton(this,mx+105,my+mh/2-40,150,54,"Cancel",RED,()=>{ input.destroy(); o.destroy(); },{fontSize:18});
    o.add([confirm,cancel]);
    o.setAlpha(0); this.tweens.add({targets:o,alpha:1,duration:160});
  }
  makeModal(title,era,fact,step,btn,onClose){
    const o=this.add.container(0,0).setDepth(100);
    const back=this.add.rectangle(640,400,1280,800,0x140c04,0.7).setInteractive();
    const mw=640,mh=420,mx=640,my=400;
    const p=this.add.graphics(); p.fillStyle(PARCH,1); p.fillRoundedRect(mx-mw/2,my-mh/2,mw,mh,18); p.lineStyle(4,GOLD,1); p.strokeRoundedRect(mx-mw/2,my-mh/2,mw,mh,18);
    const badge=this.add.graphics(); badge.fillStyle(GOLD,1); badge.fillRoundedRect(mx-95,my-mh/2+18,190,26,13);
    const bt=this.add.text(mx,my-mh/2+31,era,{fontFamily:FONT,fontSize:'13px',color:'#fff',fontStyle:'bold',align:'center',wordWrap:{width:180}}).setOrigin(0.5);
    const tt=this.add.text(mx,my-mh/2+78,title,{fontFamily:FONT,fontSize:'26px',color:HEAD,fontStyle:'bold',align:'center',wordWrap:{width:mw-60}}).setOrigin(0.5);
    const ft=this.add.text(mx,my-30,fact,{fontFamily:FONT,fontSize:'17px',color:INK,align:'center',wordWrap:{width:mw-70}}).setOrigin(0.5);
    const sp=this.add.graphics(); sp.fillStyle(0xfff6df,1); sp.fillRoundedRect(mx-mw/2+30,my+70,mw-60,90,10); sp.fillStyle(PURPLE,1); sp.fillRect(mx-mw/2+30,my+70,6,90);
    const st=this.add.text(mx-mw/2+50,my+82,"🚀 Step It Up:  "+step,{fontFamily:FONT,fontSize:'14px',color:INK,wordWrap:{width:mw-100}});
    const close=makeButton(this,mx,my+mh/2-34,260,50,btn,PURPLE,()=>{ o.destroy(); if(onClose) onClose(); },{fontSize:18});
    o.add([back,p,badge,bt,tt,ft,sp,st,close]);
    o.setScale(0.9); o.setAlpha(0); this.tweens.add({targets:o,scale:1,alpha:1,duration:160,ease:'Back.out'});
  }
}

class EndScene extends Phaser.Scene{
  constructor(){ super('End'); }
  init(d){ this.d=d; }
  create(){
    const g=this.add.graphics(); g.fillGradientStyle(0x2f6f8f,0x2f6f8f,0xb8860b,0xb8860b,1); g.fillRect(0,0,1280,800);
    g.fillStyle(0x241a12,0.5); g.fillRect(0,0,1280,800);
    const d=this.d;
    if(d.won||d.mode==='explorer'){
      for(let i=0;i<70;i++){ const c=[GOLD,GREEN,RED,PURPLE,BLUE][i%5];
        const r=this.add.rectangle(Math.random()*1280,-20,8,14,c);
        this.tweens.add({targets:r,y:820,angle:360*(Math.random()>0.5?1:-1),duration:2500+Math.random()*2500,repeat:-1,delay:Math.random()*2000}); }
    }
    panelGfx(this,340,200,600,400,PARCH,GOLD,18);
    let head,sub;
    if(d.mode==='challenge'){
      head=d.won?"🏆 Victory!":"⏳ Time's Up!";
      sub=`Final score: ${d.score}  (par ${PAR})\n`+(d.score>=PAR?"You beat par - a true history prodigy! 🌟":"So close! Discover tech faster or build Markets earlier next time.");
    } else { head="🏛️ A Civilization for the Ages!"; sub=`Your ${d.civ.name} built a World Wonder and earned a place in history.`; }
    this.add.text(640,280,head,{fontFamily:FONT,fontSize:'40px',color:HEAD,fontStyle:'bold',align:'center',wordWrap:{width:540}}).setOrigin(0.5);
    this.add.text(640,400,sub,{fontFamily:FONT,fontSize:'19px',color:INK,align:'center',wordWrap:{width:520}}).setOrigin(0.5);
    this.add.text(640,490,`${d.civ.emoji} ${d.civ.name}  ·  ${d.techs} discoveries  ·  ${d.cities} cities  ·  ${d.pop} people  ·  Age of ${AGES[d.age]}`,
      {fontFamily:FONT,fontSize:'16px',color:MUTE,align:'center'}).setOrigin(0.5);
    makeButton(this,640,555,240,60,"▶️ Play Again",GREEN,()=>this.scene.start('Title'),{fontSize:22});
  }
}

/* ===================== LAUNCH ===================== */
new Phaser.Game({
  type:Phaser.AUTO, width:1280, height:800, parent:'game', backgroundColor:'#241a12',
  dom:{ createContainer:true },
  scale:{ mode:Phaser.Scale.FIT, autoCenter:Phaser.Scale.CENTER_BOTH },
  scene:[BootScene,TitleScene,CivSelectScene,GameScene,EndScene]
});
