// =============================================
//  SpherEdu — Login JS  (integrado)
//  Projeto: Horas Complementares
// =============================================

const API_URL = '/api/auth/login';

// -------------------------------------------------------
//  Contas para desenvolvimento/prototipação
//  Perfis: 'aluno', 'coordenador', 'admin'
//  TODO: REMOVA ao integrar o backend real.
// -------------------------------------------------------
const CONTAS_DEV = [
  { email: 'marcos.silva@sp.senac.br',  senha: 'marcos123',  perfil: 'aluno'       },
  { email: 'coord@spheredu.com',         senha: 'coord123',   perfil: 'coordenador' },
  { email: 'admin@sphereedu.com',        senha: 'admin123',   perfil: 'admin'       },
];

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

    const conta = CONTAS_DEV.find(c => c.email === email && c.senha === senha);

    if (!conta) {
      showGlobalError('E-mail ou senha incorretos.');
      return;
    }

    const storage = lembrar ? localStorage : sessionStorage;
    storage.setItem('spheredu_perfil', conta.perfil);
    storage.setItem('spheredu_email',  conta.email);

    // Redireciona conforme o perfil
    if (conta.perfil === 'admin') {
      window.location.href = '../../sphereedu-admin/frontend/index.html';
    } else if (conta.perfil === 'coordenador') {
      window.location.href = '../coord/index.html';
    } else {
      window.location.href = '../dashboard/dashboard.html';
    }
    // ─────────────────────────────────────────────────────

    // ── Autenticação via backend (produção) ───────────────
    // const response = await fetch(API_URL, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, senha, lembrar }),
    // });
    // const data = await response.json();
    // if (!response.ok) {
    //   showGlobalError(data.message || 'Credenciais inválidas.');
    //   return;
    // }
    // const storage = lembrar ? localStorage : sessionStorage;
    // storage.setItem('spheredu_token',  data.token);
    // storage.setItem('spheredu_perfil', data.perfil);
    // storage.setItem('spheredu_email',  data.email);
    // if (data.perfil === 'admin') {
    //   window.location.href = '../../sphereedu-admin/frontend/index.html';
    // } else {
    //   window.location.href = '../dashboard/dashboard.html';
    // }
    // ─────────────────────────────────────────────────────

  } catch (err) {
    showGlobalError('Erro de conexão. Tente novamente.');
    console.error('[SpherEdu] Erro no login:', err);
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
  ['input-email', 'input-senha'].forEach(id => {
    document.getElementById(id).classList.remove('input-error');
  });
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

function showGlobalSuccess(message) {
  const fb = document.getElementById('login-feedback');
  fb.className = 'login-feedback success';
  fb.textContent = message;
  fb.style.display = 'block';
}
