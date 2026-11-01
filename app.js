// Monta as abas a partir de data.js e guarda o progresso no localStorage.
const CHAVE = "mestrado-europa-v1";
const estado = carregar();

function carregar() {
  try { return Object.assign({ feito: {}, notas: {} }, JSON.parse(localStorage.getItem(CHAVE))); }
  catch { return { feito: {}, notas: {} }; }
}
function salvar() { localStorage.setItem(CHAVE, JSON.stringify(estado)); atualizarProgresso(); }

const hoje = new Date(); hoje.setHours(0, 0, 0, 0);
const MESES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
const MESES_LONGOS = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
const CATS = { provas: "Provas", docs: "Documentos", bologna: "Bologna", veneza: "Veneza", turim: "Turim", bolsas: "Bolsas", visto: "Visto/matrícula" };

const data = s => { const [a, m, d] = s.split("-").map(Number); return new Date(a, m - 1, d); };
const fmt = s => { const d = data(s); return `${d.getDate()}/${MESES[d.getMonth()]}/${String(d.getFullYear()).slice(2)}`; };
const dias = s => Math.round((data(s) - hoje) / 864e5);
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

function faltam(s, feito) {
  if (feito) return `<span class="conta ok">feito</span>`;
  const n = dias(s);
  if (n < 0) return `<span class="conta atrasado">venceu há ${-n} d</span>`;
  if (n === 0) return `<span class="conta urgente">hoje</span>`;
  return `<span class="conta ${n <= 21 ? "urgente" : ""}">faltam ${n} d</span>`;
}
const check = id => `<input type="checkbox" data-id="${id}" ${estado.feito[id] ? "checked" : ""}>`;
const nota = id => `<textarea data-nota="${id}" placeholder="Suas anotações...">${esc(estado.notas[id])}</textarea>`;
const links = ls => (ls || []).map(([t, u]) => `<a href="${u}" target="_blank" rel="noopener">${esc(t)} ↗</a>`).join(" ");
const tagStatus = s => `<span class="tag ${s}">${s}</span>`;

// ---------------- Painel
function renderPainel() {
  const abertos = CRONOGRAMA.filter(i => !estado.feito[i.id]).sort((a, b) => data(a.fim) - data(b.fim));
  const atrasados = abertos.filter(i => dias(i.fim) < 0);
  const proximos = abertos.filter(i => dias(i.fim) >= 0).slice(0, 8);
  const prazos = CRONOGRAMA.filter(i => i.prazo && dias(i.fim) >= 0).sort((a, b) => data(a.fim) - data(b.fim)).slice(0, 6);

  const linha = i => `<li class="${dias(i.fim) < 0 ? "atrasado" : ""}">${check(i.id)}
      <span class="quando">${fmt(i.fim)}</span> <span class="cat ${i.cat}">${CATS[i.cat]}</span>
      <span class="tit">${esc(i.titulo)}</span> ${faltam(i.fim)}</li>`;

  document.getElementById("painel").innerHTML = `
    <div class="grade2">
      <div class="cartao">
        <h2>Próximas tarefas</h2>
        ${atrasados.length ? `<p class="alerta">${atrasados.length} tarefa(s) com prazo vencido.</p><ul class="lista">${atrasados.map(linha).join("")}</ul>` : ""}
        <ul class="lista">${proximos.map(linha).join("")}</ul>
      </div>
      <div class="cartao">
        <h2>Prazos que não podem passar</h2>
        <ul class="lista prazos">${prazos.map(i => `<li><span class="quando">${fmt(i.fim)}</span>
          <span class="cat ${i.cat}">${CATS[i.cat]}</span> <span class="tit">${esc(i.titulo)}</span> ${faltam(i.fim)}</li>`).join("")}</ul>
        <h3>Ordem de ataque</h3>
        <ol class="ordem">
          <li><b>Inglês</b> (IELTS/TOEFL) até o início de janeiro: Bologna e Turim pedem na candidatura.</li>
          <li><b>Ca' Foscari na 1ª rodada</b> (meados de jan): libera Honours e Invest Your Talent.</li>
          <li><b>Turim</b> até o fim de janeiro, com a Talents4UNITO junto.</li>
          <li><b>Bologna no intake 1</b> (até ~12/fev): concorre às bolsas do departamento.</li>
          <li><b>GRE</b> até março, para a International Talents @Unibo.</li>
          <li><b>MAECI</b> no fim de março; <b>Invest Your Talent</b> em maio.</li>
          <li><b>Documentos de renda</b> (ISEE) de março a maio, para as bolsas regionais de agosto.</li>
        </ol>
      </div>
    </div>`;
}

