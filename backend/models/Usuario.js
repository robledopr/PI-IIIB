class Usuario {
  constructor(id, nome, email, login, senha, tipo = 'leitor') {
    if (!nome || !email || !login || !senha) {
      throw new Error("Todos os campos são obrigatórios.");
    }
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.login = login;
    this.senha = senha; // Em produção, criptografar!
    this.tipo = tipo;   // 'admin' ou 'leitor'
  }

  isAdmin() {
    return this.tipo === 'admin';
  }

  validarSenha(senhaDigitada) {
    return this.senha === senhaDigitada;
  }
}

module.exports = Usuario;
