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
            const usuarioRes = await fetch(API + '/usuarios', {
                method: 'POST',
                headers: authHeaders(),
                body: JSON.stringify({
                    login: formEmail,
                    senha: formSenha,
                    email: formEmail,
                    telefone: formTelefone,
                    tipo_usuario: 'coordenador'
                })
            });
            const usuarioData = await usuarioRes.json();

            await fetch(API + '/coordenadores', {
                method: 'POST',
                headers: authHeaders(),
                body: JSON.stringify({
                    nome: formNome,
                    email: formEmail,
                    telefone: formTelefone,
                    usuario_idusuario: usuarioData.id,
                    cursos: selectedCursosIds
                })
            });
        }
        modal.style.display = 'none';
        await carregarDados();
    } catch (err) {
        console.error('Erro ao salvar coordenador:', err);
    }
};
