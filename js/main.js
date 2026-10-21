/* ===== setup ===== */
const $=q=>document.querySelector(q),$$=q=>[...document.querySelectorAll(q)];
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const lite=reduce||(navigator.hardwareConcurrency||8)<=4||(navigator.deviceMemory||8)<=2;
document.documentElement.classList.toggle('lite',lite);
gsap.registerPlugin(ScrollTrigger,MotionPathPlugin);
// ---- EDIT HERE: date, map pin, programme ----
const WED={date:'2026-12-11T16:00:00+07:00',map:{lat:12.2,lng:105.3},EXAMPLE:true,url:location.href};
const kn=n=>String(n).replace(/\d/g,d=>'០១២៣៤៥៦៧៨៩'[d]);
const PROG=[["កម្មវិធីទី១ ថ្ងៃព្រហស្បតិ៍ ទី១០ ខែធ្នូ ឆ្នាំ២០២៦",[["០៣:០០ រសៀល","ពិធីសែនក្រុងពាលី"],["០៤:០០ រសៀល","ពិធីសូត្រមន្តចម្រើនព្រះបរិត្ត"],["០៥:០០ ល្ងាច","ពិធីជុំពេលា និងជាវខាន់ស្លា"],["០៦:៣០ ល្ងាច","អញ្ជើញភ្ញៀវកិត្តិយសពិសាអាហារពេលល្ងាច"]]],
["កម្មវិធីទី២ ថ្ងៃសុក្រ ទី១១ ខែធ្នូ ឆ្នាំ២០២៦",[["០៦:៣០ ព្រឹក","ជួបជុំភ្ញៀវកិត្តិយសដើម្បីរៀបចំហែជំនូន"],["០៧:០០ ព្រឹក","ពិធីហែជំនូនកំណត់ចូលរោងជ័យ"],["០៧:៣០ ព្រឹក","ពិធីចៅមហានិយាយជើងការ សែនព្រេន រៀបរាប់ផ្លែឈើនិងពិសាភោជនាហារពេលព្រឹក"],["០៨:០០ ព្រឹក","ពិធីបំពាក់ចិញ្ចៀន"],["០៩:០០ ព្រឹក","ពិធីកាត់សក់បង្កក់សិរី កូនប្រុស-កូនស្រី"],["១១:០០ ព្រឹក","ពិធីសំពះផ្ទឹមចងដៃ បង្វិលពពិល និងព្រះថោងតោងស្បៃ"],["១២:០០ ថ្ងៃត្រង់","អញ្ជើញភ្ញៀវកិត្តិយសពិសាអាហារថ្ងៃត្រង់ បញ្ចប់កិច្ចអាពាហ៍ពិពាហ៍"],["០៤:០០ ល្ងាច","អញ្ជើញភ្ញៀវកិត្តិយសពិសាភោជនាហារ នៅគេហដ្ឋានខាងស្រី ដោយមេត្រីភាព។ សូមអរគុណ!",1]]]];
const LAB=i=>i<5?'ពណ៌មាសសិរីមង្គល':i<10?'ពណ៌ស្វាយថ្លៃថ្លា':'ឈុតអាពាហ៍ពិពាហ៍';
$$('[data-img]').forEach(e=>e.style.backgroundImage=`url(${IMGS[e.dataset.img]})`);
$('#candle').style.backgroundImage=`url(${IMGS[6]})`;
$('#prog').insertAdjacentHTML('beforeend',PROG.map(([t,r])=>`<section class="pday"><h3>${t}</h3>${r.map(([h,w,m])=>`<div class="prow km ${m?'prow--main':''}"><time>ម៉ោង ${h}</time><span>${w}</span></div>`).join('')}</section>`).join(''));
$('#track').innerHTML=IMGS.map((s,i)=>`<div class="slide"><div class="frm"><div class="ph" style="background-image:url(${s})"></div></div><p class="km"><b>${kn(i+1)}</b>${LAB(i)}</p></div>`).join('');
$('#mas').innerHTML=IMGS.map((s,i)=>`<button class="gi" data-i="${i}" aria-label="Photo ${i+1}"><img src="${s}" alt="" loading="lazy"></button>`).join('');
$('#qrs').innerHTML=QRS.map(([s,l,kmRole,enRole])=>`<figure><figcaption><span class="qrole km" data-km>${kmRole}</span><span class="qrole en" data-en>${enRole}</span><span class="qbank">${l}</span></figcaption><img src="${s}" alt="${l} ${enRole} payment QR"><a class="btn" download="${l}.jpg" href="${s}"><span data-km class="km">រក្សាទុក QR</span><span data-en>Save QR</span></a></figure>`).join('');
// scalloped photo frame (clip + gold outline)
(function(){const nx=8,ny=11,a=.02,sx=(1-2*a)/nx,sy=(1-2*a)/ny;let d=`M${a} ${a}`;
for(let i=0;i<nx;i++)d+=` Q${a+sx*(i+.5)} 0 ${a+sx*(i+1)} ${a}`;for(let i=0;i<ny;i++)d+=` Q1 ${a+sy*(i+.5)} ${1-a} ${a+sy*(i+1)}`;
for(let i=nx;i>0;i--)d+=` Q${a+sx*(i-.5)} 1 ${a+sx*(i-1)} ${1-a}`;for(let i=ny;i>0;i--)d+=` Q0 ${a+sy*(i-.5)} ${a} ${a+sy*(i-1)}`;d+='Z';
document.body.insertAdjacentHTML('beforeend',`<svg width="0" height="0" style="position:absolute"><clipPath id="scallop" clipPathUnits="objectBoundingBox"><path d="${d}"/></clipPath></svg>`);$('#sPath').setAttribute('d',d)})();
/* ===== language, music ===== */
$('#lang').onclick=()=>{document.body.classList.toggle('en-mode');$('#lang').textContent=document.body.classList.contains('en-mode')?'ខ្មែរ':'EN'};
let ctx,buf,src,playing=false,au;
async function startMus(){try{const AC=window.AudioContext||window.webkitAudioContext;ctx=ctx||new AC();const r=ctx.resume();if(!buf)buf=await ctx.decodeAudioData(await (await fetch(MUSIC)).arrayBuffer());await r;
 if(!src){src=ctx.createBufferSource();src.buffer=buf;src.loop=true;const g=ctx.createGain();g.gain.value=.85;src.connect(g);g.connect(ctx.destination);src.start(0)}
 if(playing)await ctx.resume();else ctx.suspend()}catch(e){try{au=au||Object.assign(new Audio(MUSIC),{loop:true});playing?au.play():au.pause()}catch(_){}}}
