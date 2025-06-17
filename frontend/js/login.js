const form = document.getElementById('formLogin');

form.onsubmit = async (e) => {
  e.preventDefault();
  const login = form.login.value;
  const senha = form.senha.value;

  const res = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ login, senha })
  });

  if (res.ok) {
    const usuario = await res.json();
    localStorage.setItem('usuario', JSON.stringify(usuario));
    window.location.href = 'index.html';
  } else {
    alert('Login inválido');
  }
};
