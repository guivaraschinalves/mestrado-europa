// Todo o conteúdo do site mora aqui. Para atualizar uma data, mude o item e faça commit.
// status: "oficial"  = tirado do edital/página da universidade (ano indicado em "ref")
//         "estimado" = projeção do ciclo 2027/28 a partir do padrão do ano anterior
// Os ids são a chave do progresso salvo no navegador: não renomeie um id já marcado.

const HOJE_REF = "2026-11-01"; // data da última pesquisa

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
  { id: "it-dez-checar", inicio: "2026-11-01", fim: "2026-11-10", cat: "provas", status: "estimado",
    titulo: "Checar se ainda dá para se inscrever numa sessão de italiano em dez/2026 (CILS, CELI ou PLIDA)",
    nota: "É a única chance realista de ter certificado B1/B2 antes do prazo da MAECI (fim de março). Inscrições costumam fechar 1–2 meses antes da prova. Se não der, a próxima janela é fev–jun/2027.",
    links: [["CILS (Siena)", "https://cils.unistrasi.it/"], ["CELI (Perugia)", "https://www.cvcl.it/"], ["PLIDA", "https://plida.dante.global/en"]] },
  { id: "ingles-agendar", inicio: "2026-11-01", fim: "2026-11-15", cat: "provas", status: "oficial",
    titulo: "Agendar IELTS ou TOEFL (B2 é exigido JÁ na candidatura em Bologna e Turim)",
    nota: "Mínimos 2026/27 — Bologna: IELTS 5.5 / TOEFL iBT 80. Turim: IELTS 5.5 (nenhuma banda abaixo) / TOEFL 69 (nenhuma seção < 17). Ca' Foscari só pede na matrícula, mas a bolsa Honours pontua o certificado. Mire IELTS 6.5+ / TOEFL 90+. Certificado vale 3 anos.",
    ref: "Editais 2026/27" },
  { id: "gre-confirmar", inicio: "2026-11-01", fim: "2026-11-20", cat: "bolsas", status: "estimado",
    titulo: "Mandar e-mail para a Unibo confirmando a bolsa do GRE antes de investir no GRE",
    nota: "Perguntar ao internationaldesk@unibo.it: (1) haverá edição 2027/28 e a faixa de ISEE (€16–35 mil) continua? (2) quem ainda não colou grau pode se candidatar, ou o diploma precisa estar concluído no prazo? (3) como o Analytical Writing (0–6) é somado ao Verbal e ao Quant (130–170) — nota bruta ou normalizada? (4) voltará a haver cotas por região, como as 14 bolsas para a América do Sul em 2024/25? Sobre a renda, a lei já responde: o DPCM de 9/4/2001 (art. 5, c. 7–8) manda aplicar as mesmas regras do ISEE italiano, com o imóvel a €500/m²." },
  { id: "gre-plano", inicio: "2026-11-01", fim: "2026-11-15", cat: "provas", status: "oficial",
    titulo: "Montar plano de estudo do GRE e agendar a prova",
    nota: "Para a bolsa International Talents @Unibo: mínimo Verbal+Quant = 290 e Analytical Writing = 3.0; ranking pela soma das 3 seções. Agende com folga para poder refazer.",
    ref: "Edital 2025/26" },
  { id: "recom-pedir", inicio: "2026-11-03", fim: "2026-11-20", cat: "docs", status: "oficial",
    titulo: "Pedir as cartas de recomendação: 2 professores (um pedido só, cobrindo tudo) + 1 do trabalho para a MAECI",
    nota: "Veja a tabela de cartas na aba Documentos. Os mesmos 2 professores cobrem Ca' Foscari (Honours), Bologna e, se for para a China, CSC/PKU/Fudan/Yenching. Faça um pedido único listando todos os destinos e prazos, e entregue CV, histórico e 3–4 pontos que você gostaria que eles destacassem. Se a China entrar no plano, a primeira carta é para ~30/11." },
  { id: "cv", inicio: "2026-11-10", fim: "2026-11-30", cat: "docs", status: "estimado",
    titulo: "CV em inglês (modelo Europass)", nota: "Serve para todas as candidaturas e bolsas." },
  { id: "trad-historico", inicio: "2026-11-10", fim: "2026-12-10", cat: "docs", status: "oficial",
    titulo: "Histórico e diploma (ou declaração de provável formando) traduzidos para inglês ou italiano",
    nota: "Português não é aceito. Turim aceita inglês, francês, italiano ou espanhol (outras línguas exigem tradução certificada); Bologna e Ca' Foscari pedem inglês ou italiano." },
  { id: "unito-abre", inicio: "2026-11-25", fim: "2026-11-25", cat: "turim", status: "estimado",
    titulo: "Turim (Economics): abre a candidatura para não-UE residentes no exterior",
    nota: "Em 2026/27 a janela foi 25/11/2025 – 29/01/2026, no Apply@UniTo. 50 vagas para não-UE residentes fora.",
    links: [["Página do curso", "https://apply.unito.it/en_GB/courses/course/282-economics"]] },

  // ---- dezembro 2026
  { id: "carta-cf", inicio: "2026-11-20", fim: "2026-12-15", cat: "docs", status: "estimado",
    titulo: "Carta de motivação — Ca' Foscari (Economics-QEM)", nota: "Obrigatória. Precisa estar pronta antes da 1ª rodada (que fecha em meados de janeiro)." },
  { id: "cf-r1-abre", inicio: "2026-12-17", fim: "2026-12-17", cat: "veneza", status: "estimado",
    titulo: "Ca' Foscari: abre a 1ª rodada de admissão (diploma estrangeiro)",
    nota: "2026/27: 17/12/2025 – 14/01/2026. As rodadas mudam conforme a cidadania: no apply.unive.it, selecione 'Brasil' para ver as suas datas.",
    links: [["Página do curso", "https://apply.unive.it/courses/course/418-ma-economics-finance-and-sustainability--economicsqem-curriculum"]] },
  { id: "carta-unito", inicio: "2026-12-01", fim: "2026-12-20", cat: "docs", status: "oficial",
    titulo: "Carta de motivação — Turim (Economics)", nota: "Obrigatória na candidatura." },

  // ---- janeiro 2027
  { id: "ingles-prova", inicio: "2026-12-01", fim: "2027-01-10", cat: "provas", status: "estimado",
    titulo: "Fazer IELTS/TOEFL e ter o resultado em mãos",
    nota: "O resultado do IELTS sai em ~3–13 dias e o do TOEFL em ~4–8 dias. Precisa estar pronto para Turim (fim de jan) e Bologna (intake 1, até 12/fev)." },
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
  { id: "unito-fecha", fim: "2027-01-29", cat: "turim", status: "estimado", prazo: true,
    titulo: "Turim: fecha a candidatura para não-UE (e a bolsa Talents4UNITO)",
    nota: "2026/27: 29/01/2026 para os dois. Taxa €60 (única, vale para vários cursos). Requisito extra de Turim: nota final ≥ 9/10 do máximo OU graduação num departamento no top 12,5% do RePEc." },
  { id: "gre-prova", inicio: "2027-01-05", fim: "2027-01-31", cat: "provas", status: "estimado",
    titulo: "Fazer o GRE (1ª tentativa)",
    nota: "Em janeiro dá tempo de citar a nota no formulário de Bologna (intake 1) e ainda de refazer antes do prazo da bolsa (abr/mai). Envie a nota oficial pela ETS com o código 7850 (Unibo)." },

  // ---- fevereiro 2027
  { id: "cf-r2-abre", inicio: "2027-02-04", fim: "2027-02-04", cat: "veneza", status: "estimado",
    titulo: "Ca' Foscari: abre a 2ª rodada", nota: "2026/27: 04/02 – 04/03/2026." },
  { id: "bo-i1-fecha", fim: "2027-02-12", cat: "bologna", status: "estimado", prazo: true,
    titulo: "Bologna: fecha o intake 1 (13h, horário italiano)",
    nota: "Avaliação: mérito acadêmico (até 70) + coerência do currículo com o curso (até 30); mínimo 60/100. As 4 bolsas do departamento (€4.608 cada) vão para os primeiros colocados dos intakes 1 e 2 com nota ≥ 65." },
  { id: "maeci-edital", inicio: "2027-02-15", fim: "2027-02-15", cat: "bolsas", status: "estimado",
    titulo: "MAECI: publicação provável do edital (portal Study in Italy)",
    nota: "Ler o edital no dia: confirmar se pede carta de recomendação, se o italiano conta ponto e se a graduação precisa estar concluída na inscrição.",
    links: [["Study in Italy", "https://studyinitaly.esteri.it/"]] },

  // ---- março 2027
  { id: "cf-r2-fecha", fim: "2027-03-04", cat: "veneza", status: "estimado", prazo: true,
    titulo: "Ca' Foscari: fecha a 2ª rodada (última que vale para Honours e Invest Your Talent)" },
  { id: "bo-i2-abre", inicio: "2027-03-13", fim: "2027-03-13", cat: "bologna", status: "estimado",
    titulo: "Bologna: abre o intake 2", nota: "2026/27: 13/03 – 13/04/2026, resultado a partir de 04/06." },
  { id: "carta-maeci", inicio: "2027-02-15", fim: "2027-03-15", cat: "docs", status: "estimado",
    titulo: "Carta de motivação — MAECI", nota: "Explicar por que a Itália, por que o curso e o plano de carreira. Adaptar das cartas das universidades." },
  { id: "bo-i1-resultado", fim: "2027-03-23", cat: "bologna", status: "estimado",
    titulo: "Bologna: resultado do intake 1" },
  { id: "maeci-prazo", fim: "2027-03-26", cat: "bolsas", status: "estimado", prazo: true,
    titulo: "MAECI: prazo da bolsa",
    nota: "2026/27: 26/03/2026, 14h (Itália). Limite de idade: 28 anos para mestrado. Bolsa de 9 meses (€900/mês em 2026/27) + isenção de taxas." },
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
    titulo: "Saem os editais regionais (ER.GO, EDISU Piemonte, ESU Venezia)",
    nota: "EDISU publicou em 21/07/2026. Os de 2026/27 saíram todos em julho." },
  { id: "visto", inicio: "2027-07-01", fim: "2027-08-31", cat: "visto", status: "estimado",
    titulo: "Pedir o visto de estudo no consulado italiano" },
  { id: "dsu-prazo", fim: "2027-08-24", cat: "bolsas", status: "estimado", prazo: true,
    titulo: "Bolsa regional: prazo provável (ER.GO / ESU / EDISU)",
    nota: "2026/27: ER.GO 24/08; Veneto entre 20 e 30/08; moradia ESU Venezia 20/08. Confirmar a data exata da região escolhida assim que o edital sair." },
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
    id: "turim", nome: "Università di Torino", curso: "Economics (LM, em inglês)",
    qs: "abaixo da USP no QS geral",
    link: "https://apply.unito.it/en_GB/courses/course/282-economics",
    janelas: [
      ["Janela única não-UE residentes no exterior", "~25/nov/2026 – 29/jan/2027", "2026/27: 25/11/2025–29/01/2026"],
    ],
    exige: [
      "Graduação de 3+ anos; ≥ 1/10 dos créditos em economia e ≥ 1/10 em matemática/estatística",
      "Nota final ≥ 9/10 do máximo OU departamento no top 12,5% do RePEc — conferir como sua nota converte",
      "Inglês B2 na candidatura (IELTS 5.5, TOEFL 69, FCE 173, PTE 65)",
      "Carta de motivação obrigatória",
      "Taxa €60 (única); anuidade até €2.800 (há redução por renda)",
      "50 vagas para não-UE residentes no exterior",
    ],
    bolsas: "Talents4UNITO (mesmo prazo da candidatura, fim de janeiro), EDISU Piemonte, MAECI.",
  },
];

