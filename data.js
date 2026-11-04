// Todo o conteúdo do site mora aqui. Para atualizar uma data, mude o item e faça commit.
// status: "oficial"  = tirado do edital/página da universidade (ano indicado em "ref")
//         "estimado" = projeção do ciclo 2027/28 a partir do padrão do ano anterior
// Os ids são a chave do progresso salvo no navegador: não renomeie um id já marcado.

const HOJE_REF = "2026-11-03"; // data da última pesquisa

const ALVO = {
  inicio: "setembro/outubro de 2027 (a.a. 2027/28)",
  referenciaRanking:
    "USP, 133ª no QS World University Rankings 2027 (era 108ª em 2026). Em Economics & Econometrics (QS 2026) aparece por volta da 138ª posição, segundo agregador — conferir no site do QS.",
};

// ---------------------------------------------------------------------------
// Cronograma: cada item é uma tarefa com data limite. "fim" = prazo; "inicio" opcional.
// ---------------------------------------------------------------------------
const CRONOGRAMA = [
  // ---- já / novembro 2026
  { id: "it-prova-escolher", inicio: "2026-11-04", fim: "2026-11-30", cat: "provas", status: "estimado",
    titulo: "Italiano: escolher a prova (CILS, CELI ou PLIDA) e a sessão do 1º semestre de 2027",
    nota: "O certificado fica para o meio de 2027, depois do prazo da MAECI (fim de março), e tudo bem: para curso em inglês ele não é exigido. Escolha a sessão que der com o seu ritmo e veja quanto tempo o resultado demora (costuma levar meses). Se houver sessão em março ou abril, o certificado pode chegar antes do Invest Your Talent (maio) — e, se não chegar, o IYT aceita a declaração de compromisso.",
    links: [["CILS (Siena)", "https://cils.unistrasi.it/"], ["CELI (Perugia)", "https://www.cvcl.it/"], ["PLIDA", "https://plida.dante.global/en"]] },
  { id: "ingles-agendar", inicio: "2026-11-01", fim: "2026-11-15", cat: "provas", status: "oficial",
    titulo: "Inglês: TOEFL já feito (jan/2026, vale até jan/2028) — conferir se cobre cada mínimo",
    nota: "Mínimos: Bologna TOEFL 80; Bonn 87 (preferencial); Padova B2. Ca' Foscari só na matrícula. Baixar o relatório oficial e mandar pela ETS onde for exigido.",
    ref: "Editais 2026/27" },
  { id: "gre-confirmar", inicio: "2026-11-01", fim: "2026-11-20", cat: "bolsas", status: "estimado",
    titulo: "Mandar e-mail para a Unibo confirmando a bolsa do GRE antes de investir no GRE",
    nota: "Perguntar ao internationaldesk@unibo.it: (1) haverá edição 2027/28 e a faixa de ISEE (€16–35 mil) continua? (2) quem ainda não colou grau pode se candidatar, ou o diploma precisa estar concluído no prazo? (3) como o Analytical Writing (0–6) é somado ao Verbal e ao Quant (130–170) — nota bruta ou normalizada? (4) voltará a haver cotas por região, como as 14 bolsas para a América do Sul em 2024/25? Sobre a renda, a lei já responde: o DPCM de 9/4/2001 (art. 5, c. 7–8) manda aplicar as mesmas regras do ISEE italiano, com o imóvel a €500/m²." },
  { id: "gre-diagnostico", inicio: "2026-11-03", fim: "2026-11-10", cat: "provas", status: "oficial",
    titulo: "GRE: fazer um simulado oficial gratuito (POWERPREP) para ver de onde você parte",
    nota: "Gratuito no site da ETS, com a mesma estrutura da prova (~1h58: 1 redação de 30 min, 2 seções de Verbal e 2 de Quant). Faça cronometrado e sem pausa; anote V, Q e os tipos de questão que mais errou. É o ponto de partida do plano.",
    links: [["Material gratuito da ETS", "https://www.ets.org/gre/test-takers/general-test/prepare.html"]] },
  { id: "gre-plano", inicio: "2026-11-01", fim: "2026-11-15", cat: "provas", status: "oficial",
    titulo: "GRE: montar o plano de estudo e agendar a 1ª prova (início de janeiro)",
    nota: "Meta: Quant 165+, Verbal 153–157, Writing 4.0+ (V+Q ≥ 320). O piso da bolsa da Unibo é V+Q ≥ 290 e AW ≥ 3.0, mas o ranking é pela soma. Material: Official GRE Guide (ETS) + um curso barato (GregMat ou Magoosh). Agende em ets.org (em casa ou em centro de prova; nome idêntico ao do passaporte; taxa ~US$ 220–249, conferir). Marcar para o início de janeiro deixa espaço para refazer.",
    ref: "Edital 2025/26",
    links: [["Agendar o GRE (ETS)", "https://www.ets.org/gre/test-takers/general-test/register.html"]] },
  { id: "gre-estudo", inicio: "2026-11-10", fim: "2027-01-04", cat: "provas", status: "oficial",
    titulo: "GRE: estudar 1 a 1,5 h por dia (8 semanas)",
    nota: "Verbal: vocabulário todo dia (flashcards no Anki) + interpretação de texto. Quant: exercícios cronometrados e caderno de erros — o conteúdo é de ensino médio, o que derruba é pegadinha e tempo. Writing: 1 redação 'Analyze an Issue' por semana, comparando com as respostas-modelo da ETS." },
  { id: "gre-simulado2", inicio: "2026-12-14", fim: "2026-12-20", cat: "provas", status: "oficial",
    titulo: "GRE: 2º simulado POWERPREP para medir o progresso",
    nota: "Se estiver longe da meta, mantenha a prova de janeiro como 1ª tentativa e já conte com a 2ª. Se estiver na meta, revise só os erros até a prova." },
  { id: "recom-pedir", inicio: "2026-11-03", fim: "2026-11-20", cat: "docs", status: "oficial",
    titulo: "Pedir as cartas de recomendação: 2 professores (um pedido só, cobrindo tudo) + 1 do trabalho para a MAECI",
    nota: "Veja a tabela de cartas na aba Documentos. Os mesmos 2 professores cobrem Ca' Foscari (Honours), Bologna e, se for para a China, CSC/PKU/Fudan/Yenching. Faça um pedido único listando todos os destinos e prazos, e entregue CV, histórico e 3–4 pontos que você gostaria que eles destacassem. Se a China entrar no plano, a primeira carta é para ~30/11." },
  { id: "cv", inicio: "2026-11-10", fim: "2026-11-30", cat: "docs", status: "estimado",
    titulo: "CV em inglês (modelo Europass)", nota: "Serve para todas as candidaturas e bolsas." },
  { id: "trad-historico", inicio: "2026-11-10", fim: "2026-12-10", cat: "docs", status: "oficial",
    titulo: "Histórico e diploma (ou declaração de provável formando) traduzidos para inglês ou italiano",
    nota: "Português não é aceito: Bologna, Ca' Foscari e Padova pedem inglês ou italiano; Bonn aceita inglês ou alemão (traduções certificadas)." },
  { id: "carta-cf", inicio: "2026-11-20", fim: "2026-12-15", cat: "docs", status: "estimado",
    titulo: "Carta de motivação — Ca' Foscari (Economics-QEM)", nota: "Obrigatória. Precisa estar pronta antes da 1ª rodada (que fecha em meados de janeiro)." },
  { id: "cf-r1-abre", inicio: "2026-12-17", fim: "2026-12-17", cat: "veneza", status: "estimado",
    titulo: "Ca' Foscari: abre a 1ª rodada de admissão (diploma estrangeiro)",
    nota: "2026/27: 17/12/2025 – 14/01/2026. As rodadas mudam conforme a cidadania: no apply.unive.it, selecione 'Brasil' para ver as suas datas.",
    links: [["Página do curso", "https://apply.unive.it/courses/course/418-ma-economics-finance-and-sustainability--economicsqem-curriculum"]] },
  { id: "ingles-prova", inicio: "2026-11-01", fim: "2027-01-10", cat: "provas", status: "oficial",
    titulo: "Enviar o TOEFL oficial (ETS) para as universidades que exigem",
    nota: "Bologna e Bonn pedem o certificado na candidatura; envie o relatório oficial pela ETS quando a universidade tiver código." },
  { id: "cf-r1-fecha", fim: "2027-01-14", cat: "veneza", status: "estimado", prazo: true,
    titulo: "Ca' Foscari: fecha a 1ª rodada (candidatura + teste online)",
    nota: "Recomendado se candidatar já na 1ª rodada: a bolsa Honours e o Invest Your Talent só aceitam quem entrou nas rodadas 1 ou 2. Em 2026/27 a Ca' Foscari fechou a admissão para quem precisa de visto antes do fim do ciclo: não deixe para o fim. Taxa €30 (vale para até 2 cursos)." },
  { id: "bo-i1-abre", inicio: "2027-01-13", fim: "2027-01-13", cat: "bologna", status: "estimado",
    titulo: "Bologna (Applied Economics and Markets): abre o intake 1",
    nota: "2026/27: 13/01 – 12/02/2026, resultado a partir de 23/03.",
    links: [["Edital 2026/27 (PDF)", "https://corsi.unibo.it/s/3394/p/en/enrolling-lmaem/avvisolmaem26-27englishversion-definitivo2.pdf/@@download/file/AvvisoLMAEM26-27EnglishVersion%20Definitivo2.pdf"]] },
  { id: "unibo-gre-abre", inicio: "2027-01-15", fim: "2027-01-15", cat: "bolsas", status: "estimado",
    titulo: "Bolsa International Talents @Unibo (GRE): sai o edital",
    nota: "Edições anteriores abriram em 17/01/2025 e 11/01/2026." },
  { id: "gre-prova", inicio: "2027-01-05", fim: "2027-01-20", cat: "provas", status: "estimado",
    titulo: "Fazer o GRE (1ª tentativa)",
    nota: "Verbal e Quant aparecem na tela no fim (não oficiais); a nota oficial com o Writing sai em ~8–10 dias. No dia da prova, escolha até 4 destinos grátis: inclua a Unibo (código 7850). Com o ScoreSelect você decide depois quais tentativas enviar. A nota vale 5 anos.",
    links: [["Notas e envio (ETS)", "https://www.ets.org/gre/test-takers/general-test/scores.html"]] },
  { id: "gre-retake", inicio: "2027-02-01", fim: "2027-04-10", cat: "provas", status: "estimado",
    titulo: "GRE: 2ª tentativa, se a 1ª ficar abaixo da meta",
    nota: "Regra da ETS: intervalo mínimo de 21 dias entre provas, até 5 vezes em 12 meses (conferir no boletim atual). Faça até ~10/04 para a nota oficial chegar antes do prazo da bolsa (~30/04). Envie só a melhor tentativa pelo ScoreSelect." },
  // ---- fevereiro 2027
  { id: "cf-r2-abre", inicio: "2027-02-04", fim: "2027-02-04", cat: "veneza", status: "estimado",
    titulo: "Ca' Foscari: abre a 2ª rodada", nota: "2026/27: 04/02 – 04/03/2026." },
  { id: "bo-i1-fecha", fim: "2027-02-12", cat: "bologna", status: "estimado", prazo: true,
    titulo: "Bologna: fecha o intake 1 (13h, horário italiano)",
    nota: "Avaliação: mérito acadêmico (até 70) + coerência do currículo com o curso (até 30); mínimo 60/100. As 4 bolsas do departamento (€4.608 cada) vão para os primeiros colocados dos intakes 1 e 2 com nota ≥ 65." },
  { id: "maeci-edital", inicio: "2027-02-15", fim: "2027-02-15", cat: "bolsas", status: "estimado",
    titulo: "MAECI: publicação provável do edital (portal Study in Italy)",
    nota: "Ler o edital no dia e conferir se algo mudou. Em 2026/27: carta de motivação de até 500 palavras, CV, diploma ou histórico com nota esperada, certificado de língua e 'outros documentos' opcionais (carta de recomendação, carta de admissão). Seleção: análise do mérito acadêmico → entrevista → ranking, feita por comissão da representação italiana.",
    links: [["Study in Italy", "https://studyinitaly.esteri.it/"]] },

  // ---- março 2027
  { id: "cf-r2-fecha", fim: "2027-03-04", cat: "veneza", status: "estimado", prazo: true,
    titulo: "Ca' Foscari: fecha a 2ª rodada (última que vale para Honours e Invest Your Talent)" },
  { id: "bo-i2-abre", inicio: "2027-03-13", fim: "2027-03-13", cat: "bologna", status: "estimado",
    titulo: "Bologna: abre o intake 2", nota: "2026/27: 13/03 – 13/04/2026, resultado a partir de 04/06." },
  { id: "carta-maeci", inicio: "2027-02-15", fim: "2027-03-15", cat: "docs", status: "estimado",
    titulo: "Carta de motivação — MAECI (máx. 500 palavras)", nota: "O FAQ oficial pede: história pessoal, formação, interesses acadêmicos, por que estudar na Itália e objetivos do projeto de estudo. Tudo o que estiver na carta pode virar pergunta na entrevista." },
  { id: "bo-i1-resultado", fim: "2027-03-23", cat: "bologna", status: "estimado",
    titulo: "Bologna: resultado do intake 1" },
  { id: "maeci-prazo", fim: "2027-03-26", cat: "bolsas", status: "estimado", prazo: true,
    titulo: "MAECI: prazo da bolsa",
    nota: "2026/27: 26/03/2026, 14h (Itália). Limite de idade: 28 anos para mestrado. Bolsa de €10.800 por 9 meses (nov–jul), em 3 parcelas; valor integral só para quem estiver na Itália até 15/11. Quem ainda não se formou pode se candidatar e enviar o diploma até 1º de julho, se ficar no ranking." },
  { id: "cf-video", inicio: "2027-03-01", fim: "2027-03-25", cat: "docs", status: "oficial",
    titulo: "Vídeo motivacional — bolsa Honours da Ca' Foscari", nota: "Faz parte da pontuação, junto com nota (mínimo 85%), cartas e certificado de língua." },
  { id: "cf-honours", fim: "2027-03-31", cat: "bolsas", status: "estimado", prazo: true,
    titulo: "Ca' Foscari: prazo da bolsa Honours (€10 mil/ano por 2 anos)",
    nota: "2026/27: 31/03/2026. Só para quem se candidatou nas rodadas 1 ou 2. 20 bolsas de mestrado.",
    links: [["Bolsas Ca' Foscari", "https://www.unive.it/pag/19545/?L=0"]] },
  { id: "isee-docs", inicio: "2027-02-15", fim: "2027-04-15", cat: "docs", status: "oficial",
    titulo: "Documentos de renda e patrimônio da família, traduzidos e legalizados (prazo da bolsa do GRE)",
    nota: "A International Talents @Unibo exige que esses documentos sejam enviados à ER.GO até o mesmo prazo da bolsa (~abr/mai). A declaração de IR de 2027 só sai a partir de março: entregue cedo ou use o informe de rendimentos do empregador (fim de fevereiro). Também serve depois para a bolsa regional. Para quem tem família no exterior vale o ano anterior: para 2027/28 → renda bruta de 2026 de cada adulto, só de trabalho ou aposentadoria (certidão da Receita, informe do empregador ou os 12 holerites; extrato bancário não vale), certidão de propriedade do imóvel com a área em m² BRUTOS (a ER.GO multiplica por €500 sozinha), uma certidão de existência ou não de imóveis para CADA adulto da casa, saldo de financiamento e saldos de investimentos em 31/12/2026 (documento do banco: dispensa legalização, mas precisa de tradução juramentada), composição familiar e atividade de cada um. Tudo traduzido para italiano e legalizado (apostila ou consulado italiano). Confira a lista exata no edital de cada agência." },

  // ---- abril/maio 2027
  { id: "bo-i2-fecha", fim: "2027-04-13", cat: "bologna", status: "estimado", prazo: true,
    titulo: "Bologna: fecha o intake 2 (último aberto a não-UE)" },
  { id: "it-comprovante-maeci", inicio: "2027-02-15", fim: "2027-03-20", cat: "bolsas", status: "estimado",
    titulo: "MAECI: anexar a declaração do curso de italiano que você está fazendo",
    nota: "Sem certificado a tempo, mostre o estudo em andamento: declaração da escola ou do professor com o nível atual e a carga horária, em 'outros documentos'. Cite na carta (bloco 'Por que a Itália') e esteja pronto para se apresentar em italiano na entrevista." },
  { id: "unibo-gre-prazo", fim: "2027-04-30", cat: "bolsas", status: "estimado", prazo: true,
    titulo: "International Talents @Unibo (GRE): prazo — nota oficial precisa ter chegado",
    nota: "Prazos anteriores: 30/05/2025 e 30/04/2026. Considere o mais cedo (30/04) até sair o edital. Até essa data: candidatura no Studenti Online + nota oficial do GRE (ETS, código 7850) + documentos de renda da família na ER.GO. A renda é avaliada pela ER.GO com as regras para família no exterior (renda de 2026, patrimônio em 31/12/2026, imóvel a €500/m²). Não acumula com MAECI nem com a bolsa ER.GO (acumula com moradia ER.GO)." },
  { id: "iyt-prazo", fim: "2027-05-11", cat: "bolsas", status: "estimado", prazo: true,
    titulo: "Invest Your Talent in Italy: prazo",
    nota: "2026/27: 11/05/2026. Brasil está na lista de países. Curso em inglês de Economia/Gestão/Engenharia; 9 meses de bolsa + estágio em empresa. Exige graduação concluída na inscrição.",
    links: [["Invest Your Talent", "https://investyourtalentapplication.esteri.it/"]] },
  { id: "universitaly", inicio: "2027-04-01", fim: "2027-07-15", cat: "visto", status: "estimado",
    titulo: "Pré-matrícula no Universitaly (obrigatória para o visto)",
    nota: "2026/27: até 15/07/2026. Faça logo após a primeira admissão confirmada.",
    links: [["Universitaly", "https://www.universitaly.it/"]] },
  { id: "cimea", inicio: "2027-04-01", fim: "2027-06-30", cat: "docs", status: "estimado",
    titulo: "Declaração de valor (consulado) ou Statement of Comparability (CIMEA) do diploma",
    nota: "Pedido na matrícula; o CIMEA demora semanas. Confirme qual das duas a universidade escolhida aceita." },
  { id: "bo-i2-resultado", fim: "2027-06-04", cat: "bologna", status: "estimado", titulo: "Bologna: resultado do intake 2" },

  // ---- julho a setembro 2027
  { id: "dsu-bando", inicio: "2027-07-10", fim: "2027-07-25", cat: "bolsas", status: "estimado",
    titulo: "Saem os editais regionais (ER.GO, ESU Venezia, ESU Padova)",
    nota: "Os de 2026/27 saíram todos em julho." },
  { id: "visto", inicio: "2027-07-01", fim: "2027-08-31", cat: "visto", status: "estimado",
    titulo: "Pedir o visto de estudo no consulado italiano" },
  { id: "dsu-prazo", fim: "2027-08-24", cat: "bolsas", status: "estimado", prazo: true,
    titulo: "Bolsa regional: prazo provável (ER.GO / ESU)",
    nota: "2026/27: ER.GO 24/08; Veneto entre 20 e 30/08; moradia ESU Venezia 20/08. Confirmar a data exata da região escolhida assim que o edital sair." },
  { id: "italia2-decidir", inicio: "2026-11-10", fim: "2027-01-10", cat: "bolsas", status: "estimado",
    titulo: "Decidir a 3ª italiana (para a MAECI e/ou o Invest Your Talent)",
    nota: "Padova (MSc Economics and Finance) é a mais barata e vale para MAECI e Invest Your Talent. LUISS e Bocconi só com bolsa própria. Veja a aba Outras opções." },
  { id: "bonn-carta", inicio: "2026-11-20", fim: "2026-12-20", cat: "bonn", status: "oficial",
    titulo: "Bonn: pedir 1 carta de recomendação de professor",
    nota: "Precisa ser de professor (não vale empregador), em papel timbrado, assinada e enviada do e-mail institucional dele." },
  { id: "bonn-biblio", inicio: "2026-12-01", fim: "2026-12-31", cat: "bonn", status: "oficial",
    titulo: "Bonn: montar a bibliografia (10–15 livros e artigos da graduação) e conferir a conversão da nota para o sistema alemão" },
  { id: "bonn-r0", inicio: "2027-01-01", fim: "2027-01-31", cat: "bonn", status: "estimado", prazo: true,
    titulo: "Bonn: rodada antecipada do M.Sc. Economics",
    links: [["Candidatura e admissão", "https://www.econ.uni-bonn.de/en/study-programs/master/application-admission"]] },
  { id: "bonn-r1", inicio: "2027-02-01", fim: "2027-03-31", cat: "bonn", status: "estimado", prazo: true,
    titulo: "Bonn: fecha a rodada regular (início em outubro de 2027)" },
];