function setMus(p){playing=p;$('#mus').classList.toggle('on',p);if(p)startMus();else{ctx&&ctx.suspend();au&&au.pause()}}
$('#mus').onclick=()=>setMus(!playing);
/* ===== name logo (lockup) animation ===== */
function lockPrep(r){$$(r+' .lk-swash').forEach(p=>{const L=p.getTotalLength();p.style.strokeDasharray=L;p.style.strokeDashoffset=L});
 gsap.set(r+' .lk-heart',{opacity:0,scale:0});gsap.set(r+' .lk-bf',{opacity:0});gsap.set(r+' .lk-groom,'+r+' .lk-bride',{clipPath:'inset(-40% 110% -40% -10%)'})}
function lockPlay(r,tl,at){const off=function(){this.targets()[0].style.clipPath='none'};
 tl.to(r+' .lk-groom',{clipPath:'inset(-40% -10% -40% -10%)',duration:1.1,ease:'power2.inOut',onComplete:off},at)
  .to(r+' .lk-bride',{clipPath:'inset(-40% -10% -40% -10%)',duration:1.1,ease:'power2.inOut',onComplete:off},at+.5)
  .to(r+' .lk-swash',{strokeDashoffset:0,duration:1.4,ease:'power1.inOut',stagger:.3},at+.2)
  .to(r+' .lk-heart',{opacity:1,scale:1,duration:.7,ease:'back.out(3)'},at+1.3)
  .fromTo(r+' .lk-bf',{opacity:0,scale:.3,x:-50},{opacity:1,scale:1,x:0,duration:1,ease:'power2.out'},at+1.5)}