// ---------------------------------------------------------------------------
// Bolsas
// ---------------------------------------------------------------------------
const BOLSAS = [
  {
    id: "maeci", grupo: "principais", nome: "MAECI — bolsa do governo italiano (portal Study in Italy)",
    valor: "€900/mês por 9 meses (2026/27) + isenção de taxas; renovável no 2º ano",
    prazo: "fim de março (26/03/2026 no último ciclo)",
    quem: "Estrangeiros até 28 anos (mestrado). Curso em inglês: inglês B2. Italiano B2 é exigido para curso em italiano.",
    atencao: "Confirmar no edital 2027/28: carta de recomendação, se o italiano pontua, e se a graduação já precisa estar concluída (a página da Ca' Foscari diz que sim). Não acumula com International Talents @Unibo.",
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
    id: "dsu", grupo: "principais", nome: "Bolsa regional por renda (DSU): ER.GO (Bologna), EDISU Piemonte (Turim), ESU Venezia",
    valor: "ER.GO 2026/27: até €7.171/ano para quem mora fora (integral se ISEE ≤ 2/3 do teto, depois diminui) + isenção de anuidade",
    prazo: "edital em julho; prazo no fim de agosto (ER.GO 24/08/2026)",
    quem: "Por renda (ISEE parificato). Tetos ER.GO 2026/27: ISEE ≤ €25.000 E ISPE ≤ €50.000. Teto nacional (outras regiões podem usar até ele): ISEE ≤ €28.339,88 e ISPE ≤ €61.608,48.",
    atencao: "O trabalho pesado são os documentos brasileiros de renda e patrimônio, traduzidos e legalizados. Comece em março.",
    link: "https://www.er-go.it/",
    extras: [["EDISU Piemonte", "https://www.edisu.piemonte.it/"], ["ESU Venezia", "https://www.esuvenezia.it/"]],
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
    id: "t4u", grupo: "outras", nome: "Talents4UNITO (Turim)",
    valor: "Bolsa por mérito para mestrado em inglês de acesso livre (40 em 2026/27)",
    prazo: "29/01/2026 no último ciclo — junto com a candidatura",
    quem: "Não-UE não residentes na Itália.", atencao: "Pedida dentro do apply.unito.it.",
    link: "https://www.unito.it/",
  },
  {
    id: "bo-dept", grupo: "outras", nome: "Bolsas do Departamento de Economia (Bologna, AEM)",
    valor: "4 × €4.608 (1 ano)", prazo: "automático pelo ranking dos intakes 1 e 2",
    quem: "Admitidos com nota ≥ 65/100.", atencao: "Mais um motivo para entrar no intake 1.", link: "https://corsi.unibo.it/2cycle/AppliedEconomicsMarkets",
  },
  {
    id: "em-qem", grupo: "outras", nome: "Erasmus Mundus QEM (consórcio do qual a Ca' Foscari faz parte)",
    valor: "Bolsa Erasmus Mundus de €1.400/mês + custos do programa",
    prazo: "historicamente no 1º semestre; conferir o ciclo 2027–29",
    quem: "Seleção internacional muito competitiva.",
    atencao: "A página do consórcio lista o financiamento atual até a edição 2027-2028 — confirmar se a turma de 2027 ainda tem bolsas.",
    link: "https://master-economics-qem.pantheonsorbonne.fr/",
  },
];

