/* Feedback Hub: every written improvement answer must contain at least 20 words. */
(() => {
'use strict';
const min=20,root=document.getElementById('tasks');
if(!root)return;
const words=s=>(s.trim().match(/\S+/g)||[]).length;
const answers=()=>Array.from(root.querySelectorAll('textarea'));
function check(field){
 let note=field.nextElementSibling;
 if(!note||!note.classList.contains('minimum-word-count')){
  note=document.createElement('div');note.className='minimum-word-count';
  note.setAttribute('role','status');field.insertAdjacentElement('afterend',note);
 }
 const n=words(field.value),remaining=Math.max(0,min-n);
 note.textContent=n+' / '+min+' words minimum'+(remaining?' · '+remaining+' more needed':' ✓');
 note.style.cssText='margin:5px 0 10px;font-size:.83rem;font-weight:700;color:'+(remaining?'#a23b28':'#146c52');
 field.setAttribute('aria-invalid',remaining?'true':'false');
}
const refresh=()=>answers().forEach(check);
root.addEventListener('input',e=>{if(e.target.matches('textarea'))check(e.target)});
new MutationObserver(records=>{
 if(records.some(record=>Array.from(record.addedNodes).some(n=>n.nodeType===1&&(n.matches('textarea')||n.querySelector('textarea')))))refresh();
}).observe(root,{childList:true,subtree:true});
document.addEventListener('click',e=>{
 if(!e.target.closest('#print'))return;
 const fields=answers(),bad=fields.find(f=>words(f.value)<min);
 if(!fields.length||!bad)return;
 e.preventDefault();e.stopImmediatePropagation();
 const n=words(bad.value);
 alert('Each improvement task must contain at least 20 words before printing. Task '+(fields.indexOf(bad)+1)+' has '+n+' words. Write '+(min-n)+' more.');
 bad.focus();
},true);
const style=document.createElement('style');
style.textContent='@media print{.minimum-word-count{display:none!important}}';
document.head.append(style);
refresh();
})();