lockPrep('#cover');gsap.set('.r',{opacity:0,y:14});
/* ===== cover ===== */
function cover(){$('#scene').style.display='none';$('#cover').style.visibility='visible';scenes();
 startButterflies();
 const t=gsap.timeline({defaults:{ease:'power3.out'}});
 t.to('#dark',{opacity:0,duration:1.1,ease:'power2.inOut'}).set('#dark',{display:'none'},1.1)
  .to('#bar',{opacity:1,duration:.8,onComplete:()=>$('#bar').style.pointerEvents='auto'},.4)
  .fromTo('.corner',{opacity:0,scale:.6},{opacity:.95,scale:1,duration:1.4,stagger:.1},.2)
  .to('.crest.r,.ceremonial,.invite',{opacity:1,y:0,duration:1,stagger:.12},.5);
 lockPlay('#cover',t,1);
 t.to('.names,.date,.lunar,.venue',{opacity:1,y:0,duration:.9,stagger:.14},2).to('.scroll',{opacity:.7},3);
 gsap.to('#cover .lk-bf',{y:-4,rotation:4,repeat:-1,yoyo:true,duration:1.6,ease:'sine.inOut',delay:3.5})}
 function startButterflies(){if(reduce||$('#butterflies'))return;
  const layer=document.createElement('div');layer.id='butterflies';layer.setAttribute('aria-hidden','true');document.body.appendChild(layer);
  const count=lite?3:5,T=$('#bfT').innerHTML;
  function fly(d){const w=innerWidth,h=innerHeight,sx=Math.random()*w,sy=Math.random()*h,ex=Math.random()*w,ey=Math.random()*h;
   const path=[{x:sx,y:sy},{x:sx+(ex-sx)*.35+(Math.random()-.5)*w*.28,y:sy+(ey-sy)*.35+(Math.random()-.5)*h*.24},{x:sx+(ex-sx)*.7+(Math.random()-.5)*w*.28,y:sy+(ey-sy)*.7+(Math.random()-.5)*h*.24},{x:ex,y:ey}];
   gsap.set(d,{x:sx,y:sy,opacity:0,scale:.7,rotation:Math.random()*30-15});
   gsap.to(d,{opacity:.72,scale:1,duration:1.2,ease:'sine.out'});
   gsap.to(d,{motionPath:{path,curviness:1.5},duration:12+Math.random()*10,ease:'sine.inOut',onComplete:()=>fly(d)})}
  for(let i=0;i<count;i++){const d=document.createElement('div');d.className='fly'+(i%3===2?' blue':'');d.innerHTML=T;d.style.cssText=`left:0;top:0;width:${28+Math.random()*18}px`;layer.appendChild(d);
   gsap.to(d.querySelectorAll('.wing-l,.wing-r'),{scaleX:.18,svgOrigin:'50 40',duration:.12,repeat:-1,yoyo:true,ease:'sine.inOut',delay:Math.random()*.2});gsap.delayedCall(i*1.4,()=>fly(d))}
 }
 /* ===== open-book opening + butterflies ===== */
let opened=false;
function flock(){const r=$('#bk').getBoundingClientRect(),ox=r.left+r.width/2,oy=r.top+r.height*.42,n=lite?4:8,T=$('#bfT').innerHTML;
 for(let i=0;i<n;i++){const d=document.createElement('div');d.className='fly'+(i%3==2?' blue':'');d.innerHTML=T;const sz=34+Math.random()*30,dir=i%2?1:-1,dl=i*.14;
  d.style.cssText=`left:${ox-sz/2}px;top:${oy-sz/2}px;width:${sz}px`;$('#scene').appendChild(d);
  gsap.to(d.querySelectorAll('.wing-l,.wing-r'),{scaleX:.18,svgOrigin:'50 40',duration:.1+Math.random()*.05,repeat:-1,yoyo:true,ease:'sine.inOut'});
  gsap.fromTo(d,{opacity:0,scale:.3},{opacity:1,scale:1,duration:.5,delay:dl});
  gsap.to(d,{motionPath:{path:[{x:0,y:0},{x:dir*(40+Math.random()*120),y:-(60+Math.random()*100)},{x:-dir*(30+Math.random()*160),y:-(180+Math.random()*120)},{x:dir*(80+Math.random()*220),y:-(innerHeight*.7+Math.random()*120)}],curviness:1.5,autoRotate:90},duration:3+Math.random()*1.2,delay:dl,ease:'sine.inOut',onComplete:()=>d.remove()});
  gsap.to(d,{opacity:0,duration:.8,delay:dl+2.4+Math.random()*.6})}}
