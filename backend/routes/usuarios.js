const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/UsuarioController');

router.get('/', (req, res) => res.json(ctrl.listar()));

router.post('/', (req, res) => {
  try {
    const { nome, email, login, senha, tipo } = req.body;
    const usuario = ctrl.adicionar(nome, email, login, senha, tipo);
    res.status(201).json(usuario);
  } catch (e) {
    res.status(400).json({ erro: e.message });
  }
});


router.delete('/:id', (req, res) => {
  const tipoUsuario = req.headers['x-tipo-usuario'];
  if (tipoUsuario !== 'admin') {
    return res.status(403).json({ erro: 'Apenas administradores podem excluir usuários.' });
  }

  ctrl.deletar(parseInt(req.params.id));
  res.status(204).send();
});


module.exports = router;
