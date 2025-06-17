const Usuario = require('../models/Usuario');
const repo = require('../repositories/UsuarioRepository');

class UsuarioController {
  listar() { return repo.getAll(); }
  adicionar(n, e) {
    return repo.add(new Usuario(null, n, e));
  }
  deletar(id) { repo.delete(id); }
}
module.exports = new UsuarioController();
