const express = require('express');

const app = express();

app.get('/courses', (request, response) => {
  return response.json(['Curso 1', 'Curso 2', 'Curso 3']);
});

app.post('/courses', (request, response) => {
  return response.json(['Curso 1', 'Curso 2', 'Curso 3', 'Curso 4']);
});

// o campo put utilizado dessa forma é para que pegue um determinado item usando '/:id' depois da url e que possa editá-lo de tal maneira
app.put('/courses/:id', (request, response) => {});
app.listen(3333);
