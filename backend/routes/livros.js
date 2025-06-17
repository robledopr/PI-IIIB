const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/LivroController');

router.get('/', (req, res) => res.json(ctrl.listar()));

router.post('/', (req, res) => {
  try {
    const { titulo, autor, ano, isbn } = req.body;
    const livro = ctrl.adicionar(titulo, autor, ano, isbn);
    res.status(201).json(livro);
  } catch (e) {
    res.status(400).json({ erro: e.message });
  }
});

router.delete('/:id', (req, res) => {
  ctrl.deletar(parseInt(req.params.id));
  res.status(204).send();
});

module.exports = router;