// ---------------------------------------------------------------------------
// Universidades-alvo (candidato não-UE, residente no Brasil)
// ---------------------------------------------------------------------------
const UNIVERSIDADES = [
  {
    id: "bologna", nome: "Università di Bologna", curso: "Applied Economics and Markets (LM)",
    qs: "123ª no QS 2027 (acima da USP)",
    link: "https://corsi.unibo.it/2cycle/AppliedEconomicsMarkets",
    janelas: [
      ["Intake 1 (UE e não-UE)", "~13/jan – 12/fev/2027", "2026/27: 13/01–12/02, resultado 23/03"],
      ["Intake 2 (UE e não-UE)", "~13/mar – 13/abr/2027", "2026/27: 13/03–13/04, resultado 04/06"],
      ["Intake 3", "só UE", "—"],
    ],
    exige: [
      "Graduação de 3+ anos (pode se candidatar antes de concluir; precisa terminar até 31/12 do ano de ingresso)",
      "Inglês B2 na candidatura (IELTS 5.5, TOEFL 80, Cambridge 160...)",
      "Carta de motivação: não consta como obrigatória no edital 2026/27",
      "Recomendação: 1–2 cartas opcionais, enviadas pelo professor no sistema; não pontuam",
      "Formulário com média, nota final, habilidades em TI (Stata, Python), experiência, GRE/GMAT, outras línguas",
      "Sem prova de entrada: avaliação de mérito acadêmico (70) + coerência curricular (30), mínimo 60",
      "Anuidade: brasileiro pode optar pela taxa fixa reduzida para países fora da OCDE — €1.200 + €157,04 ≈ €1.357/ano (2026/27), em vez de até €3.060 (máximo do AEM em 2025/26). Basta declarar no portal da ER.GO que a renda e os bens da família estão só fora da Itália e aceitar a 'Flat Tax'; não exige documentos de renda",
    ],
    bolsas: "4 bolsas do departamento de €4.608 (1 ano) para os primeiros dos intakes 1 e 2 com nota ≥ 65. Além disso, International Talents @Unibo (GRE), que dá isenção total da anuidade, e ER.GO. Optar pela taxa fixa não impede de enviar os documentos de renda para disputar a bolsa do GRE.",
    links: [["Taxa fixa reduzida (Unibo)", "https://www.unibo.it/en/study/enrolment-fees-and-other-procedures/degree-programmes/tuition-fees-and-exemptions/reduced-fixed-fee-for-citizens-of-particularly-poor-and-developing-countries-or-non-eu-non-oecd-countries"], ["Lista de países fora da OCDE 2026", "https://www.unibo.it/en/attachments/nonOECDcountries.pdf/@@download/file/Elenco%20Paesi%20NON%20OCSE%202026.pdf"]],
  },
  {
    id: "veneza", nome: "Università Ca' Foscari Venezia", curso: "Economics, Finance and Sustainability — curriculum Economics-QEM",
    qs: "abaixo da USP no QS geral; vale pelo QEM e pelas bolsas",
    link: "https://apply.unive.it/courses/course/418-ma-economics-finance-and-sustainability--economicsqem-curriculum",
    janelas: [
      ["Rodada 1 (diploma estrangeiro)", "~17/dez/2026 – 14/jan/2027", "2026/27: 17/12/2025–14/01/2026"],
      ["Rodada 2", "~4/fev – 4/mar/2027", "2026/27: 04/02–04/03/2026"],
      ["Rodadas seguintes", "variam por cidadania", "Em 2026/27 fecharam cedo para quem precisa de visto"],
    ],
    exige: [
      "Graduação de 3+ anos com ≥ 60 ECTS em Economia, Administração, Direito ou Matemática/Estatística",
      "Média mínima de 70% (convertida proporcionalmente)",
      "Teste escrito online de preparação pessoal (uma data por rodada)",
      "Carta de motivação obrigatória + CV + histórico",
      "Inglês B2 só para a matrícula (mas pontua na bolsa Honours)",
      "Taxa de inscrição €30; anuidade €1.300",
    ],
    bolsas: "Honours (€10 mil/ano × 2, rodadas 1–2), Invest Your Talent (rodadas 1–2), MAECI, International College (moradia + taxas por €1.500/ano), ESU Venezia.",
  },
  {
    id: "bonn", nome: "Universität Bonn", curso: "M.Sc. Economics (regular, em inglês)",
    qs: "50ª em Economia & Econometria no QS (USP: 138ª); uma das escolas de economia mais fortes da Alemanha",
    link: "https://www.econ.uni-bonn.de/en/study-programs/master/application-admission",
    janelas: [
      ["Rodada antecipada", "1–31/jan/2027", "Página oficial: early round em janeiro"],
      ["Rodada regular", "1/fev–31/mar/2027", "Início do curso em outubro"],
    ],
    exige: [
      "Graduação em economia ou área quantitativa, com nota final equivalente a 2,3 alemão ou melhor (a conversão usa a nota mínima de aprovação da sua universidade — confirmar)",
      "Base sólida em cálculo, álgebra linear, estatística e econometria",
      "GRE/GMAT NÃO exigido (opcional; ajuda candidatos de fora da UE)",
      "Inglês B2 — preferencialmente TOEFL 87+ ou IELTS 6.0+",
      "1 carta de recomendação de PROFESSOR (não vale empregador), em papel timbrado, enviada do e-mail institucional dele",
      "CV + bibliografia com 10–15 livros e artigos que você estudou na graduação",
      "Não pede carta de motivação",
    ],
    bolsas: "Sem anuidade (só a contribuição semestral, na casa de €300 — confirmar). O visto exige conta bloqueada de €11.904/ano (€992/mês em 2026). Bolsa da universidade é rara; o Deutschlandstipendium só pode ser pedido depois de matriculado.",
  },
];

