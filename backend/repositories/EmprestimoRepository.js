const fs = require('fs');
const path = require('path');
const Emprestimo = require('../models/Emprestimo');

const FILE = path.join(__dirname, '../data/emprestimos.json');

class EmprestimoRepository {
  constructor() {
    this.emprestimos = this._carregar();
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
    fs.writeFileSync(FILE, JSON.stringify(this.emprestimos, null, 2));
  }

  _getNextId() {
    return this.emprestimos.length ? Math.max(...this.emprestimos.map(e => e.id)) + 1 : 1;
  }

  getAll() {
    return this.emprestimos;
  }

  getById(id) {
    return this.emprestimos.find(e => e.id === id);
  }

  add(emprestimo) {
    emprestimo.id = this.nextId++;
    this.emprestimos.push(emprestimo);
    this._salvar();
    return emprestimo;
  }

  update(emprestimo) {
    const index = this.emprestimos.findIndex(e => e.id === emprestimo.id);
    if (index !== -1) {
      this.emprestimos[index] = emprestimo;
      this._salvar();
    }
  }
}

module.exports = new EmprestimoRepository();
