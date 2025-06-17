const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/UsuarioController');

router.get('/', (req, res) => res.json(ctrl.listar()));
router.post('/', (req, res) => {
  try { res.status(201).json(ctrl.adicionar(req.body.nome, req.body.email)); }
  catch(e){ res.status(400).json({erro:e.message}); }
});
router.delete('/:id', (req, res) => { ctrl.deletar(parseInt(req.params.id)); res.status(204).send(); });
module.exports = router;
