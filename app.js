// Monta as abas a partir de data.js e guarda o progresso no localStorage.
const CHAVE = "mestrado-europa-v1";
const estado = carregar();

function carregar() {
  try { return Object.assign({ feito: {}, notas: {} }, JSON.parse(localStorage.getItem(CHAVE))); }
  catch { return { feito: {}, notas: {} }; }
}
function salvarSemProgresso() { localStorage.setItem(CHAVE, JSON.stringify(estado)); }
function salvar() { localStorage.setItem(CHAVE, JSON.stringify(estado)); atualizarProgresso(); }

const hoje = new Date(); hoje.setHours(0, 0, 0, 0);
const MESES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
const MESES_LONGOS = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
const CATS = { provas: "Provas", docs: "Documentos", bologna: "Bologna", veneza: "Veneza", bonn: "Bonn", bolsas: "Bolsas", visto: "Visto" };

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
const ORDEM_CATS = ["bologna", "veneza", "bonn", "bolsas", "provas", "docs", "visto"];
const proximoAberto = lista => lista.filter(i => !estado.feito[i.id]).sort((a, b) => data(a.fim) - data(b.fim))[0];

function renderPainel() {
  const abertos = CRONOGRAMA.filter(i => !estado.feito[i.id]).sort((a, b) => data(a.fim) - data(b.fim));
  const critico = abertos.find(i => i.prazo && dias(i.fim) >= 0);
  const baldes = [
    ["Atrasadas", abertos.filter(i => dias(i.fim) < 0), "atrasado"],
    ["Esta semana", abertos.filter(i => dias(i.fim) >= 0 && dias(i.fim) <= 7), "urgente"],
    ["Próximas 4 semanas", abertos.filter(i => dias(i.fim) > 7 && dias(i.fim) <= 30), ""],
  ];
  const depois = abertos.filter(i => dias(i.fim) > 30).slice(0, 4);
  const linha = i => `<li>${check(i.id)}<span class="quando">${fmt(i.fim)}</span>
      <span class="cat ${i.cat}">${CATS[i.cat]}</span><span class="tit">${esc(i.titulo)}</span>${faltam(i.fim)}</li>`;

  const frentes = ORDEM_CATS.map(c => {
    const itens = CRONOGRAMA.filter(i => i.cat === c);
    const f = itens.filter(i => estado.feito[i.id]).length;
    const prox = proximoAberto(itens);
    return `<button class="frente ${c}" data-frente="${c}">
      <span class="frente-nome">${CATS[c]}</span>
      <span class="frente-num">${f}/${itens.length}</span>
      <span class="mini"><span style="width:${itens.length ? (f / itens.length) * 100 : 0}%"></span></span>
      <span class="frente-prox">${prox ? `${fmt(prox.fim)} · ${esc(prox.titulo)}` : "tudo feito"}</span>
    </button>`;
  }).join("");

  document.getElementById("painel").innerHTML = `
    ${critico ? `<div class="destaque">
      <div><span class="rotulo">Próximo prazo que não pode passar</span>
        <strong>${esc(critico.titulo)}</strong>
        <span class="refe">${fmt(critico.fim)} · ${CATS[critico.cat]} · ${critico.status}</span></div>
      <div class="contagem"><b>${dias(critico.fim)}</b><span>dias</span></div>
    </div>` : ""}

    <h2 class="secao">Frentes</h2>
    <div class="frentes">${frentes}</div>

    <div class="agora">
      <div class="cartao">
        <h2>O que fazer nos próximos 30 dias</h2>
        ${baldes.filter(([, lista]) => lista.length).map(([nome, lista, cls]) => `
          <h3 class="sub ${cls}">${nome} <span class="qtd">${lista.length}</span></h3>
          <ul class="lista">${lista.map(linha).join("")}</ul>`).join("") || `<p class="vazio">Nada vencendo nos próximos 30 dias.</p>`}
      </div>
      <div class="cartao">
        <h2>Depois disso</h2>
        <ul class="lista">${depois.map(linha).join("")}</ul>
        <button class="link" data-ir="cronograma">Ver cronograma completo →</button>
      </div>
    </div>

    <h2 class="secao">Linha do tempo até a matrícula</h2>
    <div class="cartao">${linhaDoTempo()}</div>`;
}