// ---------------- Cronograma
let filtroCat = "todas", esconderFeitos = false;
function renderCronograma() {
  const itens = CRONOGRAMA
    .filter(i => filtroCat === "todas" || i.cat === filtroCat)
    .filter(i => !(esconderFeitos && estado.feito[i.id]))
    .sort((a, b) => data(a.fim) - data(b.fim));
  const grupos = {};
  itens.forEach(i => { const d = data(i.fim); const k = `${MESES_LONGOS[d.getMonth()]} ${d.getFullYear()}`; (grupos[k] ||= []).push(i); });

  document.getElementById("cronograma").innerHTML = `
    <div class="filtros">
      ${["todas", ...Object.keys(CATS)].map(c => `<button data-filtro="${c}" class="${c === filtroCat ? "ativa" : ""}">${c === "todas" ? "Tudo" : CATS[c]}</button>`).join("")}
      <label><input type="checkbox" id="esconder" ${esconderFeitos ? "checked" : ""}> esconder concluídos</label>
    </div>
    ${Object.entries(grupos).map(([mes, lista]) => `
      <h2 class="mes">${mes}</h2>
      ${lista.map(i => `
        <article class="item ${estado.feito[i.id] ? "feito" : ""} ${i.prazo ? "prazo" : ""}">
          <div class="topo">${check(i.id)}
            <span class="quando">${i.inicio && i.inicio !== i.fim ? fmt(i.inicio) + " → " : ""}${fmt(i.fim)}</span>
            <span class="cat ${i.cat}">${CATS[i.cat]}</span> ${tagStatus(i.status)} ${faltam(i.fim, estado.feito[i.id])}
          </div>
          <h3>${esc(i.titulo)}</h3>
          ${i.nota ? `<p>${esc(i.nota)}</p>` : ""}
          ${i.ref ? `<p class="refe">Fonte: ${esc(i.ref)}</p>` : ""}
          ${i.links ? `<p class="links">${links(i.links)}</p>` : ""}
        </article>`).join("")}`).join("")}`;
}

// ---------------- Universidades
function renderUniversidades() {
  document.getElementById("universidades").innerHTML = `<div class="grade3">${UNIVERSIDADES.map(u => `
    <div class="cartao uni ${u.id}">
      <h2>${esc(u.nome)}</h2>
      <p class="curso">${esc(u.curso)}</p>
      <p class="rank">${esc(u.qs)}</p>
      <h3>Janelas de candidatura (não-UE)</h3>
      <table><thead><tr><th>Etapa</th><th>2027/28</th><th>Base</th></tr></thead>
        <tbody>${u.janelas.map(j => `<tr><td>${esc(j[0])}</td><td><b>${esc(j[1])}</b></td><td class="refe">${esc(j[2])}</td></tr>`).join("")}</tbody></table>
      <h3>O que pedem</h3>
      <ul>${u.exige.map(e => `<li>${esc(e)}</li>`).join("")}</ul>
      <h3>Bolsas ligadas</h3><p>${esc(u.bolsas)}</p>
      <p class="links">${links([["Página oficial", u.link]])}</p>
      ${nota("uni-" + u.id)}
    </div>`).join("")}</div>`;
}

// ---------------- Bolsas
function renderBolsas() {
  const bloco = (titulo, grupo, intro = "") => `
    <h2 class="mes">${titulo}</h2>${intro}
    <div class="grade2">${BOLSAS.filter(b => b.grupo === grupo).map(b => `
      <div class="cartao bolsa ${grupo}">
        <h3>${esc(b.nome)}</h3>
        <dl>
          <dt>Valor</dt><dd>${esc(b.valor)}</dd>
          <dt>Prazo</dt><dd>${esc(b.prazo)}</dd>
          <dt>Quem pode</dt><dd>${esc(b.quem)}</dd>
          ${b.atencao ? `<dt>Atenção</dt><dd>${esc(b.atencao)}</dd>` : ""}
        </dl>
        <p class="links">${links([["Site oficial", b.link], ...(b.extras || [])])}</p>
        <label class="vou">${check("bolsa-" + b.id)} vou me candidatar</label>
      </div>`).join("")}</div>`;
  document.getElementById("bolsas").innerHTML =
    bloco("A bolsa do GRE (Bologna)", "gre",
      `<p class="intro">É a "International Talents @Unibo" (antes chamada Unibo Action 2). A seleção é só pela nota do GRE, mas tem filtro de renda familiar e não acumula com MAECI.</p>`) +
    bloco("MAECI, Invest Your Talent e bolsas regionais", "principais") +
    bloco("Outras bolsas encontradas", "outras");
}

