// =============================================
//  SpherEdu — Nova Senha JS
//  Projeto: Horas Complementares
// =============================================

// URL do endpoint de redefinição de senha
// TODO: ajuste para o endpoint real ao integrar o backend
const API_URL_NOVA_SENHA = '/api/auth/nova-senha';

function handleNovaSenha() {
  const novaSenha     = document.getElementById('input-nova-senha').value;
  const confirmarSenha = document.getElementById('input-confirmar-senha').value;

  clearErrors();

  // Validações client-side
  if (!novaSenha || novaSenha.length < 6) {
    showFieldError('input-nova-senha', 'error-nova-senha', 'A senha deve ter ao menos 6 caracteres.');
    return;
  }

  if (novaSenha !== confirmarSenha) {
    showFieldError('input-confirmar-senha', 'error-confirmar-senha', 'As senhas não coincidem.');
    return;
  }

  setLoading(true);

  // ── Integração backend ────────────────────────────────
  // TODO: descomente e ajuste ao integrar o backend.
  // O token de redefinição normalmente vem via query string da URL
  // (ex: /novaSenha.html?token=abc123) ou via sessionStorage.
  //
  // const token = new URLSearchParams(window.location.search).get('token');
  //
  // fetch(API_URL_NOVA_SENHA, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ token, novaSenha }),
  // })
  //   .then(res => res.json())
  //   .then(data => {
  //     if (!data.ok) { showFeedback('error', data.message || 'Erro ao redefinir senha.'); return; }
  //     showFeedback('success', 'Senha redefinida! Redirecionando...');
  //     setTimeout(() => { window.location.href = '../login/login.html'; }, 1500);
  //   })
  //   .catch(() => showFeedback('error', 'Erro de conexão. Tente novamente.'))
  //   .finally(() => setLoading(false));
  // ─────────────────────────────────────────────────────

  // Simulação temporária — REMOVA ao integrar o backend
  setTimeout(() => {
    setLoading(false);
    window.location.href = '../login/login.html';
  }, 600);
}

// =============================================
//  Helpers
// =============================================

function setLoading(state) {
  const btn = document.getElementById('btn-redefinir');
  btn.disabled = state;
  btn.textContent = state ? 'Redefinindo...' : 'Redefinir Senha';
}

function clearErrors() {
  const fb = document.getElementById('form-feedback');
  fb.className = 'form-feedback';
  fb.textContent = '';

  ['input-nova-senha', 'input-confirmar-senha'].forEach(id => {
    document.getElementById(id).classList.remove('input-error');
  });
  ['error-nova-senha', 'error-confirmar-senha'].forEach(id => {
    const el = document.getElementById(id);
    el.style.display = 'none';
    el.textContent = '';
  });
}

function showFieldError(inputId, errorId, message) {
  document.getElementById(inputId).classList.add('input-error');
  const el = document.getElementById(errorId);
  el.textContent = message;
  el.style.display = 'block';
}

function showFeedback(type, message) {
  const fb = document.getElementById('form-feedback');
  fb.className = `form-feedback ${type}`;
  fb.textContent = message;
}