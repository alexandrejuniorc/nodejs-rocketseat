const express = require('express');

const app = express();

app.get('/courses', (request, response) => {
  return response.json(['Curso 1', 'Curso 2', 'Curso 3']);
});

app.post('/courses', (request, response) => {
  return response.json(['Curso 1', 'Curso 2', 'Curso 3', 'Curso 4']);
});

app.put('/courses/:id', (request, response) => {
  return response.json(['Curso 6', 'Curso 2', 'Curso 3', 'Curso 4']);
});

// o método patch ele é utilizado para atualizar apenas uma parte do objeto, mas nesse exemplo irá funcionar do mesmo jeito que o input por ser uma tarefa simples
app.patch('/courses/:id', (request, response) => {
  return response.json(['Curso 6', 'Curso 7', 'Curso 3', 'Curso 4']);
});
app.listen(3333);
