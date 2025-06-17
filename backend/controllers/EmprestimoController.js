const Emprestimo = require('../models/Emprestimo');
const repo = require('../repositories/EmprestimoRepository');
const LivroRepo = require('../repositories/LivroRepository');
const UsuarioRepo = require('../repositories/UsuarioRepository');

class EmprestimoController {
  listar() {
    return repo.getAll();
  }

  emprestar(livroId, usuarioId) {
    const livro = LivroRepo.getById(livroId);
    const usuario = UsuarioRepo.getById(usuarioId);

    if (!livro || !livro.disponivel) throw new Error("Livro indisponível");
    if (!usuario) throw new Error("Usuário não encontrado");

    livro.disponivel = false;
    LivroRepo.update(livro);

    const novo = new Emprestimo(null, livroId, usuarioId);
    return repo.add(novo);
  }

  finalizar(id) {
    const emprestimo = repo.getById(id);
    if (!emprestimo || emprestimo.dataDevolucao) throw new Error("Empréstimo inválido");

    emprestimo.dataDevolucao = new Date();
    repo.update(emprestimo);

    const livro = LivroRepo.getById(emprestimo.livroId);
    if (livro) {
      livro.disponivel = true;
      LivroRepo.update(livro);
    }

    return emprestimo;
  }
}

module.exports = new EmprestimoController();
