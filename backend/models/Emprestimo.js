class Emprestimo {
  constructor(id, livroId, usuarioId, dataEmprestimo = new Date(), dataDevolucao = null) {
    this.id = id;
    this.livroId = livroId;
    this.usuarioId = usuarioId;
    this.dataEmprestimo = dataEmprestimo;
    this.dataDevolucao = dataDevolucao;
  }
}

module.exports = Emprestimo;
