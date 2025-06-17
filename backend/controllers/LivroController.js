const Livro = require('../models/Livro');
const repo = require('../repositories/LivroRepository');

class LivroController {
  listar() { return repo.getAll(); }
  adicionar(t, a, y) {
    return repo.add(new Livro(null, t, a, y));
  }
  deletar(id) { repo.delete(id); }
}
module.exports = new LivroController();
