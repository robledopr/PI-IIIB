const fs = require('fs'), path = require('path');
const Livro = require('../models/Livro');
const FILE = path.join(__dirname, '../data/livros.json');

class LivroRepository {
  constructor() {
    this.livros = this._load();
    this.nextId = this._nextId();
  }
  _load() {
    return fs.existsSync(FILE) ? JSON.parse(fs.readFileSync(FILE)) : [];
  }
  _save() {
    fs.writeFileSync(FILE, JSON.stringify(this.livros, null,2));
  }
  _nextId() {
    return this.livros.length ? Math.max(...this.livros.map(l=>l.id))+1 : 1;
  }
  getAll() { return this.livros; }
  getById(id) { return this.livros.find(l=>l.id===id); }
  add(livro) {
    livro.id = this.nextId++;
    this.livros.push(livro);
    this._save();
    return livro;
  }
  update(livro) {
    const idx = this.livros.findIndex(l=>l.id===livro.id);
    if(idx>=0){ this.livros[idx]=livro; this._save(); }
  }
  delete(id) {
    this.livros = this.livros.filter(l=>l.id!==id);
    this._save();
  }
}
module.exports = new LivroRepository();