// Linha do tempo: barras = janelas e tarefas com duração; losangos = prazos.
const TL_INI = data("2026-11-01"), TL_FIM = data("2027-09-30");
const pos = s => Math.max(0, Math.min(100, ((data(s) - TL_INI) / (TL_FIM - TL_INI)) * 100));

function linhaDoTempo() {
  const meses = [];
  for (let d = new Date(TL_INI); d <= TL_FIM; d.setMonth(d.getMonth() + 1)) {
    const s = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-01`;
    meses.push(`<span class="tl-mes" style="left:${pos(s)}%">${MESES[d.getMonth()]}${d.getMonth() === 0 ? " " + String(d.getFullYear()).slice(2) : ""}</span>`);
  }
  const hojeStr = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, "0")}-${String(hoje.getDate()).padStart(2, "0")}`;
  const raias = ORDEM_CATS.map(c => {
    const barras = [
      ...JANELAS.filter(j => j.cat === c).map(j => ({ nome: j.nome, de: j.de, ate: j.ate, janela: true })),
    ].sort((a, b) => data(a.de) - data(b.de));
    // empilha barras que se sobrepõem em linhas diferentes
    const fins = [];
    barras.forEach(b => {
      let r = fins.findIndex(f => data(b.de) > f);
      if (r < 0) { r = fins.length; fins.push(0); }
      fins[r] = data(b.ate); b.linha = r;
    });
    const nLinhas = Math.max(1, fins.length);
    const marcos = CRONOGRAMA.filter(i => i.cat === c && i.prazo);
    return `<div class="tl-raia" style="height:${nLinhas * 26 + 14}px">
      <span class="tl-nome cat ${c}">${CATS[c]}</span>
      <div class="tl-trilho">
        ${barras.map(b => `<span class="tl-barra ${c} ${b.janela ? "" : "fina"} ${b.id && estado.feito[b.id] ? "feito" : ""}"
          style="left:${pos(b.de)}%;width:${Math.max(0.8, pos(b.ate) - pos(b.de))}%;top:${b.linha * 26 + 6}px"
          title="${esc(b.nome)}: ${fmt(b.de)} → ${fmt(b.ate)}">${esc(b.nome)}</span>`).join("")}
        ${marcos.map(m => `<span class="tl-marco ${estado.feito[m.id] ? "feito" : ""}" style="left:${pos(m.fim)}%"
          title="${esc(m.titulo)} — ${fmt(m.fim)}"></span>`).join("")}
      </div>
    </div>`;
  }).join("");
  return `<div class="tl"><div class="tl-escala">${meses.join("")}</div>
    <div class="tl-corpo">${raias}<span class="tl-hoje" style="left:calc(110px + (100% - 110px) * ${pos(hojeStr) / 100})"><span>hoje</span></span></div></div>
    <p class="refe">Barras: janelas de candidatura, provas e blocos de documentos. ◆ prazos finais. Passe o mouse para ver detalhes.</p>`;
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
      ${["todas", ...ORDEM_CATS].map(c => `<button data-filtro="${c}" class="${c === filtroCat ? "ativa" : ""}">${c === "todas" ? "Tudo" : CATS[c]}</button>`).join("")}
      <label><input type="checkbox" id="esconder" ${esconderFeitos ? "checked" : ""}> esconder concluídos</label>
    </div>
    <p class="refe">Clique numa linha para ver detalhes, fonte e links.</p>
    ${Object.entries(grupos).map(([mes, lista]) => `
      <h2 class="mes">${mes}</h2>
      <div class="cartao compacto">
      ${lista.map(i => `
        <details class="linha ${estado.feito[i.id] ? "feito" : ""} ${i.prazo ? "prazo" : ""}">
          <summary>${check(i.id)}
            <span class="quando">${i.inicio && i.inicio !== i.fim ? fmt(i.inicio) + " → " : ""}${fmt(i.fim)}</span>
            <span class="cat ${i.cat}">${CATS[i.cat]}</span>
            <span class="tit">${i.prazo ? "◆ " : ""}${esc(i.titulo)}</span>
            ${faltam(i.fim, estado.feito[i.id])}
          </summary>
          <div class="detalhe">
            ${tagStatus(i.status)}
            ${i.nota ? `<p>${esc(i.nota)}</p>` : ""}
            ${i.ref ? `<p class="refe">Fonte: ${esc(i.ref)}</p>` : ""}
            ${i.links ? `<p class="links">${links(i.links)}</p>` : ""}
          </div>
        </details>`).join("")}
      </div>`).join("")}`;
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
      <p class="links">${links([["Página oficial", u.link], ...(u.links || [])])}</p>
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
    </div>
    <div class="cartao" style="margin-top:16px">
      <h2>Cartas de recomendação: quem pode escrever e até quando pedir</h2>
      <p class="intro">Com 2 professores e 1 pessoa do trabalho você cobre tudo. Faça um pedido só para cada professor, com a lista de destinos e prazos abaixo.</p>
      <table class="docs"><thead><tr><th>Pedida</th><th>Recebida</th><th>Destino</th><th>Quantas</th><th>De quem</th><th>Professor?</th><th>Carta é</th><th>Pedir até</th><th>Prazo</th></tr></thead>
      <tbody>${[...CARTAS].sort((a, b) => data(a.pedir) - data(b.pedir)).map(c => `<tr class="${estado.feito[c.id + "-ok"] ? "feito" : ""}">
        <td>${check(c.id)}</td><td>${check(c.id + "-ok")}</td>
        <td><b>${esc(c.destino)}</b>${c.nota ? `<br><span class="refe">${esc(c.nota)}</span>` : ""}</td>
        <td>${esc(c.qtd)}</td><td>${esc(c.deQuem)}</td>
        <td class="prof ${c.professor.replace(/\s/g, "-")}">${esc(c.professor)}</td><td>${esc(c.obrig)}</td>
        <td>${fmt(c.pedir)} ${faltam(c.pedir, estado.feito[c.id])}</td><td>${fmt(c.prazo)}</td></tr>`).join("")}</tbody></table>
      <p class="intro">${esc(SEM_CARTAS)}</p>
    </div>`;
}


// ---------------- Carta de motivação (texto salvo só no navegador)
let destinoCarta = "maeci";
const contaPalavras = s => (s.match(/[A-Za-zÀ-ÿ0-9][A-Za-zÀ-ÿ0-9'’-]*/g) || []).length;
const cartaAtual = () => ((estado.cartas ||= {})[destinoCarta] ||= { texto: "", versoes: [], alvo: "" });

function renderCarta() {
  const c = cartaAtual();
  const d = CARTA.destinos.find(x => x.id === destinoCarta);
  document.getElementById("carta").innerHTML = `
    <p class="intro">Escreva aqui. <b>O texto fica salvo só neste navegador</b> (não vai para o GitHub); use "Baixar backup" no rodapé para guardar ou levar para outro aparelho.</p>
    <div class="filtros">${CARTA.destinos.map(x => `<button data-destino="${x.id}" class="${x.id === destinoCarta ? "ativa" : ""}">${esc(x.nome)}</button>`).join("")}</div>
    <div class="carta-grade">
      <div class="cartao">
        <div class="carta-topo">
          <label>Curso/universidade alvo <input id="carta-alvo" value="${esc(c.alvo)}" placeholder="ex.: Ca' Foscari, QEM"></label>
          <div id="carta-contador"></div>
        </div>
        <textarea id="carta-texto" placeholder="Cole ou escreva sua carta. Separe os parágrafos com uma linha em branco.">${esc(c.texto)}</textarea>
        <div class="carta-acoes">
          <button id="carta-salvar-versao">Salvar versão</button>
          <button id="carta-baixar">Baixar .txt</button>
          <span class="refe">${c.versoes.length} versão(ões) salva(s)</span>
        </div>
        ${c.versoes.length ? `<details class="versoes"><summary>Versões anteriores</summary>
          ${c.versoes.map((v, i) => `<div class="versao"><span>${esc(v.quando)} · ${v.palavras} palavras</span>
            <button data-restaurar="${i}">Restaurar</button><button data-apagar-versao="${i}">Apagar</button></div>`).reverse().join("")}
        </details>` : ""}
        <div id="carta-analise"></div>
      </div>
      <div>
        <div class="cartao">
          <h3>Roteiro em 7 blocos (~490 palavras)</h3>
          <ol class="blocos">${CARTA.blocos.map(b => `<li><b>${esc(b.nome)}</b> <span class="refe">~${b.palavras}</span><br><span class="refe">${esc(b.guia)}</span></li>`).join("")}</ol>
        </div>
        <div class="cartao" style="margin-top:12px">
          <h3>Checklist antes de enviar</h3>
          <ul class="checklist">${CARTA.checklist.map((x, i) => `<li><label>${check(`ck-${destinoCarta}-${i}`)} ${esc(x)}</label></li>`).join("")}</ul>
        </div>
      </div>
    </div>
    <h2 class="secao">Treino da entrevista</h2>
    <div class="cartao">
      <p class="refe">Responda em voz alta em até 2 minutos; anote aqui os pontos-chave (salvo no navegador).</p>
      <button id="sortear">Sortear uma pergunta</button> <span id="pergunta-sorteada" class="sorteada"></span>
      <div class="perguntas">${CARTA.perguntas.map((q, i) => `<details><summary>${esc(q)}</summary>${nota("entrevista-" + i)}</details>`).join("")}</div>
    </div>`;
  analisarCarta();
}

function analisarCarta() {
  const c = cartaAtual();
  const d = CARTA.destinos.find(x => x.id === destinoCarta);
  const n = contaPalavras(c.texto);
  const lim = d.limite;
  const cls = !lim ? "" : n > lim ? "acima" : n > lim - 5 ? "limite" : "ok";
  document.getElementById("carta-contador").innerHTML =
    `<span class="contador ${cls}"><b>${n}</b>${lim ? ` / ${lim}` : ""} palavras</span>
     ${lim ? `<span class="mini largo"><span class="${cls}" style="width:${Math.min(100, (n / lim) * 100)}%"></span></span>` : ""}`;

  const paras = c.texto.split(/\n\s*\n|\n/).map(p => p.trim()).filter(p => contaPalavras(p) > 4);
  const baixo = c.texto.toLowerCase();
  const cliches = CARTA.cliches.filter(x => baixo.includes(x));
  const alvo = (c.alvo || "").trim();
  const contaTermo = re => (c.texto.match(re) || []).length;
  const italia = contaTermo(/\bital(y|ian|ia|iano|iana)\b/gi);
  const alvoN = alvo ? alvo.split(/[,;]/).map(s => s.trim()).filter(Boolean)
    .map(s => [s, contaTermo(new RegExp(s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"))]) : [];

  document.getElementById("carta-analise").innerHTML = !n ? "" : `
    <div class="analise">
      <div><h4>Parágrafos × roteiro</h4>
        <table><tbody>${paras.map((p, i) => {
          const b = CARTA.blocos[i]; const w = contaPalavras(p);
          const fora = b && Math.abs(w - b.palavras) > b.palavras * 0.4;
          return `<tr><td>§${i + 1}</td><td class="${fora ? "nao" : ""}">${w}</td><td class="refe">${b ? `${esc(b.nome)} (~${b.palavras})` : "bloco extra"}</td></tr>`;
        }).join("")}</tbody></table></div>
      <div><h4>Detector de clichês</h4>${cliches.length ? `<p>${cliches.map(x => `<span class="cliche">${esc(x)}</span>`).join(" ")}</p>` : `<p class="vazio">Nenhum da lista. 👍</p>`}
        <h4>Teste da troca</h4>
        <p class="refe">Menções a Itália/italiano: <b>${italia}</b>${alvoN.map(([s, k]) => ` · "${esc(s)}": <b class="${k ? "" : "nao"}">${k}</b>`).join("")}
        ${!alvo ? " · preencha o curso alvo acima" : ""}</p></div>
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
  renderPainel(); renderCronograma(); renderUniversidades(); renderBolsas(); renderDocumentos(); renderCarta(); renderOutras(); atualizarProgresso();
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
document.addEventListener("click", e => {
  if (e.target.matches("summary input[type=checkbox]")) e.stopPropagation();
}, true);
document.addEventListener("input", e => {
  if (e.target.id === "carta-texto") { cartaAtual().texto = e.target.value; salvarSemProgresso(); analisarCarta(); return; }
  if (e.target.id === "carta-alvo") { cartaAtual().alvo = e.target.value; salvarSemProgresso(); analisarCarta(); return; }
  const id = e.target.dataset.nota;
  if (id) { estado.notas[id] = e.target.value; salvar(); }
});
function irPara(aba) {
  document.querySelectorAll("#abas button, .aba").forEach(el => el.classList.remove("ativa"));
  document.querySelector(`#abas button[data-aba="${aba}"]`).classList.add("ativa");
  document.getElementById(aba).classList.add("ativa");
  history.replaceState(null, "", "#/" + aba);
  window.scrollTo({ top: 0 });
}
document.addEventListener("click", e => {
  const t = e.target;
  if (t.dataset.aba) irPara(t.dataset.aba);
  const frente = t.closest("[data-frente]");
  if (frente) { filtroCat = frente.dataset.frente; renderCronograma(); irPara("cronograma"); }
  if (t.dataset.ir) { filtroCat = "todas"; renderCronograma(); irPara(t.dataset.ir); }
  if (t.dataset.filtro) { filtroCat = t.dataset.filtro; renderCronograma(); }
  if (t.dataset.destino) { destinoCarta = t.dataset.destino; renderCarta(); }
  if (t.id === "carta-salvar-versao") {
    const c = cartaAtual();
    c.versoes.push({ quando: new Date().toLocaleString("pt-BR"), texto: c.texto, palavras: contaPalavras(c.texto) });
    salvarSemProgresso(); renderCarta();
  }
  if (t.dataset.restaurar !== undefined) {
    const c = cartaAtual();
    if (confirm("Substituir o texto atual por esta versão? (Salve uma versão antes, se quiser guardar o atual.)")) {
      c.texto = c.versoes[+t.dataset.restaurar].texto; salvarSemProgresso(); renderCarta();
    }
  }
  if (t.dataset.apagarVersao !== undefined && confirm("Apagar esta versão?")) {
    cartaAtual().versoes.splice(+t.dataset.apagarVersao, 1); salvarSemProgresso(); renderCarta();
  }
  if (t.id === "carta-baixar") {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([cartaAtual().texto], { type: "text/plain" }));
    a.download = `carta-${destinoCarta}-${new Date().toISOString().slice(0, 10)}.txt`; a.click();
  }
  if (t.id === "sortear") {
    const q = CARTA.perguntas[Math.floor(Math.random() * CARTA.perguntas.length)];
    document.getElementById("pergunta-sorteada").textContent = q;
  }
  if (t.id === "exportar") {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(estado, null, 2)], { type: "application/json" }));
    a.download = `mestrado-progresso-${new Date().toISOString().slice(0, 10)}.json`; a.click();
  }
});

document.getElementById("ref").textContent = `Pesquisa feita em ${fmt(HOJE_REF)}. Início pretendido: ${ALVO.inicio}.`;
renderTudo();
const inicial = location.hash.replace(/^#\/?/, "");
if (inicial && document.getElementById(inicial)) irPara(inicial);