// ---------------------------------------------------------------------------
// Documentos que você produz (cada um vira um item de checklist)
// ---------------------------------------------------------------------------
const DOCUMENTOS = [
  { id: "d-carta-cf", doc: "Carta de motivação", para: "Ca' Foscari (QEM)", obrig: "obrigatória", ate: "2026-12-15" },
  { id: "d-carta-unito", doc: "Carta de motivação", para: "Turim", obrig: "obrigatória", ate: "2026-12-20" },
  { id: "d-carta-bo", doc: "Carta de motivação", para: "Bologna", obrig: "não pedida em 2026/27 — confirmar", ate: "2027-01-31" },
  { id: "d-carta-maeci", doc: "Carta de motivação", para: "MAECI", obrig: "obrigatória (confirmar formato)", ate: "2027-03-15" },
  { id: "d-rec-maeci", doc: "Carta de recomendação", para: "MAECI", obrig: "pode ser do trabalho", ate: "2027-03-15" },
  { id: "d-rec-cf", doc: "Carta(s) de recomendação (1–2) de PROFESSOR", para: "Ca' Foscari — bolsa Honours", obrig: "pontua; só professor", ate: "2027-03-25" },
  { id: "d-rec-bo", doc: "Carta(s) de recomendação (1–2)", para: "Bologna", obrig: "opcional, não pontua; de preferência professor", ate: "2027-02-12" },
  { id: "d-rec-china", doc: "2 cartas de recomendação de PROFESSOR (titular ou associado)", para: "China (CSC, PKU, Fudan, Yenching)", obrig: "obrigatória se for para a China", ate: "2026-11-30" },
  { id: "d-video-cf", doc: "Vídeo motivacional", para: "Ca' Foscari — bolsa Honours", obrig: "pontua", ate: "2027-03-25" },
  { id: "d-cv", doc: "CV Europass em inglês", para: "todas", obrig: "obrigatório", ate: "2026-11-30" },
  { id: "d-trad", doc: "Histórico e diploma em inglês/italiano", para: "todas", obrig: "obrigatório", ate: "2026-12-10" },
  { id: "d-passaporte", doc: "Passaporte válido", para: "todas + visto", obrig: "obrigatório", ate: "2026-12-10" },
  { id: "d-ingles", doc: "Certificado de inglês B2+", para: "Bologna e Turim (candidatura), Ca' Foscari (matrícula)", obrig: "obrigatório", ate: "2027-01-10" },
  { id: "d-gre", doc: "GRE General (V+Q ≥ 290, AW ≥ 3.0)", para: "International Talents @Unibo", obrig: "obrigatório para a bolsa", ate: "2027-03-31" },
  { id: "d-italiano", doc: "Certificado de italiano B1/B2 (CILS, CELI ou PLIDA)", para: "MAECI (diferencial a confirmar) e vida na Itália", obrig: "desejável", ate: "2027-03-26" },
  { id: "d-isee", doc: "Documentos de renda/patrimônio da família, traduzidos e legalizados", para: "International Talents (GRE) e depois ER.GO/EDISU/ESU", obrig: "obrigatório para a bolsa do GRE", ate: "2027-04-15" },
];

