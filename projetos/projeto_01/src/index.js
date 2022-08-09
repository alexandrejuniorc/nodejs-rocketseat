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
const getBalance = (statement) => {
  // o reduce pega as informações e transforma as informações em um valor somente
  // o cálculo vai ser feito sobre o valor que entrou na conta menos o que saiu
  const balance = statement.reduce((acc, operation) => {
    // acc é o acumulador - variável responsável por ir armazenando o valor que está sendo atualizado
    // operation é o objeto que vai ser iterado
    if (operation.type === 'credit') {
      return acc + operation.amount;
    } else {
      return acc - operation.amount;
    }
  }, 0); // inicia com o valor inicial de 0

  return balance;
};

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
// verifica extrato geral
app.get('/statement', verifyIfExistsAccountCPF, (request, response) => {
  // puxa o customer do middleware criado
  const { customer } = request;
  // console.log(customer);
  return response.json(customer.statement);
});

// deposito na conta
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

// saque na conta
app.post('/withdraw', verifyIfExistsAccountCPF, (request, response) => {
  const { amount } = request.body;
  // console.log('amount:', amount); valor do saque
  const { customer } = request;
  // console.log('customer:', customer); extrato do usuário
  const balance = getBalance(customer.statement);
  // console.log('balance: ', balance); valor do saldo da conta

  // se o total do balanço da carteira for menor que o valor do saque irá retornar um erro
  if (balance < amount) {
    return response.status(400).json({ error: 'Insufficient funds!' });
  }

  // se possuir dinheiro suficiente na conta pra fazer o saque
  const statementOperation = {
    amount,
    created_at: new Date(),
    type: 'debit',
  };

  customer.statement.push(statementOperation);
  return response.status(201).send();
});

// verifica extrato por data
app.get('/statement/date', verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;
  const { date } = request.query;
  console.log('Date: ', date);

  const dateFormat = new Date(date + '00:00');

  const statement = customer.statement.filter(
    (statement) =>
      statement.created_at.toDateString() ===
      new Date(dateFormat).toDateString(),
  );

  return response.json(customer.statement);
});

app.listen(3333);
