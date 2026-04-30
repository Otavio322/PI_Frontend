const inputs = document.querySelectorAll('.otp-input');

inputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
        // Aceita só um caractere alfanumérico
        e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 1);
        if (e.target.value.length > 0 && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
            inputs[index - 1].focus();
        }
    });
});

document.getElementById('verifyBtn').addEventListener('click', () => {
    const code = Array.from(inputs).map(i => i.value).join('');
    if (code.length === 5) {
        // Salva o código para validação na próxima tela (simulação)
        sessionStorage.setItem('spheredu_recovery_code', code);
        // Redireciona para criar nova senha
        window.location.href = '../novaSenha/novaSenha.html';
    } else {
        alert('Por favor, preencha todos os 5 campos.');
    }
});

document.getElementById('resendLink').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Código reenviado para ' + (sessionStorage.getItem('spheredu_recovery_email') || 'seu e-mail') + '.');
});
