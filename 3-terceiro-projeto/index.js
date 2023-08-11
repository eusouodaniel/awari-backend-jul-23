const express = require('express');
const { getPoke } = require('./src/external-services/poke-api');

const server = express();

server.get('/pokemon/habilidades/:pokemon', async (req, res) => {
  const params = req.params;
  const queries = req.query;
  const abilities = await getPoke(params.pokemon, queries.slot);
  return res.send(abilities);
})

server.listen(3333);