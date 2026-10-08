const viewer=document.getElementById('image-viewer'), image=viewer.querySelector('img'), area=viewer.querySelector('.viewer-image'), level=viewer.querySelector('[data-zoom-level]');
let opener, scale=1, x=0, y=0, width=0, height=0, moved=false, imageClick=false;
const pointers=new Map(), clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
function paint(){const mx=Math.max(0,(width*scale-area.clientWidth)/2),my=Math.max(0,(height*scale-area.clientHeight)/2);x=clamp(x,-mx,mx);y=clamp(y,-my,my);image.style.transform=`translate(${x}px, ${y}px) scale(${scale})`;level.textContent=`${Math.round(scale*100)}%`;viewer.querySelector('[data-zoom-out]').disabled=scale<=1;viewer.querySelector('[data-zoom-in]').disabled=scale>=8;}
function fit(){if(!image.naturalWidth||!viewer.open)return;const r=Math.min(area.clientWidth/image.naturalWidth,area.clientHeight/image.naturalHeight,1);width=image.naturalWidth*r;height=image.naturalHeight*r;image.style.width=`${width}px`;image.style.height=`${height}px`;scale=1;x=y=0;paint();}
function zoom(next,px=0,py=0){next=clamp(next,1,8);const r=next/scale;x=px-(px-x)*r;y=py-(py-y)*r;scale=next;paint();}
function center(p){const r=area.getBoundingClientRect();return {x:p.x-r.left-r.width/2,y:p.y-r.top-r.height/2};}
document.querySelectorAll('[data-enlarge]').forEach(link=>link.addEventListener('click',e=>{e.preventDefault();opener=link;const src=link.querySelector('img');image.src=src.src;image.alt=src.alt;document.getElementById('viewer-title').textContent=link.dataset.title;viewer.showModal();fit();viewer.querySelector('[data-close-viewer]').focus();}));
image.addEventListener('load',fit);window.addEventListener('resize',fit);
viewer.querySelector('[data-close-viewer]').addEventListener('click',()=>viewer.close());
viewer.querySelector('[data-reset]').addEventListener('click',fit);
viewer.querySelector('[data-zoom-in]').addEventListener('click',()=>zoom(scale*1.25));
viewer.querySelector('[data-zoom-out]').addEventListener('click',()=>zoom(scale/1.25));
viewer.querySelector('[data-zoom]').addEventListener('click',()=>zoom(Math.max(1,image.naturalWidth/width)));
area.addEventListener('wheel',e=>{e.preventDefault();const p=center({x:e.clientX,y:e.clientY});const delta=e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?area.clientHeight:1);zoom(scale*Math.exp(-delta*.002),p.x,p.y);},{passive:false});
area.addEventListener('pointerdown',e=>{if(e.button>0)return;if(!pointers.size){moved=false;imageClick=e.target===image;}pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});if(pointers.size>1)moved=true;area.setPointerCapture(e.pointerId);});
area.addEventListener('pointermove',e=>{if(!pointers.has(e.pointerId))return;const before=[...pointers.values()],old=pointers.get(e.pointerId),now={x:e.clientX,y:e.clientY};if(Math.hypot(now.x-old.x,now.y-old.y)>2)moved=true;pointers.set(e.pointerId,now);const after=[...pointers.values()];if(after.length===1&&scale>1){x+=now.x-old.x;y+=now.y-old.y;paint();}if(after.length===2){const distance=ps=>Math.hypot(ps[0].x-ps[1].x,ps[0].y-ps[1].y),mid=ps=>({x:(ps[0].x+ps[1].x)/2,y:(ps[0].y+ps[1].y)/2}),a=mid(before),b=mid(after),p=center(a);if(distance(before)>0)zoom(scale*distance(after)/distance(before),p.x,p.y);x+=b.x-a.x;y+=b.y-a.y;paint();}});
area.addEventListener('pointerup',e=>{pointers.delete(e.pointerId);if(area.hasPointerCapture(e.pointerId))area.releasePointerCapture(e.pointerId);});
area.addEventListener('pointercancel',e=>{pointers.delete(e.pointerId);moved=true;});
area.addEventListener('keydown',e=>{if(['+','=','-','0','ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key))e.preventDefault();if(e.key==='+'||e.key==='=')zoom(scale*1.25);if(e.key==='-')zoom(scale/1.25);if(e.key==='0')fit();if(e.key==='ArrowLeft')x+=40;if(e.key==='ArrowRight')x-=40;if(e.key==='ArrowUp')y+=40;if(e.key==='ArrowDown')y-=40;paint();});
viewer.addEventListener('close',()=>{pointers.clear();image.removeAttribute('src');opener?.focus();});
area.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();if(!pointers.size&&!moved&&imageClick)viewer.close();});