// ---------------------------------------------------------------------------
// Bolsas
// ---------------------------------------------------------------------------
const BOLSAS = [
  {
    id: "maeci", grupo: "principais", nome: "MAECI — bolsa do governo italiano (portal Study in Italy)",
    valor: "€10.800 por 9 meses (≈ €1.200/mês, em 3 parcelas). A isenção de taxas depende da universidade. Renovável no 2º ano",
    prazo: "fim de março (26/03/2026 no último ciclo)",
    quem: "Estrangeiros até 28 anos (mestrado). Curso em inglês: inglês B2; o certificado de italiano não é exigido, mas o estudo da língua conta a favor. Italiano B2 é exigido para curso em italiano.",
    atencao: "Dá para se candidatar antes de se formar (marca 'documentos integrativos' e envia o diploma até 1º de julho, se ficar no ranking). Carta de motivação de até 500 palavras; carta de recomendação é opcional. Seleção em duas fases: mérito acadêmico, depois entrevista. Não acumula com International Talents @Unibo nem com bolsa regional.",
    link: "https://studyinitaly.esteri.it/",
  },
  {
    id: "iyt", grupo: "principais", nome: "Invest Your Talent in Italy (MAECI + ICE)",
    valor: "9 meses de bolsa + isenção de taxas + estágio em empresa italiana",
    prazo: "maio (11/05/2026 no último ciclo)",
    quem: "Países da lista (o Brasil está). Mestrado em inglês em Economia, Gestão, Engenharia ou Tecnologia.",
    atencao: "Graduação concluída antes da inscrição. Na Ca' Foscari, só vale quem entrou nas rodadas 1 ou 2. Documentos (portal oficial): histórico final da graduação com nota, inglês B2, certificado de italiano OU declaração de que vai estudar italiano antes de viajar, vídeo de apresentação de até 59 s (inglês ou italiano), CV e passaporte. Não pede carta de recomendação.",
    link: "https://investyourtalentapplication.esteri.it/",
  },
  {
    id: "dsu", grupo: "principais", nome: "Bolsa regional por renda (DSU): ER.GO (Bologna), ESU Venezia, ESU Padova",
    valor: "ER.GO 2026/27: até €7.171/ano para quem mora fora (integral se ISEE ≤ 2/3 do teto, depois diminui) + isenção de anuidade",
    prazo: "edital em julho; prazo no fim de agosto (ER.GO 24/08/2026)",
    quem: "Por renda (ISEE parificato). Tetos ER.GO 2026/27: ISEE ≤ €25.000 E ISPE ≤ €50.000. Teto nacional (outras regiões podem usar até ele): ISEE ≤ €28.339,88 e ISPE ≤ €61.608,48.",
    atencao: "O trabalho pesado são os documentos brasileiros de renda e patrimônio, traduzidos e legalizados. Comece em março.",
    link: "https://www.er-go.it/",
    extras: [["ESU Venezia", "https://www.esuvenezia.it/"]],
  },
  {
    id: "unibo-gre", grupo: "gre", nome: "International Talents @Unibo — a bolsa que só depende do GRE",
    valor: "€6.500/ano por 2 anos + isenção total de taxas (paga ~€157). 30 bolsas em 2025/26; em 2024/25 eram 56 de €4.500, com 14 reservadas para quem se formou na América do Sul",
    prazo: "edital em janeiro; prazo 30/04/2024, 30/05/2025 e (provável) 30/04/2026 nos últimos ciclos",
    quem: "JÁ GRADUADO (a versão italiana, que é a que vale, exige 'aver conseguito il titolo' sob pena de exclusão: formando não serve), diploma de fora da Itália, menos de 30 anos, nunca ter recebido Unibo Action 2, ISEE entre €16 mil e €35 mil (ou equivalente). Não precisa estar admitido no mestrado para se candidatar.",
    atencao: "Ranking só pela nota do GRE General: soma de Verbal + Quant + Writing, 'cada seção com o mesmo peso' (o edital não diz se normaliza o Writing, que vai de 0 a 6). Mínimos para entrar no ranking: V+Q ≥ 290 e AW ≥ 3.0 — isso é só o piso (~percentil 15–20). Empate: vence o mais novo. As notas de corte não são públicas (ranking sai no Studenti Online, com login). Nota oficial via ETS, código 7850, até o prazo. A bolsa só é paga depois da admissão e matrícula em qualquer mestrado da Unibo naquele ano; parcelas condicionadas a créditos (10, 30, 60, 80 CFU). Não acumula com MAECI nem com a bolsa ER.GO; acumula com moradia ER.GO.",
    link: "https://bandi.unibo.it/s/amministrazione-generale/international-talents-unibo-borse-di-studio-per-studentesse-e-studenti-internazionali",
  },
  {
    id: "cf-honours", grupo: "outras", nome: "Ca' Foscari Honours Scholarship",
    valor: "€10.000/ano por 2 anos (20 bolsas de mestrado)",
    prazo: "31/03/2026 no último ciclo",
    quem: "Qualquer nacionalidade, média ≥ 85%, candidatura nas rodadas 1 ou 2.",
    atencao: "Pontua média, vídeo motivacional, 1–2 cartas de recomendação e certificado de língua.",
    link: "https://www.unive.it/pag/19545/?L=0",
  },
  {
    id: "cf-college", grupo: "outras", nome: "Ca' Foscari International College",
    valor: "Taxas + programa do College + 10 meses de moradia em Veneza por €1.500/ano (8 vagas de mestrado)",
    prazo: "edital na primavera", quem: "Admitidos na Ca' Foscari", atencao: "", link: "https://www.unive.it/pag/19545/?L=0",
  },
  {
    id: "bo-dept", grupo: "outras", nome: "Bolsas do Departamento de Economia (Bologna, AEM)",
    valor: "4 × €4.608 (1 ano)", prazo: "automático pelo ranking dos intakes 1 e 2",
    quem: "Admitidos com nota ≥ 65/100.", atencao: "Mais um motivo para entrar no intake 1.", link: "https://corsi.unibo.it/2cycle/AppliedEconomicsMarkets",
  },
];

