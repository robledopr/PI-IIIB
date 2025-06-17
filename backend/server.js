const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/livros', require('./routes/livros'));
app.use('/usuarios', require('./routes/usuarios'));
app.use('/emprestimos', require('./routes/emprestimos'));
app.use('/login', require('./routes/login'));

app.use(express.static(path.join(__dirname, '../frontend')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
