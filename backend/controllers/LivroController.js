const Livro = require('../models/Livro');
const repo = require('../repositories/LivroRepository');

class LivroController {
  listar() {
    return repo.getAll();
  }

  adicionar(titulo, autor, ano, ISBN) {
    const novo = new Livro(null, titulo, autor, ano, ISBN);
    return repo.add(novo);
  }

  deletar(id) {
    repo.delete(id);
  }
}

module.exports = new LivroController();
