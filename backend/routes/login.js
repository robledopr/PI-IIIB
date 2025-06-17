const express = require('express');
const router = express.Router();
const repo = require('../repositories/UsuarioRepository');

router.post('/', (req, res) => {
  const { login, senha } = req.body;
  const user = repo.getAll().find(u => u.login === login);
  
  if (!user || user.senha !== senha) {
    return res.status(401).json({ erro: 'Credenciais inválidas' });
  }

  // Sessão fake: retorna dados essenciais
  res.json({
    id: user.id,
    nome: user.nome,
    tipo: user.tipo
  });
});

module.exports = router;