// ---------------------------------------------------------------------------
// Outras universidades — comparadas com a USP (133ª no QS 2027)
// ---------------------------------------------------------------------------
const OUTRAS = [
  { regiao: "Europa", nome: "Universität Wien (Viena)", qs: "140ª (QS 2027) — logo abaixo da USP no geral",
    curso: "MSc Economics / MSc Applied Economics (com processo de admissão)",
    custo: "~€727/semestre para não-UE (valor 2026, confirmar)",
    bolsa: "Poucas bolsas para mestrado completo; o atrativo é o custo baixo. Prazos não-UE costumam fechar bem antes dos da UE.",
    veredito: "Não é melhor que a USP no ranking geral. Faz sentido só pelo custo e pela cidade.",
    link: "https://studieren.univie.ac.at/en/applying-for-a-programme/deadlines" },
  { regiao: "Europa", nome: "WU Wien (Viena)", qs: "fora do ranking geral (é escola só de negócios/economia)",
    curso: "Master Economics (Science Track é o mais quantitativo)", custo: "taxas baixas de universidade pública austríaca",
    bolsa: "Bolsas de mérito pontuais; confirmar.", veredito: "Boa em economia; compare pelo ranking por área, não pelo geral.",
    link: "https://www.wu.ac.at/en/programs/masters-programs/economics" },
  { regiao: "Europa", nome: "Erasmus Mundus QEM (Paris 1, Bielefeld, Ca' Foscari, UAB Barcelona, Louvain, Varsóvia)",
    qs: "mistura de universidades; o diploma é conjunto", curso: "Models and Methods of Quantitative Economics",
    custo: "coberto pela bolsa, se ganhar", bolsa: "€1.400/mês (bolsa Erasmus Mundus)",
    veredito: "A melhor bolsa de economia quantitativa na Europa; casa com o seu interesse no QEM de Veneza.",
    link: "https://master-economics-qem.pantheonsorbonne.fr/" },
  { regiao: "Europa", nome: "Alemanha: LMU München, Bonn, Mannheim", qs: "LMU bem acima da USP; Bonn e Mannheim são fortes em economia",
    curso: "MSc Economics (em inglês)", custo: "sem anuidade na maioria (Mannheim cobra de não-UE)",
    bolsa: "Sem bolsa no plano. Vale pela anuidade zero; prazos de inverno costumam ir de janeiro a maio — confirmar em cada universidade.",
    veredito: "Opção sem bolsa, mas barata. Não exige cartas na maioria dos casos (confirmar).", link: "https://www.bgse.uni-bonn.de/" },
  { regiao: "China", nome: "Peking (PKU), Fudan, Tsinghua e SJTU", qs: "Tsinghua e PKU no top 20; Fudan no top 40; SJTU no top 50 — muito acima da USP",
    curso: "Em inglês e de economia mesmo: PKU HSBC Business School (Master's in Economics, em Shenzhen, 2 anos, quantitativo) e Fudan (EMA: International Business com foco em economia chinesa, ou Finance; 3 anos). Tsinghua e SJTU não têm mestrado de economia em inglês (Tsinghua: políticas públicas em inglês; SJTU: MIB e Master of Finance).",
    custo: "PHBS: 64 mil RMB/ano, sem taxa de inscrição. Fudan EMA: 327 mil RMB no total (3 anos). Tsinghua/PKU: taxa de 800 RMB. Tudo coberto pela CSC, se ganhar.",
    bolsa: "CSC (governo chinês) cobre anuidade, moradia, seguro e 3.000 RMB/mês no mestrado. Tipo A: pela Embaixada da China no Brasil (código 0761), prazo no início de fevereiro (5/2/2026 no último ciclo), entrevista em fevereiro, resultado em julho; exige carta de pré-admissão da universidade ANTES. Tipo B: direto na universidade, só uma escola (PKU 10001, Tsinghua 10003, Fudan 10246, SJTU 10248), prazos em dezembro. Há também bolsas de Pequim/Xangai, das universidades e da PHBS. Yenching Academy (PKU, integral, trilha de economia): prazo ~30/11/2026.",
    veredito: "Melhor custo-benefício fora da Europa, e a CSC aceita quem ainda vai se formar. Prazos de novembro e dezembro: decidir já.",
    link: "https://english.phbs.pku.edu.cn/Academics/Master/How_to_apply.htm" },
  { regiao: "Coreia", nome: "Seoul National University, KAIST, Yonsei", qs: "SNU no top 40", curso: "Mestrado em inglês",
    custo: "coberto pela GKS", bolsa: "Global Korea Scholarship (GKS) pós-graduação: candidatura pela embaixada no início do ano; inclui 1 ano de coreano antes do mestrado. Prazo da embaixada costuma ser em fevereiro/março; pede 1 carta de recomendação de quem avalie sua capacidade acadêmica.",
    veredito: "Bolsa integral e o Brasil é elegível; atrasa o início em um ano por causa do coreano.", link: "https://www.studyinkorea.go.kr/" },
  { regiao: "Singapura / Hong Kong", nome: "NUS, HKU, HKUST", qs: "top 20–50", curso: "MSc Economics / Applied Economics",
    custo: "alto (dezenas de milhares de dólares)", bolsa: "Raras para mestrado; os governos financiam sobretudo doutorado.",
    veredito: "Muito melhores no ranking, mas sem bolsa realista para mestrado.", link: "https://www.nus.edu.sg/" },
];