// ---------------------------------------------------------------------------
// Documentos que você produz (cada um vira um item de checklist)
// ---------------------------------------------------------------------------
const DOCUMENTOS = [
  { id: "d-carta-cf", doc: "Carta de motivação", para: "Ca' Foscari (QEM)", obrig: "obrigatória", ate: "2026-12-15" },
  { id: "d-carta-bo", doc: "Carta de motivação", para: "Bologna", obrig: "não pedida em 2026/27 — confirmar", ate: "2027-01-31" },
  { id: "d-carta-maeci", doc: "Carta de motivação (máx. 500 palavras)", para: "MAECI", obrig: "obrigatória", ate: "2027-03-15" },
  { id: "d-rec-maeci", doc: "Carta de recomendação (do chefe)", para: "MAECI", obrig: "opcional, em 'outros documentos'", ate: "2027-03-15" },
  { id: "d-rec-cf", doc: "Carta(s) de recomendação (1–2) de PROFESSOR", para: "Ca' Foscari — bolsa Honours", obrig: "pontua; só professor", ate: "2027-03-25" },
  { id: "d-rec-bo", doc: "Carta(s) de recomendação (1–2)", para: "Bologna", obrig: "opcional, não pontua; de preferência professor", ate: "2027-02-12" },
  { id: "d-video-cf", doc: "Vídeo motivacional", para: "Ca' Foscari — bolsa Honours", obrig: "pontua", ate: "2027-03-25" },
  { id: "d-cv", doc: "CV Europass em inglês", para: "todas", obrig: "obrigatório", ate: "2026-11-30" },
  { id: "d-trad", doc: "Histórico e diploma em inglês/italiano", para: "todas", obrig: "obrigatório", ate: "2026-12-10" },
  { id: "d-passaporte", doc: "Passaporte válido", para: "todas + visto", obrig: "obrigatório", ate: "2026-12-10" },
  { id: "d-ingles", doc: "Certificado de inglês B2+", para: "Bologna e Bonn (candidatura), Ca' Foscari (matrícula)", obrig: "obrigatório", ate: "2027-01-10" },
  { id: "d-gre", doc: "GRE General (V+Q ≥ 290, AW ≥ 3.0)", para: "International Talents @Unibo", obrig: "obrigatório para a bolsa", ate: "2027-03-31" },
  { id: "d-italiano-curso", doc: "Declaração do curso de italiano em andamento (nível e carga horária)", para: "MAECI (no lugar do certificado)", obrig: "desejável", ate: "2027-03-20" },
  { id: "d-italiano", doc: "Certificado de italiano (CILS, CELI ou PLIDA), previsto para o meio de 2027", para: "Invest Your Talent (ou declaração de compromisso), vida na Itália", obrig: "desejável", ate: "2027-07-31" },
  { id: "d-isee", doc: "Documentos de renda/patrimônio da família, traduzidos e legalizados", para: "International Talents (GRE) e depois ER.GO/ESU", obrig: "obrigatório para a bolsa do GRE", ate: "2027-04-15" },
  { id: "d-rec-bonn", doc: "1 carta de recomendação de PROFESSOR (papel timbrado, e-mail institucional)", para: "Bonn", obrig: "obrigatória", ate: "2027-01-25" },
  { id: "d-biblio-bonn", doc: "Bibliografia de 10–15 livros/artigos da graduação", para: "Bonn", obrig: "obrigatória", ate: "2027-01-25" },
];

