

let ALUNOS = [
  { ra:'004005006', nome:'Gabriel Rosario',  email:'gabriel.ad004005006@edu.pe.senac.br', turma:'Turma ADS021', turno:'Manhã',  periodo:1, senha:'gabriel123' },
  { ra:'002003004', nome:'Fernando Alves',   email:'fernando.av002003004@edu.pe.senac.br', turma:'Turma ADS031', turno:'Tarde',  periodo:2, senha:'fernando123' },
  { ra:'112113114', nome:'Matheus Silva',    email:'matheus.sv112113114@edu.pe.senac.br',  turma:'Turma ADS018', turno:'Noite', periodo:1, senha:'matheus123' },
  { ra:'115116117', nome:'Sabrina Beatriz',  email:'sabrina.pk115116117@edu.pe.senac.br',  turma:'Turma ADS048', turno:'Manhã', periodo:3, senha:'sabrina123' },
  { ra:'135689376', nome:'Guilherme Briggs', email:'guilherme.br135689376@edu.pe.senac.br',turma:'Turma ADS012', turno:'Manhã', periodo:3, senha:'guilherme123'},
  { ra:'765893211', nome:'Ada Wong',         email:'ada.wong765893211@edu.pe.senac.br',    turma:'Turma ADS098', turno:'Noite', periodo:4, senha:'ada123' },
  { ra:'889912343', nome:'Lucas Pinto',      email:'lucas.pi889912343@edu.pe.senac.br',    turma:'Turma ADS012', turno:'Tarde', periodo:3, senha:'lucas123' },
  { ra:'564328912', nome:'Leon S Kennedy',   email:'leon.kd564328912@edu.pe.senac.br',     turma:'Turma ADS098', turno:'Noite', periodo:4, senha:'leon123' },
];

let CATEGORIAS = [
  { nome:'Cursos',                  desc:'Plataformas online e cursos presenciais',  limite:60,  doc:'Sim', status:'Ativa' },
  { nome:'Atividades Acadêmicas',   desc:'Participação em eventos e workshops',       limite:40,  doc:'Sim', status:'Ativa' },
  { nome:'Experiência Profissional',desc:'Estágios e atividades profissionais',       limite:80,  doc:'Sim', status:'Ativa' },
  { nome:'Eventos',                 desc:'Congressos, seminários e palestras',        limite:30,  doc:'Sim', status:'Ativa' },
  { nome:'Projetos de Extensão',    desc:'Projetos oficiais da instituição',          limite:100, doc:'Sim', status:'Ativa' },
];

const CERT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="440" viewBox="0 0 640 440">
  <defs>
    <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0d2b5e"/>
      <stop offset="100%" style="stop-color:#1e4fa3"/>
    </linearGradient>
  </defs>
  <rect width="640" height="440" fill="url(#g1)" rx="8"/>
  <rect x="20" y="20" width="600" height="400" fill="none" stroke="rgba(255,255,255,.3)" stroke-width="2" rx="6"/>
  <!-- hexagons -->
  <polygon points="60,40 100,40 120,75 100,110 60,110 40,75" fill="rgba(255,255,255,.08)"/>
  <polygon points="550,310 590,310 610,345 590,380 550,380 530,345" fill="rgba(255,255,255,.08)"/>
  <!-- title -->
  <text x="320" y="110" font-family="Georgia,serif" font-size="42" font-weight="bold" fill="white" text-anchor="middle" letter-spacing="6">CERTIFICADO</text>
  <text x="320" y="140" font-family="Georgia,serif" font-size="16" fill="rgba(255,255,255,.7)" text-anchor="middle" letter-spacing="3">DE PARTICIPAÇÃO</text>
  <line x1="160" y1="160" x2="480" y2="160" stroke="rgba(255,255,255,.3)" stroke-width="1"/>
  <text x="320" y="200" font-family="Georgia,serif" font-size="13" fill="rgba(255,255,255,.7)" text-anchor="middle">A FACULDADE DE TECNOLOGIA ROCKETSEAT</text>
  <text x="320" y="222" font-family="Georgia,serif" font-size="13" fill="rgba(255,255,255,.7)" text-anchor="middle">CONFERE O PRESENTE CERTIFICADO A:</text>
  <text x="320" y="268" font-family="Georgia,serif" font-size="32" font-weight="bold" fill="white" text-anchor="middle" letter-spacing="2">FERNANDO ALVES</text>
  <line x1="200" y1="282" x2="440" y2="282" stroke="rgba(255,165,0,.6)" stroke-width="1.5"/>
  <text x="320" y="320" font-family="Georgia,serif" font-size="12" fill="rgba(255,255,255,.75)" text-anchor="middle">Por concluir o curso de extensão "Formação em Introdução ao Python"</text>
  <text x="320" y="338" font-family="Georgia,serif" font-size="12" fill="rgba(255,255,255,.75)" text-anchor="middle">com carga horária total de 10h, na data 25/03/2026.</text>
  <!-- signature -->
  <text x="320" y="395" font-family="Georgia,serif" font-size="13" fill="rgba(255,255,255,.7)" text-anchor="middle">Juliana Cout – Diretora Geral</text>
