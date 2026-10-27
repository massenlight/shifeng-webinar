import {classify} from './logic.js';
const questions=[
 ['使用現況','你目前使用 Threads 的狀態是？',['還沒開始經營，主要是看別人發文。','最近開始嘗試，還在摸索怎麼寫。','已經營一段時間，持續有在發文。','有經營經驗，也曾替品牌或客戶操作帳號。']],
 ['帳號定位','如果問你「別人為什麼要追蹤你」，你會怎麼回答？',['我還不確定自己適合分享什麼。','我有很多想分享的事，但主題有點分散。','我有固定主題，但還說不清楚自己的特色。','我清楚知道要吸引誰，以及能提供什麼價值。']],
 ['內容曝光','最近的貼文，通常有什麼反應？',['最近沒發文，或篇數太少，還無法判斷。','有持續發文，但大多沒什麼反應，主要是熟人互動。','有些貼文能吸引陌生人，但曝光忽高忽低。','不只單篇爆文，多篇貼文都能持續吸引陌生人。']],
 ['變現成果','這些內容，有幫你帶來生意或合作嗎？',['還沒有，也還沒想好要怎麼變現。','已有想推廣的商品或服務，但幾乎沒人詢問。','偶爾有人詢問、成交或找我合作，但不穩定。','已持續帶來成交或付費合作，也知道客戶從哪些內容而來。']],
 ['內容方法','你平常怎麼準備貼文？',['想很久還是不知道寫什麼，常常停在草稿。','靠當天靈感、追熱門話題，或參考別人的寫法。','有安排主題，但沒刻意區分曝光、信任與銷售的任務。','有內容規劃，也會看數據、調整寫法，累積有效模板。']],
 ['經營目標','你最希望 Threads 幫你達成什麼？',['先找到定位，開始建立自己的個人品牌。','推廣自己的商品、服務或專業，增加客戶。','學會替品牌經營帳號，透過代操接案增加收入。','已有變現方向，希望提高效率、穩定放大收入。']]
];
const results={A:{name:'潛力新芽型',icon:'🌱'},B:{name:'埋沒實力型',icon:'💎'},C:{name:'人氣磁鐵型',icon:'🧲'},D:{name:'成長操盤型',icon:'🚀'}};
export function mountCheckup(root,onOpenRegister){
const app=root.querySelector('#app');

let state={screen:'home',step:0,answers:Array(6).fill(null)};
try{const saved=JSON.parse(sessionStorage.getItem('shifeng-checkup-v1'));if(saved&&['home','quiz','result'].includes(saved.screen)&&Number.isInteger(saved.step)&&saved.step>=0&&saved.step<6&&saved.answers?.length===6&&Array.from(saved.answers).every(x=>x===null||(Number.isInteger(x)&&x>=0&&x<=3))&&(saved.screen!=='result'||saved.answers.every(x=>x!==null)))state=saved;}catch{}
function save(){try{sessionStorage.setItem('shifeng-checkup-v1',JSON.stringify(state));}catch{}}
// The landing page stays mounted. Only the dialog content changes between steps.
const modal=document.createElement('dialog');
modal.className='quiz-modal';
modal.setAttribute('aria-label','Threads 變現健檢問卷');
modal.innerHTML='<div class="modal-bar"><span class="modal-brand">@ <span>Threads 變現健檢</span></span><button type="button" class="modal-close" aria-label="關閉問卷">×</button></div><div class="modal-body"></div>';
root.appendChild(modal);
const modalBody=modal.querySelector('.modal-body');
let lockedScroll=0,priorBodyStyles=null,opener=null;
function updateStart(){const b=root.querySelector('#start');if(b)b.innerHTML='開始測試 <span>↗</span>';}
function openQuestionnaire(){
 if(modal.open)return;
 if(state.screen==='home'){state.screen='quiz';state.step=0;}
 opener=root.activeElement||document.activeElement;
 lockedScroll=window.scrollY;
 priorBodyStyles={position:document.body.style.position,top:document.body.style.top,left:document.body.style.left,right:document.body.style.right,width:document.body.style.width,overflow:document.body.style.overflow};
 Object.assign(document.body.style,{position:'fixed',top:`-${lockedScroll}px`,left:'0',right:'0',width:'100%',overflow:'hidden'});

 render(false);modal.showModal();modalBody.scrollTop=0;modalBody.querySelector('h1')?.focus({preventScroll:true});
}
function closeQuestionnaire(){if(modal.open){modal.close();restorePage();}}
modal.querySelector('.modal-close').addEventListener('click',closeQuestionnaire);
modal.addEventListener('cancel',e=>{e.preventDefault();closeQuestionnaire();});
function restorePage(){
 if(!priorBodyStyles)return;
 if(priorBodyStyles){Object.assign(document.body.style,priorBodyStyles);priorBodyStyles=null;}

 window.scrollTo({top:lockedScroll,behavior:'instant'});
 updateStart();const focusTarget=opener?.isConnected?opener:document.querySelector('button[aria-label="開啟選單"]')||root.querySelector('#start');focusTarget?.focus({preventScroll:true});
}
modal.addEventListener('close',restorePage);
function render(focus=true){
 save();
 if(!app.querySelector('.hero')){app.innerHTML=home();root.querySelector('#start').addEventListener('click',openQuestionnaire);}
 updateStart();
 if(state.screen==='home')return;
 const previousScreen=modal.dataset.screen;
 modal.dataset.screen=state.screen;
 modalBody.innerHTML=state.screen==='quiz'?quiz():result();bind();
 if(focus){
  // Scroll only the panel when moving between the questionnaire and its result.
  if(previousScreen!==state.screen)modalBody.scrollTop=0;
  modalBody.querySelector('h1')?.focus({preventScroll:true});
 }
}
function home(){return `<section class="hero screen"><div class="hero-copy"><div class="eyebrow hero-eyebrow"><span class="tiny-cross">✳</span> 3分鐘測驗</div><h2 class="persona-title"><span class="persona-intro">你屬於什麼類型的</span><span class="persona-main">Threads <em>人格？</em></span></h2><p class="hero-sub">精準找出屬於你的優化方向</p><button class="primary start" id="start">開始測試 <span>↗</span></button></div><div class="hero-visual" aria-label="找到你的經營方向：定位、曝光、信任、成長"><div class="visual-top">YOUR NEXT MOVE <span>↗</span></div><div class="orbit"><div class="orbit-inner"></div><div class="center-symbol">@<span>從發文，到變現。</span></div><div class="orbit-tag tag-a"><span>A</span> 找到定位 <b>↗</b></div><div class="orbit-tag tag-b"><span>B</span> 讓人看見 <b>↗</b></div><div class="orbit-tag tag-c"><span>C</span> 建立信任 <b>↗</b></div><div class="orbit-tag tag-d"><span>D</span> 放大成果 <b>↗</b></div></div><div class="visual-bottom"><span>不用憑感覺，<br>找到適合你的經營方法。</span><span class="mini-arrow">↗</span></div></div></section><div class="home-bottom"><span>先找到卡點，再決定下一步。</span><span>定位 <b>／</b> 曝光 <b>／</b> 轉換 <b>／</b> 成長</span></div>`;}
function quiz(){const [category,title,options]=questions[state.step];return `<section class="quiz-shell screen"><aside class="quiz-aside"><div class="eyebrow">YOUR CHECKUP</div><h2>每一步，<br>都更靠近方向。</h2><p>依最近 30 天的實際狀況作答</p><ol class="steps">${questions.map((q,i)=>`<li class="${i===state.step?'current':i<state.step?'done':''}" ${i===state.step?'aria-current="step"':''}><span>${i<state.step?'✓':String(i+1).padStart(2,'0')}</span>${q[0]}</li>`).join('')}</ol><div class="aside-note">6 個問題，找到你的下一步。<span>↗</span></div></aside><div class="question-panel"><div class="question-top"><span>第 ${state.step+1} 題 · ${category}</span><span><strong>${String(state.step+1).padStart(2,'0')}</strong> / 06</span></div><div class="progress" role="progressbar" aria-label="測驗進度" aria-valuenow="${state.step+1}" aria-valuemin="0" aria-valuemax="6"><span style="width:${(state.step+1)/6*100}%"></span></div><h1 tabindex="-1" id="question-title">${title}</h1><form id="quiz-form"><fieldset aria-labelledby="question-title"><legend class="sr-only">選擇你的答案</legend>${options.map((o,i)=>`<label class="option"><input type="radio" name="answer" value="${i}" ${state.answers[state.step]===i?'checked':''}><span class="option-number">${String(i+1).padStart(2,'0')}</span><span class="option-text">${o}</span><span class="check" aria-hidden="true"></span></label>`).join('')}</fieldset><div class="question-nav"><button type="button" id="back" class="text-button">← ${state.step===0?'返回首頁':'上一題'}</button><button class="primary next" type="submit" ${state.answers[state.step]===null?'disabled':''}>${state.step===5?'查看測驗結果':'下一題'} <span>→</span></button></div></form><p class="private-note">答案只暫存於此分頁，不收集個人資料。</p></div></section>`;}
const shortResults={
 A:{summary:'先找到定位，再開始穩定發文。',steps:[['釐清定位','確定想幫助誰、解決什麼問題。'],['整理素材','從故事、專業與觀點找題材。'],['開始練習','參考模板，完成 3 篇貼文。']]},
 B:{summary:'讓有價值的內容，被更多人看見。',steps:[['選對題目','從受眾最在意的問題切入。'],['強化開頭','用痛點、情境或反差吸引注意。'],['觀察成效','比較觸及與互動，延伸有效主題。']]},
 C:{summary:'把關注變成信任，再把信任變成詢問。',steps:[['吸引對的人','確認內容貼近潛在客戶的需求。'],['建立信任','用海陸空策略搭配專業與案例。'],['引導詢問','清楚介紹服務，留下私訊入口。']]},
 D:{summary:'把有效的方法，變成可持續的系統。',steps:[['建立流程','固定選題、發文與復盤步驟。'],['AI 協作','用自己的案例與模板加快產出。'],['拓展變現','優化成交流程，或整理接案提案。']]}
};
function result(){const type=classify(state.answers),r=results[type],brief=shortResults[type];return `<section class="compact-result"><div class="compact-heading"><span class="compact-eyebrow">YOUR THREADS PROFILE ／ 測驗完成</span><h1 tabindex="-1"><span class="compact-letter">${type}</span>${r.name}<span class="compact-icon" aria-hidden="true">${r.icon}</span></h1><p>${brief.summary}</p></div><div class="compact-plan"><h2>你的 3 個優化方向</h2><ol>${brief.steps.map(([title,description],i)=>`<li><span class="compact-num">0${i+1}</span><div><h3>${title}</h3><p>${description}</p></div></li>`).join('')}</ol></div><button type="button" class="compact-line" id="register"><span aria-hidden="true">✦</span><span>報名說明會，掌握更多變現技巧</span><span aria-hidden="true">↗</span></button><div class="compact-actions"><button class="text-button" id="restart">重新測驗 ↻</button></div></section>`;}

function bind(){
 modalBody.querySelector('#register')?.addEventListener('click',()=>{closeQuestionnaire();onOpenRegister();});
 modalBody.querySelector('#back')?.addEventListener('click',()=>{if(state.step===0){closeQuestionnaire();return;}state.step--;render();});
 modalBody.querySelector('#quiz-form')?.addEventListener('change',e=>{if(e.target.name!=='answer')return;state.answers[state.step]=Number(e.target.value);save();modalBody.querySelector('.next').disabled=false;});
 modalBody.querySelector('#quiz-form')?.addEventListener('submit',e=>{e.preventDefault();if(state.answers[state.step]===null)return;if(state.step<5)state.step++;else state.screen='result';render();});
 modalBody.querySelector('#restart')?.addEventListener('click',()=>{state={screen:'quiz',step:0,answers:Array(6).fill(null)};render();modalBody.scrollTop=0;});
}

render(false);
return {open:openQuestionnaire,destroy(){modal.removeEventListener('close',restorePage);if(modal.open){modal.close();restorePage();}root.replaceChildren();}};
}
