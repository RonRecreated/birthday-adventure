(() => {
  const data = window.BIRTHDAY_DATA;
  const storage = window.BirthdayStorage;
  const app = document.getElementById("app");
  const initial = () => ({ stage: 2, completed: {}, passedGates: {}, maxCard: -1, finished: false });
  let progress = storage.load() || initial();
  let view = "welcome";
  let cardIndex = 0;
  let feedback = "";
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
  const norm = s => String(s || "").trim().replace(/\s+/g, "").toUpperCase();
  const persist = () => storage.save(progress);
  const panel = content => `<section class="panel">${content}</section>`;
  const button = (text, action, style="primary", extra="") => `<button class="${style}" data-action="${action}" ${extra}>${text}</button>`;
  const message = () => feedback ? `<p class="${feedback.startsWith("Oops") ? "error" : "success"}" role="status">${esc(feedback)}</p>` : "";
  function render() {
    if(view === "welcome") app.innerHTML = panel(`<div class="center"><div class="hero-icon">💙</div><p class="eyebrow">A special little surprise</p><h1>${esc(data.greeting)}</h1><p>Today isn't just another day. I've put together a little adventure, just for you.</p>${button("Open my birthday surprise ✨", "hello")}</div>`);
    else if(view === "visitor") app.innerHTML = panel(`<div class="center"><div class="hero-icon">🎀</div><p class="eyebrow">One little question</p><h1>Have you been here before?</h1><p>Don't worry, the Birthday Committee is very friendly. Mostly. 😄</p><div class="actions">${button("Yes, I'm back", "return")}${button("No, I'm new!", "new", "secondary")}</div></div>`);
    else if(view === "access") app.innerHTML = panel(`<p class="eyebrow">${progress.stage>2 && accessMode==="return" ? "Welcome back" : "The secret entrance"}</p><h1>${accessMode === "return" ? "Let's pick up where you left off 💙" : "Well, hello there, birthday VIP! 🎉"}</h1><p>${accessMode === "return" ? "Enter your last stage code, or resume saved progress below." : "No ordinary visitors allowed... unless they've got the magic birthday code."}</p><form id="access-form"><label class="field-label" for="access-code">${accessMode === "return" ? "Last code you used" : "Your primary access code"}</label><input id="access-code" type="text" autocomplete="off" placeholder="Enter your secret code" required /><div class="actions" style="margin-top:13px">${button("Unlock 💙", "submit-access")}${button("Back", "back-visitor", "secondary", 'type="button"')}</div></form>${accessMode === "return" && storage.load() ? `<div style="margin-top:13px">${button("Continue saved progress", "resume", "secondary")}</div>` : ""}${message()}`);
    else if(view === "cards") renderCards();
    else renderStage();
  }
  let accessMode = "new";
  function renderCards() {
    const card = data.cards[cardIndex];
    app.innerHTML = panel(`<div class="top-actions">${button("← Adventure", "leave-cards", "ghost")}<span class="pill">${cardIndex+1} / ${data.cards.length}</span></div><p class="eyebrow center">Five things from my heart</p><div class="card-message"><div class="hero-icon">💌</div><h2>${esc(card.title)}</h2><p>${esc(card.text)}</p></div><div class="dots">${data.cards.map((_, i)=>`<span class="dot ${i===cardIndex?"active":""}"></span>`).join("")}</div><div class="actions">${button("← Previous", "prev-card", "secondary", cardIndex===0?"disabled":"")}${button(cardIndex===data.cards.length-1?"Finish reading 💙":"Next card →", "next-card")}</div>`);
  }
  function renderStage() {
    const stage = data.stages.find(s=>s.id === progress.stage) || data.stages.at(-1);
    const total = data.stages.length - 1;
    const completeCount = data.stages.slice(1).flatMap(s=>s.tasks).filter(t=>progress.completed[t.id]).length;
    const allTasks = data.stages.slice(1).flatMap(s=>s.tasks).length;
    const done = stage.tasks.every(t=>progress.completed[t.id]);
    const gatePassed = Boolean(progress.passedGates?.[stage.id]);
    const teaser = data.stages.find(s=>s.id===stage.id+1);
    app.innerHTML = panel(`<div class="top-actions"><span class="pill">Stage ${stage.id-1} of ${total}</span>${button("Restart view ↻", "welcome", "ghost")}</div><p class="eyebrow">Your birthday adventure</p><h1>${esc(stage.title)} 💙</h1><p>${esc(stage.subtitle)}</p><div class="progress-track"><div class="progress-fill" style="width:${allTasks?Math.round(completeCount/allTasks*100):0}%"></div></div><div class="progress-caption"><span>Completed instructions</span><span>${completeCount}/${allTasks}</span></div><div style="margin-top:22px">${stage.tasks.map(t=>`<div class="task ${progress.completed[t.id]?"completed":""}"><input aria-label="Complete ${esc(t.title)}" type="checkbox" data-task="${esc(t.id)}" ${progress.completed[t.id]?"checked":""} ${t.kind === "cards" ? "disabled" : ""}/><div><div class="task-title">${esc(t.title)}</div><p>${esc(t.description)}</p>${t.kind === "cards" ? button(progress.completed[t.id]?"Read cards again":"Open the cards 💌", "open-cards", "secondary") : ""}</div></div>`).join("")}</div>${stage.id===7 ? (done ? `<div class="complete-banner"><div style="font-size:2rem">🎉💙🎂</div><h2>Happy Birthday, My Beautiful Renee!</h2><p>You've finished your birthday adventure and endured my silliness. You can return to these words of mine anytime.</p>${button("Read your heartfelt cards again", "open-cards", "secondary")}</div>` : `<p class="muted">Read the letter and check it off to celebrate the finale.</p>`) : (done ? (gatePassed ? `<div class="gate gate-success" role="status"><div class="success"><strong>🎉 ${esc(stage.gate?.success || "Wonderful! You unlocked your next surprise! 💙")}</strong><p>You did it! Do you still think you have me figured out? Then whenever you are ready, proceed to the next surprise.</p></div><div style="margin-top:14px">${button("Continue to my next surprise →", "continue-stage")}</div></div>` : gateHtml(stage.gate)) : `<p class="muted">Complete ${stage.tasks.length===1?"the instruction":"both instructions"} above to reveal your next challenge.</p>`) }${teaser?`<div class="teaser"><span>🔒</span><div><strong>Something special is coming...</strong><div class="muted">Your next mystery unlocks after this stage.</div></div></div>`:""}${message()}`);
  }
  function gateHtml(gate) {
    if(!gate) return "";
    if(gate.type==="code") return `<div class="gate"><h2>Ready for your next surprise? 🔑</h2><p>${esc(gate.hint)}</p><form id="gate-form"><label class="field-label" for="gate-code">Next secret code</label><input id="gate-code" type="text" autocomplete="off" required placeholder="Type your code" /><div style="margin-top:12px">${button("Unlock next surprise", "submit-gate")}</div></form></div>`;
    return `<div class="gate"><h2>A little birthday challenge ✨</h2><p>${esc(gate.question)}</p><form id="quiz-form">${gate.answers.map((answer,i)=>`<label class="option"><input type="radio" name="quiz-answer" value="${i}" required />${esc(answer)}</label>`).join("")}<div style="margin-top:12px">${button("Check my answer", "submit-quiz")}</div></form></div>`;
  }
  function advance() { progress.stage = Math.min(7,progress.stage+1); feedback=""; persist(); view="stage"; render(); window.scrollTo(0,0); }
  function passGate(stage) { progress.passedGates ||= {}; progress.passedGates[stage.id] = true; feedback=""; persist(); render(); }
  function restoreFromCode(raw) {
    const code = norm(raw);
    if (code === norm(data.primaryCode)) return 2;
    for(const stage of data.stages) if(stage.gate?.type === "code" && code === norm(stage.gate.code)) return Math.min(7,stage.id+1);
    return null;
  }
  app.addEventListener("change", e=>{
    if(!e.target.matches("[data-task]")) return;
    progress.completed[e.target.dataset.task] = e.target.checked;
    if(progress.stage === 7 && progress.completed["final-letter"]) progress.finished=true;
    persist(); feedback=""; render();
  });
  app.addEventListener("submit", e=>{
    e.preventDefault();
    if(e.target.id==="access-form") {
      const target=restoreFromCode(document.getElementById("access-code").value);
      if(target!==null) {
        if(accessMode === "new") { progress=initial(); progress.stage=target; }
        else if(!storage.load()) { progress=initial(); progress.stage=target; }
        else progress.stage=Math.max(progress.stage,target);
        persist();feedback="";view="stage";render();
      } else { feedback="Oops! The Birthday Committee couldn't find that code. Try again! 😄";render(); }
    } else if(e.target.id === "gate-form") {
      const stage=data.stages.find(s=>s.id===progress.stage);
      if(norm(document.getElementById("gate-code").value)===norm(stage.gate.code)) passGate(stage);
      else {feedback="Oops! Not quite the magic word. You can do it! 💙";render();}
    } else if(e.target.id === "quiz-form") {
      const chosen=e.target.querySelector("input[name=quiz-answer]:checked");
      const stage=data.stages.find(s=>s.id===progress.stage);
      if(chosen && Number(chosen.value)===stage.gate.correct) passGate(stage);
      else { feedback="Oops! Nice try, beautiful. Give it another guess. 😉"; render(); }
    }
  });
  app.addEventListener("click", e=>{
    const btn=e.target.closest("button[data-action]");if(!btn)return;
    const action=btn.dataset.action; feedback="";
    if(action==="hello")view="visitor";
    else if(action==="new"||action==="return"){accessMode=action;view="access";}
    else if(action==="back-visitor")view="visitor";
    else if(action==="continue-stage" && progress.passedGates?.[progress.stage]) { advance(); return; }
    else if(action==="resume"){progress=storage.load()||initial();view="stage";}
    else if(action==="welcome")view="welcome";
    else if(action==="open-cards"){cardIndex=0;view="cards";}
    else if(action==="leave-cards")view="stage";
    else if(action==="prev-card"){cardIndex=Math.max(0,cardIndex-1);}
    else if(action==="next-card"){
      progress.maxCard=Math.max(progress.maxCard,cardIndex);if(cardIndex===data.cards.length-1){progress.completed["heart-cards"]=true;persist();view="stage";}
      else{cardIndex++;persist();}
    }
    else return;
    render();
  });
  // Show the welcome card first on every visit, even when saved progress exists.
  render();
})();