</svg>`;

const CERT_DATA_URL = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(CERT_SVG)));

let CERTIFICADOS = [
  { ra:'765893211', nome:'Ada Wong',         email:'ada.wong765893211@edu.pe.senac.br',    data:'06/06/2026', status:'Pendente',  ocrText:'Faculdade de Tecnologia RocketSeat\nPython\nJuliana Cout\nCarga Horária: 10 horas', horasExtracted:'10 horas', assunto:'Python',    confidence:'98%', categoria:'Cursos',                  horasVal:10 },
  { ra:'002003004', nome:'Fernando Alves',   email:'fernando.av002003004@edu.pe.senac.br', data:'25/03/2026', status:'Pendente',  ocrText:'Faculdade de Tecnologia RocketSeat\nPython\nJuliana Cout\nCarga Horária: 10 horas', horasExtracted:'10 horas', assunto:'Python',    confidence:'98%', categoria:'Cursos',                  horasVal:10 },
  { ra:'112113114', nome:'Matheus Silva',    email:'matheus.sv112113114@edu.pe.senac.br',  data:'06/01/2026', status:'Pendente',  ocrText:'Centro Universitário Senac\nWorkshop de Design UX\nCarga Horária: 8 horas',        horasExtracted:'8 horas',  assunto:'Design UX', confidence:'94%', categoria:'Atividades Acadêmicas',   horasVal:8  },
  { ra:'115116117', nome:'Sabrina Beatriz',  email:'sabrina.pk115116117@edu.pe.senac.br',  data:'28/09/2026', status:'Pendente',  ocrText:'Estágio Supervisionado – Empresa Tech Recife\nCarga Horária: 40 horas',              horasExtracted:'40 horas', assunto:'Estágio',   confidence:'91%', categoria:'Experiência Profissional', horasVal:40 },
  { ra:'765893211', nome:'Ada Wong',         email:'ada.wong765893211@edu.pe.senac.br',    data:'15/01/2026', status:'Reprovado', ocrText:'Certificado ilegível – baixa qualidade de imagem',                                   horasExtracted:'—',        assunto:'—',         confidence:'12%', categoria:'—',                       horasVal:0  },
  { ra:'889912343', nome:'Lucas Pinto',      email:'lucas.pi889912343@edu.pe.senac.br',    data:'11/10/2025', status:'Aprovado',  ocrText:'Congresso de Sistemas de Informação 2025\nCarga Horária: 20 horas',                  horasExtracted:'20 horas', assunto:'Congresso', confidence:'97%', categoria:'Eventos',                 horasVal:20 },
];

let currentCertIdx = -1;
let pendingConfirmFn = null;

document.querySelectorAll('.nav-item[data-page]').forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    navigateTo(item.dataset.page);
  });
});

function navigateTo(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item[data-page]').forEach(n => n.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  document.querySelector('.nav-item[data-page="' + page + '"]')?.classList.add('active');
}

function renderDashboard() {
  
  document.getElementById('dash-alunos').textContent = ALUNOS.length;
  const pendentes = CERTIFICADOS.filter(c => c.status === 'Pendente').length;
  document.getElementById('dash-pendentes').textContent = pendentes;

  
  const tbody = document.getElementById('dashCerts');
  tbody.innerHTML = CERTIFICADOS.slice(0, 5).map(c => `
    <tr>
      <td style="font-weight:600">${c.nome}</td>
      <td>${badgeStatus(c.status)}</td>
      <td style="color:var(--text-muted);font-size:.8rem;">${c.data}</td>
    </tr>
  `).join('');

  
  const bars = [
    { label:'Cursos', val:60 },
    { label:'Atividades', val:40, highlight:true },
    { label:'Exp. Prof.', val:80 },
    { label:'Eventos', val:30 },
  ];
  const chart = document.getElementById('dashChart');
  chart.innerHTML = bars.map(b => `
    <div class="bar-group">
      <div class="bar-col${b.highlight?' highlight':''}" style="height:${b.val}%;"></div>
      <span class="bar-lbl">${b.label}</span>
    </div>
  `).join('');
}

function renderAlunos() {
  const tbody = document.getElementById('alunosBody');
  tbody.innerHTML = ALUNOS.map((a, i) => `
    <tr>
      <td>${a.ra}</td>
      <td style="font-weight:700">${a.nome}</td>
      <td style="color:var(--text-muted)">${a.email}</td>
      <td>${a.turma}</td>
      <td>${a.turno}</td>
      <td>${a.periodo}</td>
      <td><span class="pwd-dots">••••••••</span></td>
      <td>
        <button class="icon-btn edit" title="Editar" onclick="editarAluno(${i})">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </button>
        <button class="icon-btn del" title="Remover" onclick="confirmarRemocao('aluno', ${i}, '${a.nome}')">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        </button>
      </td>
    </tr>
  `).join('');
}

document.getElementById('btnAddAluno').addEventListener('click', () => {
  document.getElementById('modalAlunoTitle').textContent = 'Adicionar Aluno';
  document.getElementById('alunoIdx').value = -1;
  ['alunoRA','alunoNome','alunoEmail','alunoTurma','alunoSenha'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('alunoPeriodo').value = '';
  document.getElementById('alunoTurno').selectedIndex = 0;
  openModal('modalAluno');
});

function editarAluno(i) {
  const a = ALUNOS[i];
  document.getElementById('modalAlunoTitle').textContent = 'Editar Aluno';
  document.getElementById('alunoIdx').value = i;
  document.getElementById('alunoRA').value = a.ra;
  document.getElementById('alunoNome').value = a.nome;
  document.getElementById('alunoEmail').value = a.email;
  document.getElementById('alunoTurma').value = a.turma;
  document.getElementById('alunoTurno').value = a.turno;
  document.getElementById('alunoPeriodo').value = a.periodo;
  document.getElementById('alunoSenha').value = a.senha;
  openModal('modalAluno');
}

function salvarAluno() {
  const idx   = parseInt(document.getElementById('alunoIdx').value);
  const ra    = document.getElementById('alunoRA').value.trim();
  const nome  = document.getElementById('alunoNome').value.trim();
  const email = document.getElementById('alunoEmail').value.trim();
  const turma = document.getElementById('alunoTurma').value.trim();
  const turno = document.getElementById('alunoTurno').value;
  const periodo = parseInt(document.getElementById('alunoPeriodo').value) || 1;
  const senha = document.getElementById('alunoSenha').value;

  if (!ra || !nome || !email) { showToast('Preencha os campos obrigatórios.', 'error'); return; }

  const aluno = { ra, nome, email, turma, turno, periodo, senha: senha || '••••••••' };

  if (idx === -1) {
    ALUNOS.push(aluno);
    showToast('Aluno adicionado com sucesso!', 'success');
  } else {
    ALUNOS[idx] = aluno;
    showToast('Aluno atualizado com sucesso!', 'success');
  }
  closeModal('modalAluno');
  renderAlunos();
  renderDashboard();
}

function renderCategorias() {
  const tbody = document.getElementById('categBody');
  tbody.innerHTML = CATEGORIAS.map((c, i) => `
    <tr>
      <td style="font-weight:700">${c.nome}</td>
      <td style="color:var(--text-muted);font-size:.82rem;">${c.desc}</td>
      <td>${c.limite}h</td>
      <td>${c.doc === 'Sim'
          ? '<span class="badge badge-green">Sim</span>'
          : '<span class="badge badge-gray">Não</span>'}</td>
      <td>${c.status === 'Ativa'
          ? '<span class="badge badge-green">Ativa</span>'
          : '<span class="badge badge-orange">Inativa</span>'}</td>
      <td>
        <button class="icon-btn edit" title="Editar" onclick="editarCategoria(${i})">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </button>
        <button class="icon-btn del" title="Remover" onclick="confirmarRemocao('categoria', ${i}, '${c.nome}')">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        </button>
      </td>
    </tr>
  `).join('');
}

document.getElementById('btnAddCategoria').addEventListener('click', () => {
  document.getElementById('modalCatTitle').textContent = 'Nova Categoria';
  document.getElementById('catIdx').value = -1;
  ['catNome','catDesc','catLimite'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('catDoc').value = 'Sim';
  document.getElementById('catStatus').value = 'Ativa';
  openModal('modalCategoria');
});

function editarCategoria(i) {
  const c = CATEGORIAS[i];
  document.getElementById('modalCatTitle').textContent = 'Editar Categoria';
  document.getElementById('catIdx').value = i;
  document.getElementById('catNome').value = c.nome;
  document.getElementById('catDesc').value = c.desc;
  document.getElementById('catLimite').value = c.limite;
  document.getElementById('catDoc').value = c.doc;
  document.getElementById('catStatus').value = c.status;
  openModal('modalCategoria');
}

function salvarCategoria() {
  const idx    = parseInt(document.getElementById('catIdx').value);
  const nome   = document.getElementById('catNome').value.trim();
  const desc   = document.getElementById('catDesc').value.trim();
  const limite = parseInt(document.getElementById('catLimite').value) || 0;
  const doc    = document.getElementById('catDoc').value;
  const status = document.getElementById('catStatus').value;

  if (!nome) { showToast('Informe o nome da categoria.', 'error'); return; }

  const cat = { nome, desc, limite, doc, status };

  if (idx === -1) {
    CATEGORIAS.push(cat);
    showToast('Categoria adicionada!', 'success');
  } else {
    CATEGORIAS[idx] = cat;
    showToast('Categoria atualizada!', 'success');
  }
  closeModal('modalCategoria');
  renderCategorias();
}

function renderCerts(list) {
  list = list || CERTIFICADOS;
  const tbody = document.getElementById('certsBody');
  tbody.innerHTML = list.map((c, i) => `
    <tr>
      <td>${c.ra}</td>
      <td style="font-weight:700">${c.nome}</td>
      <td style="color:var(--text-muted);font-size:.82rem;">${c.email.substring(0,30)}...</td>
      <td>${c.data}</td>
      <td>${badgeStatus(c.status)}</td>
      <td style="text-align:center;">
        <button class="icon-btn view" title="Visualizar" onclick="abrirReview(${i})">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        </button>
      </td>
    </tr>
  `).join('');

  
  const pend = CERTIFICADOS.filter(c => c.status === 'Pendente').length;
  const aprov = CERTIFICADOS.filter(c => c.status === 'Aprovado').length;
  const reprov = CERTIFICADOS.filter(c => c.status === 'Reprovado').length;
  const total = CERTIFICADOS.length || 1;

  document.getElementById('statPendentes').textContent = pend;
  document.getElementById('statAprovados').textContent = aprov;
  document.getElementById('statReprovados').textContent = reprov;
  document.getElementById('barPendentes').style.width = (pend/total*100)+'%';
  document.getElementById('barAprovados').style.width = (aprov/total*100)+'%';
  document.getElementById('barReprovados').style.width = (reprov/total*100)+'%';
}

function filtrarCerts() {
  const status = document.getElementById('filterCertStatus').value;
  const filtered = status ? CERTIFICADOS.filter(c => c.status === status) : CERTIFICADOS;
  renderCerts(filtered);
}

function abrirReview(i) {
  currentCertIdx = i;
  const c = CERTIFICADOS[i];

  
  document.getElementById('reviewStudentInfo').innerHTML =
    `<strong>Aluno:</strong> ${c.nome}<br>
     <strong>Email:</strong> ${c.email}<br>
     <strong>Carga horária na categoria:</strong> 0/25h`;

  
  document.getElementById('reviewOcrText').innerHTML =
    c.ocrText.split('\n').map(l => `<div style="font-weight:${l.includes('Carga')||l.includes('carga')?'700':'400'}">${l}</div>`).join('') +
    `<button class="ocr-raw-edit" title="Editar">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
    </button>`;

  document.getElementById('reviewHorasExtracted').textContent = c.horasExtracted;
  document.getElementById('reviewAssunto').textContent = c.assunto;
  document.getElementById('reviewConfidence').textContent = c.confidence;
  document.getElementById('reviewConfidence').style.color =
    parseInt(c.confidence) >= 80 ? 'var(--green)' : parseInt(c.confidence) >= 50 ? 'var(--orange)' : 'var(--red)';
  document.getElementById('reviewCategoria').textContent = c.categoria;
  document.getElementById('reviewHorasValidacao').value = c.horasVal;

  
  document.getElementById('reviewCertImg').src = CERT_DATA_URL;

  
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item[data-page]').forEach(n => n.classList.remove('active'));
  document.getElementById('page-cert-review').classList.add('active');
  document.querySelector('.nav-item[data-page="certificados"]').classList.add('active');
}

function voltarCerts() {
  navigateTo('certificados');
  renderCerts();
}

function aprovarCert() {
  if (currentCertIdx < 0) return;
  const horas = parseInt(document.getElementById('reviewHorasValidacao').value) || 0;
  CERTIFICADOS[currentCertIdx].status = 'Aprovado';
  CERTIFICADOS[currentCertIdx].horasVal = horas;
  mostrarNotif('aprovada');
}

function reprovarCert() {
  if (currentCertIdx < 0) return;
  CERTIFICADOS[currentCertIdx].status = 'Reprovado';
  mostrarNotif('reprovada');
}

function mostrarNotif(tipo) {
  const overlay = document.getElementById('notifOverlay');
  const text    = document.getElementById('notifText');

  if (tipo === 'aprovada') {
    text.innerHTML = `Solicitação <span class="highlight-green">aprovada</span> e e-mail de notificação enviado para o aluno.`;
  } else {
    text.innerHTML = `Solicitação <span class="highlight-red">reprovada</span> e e-mail de notificação enviado para o aluno.`;
  }

  overlay.classList.add('open');
}

function closeNotif() {
  document.getElementById('notifOverlay').classList.remove('open');
  voltarCerts();
}

function confirmarRemocao(tipo, idx, nome) {
  document.getElementById('confirmMsg').textContent = `Tem certeza que deseja remover "${nome}"?`;
  pendingConfirmFn = () => {
    if (tipo === 'aluno') {
      ALUNOS.splice(idx, 1);
      renderAlunos();
      showToast('Aluno removido.', 'success');
    } else if (tipo === 'categoria') {
      CATEGORIAS.splice(idx, 1);
      renderCategorias();
      showToast('Categoria removida.', 'success');
    }
    closeModal('modalConfirm');
  };
  document.getElementById('confirmBtn').onclick = pendingConfirmFn;
  openModal('modalConfirm');
}

function toggleSwitch(el) {
  el.classList.toggle('on');
  const statusEl = el.parentElement.querySelector('.toggle-status');
  if (el.classList.contains('on')) {
    statusEl.textContent = 'Ativa';
    statusEl.className = 'toggle-status active';
  } else {
    statusEl.textContent = 'Inativa';
    statusEl.className = 'toggle-status inactive';
  }
}

function openModal(id)  { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal(overlay.id);
  });
});

function showToast(msg, type = '') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast show' + (type ? ' ' + type : '');
  setTimeout(() => { t.className = 'toast'; }, 3000);
}

function badgeStatus(s) {
  const map = {
    'Pendente': 'badge-blue',
    'Aprovado': 'badge-green',
    'Aceito':   'badge-green',
    'Reprovado':'badge-red',
  };
  return `<span class="badge ${map[s]||'badge-gray'}">${s}</span>`;
}

renderDashboard();
renderAlunos();
renderCategorias();
renderCerts();
