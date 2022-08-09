const express = require('express');
const { v4: uuidv4 } = require('uuid'); // o v4 do uuid cria ids com números aleatórios
const app = express();

app.use(express.json()); // middleware essencial para o projeto rodar como json

// backend de usuários fake
const customers = [];

/* 
  cpf - string
  name - string
  id - uuid
  statement [] (extratos)
*/

// middleware
const verifyIfExistsAccountCPF = (request, response, next) => {
  // foi utilizado o parâmetro headers para o exemplo de criação de headers no postman
  const { cpf } = request.headers;

  const customer = customers.find((customer) => customer.cpf === cpf);

  if (!customer) {
    return response.status(400).json({ error: 'Customer not found!' });
  }

  // para utilizar a variável já criada no middle em outras requisições
  request.customer = customer;

  return next();
};
const getBalance = (statement) => {};

// criar uma conta
app.post('/account', (request, response) => {
  const { cpf, name } = request.body;
  // método some retorna se um item é verdadeiro ou falso, assim se possuir o dado no backend irá retornar true
  const customerAlreadyExists = customers.some(
    (customer) => customer.cpf === cpf,
  );
  // se existir um cpf cadastrado irá retornar um erro
  if (customerAlreadyExists) {
    return response.status(400).json({ error: 'Customer already exists!' });
  }

  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: [],
  });

  return response.status(201).send();
});

// é passado o middleware como segundo parâmetro, para ser feito a verificação
app.get('/statement', verifyIfExistsAccountCPF, (request, response) => {
  // puxa o customer do middleware criado
  const { customer } = request;
  // console.log(customer);
  return response.json(customer.statement);
});

app.post('/deposit', verifyIfExistsAccountCPF, (request, response) => {
  const { description, amount } = request.body;
  const { customer } = request;
  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: 'credit',
  };

  customer.statement.push(statementOperation);

  return response.status(201).send();
});

app.post('/withdraw', verifyIfExistsAccountCPF, (request, response) => {
  const { amount } = request.body;
  console.log('amount:', amount);
  const { customer } = request;
  console.log('customer:', customer);
});
app.listen(3333);