// ---------------------------------------------------------------------------
// Outras universidades — comparadas com a USP (133ª no QS 2027)
// ---------------------------------------------------------------------------
const OUTRAS = [
  { regiao: "Itália — 3ª opção (MAECI / Invest Your Talent)", nome: "Università di Padova — MSc Economics and Finance",
    qs: "197ª em Economia no QS (abaixo da USP, 138ª)",
    curso: "Em inglês, 2 anos. Tronco comum com Advanced Econometrics, Macroeconomics, Corporate Finance e Capital Markets; trilha Economics ou Banking & Finance (Financial Economics, risco).",
    custo: "€2.950/ano + depósito de €208. GRE/GMAT não obrigatório (V+Q ≥ 300 conta a favor). Pede CV, carta de motivação e cartas de referência; pode haver entrevista online. Prazos 2027/28 ainda não publicados.",
    bolsa: "Elegível para a MAECI (universidade estatal) e PARTICIPA do Invest Your Talent 2026/27.",
    veredito: "A melhor 3ª italiana para bolsa: barata, currículo de macro/finanças e vale para MAECI e Invest Your Talent.",
    link: "https://apply.unipd.it/courses/course/16-economics-and-finance" },
  { regiao: "Itália — 3ª opção (MAECI / Invest Your Talent)", nome: "LUISS (Roma) — mestrados de economia/finanças em inglês",
    qs: "134ª em Economia no QS (logo acima da USP)",
    curso: "Mestrados em economia e finanças com trilhas em inglês (conferir qual curso é inteiramente em inglês).",
    custo: "Universidade privada: anuidade alta (confirmar). Admissão de não-UE por teste (inscrição dez/2026 a 8/4/2027; prova 19–22/4) ou direto com GRE/GMAT.",
    bolsa: "Elegível para a MAECI (privada reconhecida), mas a MAECI não paga anuidade. NÃO participa do Invest Your Talent.",
    veredito: "Só faz sentido com bolsa da própria LUISS cobrindo a anuidade.",
    link: "https://www.luiss.it/en/orientation-and-admissions/admission-procedures/masters-degree-admissions/admission-masters-degrees-20262027-extra-eu" },
  { regiao: "Itália — 3ª opção (MAECI / Invest Your Talent)", nome: "Bocconi (Milão) — MSc Economic and Social Sciences",
    qs: "18ª em Economia no QS — a melhor da Itália",
    curso: "MSc em inglês, 2 anos, bem quantitativo.",
    custo: "Privada, anuidade alta. Exige GRE, GMAT ou a prova online da Bocconi. 4 rodadas para internacionais (agregador: 29/10, 20/1, 11/3, 29/4).",
    bolsa: "Elegível para a MAECI (mas ela não cobre anuidade). NÃO participa do Invest Your Talent. Bolsas próprias de mérito e por renda.",
    veredito: "Prestígio máximo, mas só viável com bolsa da Bocconi; dá para usar o GRE de janeiro na rodada de março.",
    link: "https://www.unibocconi.it/en/applying-bocconi/master-science-and-ma-programs/timeline" },
  { regiao: "Itália — 3ª opção (MAECI / Invest Your Talent)", nome: "Sapienza (Roma)",
    qs: "139ª em Economia no QS (empatada com a USP)",
    curso: "Não encontrei mestrado de economia inteiramente em inglês (só Health Economics).",
    custo: "—", bolsa: "Elegível para a MAECI se houver curso adequado. NÃO participa do Invest Your Talent.",
    veredito: "Descartada por falta de curso de economia em inglês.",
    link: "https://www.uniroma1.it/en/admissions" },
  { regiao: "Descartadas (03/11/2026)", nome: "Fora do plano",
    qs: "—",
    curso: "Turim (exige nota final ≥ 9/10 ou departamento no top 12,5% do RePEc), China (PKU, Fudan, Tsinghua, SJTU, Xiamen), Coreia, Taiwan, Japão, Singapura, Hong Kong, Canadá, Austrália, Viena (Uni Wien e WU), Erasmus Mundus (MAPP e QEM), Maastricht, Wageningen, Barcelona School of Economics, KU Leuven, França (PSE, TSE, Sciences Po), Holanda, Dinamarca.",
    custo: "—", bolsa: "—",
    veredito: "Foco: Bologna e Ca' Foscari (+ uma 3ª italiana para a MAECI) e Bonn pelo custo baixo.",
    link: "https://xuanxiao.org/rankings/qs/subject/economics-econometrics" },
];


