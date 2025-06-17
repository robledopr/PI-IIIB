const fs = require('fs'), path = require('path');
const Usuario = require('../models/Usuario');
const FILE = path.join(__dirname, '../data/usuarios.json');

class UsuarioRepository {
  constructor() {
    this.usuarios = this._load();
    this.nextId = this._nextId();
  }
  _load() {
    return fs.existsSync(FILE) ? JSON.parse(fs.readFileSync(FILE)) : [];
  }
  _save() {
    fs.writeFileSync(FILE, JSON.stringify(this.usuarios, null,2));
  }
  _nextId() {
    return this.usuarios.length ? Math.max(...this.usuarios.map(u=>u.id))+1 : 1;
  }
  getAll() { return this.usuarios; }
  getById(id) { return this.usuarios.find(u=>u.id===id); }
  add(usuario) {
    usuario.id = this.nextId++;
    this.usuarios.push(usuario);
    this._save();
    return usuario;
  }
  delete(id) {
    this.usuarios = this.usuarios.filter(u=>u.id!==id);
    this._save();
  }
}
module.exports = new UsuarioRepository();
