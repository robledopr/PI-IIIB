const fs = require('fs');
const path = require('path');
const Usuario = require('../models/Usuario');

const FILE = path.join(__dirname, '../data/usuarios.json');

class UsuarioRepository {
  constructor() {
    this.usuarios = this._carregar();
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
    fs.writeFileSync(FILE, JSON.stringify(this.usuarios, null, 2));
  }

  _getNextId() {
    return this.usuarios.length ? Math.max(...this.usuarios.map(u => u.id)) + 1 : 1;
  }

  getAll() {
    return this.usuarios;
  }

  getById(id) {
    return this.usuarios.find(u => u.id === id);
  }

  add(usuario) {
    usuario.id = this.nextId++;
    this.usuarios.push(usuario);
    this._salvar();
    return usuario;
  }

  delete(id) {
    this.usuarios = this.usuarios.filter(u => u.id !== id);
    this._salvar();
  }
}

module.exports = new UsuarioRepository();
