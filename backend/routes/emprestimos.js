const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/EmprestimoController');

router.get('/', (req,res)=>res.json(ctrl.listar()));
router.post('/', (req,res)=>{
  try{ res.status(201).json(ctrl.emprestar(parseInt(req.body.livroId), parseInt(req.body.usuarioId))); }
  catch(e){ res.status(400).json({erro:e.message}); }
});
router.put('/:id/finalizar', (req,res)=>{
  try{ res.json(ctrl.finalizar(parseInt(req.params.id))); }
  catch(e){ res.status(400).json({erro:e.message}); }
});
module.exports = router;
