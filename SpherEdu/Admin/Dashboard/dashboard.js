document.addEventListener('DOMContentLoaded', async () => {
    function atualizarCards(alunos, cursos, submissoes) {
        const totalAlunos = alunos.length;
        const totalCursos = cursos.length;
        const submissoesPendentes = submissoes.filter(s => s.status.toLowerCase() === 'pendente').length;
        const totalHorasValidadas = alunos.reduce((soma, aluno) => soma + (aluno.cargaHorariaAcumulada || 0), 0);

        if (document.getElementById('total-alunos'))
            document.getElementById('total-alunos').innerText = totalAlunos;
        if (document.getElementById('cursos-ativos'))
            document.getElementById('cursos-ativos').innerText = totalCursos;
        if (document.getElementById('submissoes-pendentes'))
            document.getElementById('submissoes-pendentes').innerText = submissoesPendentes;
        if (document.getElementById('horas-validadas'))
            document.getElementById('horas-validadas').innerText = `${totalHorasValidadas}h`;
    }

    function carregarTabelaEmails(notificacoes) {
        const corpoTabela = document.getElementById('tabela-emails');
        if (!corpoTabela) return;
        corpoTabela.innerHTML = '';

        if (!notificacoes.length) {
            corpoTabela.innerHTML = '<tr><td colspan="4" style="text-align:center">Nenhum e-mail enviado.</td></tr>';
            return;
        }

        notificacoes.forEach(email => {
            const dataSimples = email.dataEnvio.split(' ')[0].split('-').reverse().join('/');
            corpoTabela.innerHTML += `
                <tr>
                    <td>${dataSimples}</td>
                    <td>${email.destinatario}</td>
                    <td>${email.assunto}</td>
                    <td><span class="status-tag status-enviado" style="color: #27ae60; font-weight: bold;">Enviado</span></td>
                </tr>
            `;
        });
    }

    try {
        const [alunosRes, cursosRes, submissoesRes, notificacoesRes] = await Promise.all([
            fetch(API + '/alunos', { headers: authHeaders() }),
            fetch(API + '/cursos', { headers: authHeaders() }),
            fetch(API + '/submissoes', { headers: authHeaders() }),
            fetch(API + '/notificacoes', { headers: authHeaders() })
        ]);

        if (handleUnauthorized(alunosRes)) return;

        const alunos = await alunosRes.json();
        const cursos = await cursosRes.json();
        const submissoes = await submissoesRes.json();
        const notificacoes = await notificacoesRes.json();

        atualizarCards(
            Array.isArray(alunos) ? alunos : [],
            Array.isArray(cursos) ? cursos : [],
            Array.isArray(submissoes) ? submissoes : []
        );
        carregarTabelaEmails(Array.isArray(notificacoes) ? notificacoes : []);
    } catch (err) {
        console.error('Erro ao carregar dashboard:', err);
    }
});