// ---------------------------------------------------------------------------
// Cartas de recomendação: quem pode escrever e até quando pedir (~4–6 semanas antes)
// professor: "obrigatório" | "preferível" | "não precisa"
// ---------------------------------------------------------------------------
const CARTAS = [
  { id: "c-bologna", destino: "Bologna — Applied Economics and Markets", qtd: "1–2", deQuem: "\"If possible\" professores; o professor recebe um link e envia direto", professor: "preferível", obrig: "opcional, não pontua", prazo: "2027-02-12", pedir: "2027-01-05" },
  { id: "c-cf", destino: "Ca' Foscari — bolsa Honours", qtd: "1–2", deQuem: "Só professores que conheçam você e seu trabalho (empregador não vale)", professor: "obrigatório", obrig: "pontua na bolsa", prazo: "2027-03-31", pedir: "2027-02-15" },
  { id: "c-maeci", destino: "MAECI", qtd: "1", deQuem: "Pode ser do trabalho", professor: "não precisa", obrig: "opcional, mas conta a favor", prazo: "2027-03-26", pedir: "2027-02-10" },
  { id: "c-bonn", destino: "Bonn — M.Sc. Economics", qtd: "1", deQuem: "Professor, em papel timbrado, enviada do e-mail institucional dele (empregador não vale)", professor: "obrigatório", obrig: "obrigatória", prazo: "2027-01-31", pedir: "2026-12-15" },
];
const SEM_CARTAS = "Não pedem carta: admissão da Ca' Foscari (só carta de motivação), bolsa do GRE de Bologna (International Talents), Invest Your Talent (vídeo de 1 min + CV) e bolsas regionais. Padova pede cartas de referência (confirmar quantas).";

