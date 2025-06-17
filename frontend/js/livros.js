const API = 'http://localhost:3000/livros';
const form = document.getElementById('formLivro');
const lista = document.getElementById('listaLivros');

async function carregarLivros() {
  const res = await fetch(API);
  const livros = await res.json();
  lista.innerHTML = '';

  livros.forEach(livro => {
    const li = document.createElement('li');
    li.className = 'bg-white p-4 rounded shadow flex justify-between items-center';

    li.innerHTML = `
      <div>
        <p class="font-semibold">${livro.titulo}</p>
        <p class="text-sm text-gray-600">${livro.autor} • ${livro.ano} ${livro.ISBN}</p>
        <p class="text-xs ${livro.disponivel ? 'text-green-600' : 'text-red-500'}">
          ${livro.disponivel ? 'Disponível' : 'Indisponível'}
        </p>
      </div>
    `;

    const btn = document.createElement('button');
    btn.textContent = 'Excluir';
    btn.className = 'bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600';
    btn.onclick = async () => {
      const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

      await fetch(`${API}/${livro.id}`, {
      method: 'DELETE'
    });


      carregarLivros();
    };

    li.appendChild(btn);
    lista.appendChild(li);
  });
}

form.onsubmit = async (e) => {
  e.preventDefault();
  const titulo = form.titulo.value;
  const autor = form.autor.value;
  const ano = form.ano.value;
  const isbn = form.isbn.value;
    if (!titulo || !autor || !ano || !isbn) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
  await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ titulo, autor, ano, isbn }),
  });

  form.reset();
  carregarLivros();
};

carregarLivros();
