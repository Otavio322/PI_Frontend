// =============================================
//  SpherEdu Admin — Login JS  (integrado)
// =============================================

const API_URL_ADMIN = '/api/auth/login';

// -------------------------------------------------------
//  Conta super-admin para dev/prototipação
//  TODO: REMOVA ao integrar o backend real
// -------------------------------------------------------
const ADMIN_DEV = { email: 'admin@sphereedu.com', senha: 'admin123', perfil: 'admin' };

async function handleLogin() {
  const email   = document.getElementById('input-email').value.trim().toLowerCase();
  const senha   = document.getElementById('input-senha').value;
  const lembrar = document.getElementById('lembrar').checked;

  clearErrors();

  if (!email || !isValidEmail(email)) {
    showFieldError('input-email', 'email-error', 'Informe um e-mail válido.');
    return;
  }
  if (!senha) {
    showFieldError('input-senha', 'senha-error', 'Informe a senha.');
    return;
  }

  setLoading(true);

  try {
    // ── Autenticação local (dev) ──────────────────────────
    await new Promise(r => setTimeout(r, 600));

    if (email !== ADMIN_DEV.email || senha !== ADMIN_DEV.senha) {
      showGlobalError('E-mail ou senha incorretos.');
      return;
    }

    const storage = lembrar ? localStorage : sessionStorage;
    storage.setItem('spheredu_perfil', 'admin');
    storage.setItem('spheredu_email',  email);

    window.location.href = 'index.html';
    // ─────────────────────────────────────────────────────

    // ── Autenticação via backend (produção) ───────────────
    // const response = await fetch(API_URL_ADMIN, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, senha, lembrar }),
    // });
    // const data = await response.json();
    // if (!response.ok || data.perfil !== 'admin') {
    //   showGlobalError(data.message || 'Acesso negado.');
    //   return;
    // }
    // const storage = lembrar ? localStorage : sessionStorage;
    // storage.setItem('spheredu_token',  data.token);
    // storage.setItem('spheredu_perfil', data.perfil);
    // storage.setItem('spheredu_email',  data.email);
    // window.location.href = 'index.html';
    // ─────────────────────────────────────────────────────

  } catch (err) {
    showGlobalError('Erro de conexão. Tente novamente.');
    console.error('[SpherEdu Admin] Erro no login:', err);
  } finally {
    setLoading(false);
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setLoading(state) {
  const btn = document.getElementById('btn-entrar');
  btn.disabled = state;
  btn.classList.toggle('loading', state);
  btn.textContent = state ? 'Entrando...' : 'Entrar';
}

function clearErrors() {
  const fb = document.getElementById('login-feedback');
  fb.style.display = 'none';
  fb.textContent = '';
  ['input-email', 'input-senha'].forEach(id => document.getElementById(id).classList.remove('input-error'));
  ['email-error', 'senha-error'].forEach(id => {
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

function showGlobalError(message) {
  const fb = document.getElementById('login-feedback');
  fb.className = 'login-feedback error';
  fb.textContent = message;
  fb.style.display = 'block';
}
