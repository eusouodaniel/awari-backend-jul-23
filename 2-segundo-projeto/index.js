const express = require('express');
const axios = require('axios');

const server = express();

server.get('/awari', async (req, res) => {
  const result = await axios.get(`https://viacep.com.br/ws/${req.query.cep}/json`);
  return res.send(result.data);
});

server.listen(3333);