// ---------------------------------------------------------------------------
// Cartas de recomendação: quem pode escrever e até quando pedir (~4–6 semanas antes)
// professor: "obrigatório" | "preferível" | "não precisa"
// ---------------------------------------------------------------------------
const CARTAS = [
  { id: "c-yenching", destino: "Yenching Academy (PKU)", qtd: "2", deQuem: "Professor titular ou associado da área", professor: "obrigatório", obrig: "obrigatória", prazo: "2026-11-30", pedir: "2026-11-06" },
  { id: "c-csc", destino: "Bolsa do governo chinês (CSC), tipo A ou B", qtd: "2", deQuem: "Professor titular ou associado", professor: "obrigatório", obrig: "obrigatória", prazo: "2026-12-10", pedir: "2026-11-10", nota: "Tipo B na Fudan ~10/12; tipo A pela embaixada ~5/2" },
  { id: "c-pku", destino: "PKU HSBC (Master's in Economics)", qtd: "2", deQuem: "Dois \"referees\" (o edital não exige professor)", professor: "preferível", obrig: "obrigatória", prazo: "2026-12-31", pedir: "2026-11-20", nota: "Enviadas pelo sistema; rodadas 30/11, 31/12, 28/2, 31/3" },
  { id: "c-fudan", destino: "Fudan / Tsinghua (candidatura ao curso)", qtd: "2", deQuem: "Professor associado ou acima (Tsinghua aceita profissional sênior da área)", professor: "obrigatório", obrig: "obrigatória", prazo: "2026-12-10", pedir: "2026-11-10" },
  { id: "c-bologna", destino: "Bologna — Applied Economics and Markets", qtd: "1–2", deQuem: "\"If possible\" professores; o professor recebe um link e envia direto", professor: "preferível", obrig: "opcional, não pontua", prazo: "2027-02-12", pedir: "2027-01-05" },
  { id: "c-cf", destino: "Ca' Foscari — bolsa Honours", qtd: "1–2", deQuem: "Só professores que conheçam você e seu trabalho (empregador não vale)", professor: "obrigatório", obrig: "pontua na bolsa", prazo: "2027-03-31", pedir: "2027-02-15" },
  { id: "c-maeci", destino: "MAECI", qtd: "1", deQuem: "Pode ser do trabalho", professor: "não precisa", obrig: "confirmar no edital", prazo: "2027-03-26", pedir: "2027-02-10" },
  { id: "c-qem", destino: "Erasmus Mundus QEM", qtd: "2", deQuem: "O consórcio não especifica; o comum é ao menos uma de professor", professor: "preferível", obrig: "obrigatória", prazo: "2027-02-28", pedir: "2027-01-15", nota: "prazo a confirmar" },
  { id: "c-gks", destino: "Coreia — GKS", qtd: "1", deQuem: "Alguém que avalie sua capacidade acadêmica (na prática, professor)", professor: "preferível", obrig: "obrigatória", prazo: "2027-02-25", pedir: "2027-01-15", nota: "prazo da embaixada a confirmar" },
];
const SEM_CARTAS = "Não pedem carta: Turim (Economics), admissão da Ca' Foscari (só carta de motivação), bolsa do GRE de Bologna (International Talents), Invest Your Talent (vídeo de 1 min + CV) e bolsas regionais. Talents4UNITO: não consegui ler o edital — confirmar.";

