class Usuario {
  constructor(id, nome, email) {
    if (!nome || !email) throw new Error("Campos obrigatórios");
    this.id = id;
    this.nome = nome;
    this.email = email;
  }
}
module.exports = Usuario;
