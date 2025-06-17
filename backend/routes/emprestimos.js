const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/EmprestimoController');

router.get('/', (req, res) => res.json(ctrl.listar()));

router.post('/', (req, res) => {
  try {
    const { livroId, usuarioId } = req.body;
    const emp = ctrl.emprestar(parseInt(livroId), parseInt(usuarioId));
    res.status(201).json(emp);
  } catch (e) {
    res.status(400).json({ erro: e.message });
  }
});

router.put('/:id/finalizar', (req, res) => {
  try {
    const emp = ctrl.finalizar(parseInt(req.params.id));
    res.json(emp);
  } catch (e) {
    res.status(400).json({ erro: e.message });
  }
});

module.exports = router;
