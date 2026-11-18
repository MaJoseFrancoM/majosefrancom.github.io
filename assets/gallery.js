const links=[...document.querySelectorAll('.gallery a')];
if(links.length){
 const viewer=document.createElement('dialog');viewer.className='photo-viewer';viewer.setAttribute('aria-label','Photograph');
 const close=document.createElement('button');close.type='button';close.textContent='Close';
 const img=document.createElement('img');viewer.append(close);document.body.append(viewer);
 let active=null;
 for(const link of links)link.addEventListener('click',event=>{if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;event.preventDefault();active=link;img.src=link.href;img.alt=link.querySelector('img').alt||link.getAttribute('aria-label');viewer.append(img);viewer.showModal();});
 close.addEventListener('click',()=>viewer.close());
 viewer.addEventListener('click',event=>{if(event.target===viewer)viewer.close();});
 viewer.addEventListener('close',()=>active?.focus());
}
