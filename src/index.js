const express = require('express');

const app = express();

app.get('/courses', (request, response) => {
  return response.json(['Curso 1', 'Curso 2', 'Curso 3']);
});

// método POST que não irá funcionar na web, pois, na web ela faz somente o GET da api, assim tendo que utilizar o POSTMAN
app.post('/courses', (request, response) => {
  return response.json(['Curso 1', 'Curso 2', 'Curso 3', 'Curso 4']);
});

app.listen(3333);
