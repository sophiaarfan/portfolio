function trigRev(){
  const obs=new IntersectionObserver(entries=>{
    entries.forEach((e,i)=>{
      if(e.isIntersecting){setTimeout(()=>e.target.classList.add('vis'),i*80);obs.unobserve(e.target);}
    });
  },{threshold:0.06});
  document.querySelectorAll('.rev:not(.vis)').forEach(el=>obs.observe(el));
}
trigRev();

function initCarousel(){
  const track=document.getElementById('carTrack');
  if(!track)return;
  const cards=Array.from(track.querySelectorAll('.pc'));
  const dotsEl=document.getElementById('carDots');
  let idx=0;
  const vis=()=>window.innerWidth<920?1:2;

  function buildDots(){
    dotsEl.innerHTML='';
    const pages=Math.ceil(cards.length/vis());
    for(let i=0;i<pages;i++){
      const d=document.createElement('div');
      d.className='cdot'+(i===0?' on':'');
      d.addEventListener('click',()=>goTo(i));
      dotsEl.appendChild(d);
    }
  }
  function goTo(i){
    const v=vis();
    const pages=Math.ceil(cards.length/v);
    idx=Math.max(0,Math.min(i,pages-1));
    const outer=track.parentElement;
    const gap=20;
    const cardW=(outer.offsetWidth-(gap*(v-1)))/v;
    cards.forEach(c=>{c.style.minWidth=cardW+'px';c.style.maxWidth=cardW+'px';});
    track.style.transform='translateX(-'+(idx*(outer.offsetWidth+gap))+'px)';
    document.querySelectorAll('.cdot').forEach((d,j)=>d.classList.toggle('on',j===idx));
  }
  document.getElementById('carPrev').addEventListener('click',()=>goTo(idx-1));
  document.getElementById('carNext').addEventListener('click',()=>goTo(idx+1));
  window.addEventListener('resize',()=>{buildDots();goTo(0);});
  buildDots();
  setTimeout(()=>goTo(0),100);
}
initCarousel();

function initFilter(){
  const grid=document.getElementById('allGrid');
  if(!grid)return;

  setTimeout(()=>{
    grid.querySelectorAll('.pc').forEach((c,i)=>{
      setTimeout(()=>c.classList.add('vis'),i*80);
    });
  },100);

  document.querySelectorAll('.fb').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('.fb').forEach(b=>b.classList.remove('on'));
      btn.classList.add('on');
      const f=btn.dataset.f;
      grid.querySelectorAll('.pc').forEach(card=>{
        const tags=card.dataset.t.split(',').map(s=>s.trim());
        const show=f==='all'||tags.includes(f);
        card.classList.toggle('gone',!show);
        if(show) card.classList.add('vis');
      });
    });
  });
}
initFilter();
function forceDL() {
  fetch('pdf/Sophia - Resume.pdf')
    .then(res => res.blob())
    .then(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Sophia_Arfan_Resume.pdf';
      a.click();
      URL.revokeObjectURL(url);
    });
}