function openBook(){if(opened)return;opened=true;$('.tap').style.display='none';setMus(true);
 if(reduce){gsap.to('#dark',{opacity:1,duration:.4,onComplete:cover});return}
 $('#seal').style.animation='none';const bk=$('#bk'),W=bk.offsetWidth,s=Math.min(1.6,.94*innerWidth/(2*W));
 gsap.timeline()
  .to('#seal',{scale:.9,duration:.4})
  .to('#seal',{y:-12,scale:1.25,rotation:-8,duration:.7,ease:'power2.out'})
  .to('#seal',{x:'60vw',y:'-35svh',rotation:50,opacity:0,duration:.8,ease:'power2.in'})
  .to('#bkCover',{rotationY:-180,transformPerspective:1600,duration:2,ease:'power2.inOut'},'-=.1')
  .to(bk,{x:W/2*s,scale:s,duration:2,ease:'power2.inOut'},'<')
  .to('#bkShade',{opacity:0,duration:1.2},'<.4')
  .add(flock,'-=.6').to({},{duration:1.6})
  .to('#dark',{opacity:1,duration:.7,ease:'power1.in'}).add(cover)}
$('#seal').onclick=openBook;$('#bkCover').onclick=openBook;
/* ===== lightbox ===== */
const lb=$('#lb');let LBL=[],LBi=0;
function showLB(){$('#lbi').src=LBL[LBi];$('#lbc').textContent=LBL.length>1?`${kn(LBi+1)} / ${kn(LBL.length)}`:'';$('#lbp').style.display=$('#lbn').style.display=LBL.length>1?'':'none'}
function openLB(l,i){LBL=l;LBi=i;showLB();lb.showModal()}
const stepLB=d=>{LBi=(LBi+d+LBL.length)%LBL.length;showLB()};
$('#lbx').onclick=()=>lb.close();$('#lbp').onclick=()=>stepLB(-1);$('#lbn').onclick=()=>stepLB(1);
document.addEventListener('keydown',e=>{if(!lb.open)return;if(e.key=='ArrowLeft')stepLB(-1);if(e.key=='ArrowRight')stepLB(1)});
let lx0=0;lb.addEventListener('pointerdown',e=>lx0=e.clientX);lb.addEventListener('pointerup',e=>{const d=e.clientX-lx0;if(Math.abs(d)>50&&LBL.length>1)stepLB(d<0?1:-1)});
$('#mas').onclick=e=>{const b=e.target.closest('.gi');if(b)openLB(IMGS,+b.dataset.i)};
$('#sk').onclick=e=>openLB([e.target.src],0);
/* ===== flip-book wedding album ===== */
(function(){const alb=$('#alb'),N=7,cv=`<div class="fc cv"><div><div class="crest">${$('#crestT').innerHTML}</div><h3 class="g">អាល់ប៊ុមអាពាហ៍ពិពាហ៍</h3><div class="nm g">ញ៉ា &amp; សកុណា</div></div></div>`;
 const F=[cv,...IMGS.slice(0,12).map(s=>`<div class="fc"><i style="background-image:url(${s})"></i></div>`),`<div class="fc cv"><div><h3 class="g">សូមអរគុណ</h3></div></div>`];
 alb.innerHTML=Array.from({length:N},(_,k)=>`<div class="lf">${F[2*k]}${F[2*k+1].replace('class="fc','class="fc rv')}</div>`).join('');
 const L=$$('#alb .lf');let idx=0,busy=false;gsap.set(L,{transformPerspective:1800,zIndex:k=>N-k});
 function lay(d=0){const W=alb.offsetWidth,vw=$('#astage').clientWidth;if(!W||!vw)return;const s=(idx==0||idx==N)?Math.min(1.5,.8*vw/W):Math.min(1.5,.94*vw/(2*W));
  gsap.to(alb,{x:[0,.5,1][idx==0?0:idx==N?2:1]*W*s,scale:s,duration:d,ease:'power2.inOut'});$('#aNum').textContent=kn(idx)+' / '+kn(N)}
 function flip(dir){if(busy)return;const k=dir>0?idx:idx-1;if(k<0||k>=N)return;busy=true;const lf=L[k];gsap.set(lf,{zIndex:N+3});
  gsap.to(lf,{rotationY:dir>0?-180:0,duration:1.1,ease:'power2.inOut',onComplete:()=>{gsap.set(lf,{zIndex:dir>0?k+1:N-k});busy=false}});idx+=dir;lay(1.1)}
 let x0=0;alb.addEventListener('pointerdown',e=>x0=e.clientX);
 alb.addEventListener('pointerup',e=>{const d=e.clientX-x0;if(Math.abs(d)>40)return flip(d<0?1:-1);flip(e.clientX<alb.getBoundingClientRect().left?-1:1)});
 $('#aNext').onclick=()=>flip(1);$('#aPrev').onclick=()=>flip(-1);addEventListener('resize',()=>lay(0));window.albumLay=lay;
 window.albumHint=()=>{if(!reduce)setTimeout(()=>flip(1),700)}})();