// ---------------- Documentos
function renderDocumentos() {
  const docs = [...DOCUMENTOS].sort((a, b) => data(a.ate) - data(b.ate));
  document.getElementById("documentos").innerHTML = `
    <div class="cartao">
      <h2>Documentos que você precisa produzir</h2>
      <table class="docs"><thead><tr><th></th><th>Documento</th><th>Para</th><th>Situação</th><th>Pronto até</th></tr></thead>
      <tbody>${docs.map(d => `<tr class="${estado.feito[d.id] ? "feito" : ""}">
        <td>${check(d.id)}</td><td>${esc(d.doc)}</td><td>${esc(d.para)}</td><td>${esc(d.obrig)}</td>
        <td>${fmt(d.ate)} ${faltam(d.ate, estado.feito[d.id])}</td></tr>`).join("")}</tbody></table>
      <p class="intro">Uma boa carta-base em inglês (trajetória, por que economia aplicada/quantitativa, plano de carreira) pode ser adaptada para as 4 cartas. Mude o parágrafo do "por que este curso" em cada uma.</p>
    </div>`;
}

// ---------------- Outras opções
function renderOutras() {
  const regioes = [...new Set(OUTRAS.map(o => o.regiao))];
  document.getElementById("outras").innerHTML = `
    <p class="intro"><b>Régua:</b> ${esc(ALVO.referenciaRanking)} Para comparação: Bologna 123ª, Viena 140ª.</p>
    ${regioes.map(r => `<h2 class="mes">${r}</h2><div class="grade2">${OUTRAS.filter(o => o.regiao === r).map(o => `
      <div class="cartao">
        <h3>${esc(o.nome)}</h3>
        <dl><dt>Ranking</dt><dd>${esc(o.qs)}</dd><dt>Curso</dt><dd>${esc(o.curso)}</dd>
          <dt>Custo</dt><dd>${esc(o.custo)}</dd><dt>Bolsa</dt><dd>${esc(o.bolsa)}</dd>
          <dt>Veredito</dt><dd><b>${esc(o.veredito)}</b></dd></dl>
        <p class="links">${links([["Saiba mais", o.link]])}</p>
      </div>`).join("")}</div>`).join("")}`;
}

// ---------------- Progresso e eventos
function atualizarProgresso() {
  const ids = [...CRONOGRAMA.map(i => i.id), ...DOCUMENTOS.map(d => d.id)];
  const f = ids.filter(id => estado.feito[id]).length;
  const pct = Math.round((f / ids.length) * 100);
  document.getElementById("progresso").innerHTML =
    `<div class="barra"><div style="width:${pct}%"></div></div><span>${f} de ${ids.length} tarefas concluídas (${pct}%)</span>`;
}

function renderTudo() {
  renderPainel(); renderCronograma(); renderUniversidades(); renderBolsas(); renderDocumentos(); renderOutras(); atualizarProgresso();
}

document.addEventListener("change", e => {
  const t = e.target;
  if (t.dataset.id) { t.checked ? (estado.feito[t.dataset.id] = true) : delete estado.feito[t.dataset.id]; salvar(); renderTudo(); }
  if (t.id === "esconder") { esconderFeitos = t.checked; renderCronograma(); }
  if (t.id === "importar" && t.files[0]) {
    t.files[0].text().then(txt => { Object.assign(estado, JSON.parse(txt)); salvar(); renderTudo(); alert("Progresso restaurado."); })
      .catch(() => alert("Arquivo inválido."));
  }
});
document.addEventListener("input", e => {
  const id = e.target.dataset.nota;
  if (id) { estado.notas[id] = e.target.value; salvar(); }
});
document.addEventListener("click", e => {
  const t = e.target;
  if (t.dataset.aba) {
    document.querySelectorAll("#abas button, .aba").forEach(el => el.classList.remove("ativa"));
    t.classList.add("ativa"); document.getElementById(t.dataset.aba).classList.add("ativa");
    history.replaceState(null, "", "#" + t.dataset.aba);
  }
  if (t.dataset.filtro) { filtroCat = t.dataset.filtro; renderCronograma(); }
  if (t.id === "exportar") {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(estado, null, 2)], { type: "application/json" }));
    a.download = `mestrado-progresso-${new Date().toISOString().slice(0, 10)}.json`; a.click();
  }
});

document.getElementById("ref").textContent = `Pesquisa feita em ${fmt(HOJE_REF)}. Início pretendido: ${ALVO.inicio}.`;
renderTudo();
const inicial = location.hash.slice(1);
if (inicial) document.querySelector(`#abas button[data-aba="${inicial}"]`)?.click();
