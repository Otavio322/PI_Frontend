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

function formatarData(dataStr) {
    if (!dataStr) return '';
    const d = new Date(dataStr);
    if (isNaN(d)) return dataStr;
    return d.toLocaleDateString('pt-BR');
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
                <td>${formatarData(aluno.dataEntrada)}</td>
                <td>${cursoNomes}</td>
                <td><span class="btn-edit" onclick="openModal(${aluno.matricula})">Editar</span></td>
            </tr>
        `;
    });
}

function openModal(matricula = null) {
    editMatricula = matricula;
    modal.style.display = 'flex';
    form.reset();
    renderCursosCheckboxes();

    const senhaInput = document.getElementById('m-senha');
    const emailInput = document.getElementById('m-email');
    const dataInput = document.getElementById('m-dataEntrada');

    if (matricula !== null) {
        const aluno = _alunos.find(a => a.matricula === matricula);
        document.getElementById('m-nome').value = aluno.nome;
        emailInput.value = aluno.email || '';
        emailInput.disabled = true; 
        senhaInput.placeholder = 'Deixe vazio para não alterar';
        senhaInput.required = false;
        if (aluno.dataEntrada) {
            dataInput.value = aluno.dataEntrada.split('T')[0];
        }
        dataInput.disabled = true; 

        const idsCursos = (aluno.cursos || []).map(c => c.idCurso);
        document.querySelectorAll('input[name="curso"]').forEach(cb => {
            cb.checked = idsCursos.includes(parseInt(cb.value));
        });
    } else {
        emailInput.disabled = false;
        senhaInput.required = true;
        senhaInput.placeholder = '';
        dataInput.disabled = false;
    }
}

form.onsubmit = async (e) => {
    e.preventDefault();

    const formNome      = document.getElementById('m-nome').value.trim();
    const formEmail     = document.getElementById('m-email').value.trim();
    const formSenha     = document.getElementById('m-senha').value;
    const formData      = document.getElementById('m-dataEntrada').value;
    const selectedCursosIds = Array.from(
        document.querySelectorAll('input[name="curso"]:checked')
    ).map(cb => parseInt(cb.value));

    try {
        if (editMatricula !== null) {
            const bodyAluno = { nome: formNome };
            await fetch(API + '/alunos/' + editMatricula, {
                method: 'PUT',
                headers: authHeaders(),
                body: JSON.stringify(bodyAluno)
            });

            const aluno = _alunos.find(a => a.matricula === editMatricula);
            const cursosAtuais = (aluno.cursos || []).map(c => c.idCurso);

            const paraRemover = cursosAtuais.filter(id => !selectedCursosIds.includes(id));
            const paraAdicionar = selectedCursosIds.filter(id => !cursosAtuais.includes(id));

            await Promise.all([
                ...paraRemover.map(idCurso =>
                    fetch(API + '/alunos/' + editMatricula + '/cursos/' + idCurso, {
                        method: 'DELETE', headers: authHeaders()
                    })
                ),
                ...paraAdicionar.map(idCurso =>
                    fetch(API + '/alunos/' + editMatricula + '/cursos', {
                        method: 'POST',
                        headers: authHeaders(),
                        body: JSON.stringify({ idCurso })
                    })
                )
            ]);

        } else {
            const usuarioRes = await fetch(API + '/usuarios', {
                method: 'POST',
                headers: authHeaders(),
                body: JSON.stringify({
                    login: formEmail,
                    senha: formSenha,
                    email: formEmail,
                    telefone: '',
                    tipo_usuario: 'aluno'
                })
            });

            if (!usuarioRes.ok) {
                const err = await usuarioRes.json();
                alert('Erro ao criar usuário: ' + (err.error || err.message || usuarioRes.status));
                return;
            }

            const { id: idusuario } = await usuarioRes.json();

            const alunoRes = await fetch(API + '/alunos', {
                method: 'POST',
                headers: authHeaders(),
                body: JSON.stringify({
                    nome: formNome,
                    dataEntrada: formData,
                    usuario_idusuario: idusuario
                })
            });

            if (!alunoRes.ok) {
                const err = await alunoRes.json();
                alert('Erro ao criar aluno: ' + (err.message || alunoRes.status));
                return;
            }

            const { matricula } = await alunoRes.json();

            await Promise.all(
                selectedCursosIds.map(idCurso =>
                    fetch(API + '/alunos/' + matricula + '/cursos', {
                        method: 'POST',
                        headers: authHeaders(),
                        body: JSON.stringify({ idCurso })
                    })
                )
            );
        }

        modal.style.display = 'none';
        await carregarDados();

    } catch (err) {
        console.error('Erro ao salvar aluno:', err);
        alert('Erro inesperado. Veja o console para detalhes.');
    }
};

async function deleteStudent() {
    if (editMatricula !== null && confirm('Deseja realmente excluir este aluno?')) {
        try {
            await fetch(API + '/alunos/' + editMatricula, {
                method: 'DELETE',
                headers: authHeaders()
            });
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
