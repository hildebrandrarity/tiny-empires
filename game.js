/* ===================== TINY EMPIRES (Phaser 3) ===================== */

/* ---------- palette ---------- */
const PARCH=0xf4e8cf, PARCH2=0xecdcb5, INK='#3a2c1a', HEAD='#5a3a12', MUTE='#5d4a2c';
const GREEN=0x4a7c3a, BLUE=0x2f6f8f, PURPLE=0x7a4a8f, GOLD=0xb8860b, RED=0xa23b2e, BORDER=0xcbb27e;
const FONT='Trebuchet MS, Segoe UI, sans-serif';
function colorHex(n){ return '#'+n.toString(16).padStart(6,'0'); }
function heartStr(fr){ const n=Math.max(0,Math.min(5,Math.round(fr/20))); return "❤️".repeat(n)+"🤍".repeat(5-n); }

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

/* ---------- data: history quiz (for friendly contests) ---------- */
const QUIZ=[
  {q:"Where was the first writing invented?",opts:["Sumer (Mesopotamia)","Ancient Rome","Japan"],a:0,
   why:"Writing began around 3400 BCE in Sumer - and the first writing was receipts for grain and beer!"},
  {q:"Gunpowder was first invented in China while trying to make what?",opts:["A potion for eternal life","Fireworks for parties","Stronger swords"],a:0,
   why:"Alchemists were searching for a potion of immortality and accidentally created gunpowder instead."},
  {q:"Which civilization built a huge empire WITHOUT using the wheel for travel?",opts:["The Maya","The Romans","The Egyptians"],a:0,
   why:"The Maya had no horses and lived in mountains and jungles, so wheels were not useful for travel."},
  {q:"Where did our numbers 0 through 9 come from?",opts:["India","Greece","Egypt"],a:0,
   why:"They came from India, spread through the Islamic world, and reached Europe - so we call them 'Arabic numerals.'"},
  {q:"Who flew the first powered airplane in 1903?",opts:["The Wright brothers","Thomas Edison","Leonardo da Vinci"],a:0,
   why:"The Wright brothers' first flight lasted just 12 seconds - and people walked on the Moon only 66 years later!"},
  {q:"Where did the very first cities tend to be built?",opts:["Along rivers","On mountain peaks","Deep in deserts"],a:0,
   why:"Rivers gave water for drinking, farming, and trade all in one place - perfect for a growing city."},
  {q:"Who is считается the first computer programmer?",opts:["Ada Lovelace","Albert Einstein","Isaac Newton"],a:0,
   why:"Ada Lovelace wrote the first program in the 1800s - before computers were even built!"},
  {q:"What powered the factories of the Industrial Revolution?",opts:["Steam engines","Electricity","Wind turbines"],a:0,
   why:"Steam engines let machines do the work of muscles for the first time, starting in Britain in the 1700s-1800s."}
];

const WONDER_COST=120, MAX_TURNS=30, PAR=260;

/* ---------- rivals ---------- */
function makeRivals(playerCiv){
  const pool=CIVS.filter(c=>c.id!==playerCiv.id);
  Phaser.Utils.Array.Shuffle(pool);
  const colors=[0x1f7a8c,0x8e44ad], homes=[5,2], speeds=[0.62,0.55];
  return [0,1].map(i=>({civ:pool[i],color:colors[i],spots:[homes[i]],age:0,techs:0,techF:0,friendship:35,speed:speeds[i]}));
}
function spotOwner(s,i){
  if(s.cities.find(c=>c.spot===i)) return {type:'player'};
  for(let k=0;k<s.rivals.length;k++) if(s.rivals[k].spots.includes(i)) return {type:'rival',idx:k,rival:s.rivals[k]};
  return null;
}

