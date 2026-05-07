let editIdCurso = null;
const tableBody = document.getElementById('cursos-table-body');
const modal = document.getElementById('modal-cursos');
const form = document.getElementById('form-cursos');

let _cursos = [];

async function carregarDados() {
    const res = await fetch(API + '/cursos', { headers: authHeaders() });
    if (handleUnauthorized(res)) return;
    _cursos = await res.json();
    renderTable();
}

function renderTable() {
    tableBody.innerHTML = '';
    _cursos.forEach(curso => {
        tableBody.innerHTML += `
            <tr>
                <td>${curso.nome}</td>
                <td>${curso.tipoCurso}</td>
                <td>${curso.cargaHorariaTotal}h</td>
                <td>${curso.categoria}</td>
                <td>${curso.turno}</td>
                <td><span class="btn-edit" onclick="openModal(${curso.idCurso})">Editar</span></td>
            </tr>
        `;
    });
}

function openModal(idCurso = null) {
    editIdCurso = idCurso;
    modal.style.display = 'flex';

    if (idCurso !== null) {
        const c = _cursos.find(curso => curso.idCurso === idCurso);
        document.getElementById('m-nome').value = c.nome;
        document.getElementById('m-tipo').value = c.tipoCurso;
        document.getElementById('m-carga_horária').value = c.cargaHorariaTotal;
        document.getElementById('m-categoria').value = c.categoria;
        document.getElementById('m-turno').value = c.turno;
        if (btnExcluir) btnExcluir.style.visibility = 'visible';
    } else {
        form.reset();
        if (btnExcluir) btnExcluir.style.visibility = 'hidden';
    }
}

window.onclick = (event) => { if (event.target == modal) modal.style.display = 'none'; };

form.onsubmit = async (e) => {
    e.preventDefault();
    const body = {
        nome: document.getElementById('m-nome').value,
        tipoCurso: document.getElementById('m-tipo').value,
        cargaHorariaTotal: parseInt(document.getElementById('m-carga_horária').value) || 0,
        categoria: document.getElementById('m-categoria').value,
        turno: document.getElementById('m-turno').value
    };

    try {
        if (editIdCurso !== null) {
            await fetch(API + '/cursos/' + editIdCurso, { method: 'PUT', headers: authHeaders(), body: JSON.stringify(body) });
        } else {
            await fetch(API + '/cursos', { method: 'POST', headers: authHeaders(), body: JSON.stringify(body) });
        }
        modal.style.display = 'none';
        await carregarDados();
    } catch (err) {
        console.error('Erro ao salvar curso:', err);
    }
};

async function deleteCurso() {
    if (editIdCurso !== null && confirm('Deseja realmente excluir este curso? Todas as regras e vínculos associados a ele também serão excluídos.')) {
        try {
            await fetch(API + '/cursos/' + editIdCurso, { method: 'DELETE', headers: authHeaders() });
            modal.style.display = 'none';
            await carregarDados();
        } catch (err) {
            console.error('Erro ao excluir curso:', err);
        }
    }
}

window.openModal = openModal;
carregarDados();