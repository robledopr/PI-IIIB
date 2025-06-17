const fs = require('fs');
const path = require('path');
const Livro = require('../models/Livro');

const FILE = path.join(__dirname, '../data/livros.json');

class LivroRepository {
  constructor() {
    this.livros = this._carregar() || [];
    this.nextId = this._getNextId();
  }

  _carregar() {
    if (fs.existsSync(FILE)) {
      const data = fs.readFileSync(FILE, 'utf-8');
      return JSON.parse(data);
    }
    return [];
  }

  _salvar() {
    fs.writeFileSync(FILE, JSON.stringify(this.livros, null, 2));
  }

  _getNextId() {
    return this.livros.length ? Math.max(...this.livros.map(l => l.id)) + 1 : 1;
  }

  getAll() {
    return this.livros;
  }

  getById(id) {
    return this.livros.find(l => l.id === id);
  }

  add(livro) {
    livro.id = this.nextId++;
    this.livros.push(livro);
    this._salvar();
    return livro;
  }

  update(livro) {
    const idx = this.livros.findIndex(l => l.id === livro.id);
    if (idx !== -1) {
      this.livros[idx] = livro;
      this._salvar();
    }
  }

  delete(id) {
    this.livros = this.livros.filter(l => l.id !== id);
    this._salvar();
  }
}

module.exports = new LivroRepository();
