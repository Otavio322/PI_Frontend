

const navItems = document.querySelectorAll('.nav-item[data-page]');
const pages    = document.querySelectorAll('.page');

navItems.forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    const target = item.dataset.page;
    navItems.forEach(n => n.classList.remove('active'));
    pages.forEach(p => p.classList.remove('active'));
    item.classList.add('active');
    document.getElementById('page-' + target)?.classList.add('active');
  });
});

function showToast(msg, duration = 3000) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), duration);
}

function openModal(id)  { document.getElementById(id).classList.add('open');    }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

document.querySelectorAll('.modal-overlay').forEach(ov => {
  ov.addEventListener('click', e => { if (e.target === ov) ov.classList.remove('open'); });
});

function renderDashboard() {
  
  document.getElementById('stat-cursos').textContent  = MOCK.stats.cursos;
  document.getElementById('stat-coord').textContent   = MOCK.stats.coordenadores;
  document.getElementById('stat-solic').textContent   = MOCK.stats.solicitacoes.toLocaleString('pt-BR');
  document.getElementById('stat-taxa').textContent    = MOCK.stats.taxaAprovacao;

  
  const maxVal = Math.max(...MOCK.dashboard.barras.map(b => b.valor));
  const chart  = document.getElementById('dashChart');
  chart.innerHTML = '';

  MOCK.dashboard.barras.forEach(b => {
    const pct = (b.valor / maxVal) * 100;
    const group = document.createElement('div');
    group.className = 'bar-group';
    group.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;flex:1;width:100%;justify-content:flex-end;min-height:160px;">
        <span style="font-size:.72rem;font-weight:700;color:var(--text-muted);margin-bottom:4px;">${b.valor}</span>
        <div class="bar ${b.highlight ? 'highlight' : ''}" style="height:${pct}%;min-height:12px;"></div>
      </div>
      <span class="bar-lbl" style="margin-top:6px;">${b.label}</span>
    `;
    chart.appendChild(group);
  });

  
  const ab = document.getElementById('alertsBody');
  ab.innerHTML = '';
  MOCK.dashboard.alertas.forEach(a => {
    const cls = a.status === 'Crítico' ? 'badge-red' : a.status === 'Atenção' ? 'badge-orange' : 'badge-green';
    ab.innerHTML += `
      <tr>
        <td>${a.curso}</td>
        <td>${a.tempo}</td>
        <td><span class="badge ${cls}">${a.status}</span></td>
      </tr>`;
  });
}

let cursosData = [...MOCK.cursos];
let editingCursoId = null;

function renderCursos() {
  const tb = document.getElementById('cursosBody');
  tb.innerHTML = '';
  cursosData.forEach((c, i) => {
    tb.innerHTML += `
      <tr>
        <td><strong>#${String(c.id).padStart(2,'0')}</strong></td>
        <td>${c.nome}</td>
        <td>${c.modalidade}</td>
        <td>${c.coordenador}</td>
        <td>${c.horas}h</td>
        <td>${c.alunos}</td>
        <td>
          <button class="icon-btn edit" onclick="editCurso(${c.id})" title="Editar / Configurar Regras">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button class="icon-btn del" onclick="deleteCurso(${c.id})" title="Excluir">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
          </button>
        </td>
      </tr>`;
  });
  populateCursosSelect();
}

function editCurso(id) {
  const curso = cursosData.find(c => c.id === id);
  if (!curso) return;
  editingCursoId = id;

  
  const sel = document.getElementById('ef-nomeCurso');
  
  let opt = [...sel.options].find(o => o.value == curso.nome);
  if (!opt) {
    opt = new Option(curso.nome, curso.nome);
    sel.add(opt);
  }
  sel.value = curso.nome;
  document.getElementById('ef-hTotal').value = '';
  document.getElementById('ef-hReq').value   = '';
  document.getElementById('ef-modalidade').value = curso.modalidade;
  openModal('modalEntidade');
}

function deleteCurso(id) {
  const c = cursosData.find(x => x.id === id);
  document.getElementById('confirmMsg').textContent = `Remover o curso "${c?.nome}"?`;
  document.getElementById('confirmBtn').onclick = () => {
    cursosData = cursosData.filter(x => x.id !== id);
    renderCursos();
    closeModal('modalConfirm');
    showToast('Curso removido com sucesso.');
    
  };
  openModal('modalConfirm');
}

document.getElementById('btnAddCurso').addEventListener('click', () => {
  editingCursoId = null;
  document.getElementById('ef-nomeCurso').value = '';
  document.getElementById('ef-hTotal').value = '';
  document.getElementById('ef-hReq').value   = '';
  openModal('modalEntidade');
});

function salvarEntidade() {
  const nome = document.getElementById('ef-nomeCurso').value.trim();
  const hTotal = document.getElementById('ef-hTotal').value;
  const modalidade = document.getElementById('ef-modalidade').value;

  if (!nome) { showToast('Selecione o nome do curso.'); return; }

  if (editingCursoId) {
    
    const idx = cursosData.findIndex(c => c.id === editingCursoId);
    if (idx > -1) {
      cursosData[idx].nome = nome;
      cursosData[idx].modalidade = modalidade;
    }
    showToast('Curso atualizado com sucesso!');
    
  } else {
    
    const newId = Math.max(...cursosData.map(c => c.id)) + 1;
    cursosData.push({ id: newId, nome, modalidade, coordenador: '—', horas: parseInt(hTotal) || 0, alunos: 0 });
    showToast('Curso criado com sucesso!');
    
  }
  renderCursos();
  closeModal('modalEntidade');
}

function limparEntidade() {
  document.getElementById('ef-nomeCurso').value = '';
  document.getElementById('ef-hTotal').value = '';
  document.getElementById('ef-hReq').value   = '';
}

let coordData = [...MOCK.coordenadores];
let editingCoordId = null;

function renderCoordenadores() {
  const tb = document.getElementById('coordBody');
  tb.innerHTML = '';
  coordData.forEach(c => {
    const statusCls = c.status === 'Ativo' ? 'badge-green' : c.status === 'Licença' ? 'badge-orange' : 'badge-red';
    tb.innerHTML += `
      <tr>
        <td>${c.nome}</td>
        <td>${c.curso}</td>
        <td>${c.email}</td>
        <td>${c.ra}</td>
        <td><span class="pwd-dots">••••••</span></td>
        <td><span class="badge ${statusCls}">${c.status}</span></td>
        <td>
          <button class="icon-btn edit" onclick="editCoord(${c.id})" title="Editar">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button class="icon-btn del" onclick="deleteCoord(${c.id})" title="Excluir">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
          </button>
        </td>
      </tr>`;
  });
}

function editCoord(id) {
  const c = coordData.find(x => x.id === id);
  if (!c) return;
  editingCoordId = id;
  document.getElementById('modalCoordTitle').textContent = 'Editar Coordenador';
  document.getElementById('coordId').value     = id;
  document.getElementById('coordNome').value   = c.nome;
  document.getElementById('coordEmail').value  = c.email;
  document.getElementById('coordRA').value     = c.ra;
  document.getElementById('coordSenha').value  = '';
  document.getElementById('coordStatus').value = c.status;
  
  const sel = document.getElementById('coordCurso');
  [...sel.options].forEach(o => { if (o.value === c.curso) sel.value = c.curso; });
  openModal('modalCoord');
}

function deleteCoord(id) {
  const c = coordData.find(x => x.id === id);
  document.getElementById('confirmMsg').textContent = `Remover o coordenador "${c?.nome}"?`;
  document.getElementById('confirmBtn').onclick = () => {
    coordData = coordData.filter(x => x.id !== id);
    renderCoordenadores();
    closeModal('modalConfirm');
    showToast('Coordenador removido com sucesso.');
    
  };
  openModal('modalConfirm');
}

document.getElementById('btnAddCoord').addEventListener('click', () => {
  editingCoordId = null;
  document.getElementById('modalCoordTitle').textContent = 'Adicionar Coordenador';
  ['coordId','coordNome','coordEmail','coordRA','coordSenha'].forEach(id => {
    document.getElementById(id).value = '';
  });
  document.getElementById('coordStatus').value = 'Ativo';
  openModal('modalCoord');
});

function salvarCoord() {
  const nome   = document.getElementById('coordNome').value.trim();
  const email  = document.getElementById('coordEmail').value.trim();
  const ra     = document.getElementById('coordRA').value.trim();
  const curso  = document.getElementById('coordCurso').value;
  const status = document.getElementById('coordStatus').value;

  if (!nome || !email) { showToast('Preencha nome e e-mail.'); return; }

  if (editingCoordId) {
    const idx = coordData.findIndex(c => c.id === editingCoordId);
    if (idx > -1) Object.assign(coordData[idx], { nome, email, ra, curso, status });
    showToast('Coordenador atualizado!');
    
  } else {
    const newId = Math.max(...coordData.map(c => c.id)) + 1;
    coordData.push({ id: newId, nome, email, ra, curso, status });
    showToast('Coordenador adicionado!');
    
  }
  renderCoordenadores();
  closeModal('modalCoord');
}

let logsData = [...MOCK.logs];

function renderLogs(data) {
  const tb = document.getElementById('logsBody');
  tb.innerHTML = '';
  data.forEach(l => {
    const cls = l.nivel === 'Crítico' ? 'badge-red' : l.nivel === 'Aviso' ? 'badge-orange' : 'badge-blue';
    tb.innerHTML += `
      <tr>
        <td>${l.datetime}</td>
        <td>${l.responsavel}</td>
        <td><strong>${l.evento}</strong></td>
        <td>${l.descricao}</td>
        <td><code style="font-size:.8rem;">${l.ip}</code></td>
        <td><span class="badge ${cls}">${l.nivel}</span></td>
      </tr>`;
  });
}

function filtrarLogs() {
  const evt   = document.getElementById('filterEvento').value.toLowerCase();
  const coord = document.getElementById('filterCoord').value.toLowerCase();
  const data  = document.getElementById('filterData').value;

  let filtered = logsData.filter(l => {
    const matchEvt   = !evt   || l.evento.toLowerCase().includes(evt);
    const matchCoord = !coord || l.responsavel.toLowerCase().includes(coord);
    
    const matchData  = !data  || l.datetime.startsWith(
      data.split('-').reverse().join('/')
    );
    return matchEvt && matchCoord && matchData;
  });
  renderLogs(filtered);
  showToast(`${filtered.length} registro(s) encontrado(s).`);
  
}

function exportarLog() {
  showToast('Exportação iniciada – funcionalidade conectará à API em breve.');
  
}

function populateCursosSelect() {
  const selects = ['coordCurso', 'ef-nomeCurso'];
  selects.forEach(sid => {
    const sel = document.getElementById(sid);
    if (!sel) return;
    const current = sel.value;
    sel.innerHTML = '<option value="">Selecione...</option>';
    cursosData.forEach(c => {
      const opt = new Option(c.nome, c.nome);
      sel.add(opt);
    });
    if (current) sel.value = current;
  });
}

function removeTag(btn) { btn.parentElement.remove(); }
function addPeriod() {
  const inp = document.getElementById('newPeriod');
  const val = inp.value.trim();
  if (!val) return;
  const span = document.createElement('span');
  span.className = 'tag';
  span.innerHTML = `${val} <button class="tag-rm" onclick="removeTag(this)">×</button>`;
  document.getElementById('periodTags').appendChild(span);
  inp.value = '';
}

function addPermRow() {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td style="padding:8px;"><input class="form-control" placeholder="Nome do coordenador" style="height:32px;font-size:.8rem;" /></td>
    <td style="padding:8px;">
      <select class="form-control" style="height:32px;font-size:.8rem;">
        <option>Full – Aprovar, Rejeitar com Feedback</option>
        <option>Restricted – Aprovar apenas em sua categoria</option>
        <option>Read-only – Apenas visualizar</option>
      </select>
    </td>`;
  document.getElementById('permBody').appendChild(tr);
}

document.addEventListener('DOMContentLoaded', () => {
  renderDashboard();
  renderCursos();
  renderCoordenadores();
  renderLogs(logsData);
});
