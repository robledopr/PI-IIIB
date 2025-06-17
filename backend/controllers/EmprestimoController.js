const Emprestimo = require('../models/Emprestimo');
const repo = require('../repositories/EmprestimoRepository');
const LivroRepo = require('../repositories/LivroRepository');
const UsuarioRepo = require('../repositories/UsuarioRepository');

class EmprestimoController {
  listar() { return repo.getAll(); }
  emprestar(livroId, usuarioId) {
    const livro = LivroRepo.getById(livroId);
    const usuario = UsuarioRepo.getById(usuarioId);
    if(!livro || !livro.disponivel) throw new Error('Livro indisponível');
    if(!usuario) throw new Error('Usuário não encontrado');
    livro.disponivel = false;
    LivroRepo.update(livro);
    return repo.add(new Emprestimo(null, livroId, usuarioId));
  }
  finalizar(id) {
    const emp = repo.getById(id);
    if(!emp || emp.dataDevolucao) throw new Error('Empréstimo inválido');
    emp.dataDevolucao = new Date();
    repo.update(emp);

    const livro = LivroRepo.getById(emp.livroId);
    if(livro){
      livro.disponivel = true;
      LivroRepo.update(livro);
    }
    return emp;
  }
}
module.exports = new EmprestimoController();