/* ---------- game math ---------- */
function newState(mode,civ){
  const s={mode,civ,turn:1,age:0,pop:1,foodStore:0,science:0,culture:12,
    techs:new Set(),buildings:{},sciBonus:0,culBonus:0,foodBonus:0,wonderBuilt:false,
    cities:[{spot:0,terrain:SPOTS[0].terrain,name:"Capital",capital:true}],rivals:[],log:[]};
  s.rivals=makeRivals(civ);
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
  const allies=s.rivals.filter(r=>r.friendship>=80).length;
  return s.techs.size*10+s.pop*4+bc*3+s.cities.length*8+allies*20+(s.wonderBuilt?150:0); }

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
  gift(){ [659,880,1047].forEach((f,i)=>this.tone(f,0.16,'sine',0.15,i*0.06)); },
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
    color:'#ffffff',fontStyle:'bold',align:'center',wordWrap:{width:w-12}}).setOrigin(0.5);
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
    this.add.text(640,300,"Grow a village into an empire, meet your neighbors,\nand learn how the real world got built.",
      {fontFamily:FONT,fontSize:'18px',color:MUTE,align:'center',fontStyle:'italic'}).setOrigin(0.5);
    makeButton(this,490,400,200,72,"🧭 Explorer",GREEN,()=>this.scene.start('CivSelect',{mode:'explorer'}),{fontSize:24});
    makeButton(this,790,400,200,72,"🏆 Challenge",GOLD,()=>this.scene.start('CivSelect',{mode:'challenge'}),{fontSize:24});
    this.sndBtn=makeButton(this,1190,46,150,44,SFX.enabled?"🔊 Sound On":"🔇 Sound Off",PURPLE,()=>{
      SFX.enabled=!SFX.enabled; this.sndBtn.list[1].setText(SFX.enabled?"🔊 Sound On":"🔇 Sound Off");
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
    this.log(`🏳️ Your neighbors are ${this.s.rivals[0].civ.name} ${this.s.rivals[0].civ.emoji} and ${this.s.rivals[1].civ.name} ${this.s.rivals[1].civ.emoji}.`);
    this.dyn=[];
    this.refresh();
  }
  log(m){ this.s.log.unshift(m); }
  track(o){ this.dyn.push(o); return o; }

  /* --- player actions --- */
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
    if(spotOwner(this.s,i)) return;
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

  /* --- diplomacy actions --- */
  gift(ri){
    const cost=8; if(this.s.culture<cost) return;
    this.s.culture-=cost; const r=this.s.rivals[ri];
    r.friendship=Math.min(100,r.friendship+12);
    this.log(`🎁 You sent a gift to ${r.civ.name}. Friendship grew!`); SFX.gift(); this.refresh();
  }
  trade(ri){
    const giveFood=6,getSci=8; if(this.s.foodStore<giveFood) return;
    this.s.foodStore-=giveFood; this.s.science+=getSci; const r=this.s.rivals[ri];
    r.friendship=Math.min(100,r.friendship+4);
    this.log(`🤝 You traded food to ${r.civ.name} for knowledge (+${getSci} science).`); SFX.click(); this.refresh();
  }

  /* --- rivals AI --- */
  rivalTurn(){
    this.s.rivals.forEach(r=>{
      r.techF+=r.speed; const nt=Math.floor(r.techF); if(nt>r.techs) r.techs=nt;
      const na=Math.min(2,Math.floor(r.techs/5));
      if(na>r.age){ r.age=na; this.log(`🏳️ ${r.civ.name} ${r.civ.emoji} reached the Age of ${AGES[na]}!`); }
      if(r.spots.length<2 && Math.random()<0.12){
        const free=SPOTS.map((_,i)=>i).filter(i=>!spotOwner(this.s,i));
        if(free.length){ r.spots.push(Phaser.Utils.Array.GetRandom(free));
          this.log(`🏴 ${r.civ.name} settled new land nearby!`); }
      }
    });
  }
  nextTurn(){
    const y=yields(this.s);
    this.s.science+=y.science; this.s.culture+=y.culture; this.s.foodStore+=y.food;
    let need=growthCost(this.s);
    while(this.s.foodStore>=need){ this.s.foodStore-=need; this.s.pop++; SFX.grow();
      this.log(`👶 Your population grows to ${this.s.pop}!`); need=growthCost(this.s); }
    this.rivalTurn();
    this.s.turn++;
    if(this.s.mode==='challenge'&&this.s.turn>MAX_TURNS){ this.endGame(); return; }
    this.refresh();
  }
  endGame(){
    if(!this.s.wonderBuilt&&this.s.mode==='challenge') SFX.lose();
    const allies=this.s.rivals.filter(r=>r.friendship>=80).length;
    this.scene.start('End',{mode:this.s.mode,civ:this.civ,won:this.s.wonderBuilt,
      score:score(this.s),techs:this.s.techs.size,pop:this.s.pop,cities:this.s.cities.length,allies,age:this.s.age});
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
    this.track(this.add.text(40,214,"Tap a glowing spot to settle. Colored rings are your neighbors.",{fontFamily:FONT,fontSize:'13px',color:MUTE,fontStyle:'italic'}));
    SPOTS.forEach((sp,i)=>{
      const owner=spotOwner(s,i),terr=TERRAIN[sp.terrain];
      const cont=this.add.container(sp.x,sp.y); this.track(cont); this.spotConts[i]=cont;
      const ring=this.add.graphics();
      if(owner&&owner.type==='player'){ ring.fillStyle(0xf3e7c6,1); ring.fillCircle(0,0,56); ring.lineStyle(5,GOLD,1); ring.strokeCircle(0,0,56); }
      else if(owner&&owner.type==='rival'){ ring.fillStyle(0xeadfc6,1); ring.fillCircle(0,0,56); ring.lineStyle(5,owner.rival.color,1); ring.strokeCircle(0,0,56); }
      else { ring.fillStyle(0xe7d9b4,0.6); ring.fillCircle(0,0,56); ring.lineStyle(3,GREEN,0.9); ring.strokeCircle(0,0,56); }
      cont.add(ring);
      if(owner&&owner.type==='rival'){
        cont.add(this.add.text(0,-26,owner.rival.civ.emoji,{fontSize:'38px'}).setOrigin(0.5));
        cont.add(this.add.text(0,18,owner.rival.civ.name,{fontFamily:FONT,fontSize:'14px',color:colorHex(owner.rival.color),fontStyle:'bold',align:'center',wordWrap:{width:108}}).setOrigin(0.5));
        cont.add(this.add.text(0,40,"neighbor",{fontFamily:FONT,fontSize:'11px',color:MUTE}).setOrigin(0.5));
      } else {
        cont.add(this.add.text(0,-26,terr.emoji,{fontSize:'38px'}).setOrigin(0.5));
        if(owner&&owner.type==='player'){ const city=s.cities.find(c=>c.spot===i);
          cont.add(this.add.text(0,18,(city.capital?"⭐ ":"")+city.name,{fontFamily:FONT,fontSize:'14px',color:HEAD,fontStyle:'bold',align:'center',wordWrap:{width:108}}).setOrigin(0.5));
          cont.add(this.add.text(0,40,yieldStr(terr.yields),{fontFamily:FONT,fontSize:'11px',color:MUTE,align:'center'}).setOrigin(0.5));
        } else {
          cont.add(this.add.text(0,16,terr.name,{fontFamily:FONT,fontSize:'12px',color:INK,align:'center',wordWrap:{width:108}}).setOrigin(0.5));
          cont.add(this.add.text(0,40,"➕ Settle",{fontFamily:FONT,fontSize:'13px',color:'#2f6f8f',fontStyle:'bold'}).setOrigin(0.5));
          this.tweens.add({targets:ring,alpha:{from:0.55,to:1},duration:900,yoyo:true,repeat:-1});
        }
      }
      cont.setSize(112,112);
      cont.setInteractive(new Phaser.Geom.Circle(0,0,56),Phaser.Geom.Circle.Contains);
      cont.on('pointerover',()=>this.tweens.add({targets:cont,scaleX:1.06,scaleY:1.06,duration:90}));
      cont.on('pointerout',()=>this.tweens.add({targets:cont,scaleX:1,scaleY:1,duration:90}));
      cont.on('pointerdown',()=>{ SFX.init(); SFX.click();
        const ow=spotOwner(s,i);
        if(ow&&ow.type==='player'){ this.showCityInfo(s.cities.find(c=>c.spot===i)); }
        else if(ow&&ow.type==='rival'){ this.showRivalInfo(ow.rival); }
        else { this.showFoundCity(i); }
      });
    });

    /* TABS + right content */
    const tabDefs=[['discover','🔬 Discover'],['build','🏛️ Build'],['diplomacy','🤝 Neighbors']];
    tabDefs.forEach((td,i)=>{ const cx=746+i*204, active=this.tab===td[0];
      this.track(makeButton(this,cx,196,192,44,td[1],active?BLUE:0x7e8a90,()=>{ this.tab=td[0]; this.refresh(); },{fontSize:17})); });
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
    } else if(this.tab==='build'){
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
    } else {
      this.track(this.add.text(950,248,"Trade, send gifts, or challenge your neighbors to a history quiz.",{fontFamily:FONT,fontSize:'14px',color:MUTE,fontStyle:'italic',align:'center',wordWrap:{width:560}}).setOrigin(0.5));
      s.rivals.forEach((r,ri)=>{
        const top=274+ri*108;
        const g=this.add.graphics(); g.fillStyle(PARCH2,1); g.fillRoundedRect(660,top,580,98,12); g.lineStyle(3,r.color,1); g.strokeRoundedRect(660,top,580,98,12); this.track(g);
        this.track(this.add.text(678,top+10,`${r.civ.emoji} ${r.civ.name}`,{fontFamily:FONT,fontSize:'19px',color:colorHex(r.color),fontStyle:'bold'}));
        this.track(this.add.text(678,top+38,`Age of ${AGES[r.age]} · ${r.techs} discoveries`,{fontFamily:FONT,fontSize:'13px',color:MUTE}));
        this.track(this.add.text(1228,top+22,heartStr(r.friendship),{fontFamily:FONT,fontSize:'17px'}).setOrigin(1,0.5));
        this.track(makeButton(this,748,top+72,124,38,"🎁 Gift (8🏛️)",PURPLE,()=>this.gift(ri),{disabled:s.culture<8,fontSize:13}));
        this.track(makeButton(this,886,top+72,124,38,"🤝 Trade",GREEN,()=>this.trade(ri),{disabled:s.foodStore<6,fontSize:14}));
        this.track(makeButton(this,1024,top+72,124,38,"❓ Quiz",BLUE,()=>this.showQuiz(ri),{fontSize:14}));
      });
    }

    /* NEXT TURN + CHRONICLE */
    const nt=makeButton(this,322,740,600,88,"⏭️  Next Turn",PURPLE,()=>this.nextTurn(),{fontSize:32}); this.track(nt);
    this.tweens.add({targets:nt,scaleX:1.02,scaleY:1.02,duration:900,yoyo:true,repeat:-1,ease:'Sine.inOut'});
    this.track(panelGfx(this,644,692,612,96));
    this.track(this.add.text(668,700,"📜 Chronicle",{fontFamily:FONT,fontSize:'16px',color:HEAD,fontStyle:'bold'}));
    s.log.slice(0,2).forEach((l,i)=>this.track(this.add.text(668,726+i*22,l,{fontFamily:FONT,fontSize:'12px',color:INK,wordWrap:{width:470}})));
    this.track(makeButton(this,1190,712,110,30,"↻))*
