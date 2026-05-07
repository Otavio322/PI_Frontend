let editIdRegra = null;
const tableBody = document.getElementById('regras-table-body');
const modal = document.getElementById('modal-regras');
const form = document.getElementById('form-regras');
const cursoSelect = document.getElementById('filtro-curso');

let _cursos = [];
let _regras = [];

async function carregarCursos() {
    const res = await fetch(API + '/cursos', { headers: authHeaders() });
    if (handleUnauthorized(res)) return;
    _cursos = await res.json();
    popularCursos();
    await carregarRegras();
}

function popularCursos() {
    cursoSelect.innerHTML = '';
    _cursos.forEach(c => {
        const option = document.createElement('option');
        option.value = c.idCurso;
        option.textContent = c.nome;
        cursoSelect.appendChild(option);
    });
}

function getCursoIdAtual() {
    return parseInt(cursoSelect.value);
}

async function carregarRegras() {
    const idCurso = getCursoIdAtual();
    if (!idCurso) return;
    const res = await fetch(API + '/regras/curso/' + idCurso, { headers: authHeaders() });
    _regras = await res.json();
    renderTable();
}

function renderTable() {
    const idCurso = getCursoIdAtual();
    const cursoObj = _cursos.find(c => c.idCurso === idCurso);
    let somaTotal = 0;
    tableBody.innerHTML = '';

    _regras.forEach(regra => {
        somaTotal += regra.cargaHorariaPermitida;
        tableBody.innerHTML += `
                <td>${regra.categoria}</td>
                <td>${regra.cargaHorariaMin}h</td>
                <td>${regra.cargaHorariaMax}h</td>
                <td>${regra.cargaHorariaPermitida}h</td>
                <td>${regra.descricao}</td>
                <td>
                    <span class="btn-edit" onclick="openModal(${regra.idRegra})">Editar</span>
                </td>
            </tr>
        `;
    });

    const contador = document.getElementById('contador-horas');
    if (contador && cursoObj) {
        const limite = cursoObj.cargaHorariaTotal;
        contador.innerText = `Total do Curso: ${somaTotal} / ${limite}h`;
        contador.style.color = somaTotal === limite ? 'green' : (somaTotal > limite ? 'red' : '#333');
    }
}

window.openModal = (idRegra = null) => {
    editIdRegra = idRegra;
    modal.style.display = 'flex';
    const titulo = document.getElementById('modalTitulo');

    if (idRegra !== null) {
        titulo.innerText = 'Editar Categoria';
        const r = _regras.find(reg => reg.idRegra === idRegra);
        document.getElementById('m-nome').value = r.categoria;
        document.getElementById('m-min').value = r.cargaHorariaMin;
        document.getElementById('m-max').value = r.cargaHorariaMax;
        document.getElementById('m-permitida').value = r.cargaHorariaPermitida;
        document.getElementById('m-regra').value = r.descricao;
    } else {
        titulo.innerText = 'Nova Categoria';
        form.reset();
    }
};

form.onsubmit = async (e) => {
    e.preventDefault();
    const idCurso = getCursoIdAtual();
    const cursoObj = _cursos.find(c => c.idCurso === idCurso);

    const vMin = parseInt(document.getElementById('m-min').value) || 0;
    const vMax = parseInt(document.getElementById('m-max').value) || 0;
    const vPermitida = parseInt(document.getElementById('m-permitida').value) || 0;
    const vDesc = document.getElementById('m-regra').value;
    const vCat = document.getElementById('m-nome').value;

    if (vPermitida < vMin || vPermitida > vMax) {
        alert(`Erro: A carga Permitida (${vPermitida}h) deve estar entre o Mínimo e o Máximo.`);
        return;
    }

    const somaOutras = _regras
        .filter(r => r.idRegra !== editIdRegra)
        .reduce((acc, curr) => acc + curr.cargaHorariaPermitida, 0);

    if (somaOutras + vPermitida > cursoObj.cargaHorariaTotal) {
        alert(`Erro: A soma ultrapassa o limite do curso (${cursoObj.cargaHorariaTotal}h).`);
        return;
    }

    const body = { curso_idCurso: idCurso, categoria: vCat, cargaHorariaMin: vMin, cargaHorariaMax: vMax, cargaHorariaPermitida: vPermitida, descricao: vDesc };

    try {
        if (editIdRegra !== null) {
            await fetch(API + '/regras/' + editIdRegra, { method: 'PUT', headers: authHeaders(), body: JSON.stringify(body) });
        } else {
            await fetch(API + '/regras', { method: 'POST', headers: authHeaders(), body: JSON.stringify(body) });
        }
        modal.style.display = 'none';
        await carregarRegras();
    } catch (err) {
        console.error('Erro ao salvar regra:', err);
    }
};

window.deleteRegra = async () => {
    if (editIdRegra !== null && confirm('Excluir esta regra?')) {
        try {
            await fetch(API + '/regras/' + editIdRegra, { method: 'DELETE', headers: authHeaders() });
            modal.style.display = 'none';
            await carregarRegras();
        } catch (err) {
            console.error('Erro ao excluir regra:', err);
        }
    }
};

window.onclick = (event) => { if (event.target == modal) modal.style.display = 'none'; };

cursoSelect.addEventListener('change', carregarRegras);
carregarCursos();