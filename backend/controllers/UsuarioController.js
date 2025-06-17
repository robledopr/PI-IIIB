const Usuario = require('../models/Usuario');
const repo = require('../repositories/UsuarioRepository');

class UsuarioController {
  listar() {
    return repo.getAll();
  }

adicionar(nome, email, login, senha, tipo = 'leitor') {
  const novo = new Usuario(null, nome, email, login, senha, tipo);
  return repo.add(novo);
}

  deletar(id) {
    repo.delete(id);
  }
}

module.exports = new UsuarioController();
