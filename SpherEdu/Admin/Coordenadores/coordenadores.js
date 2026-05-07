let editIdCoordenador = null;
const tableBody = document.getElementById('coordenadores-table-body');
const modal = document.getElementById('modal-coordenadores');
const form = document.getElementById('form-coordenadores');
const cursosContainer = document.getElementById('m-cursos-container');

let _coordenadores = [];
let _cursos = [];

async function carregarDados() {
    const [coordRes, cursosRes] = await Promise.all([
        fetch(API + '/coordenadores', { headers: authHeaders() }),
        fetch(API + '/cursos', { headers: authHeaders() })
    ]);
    if (handleUnauthorized(coordRes)) return;
    _coordenadores = await coordRes.json();
    _cursos = await cursosRes.json();
    renderTable();
}

function renderCursosCheckboxes() {
    if (!cursosContainer) return;
    cursosContainer.innerHTML = '';
    _cursos.forEach(curso => {
        const label = document.createElement('label');
        label.style.display = 'block';
        label.innerHTML = `<input type="checkbox" name="curso" value="${curso.idCurso}"> ${curso.nome}`;
        cursosContainer.appendChild(label);
    });
}

function renderTable() {
    if (!tableBody) return;
    tableBody.innerHTML = '';
    _coordenadores.forEach(coord => {
        const cursoNomes = (coord.cursos || []).map(c => c.nome).join(', ') || '<span style="color:gray">Nenhum curso</span>';
        tableBody.innerHTML += `
            <tr>
                <td>${coord.telefone || ''}</td>
                <td>${coord.nome}</td>
                <td>${coord.email || ''}</td>
                <td>••••••</td>
                <td>${cursoNomes}</td>
                <td><span class="btn-edit" onclick="openModal(${coord.idCoordenador})">Editar</span></td>
            </tr>
        `;
    });
}

function openModal(idCoordenador = null) {
    editIdCoordenador = idCoordenador;
    modal.style.display = 'flex';
    renderCursosCheckboxes();

    if (idCoordenador !== null) {
        const c = _coordenadores.find(a => a.idCoordenador === idCoordenador);
        document.getElementById('m-telefone').value = c.telefone || '';
        document.getElementById('m-nome').value = c.nome;
        document.getElementById('m-email').value = c.email || '';
        document.getElementById('m-senha').value = '******';

        const idsCursos = (c.cursos || []).map(cur => cur.idCurso);
        document.querySelectorAll('input[name="curso"]').forEach(cb => {
            cb.checked = idsCursos.includes(parseInt(cb.value));
        });
    } else {
        form.reset();
    }
}

form.onsubmit = async (e) => {
    e.preventDefault();
    const formTelefone = document.getElementById('m-telefone').value;
    const formNome = document.getElementById('m-nome').value;
    const formEmail = document.getElementById('m-email').value;
    const formSenha = document.getElementById('m-senha').value;
    const selectedCursosIds = Array.from(document.querySelectorAll('input[name="curso"]:checked')).map(cb => parseInt(cb.value));

    try {
        if (editIdCoordenador !== null) {
            const body = { nome: formNome, email: formEmail, telefone: formTelefone, cursos: selectedCursosIds };
            if (formSenha !== '******') body.senha = formSenha;
            await fetch(API + '/coordenadores/' + editIdCoordenador, { method: 'PUT', headers: authHeaders(), body: JSON.stringify(body) });
        } else {
            await fetch(API + '/coordenadores', {
                method: 'POST',
                headers: authHeaders(),
                body: JSON.stringify({ nome: formNome, email: formEmail, senha: formSenha, telefone: formTelefone, cursos: selectedCursosIds })
            });
        }
        modal.style.display = 'none';
        await carregarDados();
    } catch (err) {
        console.error('Erro ao salvar coordenador:', err);
    }
};

async function deleteCoordenador() {
    if (editIdCoordenador !== null && confirm('Deseja realmente excluir este coordenador?')) {
        try {
            await fetch(API + '/coordenadores/' + editIdCoordenador, { method: 'DELETE', headers: authHeaders() });
            modal.style.display = 'none';
            await carregarDados();
        } catch (err) {
            console.error('Erro ao excluir coordenador:', err);
        }
    }
}

window.onclick = (event) => { if (event.target == modal) modal.style.display = 'none'; };
window.openModal = openModal;

carregarDados();