document.addEventListener('DOMContentLoaded', () => {
    const form      = document.getElementById('recoveryForm');
    const emailInput = document.getElementById('email');
    const submitBtn  = document.getElementById('submitBtn');
    const btnText    = document.getElementById('btnText');
    const btnLoader  = document.getElementById('btnLoader');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const emailValue = emailInput.value.trim();

        if (!emailValue) {
            alert('Por favor, insira um e-mail válido.');
            return;
        }

        submitBtn.disabled = true;
        btnText.classList.add('hidden');
        btnLoader.classList.remove('hidden');

        // Salva o e-mail para usar nas próximas etapas
        sessionStorage.setItem('spheredu_recovery_email', emailValue);

        setTimeout(() => {
            // Redireciona para a tela de inserir código
            window.location.href = '../inserirCodigo/inserirCodigo.html';
        }, 600);
    });
});
