/* Native modal provides focus containment and an inert background. No external dependencies. */
(() => {
 const header=document.querySelector('.site-header'),button=header.querySelector('.nav-toggle');
 const mobile=matchMedia('(max-width:600px)');
 const panel=document.createElement('dialog');
 panel.id='mobile-menu';panel.className='mobile-panel';panel.setAttribute('aria-label','Main menu');
 const top=document.createElement('div');top.className='panel-heading';
 top.append(header.querySelector('.brand').cloneNode(true));
 const close=document.createElement('button');close.type='button';close.className='panel-close';close.setAttribute('aria-label','Close menu');close.autofocus=true;
 close.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 4 16 16M20 4 4 20"/></svg>';
 top.append(close);panel.append(top);
 const nav=header.querySelector('#navigation').cloneNode(true);nav.removeAttribute('id');panel.append(nav);document.body.append(panel);
 button.setAttribute('aria-controls','mobile-menu');button.setAttribute('aria-haspopup','dialog');button.setAttribute('aria-label','Open menu');
 button.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg>';
 button.hidden=false;header.classList.add('menu-ready');
 button.addEventListener('click',()=>{if(!mobile.matches)return;panel.showModal();button.setAttribute('aria-expanded','true');document.documentElement.classList.add('menu-open');});
 close.addEventListener('click',()=>panel.close());
 panel.addEventListener('keydown',event=>{
  if(event.key!=='Tab')return;
  const items=[...panel.querySelectorAll('a[href],button')],first=items[0],last=items[items.length-1];
  if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
  else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
 });
 panel.addEventListener('close',()=>{button.setAttribute('aria-expanded','false');document.documentElement.classList.remove('menu-open');if(mobile.matches)button.focus();});
 panel.addEventListener('click',event=>{if(event.target.closest('a'))panel.close();});
 mobile.addEventListener('change',()=>{if(panel.open)panel.close();});
 for(const img of document.querySelectorAll('main img')){
  if(img.complete)continue;
  const started=performance.now();
  img.addEventListener('load',()=>{if(performance.now()-started>150)img.classList.add('image-arrived');},{once:true});
 }
})();
