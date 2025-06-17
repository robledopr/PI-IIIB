const API = 'http://localhost:3000/usuarios';
const form = document.getElementById('formUsuario');
const lista = document.getElementById('listaUsuarios');

async function carregarUsuarios() {
  const res = await fetch(API);
  const usuarios = await res.json();
  lista.innerHTML = '';

  usuarios.forEach(usuario => {
    const li = document.createElement('li');
    li.className = 'bg-white p-4 rounded shadow flex justify-between items-center';

    li.innerHTML = `
      <div>
        <p class="font-semibold">${usuario.nome}</p>
        <p class="text-sm text-gray-600">${usuario.email}</p>
      </div>
    `;

    const btn = document.createElement('button');
    btn.textContent = 'Excluir';
    btn.className = 'bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600';
    btn.onclick = async () => {
    await fetch(`http://localhost:3000/usuarios/${usuario.id}`, {
    method: 'DELETE'
    });


      carregarUsuarios();
    };

    li.appendChild(btn);
    lista.appendChild(li);
  });
}

form.onsubmit = async (e) => {
  e.preventDefault();
  const nome = form.nome.value;
  const email = form.email.value;

  await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, email })
  });

  form.reset();
  carregarUsuarios();
};

carregarUsuarios();