/* ===== venue, calendar, share, countdown, ripples ===== */
const M=WED.map,mb=$('#mapbox');if(WED.EXAMPLE)$('#exn').style.display='block';
const inClaude=/claude|anthropic/i.test(location.hostname+document.referrer+(location.ancestorOrigins?[...location.ancestorOrigins].join():''));
if(M.lat!=null){$('#mapbtn').href=`https://www.google.com/maps?q=${M.lat},${M.lng}`;
 mb.innerHTML=inClaude?`<div class="ph0 km">ផែនទី Google Maps<br><small style="opacity:.7">(នឹងបង្ហាញនៅពេលដាក់លើគេហទំព័រពិត)</small></div>`:`<iframe class="map" loading="lazy" src="https://maps.google.com/maps?q=${M.lat},${M.lng}&output=embed"></iframe>`}
$('#ics').onclick=e=>{e.preventDefault();const f=d=>d.toISOString().replace(/[-:]|\.\d+/g,''),s=new Date(WED.date),en=new Date(+s+4*36e5);
 const t=['BEGIN:VCALENDAR','VERSION:2.0','BEGIN:VEVENT','DTSTART:'+f(s),'DTEND:'+f(en),'SUMMARY:Wedding of NHA & SAKONA','LOCATION:Phum Pchru\\, Khum Stung Chey\\, Cheung Prey\\, Kampong Cham','END:VEVENT','END:VCALENDAR'].join('\r\n');
 const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([t],{type:'text/calendar'}));a.download='wedding.ics';a.click()};
const u=encodeURIComponent(WED.url),tx=encodeURIComponent('សិរីសួស្តីអាពាហ៍ពិពាហ៍ ញ៉ា & សកុណា');
$('#sT').href=`https://t.me/share/url?url=${u}&text=${tx}`;$('#sF').href=`https://www.facebook.com/sharer/sharer.php?u=${u}`;$('#sM').href=`fb-messenger://share/?link=${u}`;
$('#sM').onclick=e=>{if(!/Android|iPhone|iPad/i.test(navigator.userAgent)){e.preventDefault();open(`https://www.facebook.com/sharer/sharer.php?u=${u}`)}};
$('#sC').onclick=()=>navigator.clipboard.writeText(WED.url).then(()=>$('#sCt').textContent='បានចម្លង ✓').catch(()=>{});
function tick(){const d=Math.max(0,new Date(WED.date)-Date.now())/1000,v=[[d/86400,'ថ្ងៃ'],[d/3600%24,'ម៉ោង'],[d/60%60,'នាទី'],[d%60,'វិនាទី']];$('#cd').innerHTML=v.map(([n,l])=>`<div><b>${kn(String(Math.floor(n)).padStart(2,'0'))}</b><span>${l}</span></div>`).join('')}tick();setInterval(tick,1000);
const cn=$('#candle');cn.addEventListener('pointerdown',e=>{const r=cn.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top,k=document.createElement('div');k.className='ring';k.style.cssText=`left:${x}px;top:${y}px`;cn.appendChild(k);setTimeout(()=>k.remove(),2300);
 const l=document.createElement('img');l.src=LOTUS;l.className='lot';l.style.cssText=`left:${x}px;top:${y}px`;cn.appendChild(l);gsap.to(l,{y:-70-Math.random()*60,x:'+='+(Math.random()*60-30),rotation:Math.random()*40-20,opacity:0,duration:5,ease:'power1.out',onComplete:()=>l.remove()})});