// ---------------------------------------------------------------------------
// Janelas que aparecem como barras na linha do tempo do painel
// ---------------------------------------------------------------------------
const JANELAS = [
  { cat: "bonn", nome: "Bonn: rodada antecipada", de: "2027-01-01", ate: "2027-01-31" },
  { cat: "bonn", nome: "Bonn: rodada regular", de: "2027-02-01", ate: "2027-03-31" },
  { cat: "veneza", nome: "Ca' Foscari: rodada 1", de: "2026-12-17", ate: "2027-01-14" },
  { cat: "veneza", nome: "Rodada 2", de: "2027-02-04", ate: "2027-03-04" },
  { cat: "veneza", nome: "Bolsa Honours", de: "2027-03-04", ate: "2027-03-31" },
  { cat: "bologna", nome: "Bologna: intake 1", de: "2027-01-13", ate: "2027-02-12" },
  { cat: "bologna", nome: "Intake 2", de: "2027-03-13", ate: "2027-04-13" },
  { cat: "bolsas", nome: "Bolsa do GRE (Unibo)", de: "2027-01-15", ate: "2027-04-30" },
  { cat: "bolsas", nome: "MAECI", de: "2027-02-15", ate: "2027-03-26" },
  { cat: "bolsas", nome: "Invest Your Talent", de: "2027-03-26", ate: "2027-05-11" },
  { cat: "bolsas", nome: "Bolsa regional", de: "2027-07-10", ate: "2027-08-24" },
  { cat: "provas", nome: "Estudo do GRE", de: "2026-11-03", ate: "2027-01-04" },
  { cat: "provas", nome: "GRE (1ª tentativa)", de: "2027-01-05", ate: "2027-01-20" },
  { cat: "provas", nome: "GRE: 2ª tentativa, se precisar", de: "2027-02-01", ate: "2027-04-10" },
  { cat: "provas", nome: "Prova de italiano (certificado no meio do ano)", de: "2027-04-01", ate: "2027-07-31" },
  { cat: "docs", nome: "Cartas, CV e traduções", de: "2026-11-03", ate: "2026-12-20" },
  { cat: "docs", nome: "Documentos de renda (ISEE)", de: "2027-02-15", ate: "2027-04-15" },
  { cat: "docs", nome: "Declaração de valor / CIMEA", de: "2027-04-01", ate: "2027-06-30" },
  { cat: "visto", nome: "Universitaly (pré-matrícula)", de: "2027-04-01", ate: "2027-07-15" },
  { cat: "visto", nome: "Visto", de: "2027-07-01", ate: "2027-08-31" },
];

