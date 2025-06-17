const API_EMPRESTIMOS = 'http://localhost:3000/emprestimos';
const API_USUARIOS = 'http://localhost:3000/usuarios';
const API_LIVROS = 'http://localhost:3000/livros';

const form = document.getElementById('formEmprestimo');
const selectUsuario = document.getElementById('usuario');
const selectLivro = document.getElementById('livro');
const lista = document.getElementById('listaEmprestimos');

async function carregarSelects() {
  const [usuarios, livros] = await Promise.all([
    fetch(API_USUARIOS).then(r => r.json()),
    fetch(API_LIVROS).then(r => r.json())
  ]);

  // Usuários
  selectUsuario.innerHTML = '<option value="">Selecione</option>';
  usuarios.forEach(u => {
    const opt = document.createElement('option');
    opt.value = u.id;
    opt.textContent = u.nome;
    selectUsuario.appendChild(opt);
  });

  // Livros disponíveis
  selectLivro.innerHTML = '<option value="">Selecione</option>';
  livros.filter(l => l.disponivel).forEach(l => {
    const opt = document.createElement('option');
    opt.value = l.id;
    opt.textContent = `${l.titulo} - ${l.autor}`;
    selectLivro.appendChild(opt);
  });
}

async function carregarEmprestimos() {
  const res = await fetch(API_EMPRESTIMOS);
  const emprestimos = await res.json();
  const [usuarios, livros] = await Promise.all([
    fetch(API_USUARIOS).then(r => r.json()),
    fetch(API_LIVROS).then(r => r.json())
  ]);

  lista.innerHTML = '';
  emprestimos.forEach(e => {
    const li = document.createElement('li');
    li.className = 'bg-white p-4 rounded shadow flex justify-between items-center';

    const usuario = usuarios.find(u => u.id === e.usuarioId);
    const livro = livros.find(l => l.id === e.livroId);
    const devolvido = !!e.dataDevolucao;

    li.innerHTML = `
      <div>
        <p><strong>Usuário:</strong> ${usuario?.nome || 'N/A'}</p>
        <p><strong>Livro:</strong> ${livro?.titulo || 'N/A'}</p>
        <p><strong>Data Empréstimo:</strong> ${new Date(e.dataEmprestimo).toLocaleDateString()}</p>
        <p class="text-sm ${devolvido ? 'text-green-600' : 'text-red-600'}">
          ${devolvido ? 'Devolvido em ' + new Date(e.dataDevolucao).toLocaleDateString() : 'Em andamento'}
        </p>
      </div>
    `;

    if (!devolvido) {
      const btn = document.createElement('button');
      btn.textContent = 'Finalizar';
      btn.className = 'bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600';
      btn.onclick = async () => {
        await fetch(`${API_EMPRESTIMOS}/${e.id}/finalizar`, { method: 'PUT' });
        carregarSelects();
        carregarEmprestimos();
      };
      li.appendChild(btn);
    }

    lista.appendChild(li);
  });
}

form.onsubmit = async (e) => {
  e.preventDefault();
  const livroId = selectLivro.value;
  const usuarioId = selectUsuario.value;

  await fetch(API_EMPRESTIMOS, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ livroId, usuarioId })
  });

  form.reset();
  carregarSelects();
  carregarEmprestimos();
};

carregarSelects();
carregarEmprestimos();
