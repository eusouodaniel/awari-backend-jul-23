import { Router } from 'express';

const routes = Router();

routes.get('/usuarios', (req, res) => {
  console.log(req.query);
  const response = [{
    nome: 'Diehl',
    sobrenome: 'Wesley',
    curso: 'Backend',
    instituicao: 'Awari'
  },{
    nome: 'Diehl',
    sobrenome: 'Wesley',
    curso: 'Backend',
    instituicao: 'Awari'
  }]
  return res.status(200).json(response);
});

routes.post('/usuarios', (req, res) => {
  console.log(req.body);
  return res.status(201).json(req.body);
});

routes.put('/usuarios/:id', (req, res) => {
  console.log(req.body);
  return res.status(200).json(req.body);
});

routes.patch('/usuarios/:id', (req, res) => {
  console.log(req.body);
  return res.status(200).json(req.body);
});

routes.delete('/usuarios/:id', (req, res) => {
  return res.status(204).json();
});

export default routes;