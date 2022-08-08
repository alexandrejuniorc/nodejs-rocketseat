// importa o express
const express = require('express');

// cria um app que irá utilizar o framework express
const app = express();

/* métodos de requisição
GET - buscar uma informação dentro do servidor
POST - inserir uma informação no servidor
PUT - alterar uma informação no servidor
PATCH - alterar uma informação especifica
DELETE - deletar uma informação no servidor
*/

// a função get recebe qual é o path '/'
// request é tudo que é recebido da requisição
// response é tudo que irá ser retornado na requisição
app.get('/', (request, response) => {
  // método send permite que envie uma mensagem para quem está solicitando a requisição
  // return response.send('Hello World!');

  // o método json que será mais utilizado pois podemos retornar dados quando quisermos
  // ele pode retornar um array ou um objeto, dentre outras variáveis
  return response.json({ message: 'Hello World Ignite - Fundamentos NodeJS!' });
});

// listen é usado para setar o número da porta em que o servidor irá funcionar
app.listen(3333);