/* ===== scroll scenes ===== */
function scenes(){$('#rest').style.display='block';gsap.set('#alb',{x:0,scale:1});window.albumLay(0);$('#pill').classList.add('show');
 gsap.to('#vine',{scaleY:1,ease:'none',scrollTrigger:{start:0,end:'max',scrub:true}});
 lockPrep('#finale');ScrollTrigger.create({trigger:'#finale .lockup',start:'top 85%',once:true,onEnter:()=>lockPlay('#finale',gsap.timeline(),0)});
 ScrollTrigger.create({trigger:'#cdls',start:'top 80%',once:true,onEnter:()=>$$('.cdl').forEach((c,i)=>setTimeout(()=>c.classList.add('on'),i*450))});
 ScrollTrigger.create({trigger:'#album',start:'top 55%',once:true,onEnter:()=>window.albumHint()});
 if(reduce){$$('.prow').forEach(r=>r.classList.add('on'));return ScrollTrigger.refresh()}
 gsap.to('#prog .thread i',{scaleY:1,ease:'none',scrollTrigger:{trigger:'#prog',start:'top 70%',end:'bottom 70%',scrub:true}});
 $$('.prow').forEach(r=>ScrollTrigger.create({trigger:r,start:'top 75%',onEnter:()=>r.classList.add('on')}));
 gsap.from('.arch,.wcard',{y:60,opacity:0,duration:1.1,ease:'power3.out',stagger:.2,scrollTrigger:{trigger:'#words',start:'top 70%',once:true}});
 gsap.from('.person',{x:i=>0,y:40,opacity:0,duration:1,stagger:.2,scrollTrigger:{trigger:'#couple',start:'top 70%',once:true}});
 const sp=$('#sPath'),SL=sp.getTotalLength?sp.getTotalLength():0;gsap.fromTo('.scal',{scale:.85,opacity:0},{scale:1,opacity:1,duration:1.2,ease:'power3.out',scrollTrigger:{trigger:'#couple',start:'top 65%',once:true}});
 gsap.fromTo(sp,{strokeDasharray:'1 4000',strokeDashoffset:0},{strokeDasharray:'4000 0',duration:2.2,ease:'power1.inOut',scrollTrigger:{trigger:'#couple',start:'top 65%',once:true}});
 const tr=$('#track');gsap.to(tr,{x:()=>-(tr.scrollWidth-innerWidth),ease:'none',scrollTrigger:{trigger:'#story',pin:true,scrub:.6,end:()=>'+='+tr.scrollWidth,invalidateOnRefresh:true}});
 gsap.fromTo('#story',{backgroundColor:'#2f6a52'},{backgroundColor:'#08160f',ease:'none',scrollTrigger:{trigger:'#story',start:'top top',end:()=>'+='+tr.scrollWidth,scrub:true}});
 gsap.from('.slide .frm',{opacity:0,y:50,scale:.9,stagger:.08,duration:.9,scrollTrigger:{trigger:'#story',start:'top 80%',once:true}});
 gsap.set('.gi',{opacity:0});
 ScrollTrigger.batch('.gi',{start:'top 92%',once:true,onEnter:els=>{gsap.fromTo(els,{y:50,opacity:0,rotateX:-14,scale:.92},{y:0,opacity:1,rotateX:0,scale:1,duration:.9,stagger:.09,ease:'power3.out'});els.forEach((e,i)=>setTimeout(()=>e.classList.add('shine'),i*90+450))}});
 if(!lite&&matchMedia('(hover:hover)').matches)$$('.gi').forEach(g=>{g.addEventListener('pointermove',e=>{const r=g.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;gsap.to(g,{rotateY:x*10,rotateX:-y*10,duration:.3})});g.addEventListener('pointerleave',()=>gsap.to(g,{rotateY:0,rotateX:0,duration:.5}))});
 ScrollTrigger.refresh()}