// ---------------------------------------------------------------------------
// Janelas que aparecem como barras na linha do tempo do painel
// ---------------------------------------------------------------------------
const JANELAS = [
  { cat: "turim", nome: "Turim: candidatura + Talents4UNITO", de: "2026-11-25", ate: "2027-01-29" },
  { cat: "veneza", nome: "Ca' Foscari: rodada 1", de: "2026-12-17", ate: "2027-01-14" },
  { cat: "veneza", nome: "Rodada 2", de: "2027-02-04", ate: "2027-03-04" },
  { cat: "veneza", nome: "Bolsa Honours", de: "2027-03-04", ate: "2027-03-31" },
  { cat: "bologna", nome: "Bologna: intake 1", de: "2027-01-13", ate: "2027-02-12" },
  { cat: "bologna", nome: "Intake 2", de: "2027-03-13", ate: "2027-04-13" },
  { cat: "bolsas", nome: "Bolsa do GRE (Unibo)", de: "2027-01-15", ate: "2027-04-30" },
  { cat: "bolsas", nome: "MAECI", de: "2027-02-15", ate: "2027-03-26" },
  { cat: "bolsas", nome: "Invest Your Talent", de: "2027-03-26", ate: "2027-05-11" },
  { cat: "bolsas", nome: "Bolsa regional", de: "2027-07-10", ate: "2027-08-24" },
  { cat: "provas", nome: "IELTS/TOEFL", de: "2026-11-15", ate: "2027-01-10" },
  { cat: "provas", nome: "GRE (1ª tentativa)", de: "2027-01-05", ate: "2027-01-31" },
  { cat: "provas", nome: "Italiano (CILS/CELI/PLIDA), se der", de: "2027-02-01", ate: "2027-05-31" },
  { cat: "docs", nome: "Cartas, CV e traduções", de: "2026-11-03", ate: "2026-12-20" },
  { cat: "docs", nome: "Documentos de renda (ISEE)", de: "2027-02-15", ate: "2027-04-15" },
  { cat: "docs", nome: "Declaração de valor / CIMEA", de: "2027-04-01", ate: "2027-06-30" },
  { cat: "visto", nome: "Universitaly (pré-matrícula)", de: "2027-04-01", ate: "2027-07-15" },
  { cat: "visto", nome: "Visto", de: "2027-07-01", ate: "2027-08-31" },
];
