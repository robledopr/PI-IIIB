// backend/models/Livro.js
class Livro {
  constructor(id, titulo, autor, ano, ISBN, disponivel = true) {
    if(!titulo || !autor || !ano || !ISBN) {
      throw new Error('Todos os campos são obrigatórios');    
    }
    this.id = id; 
    this.titulo = titulo;
    this.autor = autor;
    this.ano = ano;
    this.ISBN = ISBN;
    this.disponivel = disponivel;
  }
}

module.exports = Livro;
