(()=>{
'use strict';
const solution=[1,3,4,2,4,2,1,3,2,4,3,1,3,1,2,4];
const givens={0:1,7:3,10:3,13:1};
const clues=[[1,2,'bond'],[4,5,'>'],[8,9,'<'],[10,11,'>'],[14,15,'<'],[2,6,'vertical'],[8,12,'bond']];
const lessons=[
[1,'A bond narrows the possibilities','Look at the two bonded spaces in row 1. Which ranks can the right-hand space use, given the 3 below it?','R1C3 can only be 2 or 4: row 1 already has 1, and column 3 has 3. Its bonded neighbour must differ by one. Either choice requires R1C2 to be 3 (1 is already in the row).'],
[4,'Read the pointed end','Compare the first two spaces in row 2. Neither can be 1. Which must be larger?','Row 2 still needs 1, 2 and 4. Column 1 already has 1; column 2 already has 1 and 3. The first two spaces must be 2 and 4. The chevron points right, so R2C1 is 4 and R2C2 is 2.'],
[5,'Complete the comparison','Use the comparison you just resolved in row 2.','R2C2 is less than 4 and cannot be 1 or 3 because of its column. It must be 2.'],
[6,'Let the row finish the thought','Which rank is missing from row 2?','Row 2 now contains 4, 2 and 3. R2C3 must be 1.'],
[8,'Another comparison, fewer options','In row 3, compare columns 1 and 2. Use the ranks already in their columns.','R3C1 cannot be 1 or 4 (column 1), or 3 (row 3), so it is 2. The chevron also tells you that R3C2 must be larger.'],
[9,'Follow the chevron','The space to the right of your 2 must be larger. What is left in column 2?','Column 2 already contains 3, 2 and 1. R3C2 is 4, which also satisfies 2 < 4.'],
[11,'Close the third row','Row 3 has three ranks. Check its final chevron too.','Row 3 contains 2, 4 and 3, so R3C4 is 1. The neighbouring 3 is greater than 1, as required.'],
[12,'Use the vertical bond','The bottom-left space is bonded to the 2 above it. Which neighbour of 2 is allowed?','A bond with 2 permits 1 or 3. Row 4 already has 1, so R4C1 must be 3. Column 1 confirms it.'],
[14,'Order the final pair','The last two spaces in row 4 are 2 and 4. Which way does the chevron point?','Row 4 needs 2 and 4. The pointed end faces the left space, so R4C3 is 2 and R4C4 is 4.'],
[2,'Bring the column together','Return to the top of column 3.','Column 3 now contains 1, 3 and 2. R1C3 must be 4. It differs by one from the 3 beside it and is greater than the 1 below it.'],
[3,'Finish the first row','There is one rank left in row 1.','Row 1 contains 1, 3 and 4. R1C4 is 2.'],
[15,'Seal the weave','Check the last space against both its row and column.','Row 4 contains 3, 1 and 2; column 4 contains 2, 3 and 1. Both require R4C4 to be 4.']
];
const $=id=>document.getElementById(id), board=$('weave-board');
let values=Array.from({length:16},(_,i)=>givens[i]||0), notes=Array.from({length:16},()=>[]), selected=1, noteMode=false, history=[], errors=[], hintIndex=-1, hintStage=0;
const name=i=>`Row ${Math.floor(i/4)+1}, column ${i%4+1}`;
const say=t=>$('weave-status').textContent=t;
function save(){history.push({values:[...values],notes:notes.map(n=>[...n])});}
function render(){
 board.replaceChildren();
 for(let i=0;i<16;i++){
  const cell=document.createElement('button');cell.type='button';cell.className='weave-cell'+(givens[i]?' given':'')+(selected===i?' selected':'')+(errors.includes(i)?' incorrect':'');
  cell.style.gridRow=1+2*Math.floor(i/4);cell.style.gridColumn=1+2*(i%4);cell.dataset.cell=i;
  cell.setAttribute('aria-label',`${name(i)}: ${values[i]||'empty'}${givens[i]?', given':''}${notes[i].length?', notes '+notes[i].join(', '):''}${errors.includes(i)?', needs another look':''}`);
  cell.setAttribute('aria-pressed',String(selected===i));cell.tabIndex=selected===i?0:-1;
  if(values[i])cell.textContent=values[i];else if(notes[i].length){const n=document.createElement('span');n.className='pencil';n.textContent=notes[i].join(' · ');cell.append(n);}else cell.textContent='·';
  cell.onclick=()=>{selected=i;render();board.querySelector(`[data-cell="${i}"]`).focus();};board.append(cell);
 }
 clues.forEach(([a,b,type])=>{const mark=document.createElement('span');mark.className='weave-clue '+(type==='bond'?'bond':'');mark.setAttribute('aria-hidden','true');mark.style.gridRow=1+Math.floor(a/4)+Math.floor(b/4);mark.style.gridColumn=1+a%4+b%4;mark.textContent=type==='bond'?(b-a===4?'┃':'━'):type==='vertical'?'⌄':type;board.append(mark);});
 $('weave-progress').textContent=`${values.filter((v,i)=>v&&!givens[i]).length} / 12 filled`;
 $('weave-undo').disabled=!history.length;
 if(values.every((v,i)=>v===solution[i])){say('Weave complete. All four rows, all four columns, both bonds and all five chevrons agree. You have solved the whole puzzle.');$('hint-title').textContent='Every clue connected';$('hint-copy').textContent='You used neighbouring ranks, ordered pairs and row-and-column elimination—the same three rules that carry into larger weaves.';$('weave-hint').disabled=true;}else $('weave-hint').disabled=false;
}
function enter(rank){if(givens[selected]){say('That gold rank is a given. Select an empty or editable space.');return;}save();errors=[];
 if(noteMode&&rank){values[selected]=0;notes[selected]=notes[selected].includes(rank)?notes[selected].filter(n=>n!==rank):[...notes[selected],rank].sort();}else{values[selected]=rank;notes[selected]=[];}
 if(hintIndex>=0&&values[lessons[hintIndex][0]]===solution[lessons[hintIndex][0]])$('weave-hint').textContent='Give me the next nudge';
 say(noteMode&&rank?`${name(selected)}: pencil notes ${notes[selected].join(', ')||'cleared'}.`:`${name(selected)} ${rank?'set to '+rank:'cleared'}.`);render();}
 document.querySelectorAll('[data-rank]').forEach(b=>b.onclick=()=>enter(Number(b.dataset.rank)));
 $('weave-notes').onclick=()=>{noteMode=!noteMode;$('weave-notes').setAttribute('aria-pressed',String(noteMode));$('weave-notes').textContent='Pencil notes: '+(noteMode?'on':'off');};
 board.onkeydown=e=>{const delta={ArrowLeft:-1,ArrowRight:1,ArrowUp:-4,ArrowDown:4}[e.key];if(delta){e.preventDefault();selected=(selected+delta+16)%16;render();board.querySelector(`[data-cell="${selected}"]`).focus();}else if(/^[1-4]$/.test(e.key)){e.preventDefault();enter(+e.key);board.querySelector(`[data-cell="${selected}"]`).focus();}else if(e.key==='Backspace'||e.key==='Delete'){e.preventDefault();enter(0);board.querySelector(`[data-cell="${selected}"]`).focus();}else if(e.key.toLowerCase()==='n'){e.preventDefault();$('weave-notes').click();}};
 $('weave-undo').onclick=()=>{const prev=history.pop();if(prev){values=prev.values;notes=prev.notes;errors=[];say('Last change undone.');render();}};
 $('weave-check').onclick=()=>{errors=values.flatMap((v,i)=>v&&v!==solution[i]?[i]:[]);say(errors.length?`${errors.length} placement${errors.length===1?' needs':'s need'} another look: ${errors.map(name).join('; ')}. Marked with dashed borders. Clear or revise these before continuing the guided hints.`:'Every rank entered so far agrees with the solution. Keep going.');render();};
 $('weave-reset').onclick=()=>{save();values=Array.from({length:16},(_,i)=>givens[i]||0);notes=Array.from({length:16},()=>[]);errors=[];hintIndex=-1;hintStage=0;selected=1;$('hint-title').textContent='Find your first foothold';$('hint-copy').textContent='Try the bonded spaces in the first row, or ask for a nudge.';$('weave-hint').textContent='Give me a nudge';say('Fresh weave. You can undo this reset.');render();};
 $('weave-hint').onclick=()=>{
  if(values.some((v,i)=>v&&v!==solution[i])){$('weave-check').click();$('hint-copy').textContent='One or more entries need another look. Use Check placements to find them, then clear or revise them so the deduction can build on sound entries.';return;}
  const next=lessons.findIndex(([i])=>!values[i]);if(next<0)return;
  hintStage=next===hintIndex?Math.min(2,hintStage+1):1;hintIndex=next;
  const [i,title,nudge,reason]=lessons[next];selected=i;$('hint-title').textContent=title;$('hint-copy').textContent=hintStage===1?nudge:reason;$('weave-hint').textContent=hintStage===1?'Explain the deduction':'Enter the rank, then get another hint';render();
 };
 render();
})();
