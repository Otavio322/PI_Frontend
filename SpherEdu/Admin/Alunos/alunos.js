let editMatricula = null;
const tableBody = document.getElementById('student-table-body');
const modal = document.getElementById('modal-aluno');
const form = document.getElementById('form-aluno');
const cursosContainer = document.getElementById('m-cursos-container');

let _alunos = [];
let _cursos = [];

async function carregarDados() {
    const [alunosRes, cursosRes] = await Promise.all([
        fetch(API + '/alunos', { headers: authHeaders() }),
        fetch(API + '/cursos', { headers: authHeaders() })
    ]);
    if (handleUnauthorized(alunosRes)) return;
    _alunos = await alunosRes.json();
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
    _alunos.forEach(aluno => {
        const cursoNomes = (aluno.cursos || []).map(c => c.nome).join(', ') || '<span style="color:gray">Sem curso</span>';
        tableBody.innerHTML += `
            <tr>
                <td>${aluno.matricula}</td>
                <td>${aluno.nome}</td>
                <td>${aluno.email || ''}</td>
                <td>••••••</td>
                <td>${cursoNomes}</td>
                <td><span class="btn-edit" onclick="openModal('${aluno.matricula}')">Editar</span></td>
            </tr>
        `;
    });
}

function openModal(matricula = null) {
    editMatricula = matricula;
    modal.style.display = 'flex';
    renderCursosCheckboxes();

    if (matricula !== null) {
        const aluno = _alunos.find(a => String(a.matricula) === String(matricula));
        document.getElementById('m-matricula').value = aluno.matricula;
        document.getElementById('m-matricula').disabled = true;
        document.getElementById('m-nome').value = aluno.nome;
        document.getElementById('m-email').value = aluno.email || '';
        document.getElementById('m-senha').value = '******';

        const idsCursos = (aluno.cursos || []).map(c => c.idCurso);
        document.querySelectorAll('input[name="curso"]').forEach(cb => {
            cb.checked = idsCursos.includes(parseInt(cb.value));
        });
    } else {
        form.reset();
        document.getElementById('m-matricula').disabled = false;
    }
}

form.onsubmit = async (e) => {
    e.preventDefault();
    const formMatricula = document.getElementById('m-matricula').value;
    const formNome = document.getElementById('m-nome').value;
    const formEmail = document.getElementById('m-email').value;
    const formSenha = document.getElementById('m-senha').value;
    const selectedCursosIds = Array.from(document.querySelectorAll('input[name="curso"]:checked')).map(cb => parseInt(cb.value));

    try {
        if (editMatricula !== null) {
            const body = { nome: formNome, email: formEmail, cursos: selectedCursosIds };
            if (formSenha !== '******') body.senha = formSenha;
            await fetch(API + '/alunos/' + editMatricula, {
                method: 'PUT',
                headers: authHeaders(),
                body: JSON.stringify(body)
            });
        } else {
            await fetch(API + '/alunos', {
                method: 'POST',
                headers: authHeaders(),
                body: JSON.stringify({ matricula: formMatricula, nome: formNome, email: formEmail, senha: formSenha, cursos: selectedCursosIds })
            });
        }
        modal.style.display = 'none';
        await carregarDados();
    } catch (err) {
        console.error('Erro ao salvar aluno:', err);
    }
};

async function deleteStudent() {
    if (editMatricula !== null && confirm('Deseja realmente excluir este aluno?')) {
        try {
            await fetch(API + '/alunos/' + editMatricula, { method: 'DELETE', headers: authHeaders() });
            modal.style.display = 'none';
            await carregarDados();
        } catch (err) {
            console.error('Erro ao excluir aluno:', err);
        }
    }
}

window.onclick = (event) => { if (event.target == modal) modal.style.display = 'none'; };
window.openModal = openModal;

carregarDados();
