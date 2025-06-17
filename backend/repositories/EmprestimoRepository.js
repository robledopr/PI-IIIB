const fs = require('fs'), path = require('path');
const Emprestimo = require('../models/Emprestimo');
const FILE = path.join(__dirname, '../data/emprestimos.json');

class EmprestimoRepository {
  constructor() {
    this.emprestimos = this._load();
    this.nextId = this._nextId();
  }
  _load() {
    return fs.existsSync(FILE) ? JSON.parse(fs.readFileSync(FILE)) : [];
  }
  _save() {
    fs.writeFileSync(FILE, JSON.stringify(this.emprestimos, null,2));
  }
  _nextId() {
    return this.emprestimos.length ? Math.max(...this.emprestimos.map(e=>e.id))+1 : 1;
  }
  getAll() { return this.emprestimos; }
  getById(id) { return this.emprestimos.find(e=>e.id===id); }
  add(e) {
    e.id = this.nextId++;
    this.emprestimos.push(e);
    this._save();
    return e;
  }
  update(e) {
    const idx = this.emprestimos.findIndex(x=>x.id===e.id);
    if(idx>=0){ this.emprestimos[idx]=e; this._save(); }
  }
}
module.exports = new EmprestimoRepository();