// ---------------------------------------------------------------------------
// Espaço de treino da carta de motivação (só o roteiro fica aqui; o texto
// que você escreve fica salvo no navegador, nunca no repositório)
// ---------------------------------------------------------------------------
const CARTA = {
  destinos: [
    { id: "maeci", nome: "MAECI", limite: 500 },
    { id: "cf", nome: "Ca' Foscari (QEM)", limite: 0 },
    { id: "italia2", nome: "3ª italiana (Padova/LUISS/Bocconi)", limite: 0 },
    { id: "bologna", nome: "Bologna (opcional)", limite: 0 },
  ],
  blocos: [
    { nome: "Abertura", palavras: 50, guia: "Uma cena ou problema econômico concreto que move você. Corte frases como 'I am writing to express my interest'." },
    { nome: "Formação", palavras: 90, guia: "Curso, disciplinas que importam, TCC (pergunta, método, resultado) e o intercâmbio — só o que você usaria no mestrado." },
    { nome: "Experiência e projetos", palavras: 100, guia: "O trabalho mais relevante com resultado e números (alcance, frequência, ferramentas). Estágios antigos cabem numa frase." },
    { nome: "Por que este curso", palavras: 90, guia: "Um curso só. Cite 1–2 disciplinas, professores ou centros reais do programa e ligue ao que falta na sua formação." },
    { nome: "Por que a Itália", palavras: 70, guia: "Razões econômicas e acadêmicas atuais + laço pessoal em uma frase + seu esforço com o italiano." },
    { nome: "Objetivos e retorno", palavras: 70, guia: "Cargo ou instituição concreta depois do mestrado e como você vira ponte Brasil–Itália." },
    { nome: "Fechamento", palavras: 20, guia: "Uma frase que amarra a abertura ao objetivo. Sem 'turning point' ou 'dream'." },
  ],
  checklist: [
    "Conta a minha história pessoal (FAQ MAECI)",
    "Mostra minha formação (FAQ MAECI)",
    "Deixa claros meus interesses acadêmicos (FAQ MAECI)",
    "Explica por que estudar na Itália (FAQ MAECI)",
    "Diz o objetivo e as metas do projeto de estudo (FAQ MAECI)",
    "Conversa com os objetivos da bolsa: cooperação, economia italiana no mundo, língua e cultura",
    "Fala de UM curso, com algo específico dele",
    "Passa no teste da troca (não serve para outra universidade/país)",
    "Cada frase aguenta 2 minutos de pergunta na entrevista",
    "Bate com o CV e o histórico",
    "Sem clichês (veja o detector ao lado)",
    "Revisada por outra pessoa",
  ],
  cliches: [
    "i am writing to express", "deep interest", "passion", "passionate", "since i was a child", "since childhood",
    "dream", "turning point", "unique opportunity", "broaden my horizons", "broadened my", "profoundly",
    "rich culture", "beautiful country", "art and food", "invaluable", "real economic value", "make a difference",
    "aligns closely", "i believe", "hardworking", "dedicated", "eager to",
  ],
  perguntas: [
    "Por que a Itália, e não Portugal, Espanha ou Alemanha?",
    "Por que este curso e esta universidade?",
    "Explique seu TCC: pergunta, método e resultado. O que faria diferente?",
    "O que você faz no trabalho, no dia a dia? Dê um exemplo de análise sua.",
    "O que pretende fazer depois do mestrado? Vai voltar ao Brasil?",
    "Que relação você vê entre as economias brasileira e italiana?",
    "Como a política monetária do BCE afeta a Itália de forma diferente da Alemanha?",
    "Como está o seu italiano? Apresente-se em italiano em 30 segundos.",
    "O que aprendeu no intercâmbio que vai usar na Itália?",
    "Se não ganhar a bolsa, como pretende se manter?",
  ],
};
