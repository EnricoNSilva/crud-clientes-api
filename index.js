// Importando as bibliotecas necessárias
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongodb = require('mongodb');


// Inicializando o aplicativo Express
const app = express();
const port = 3000;
let db;
let collection;

// Configurando plugins/middlewares
app.use(cors());
app.use(express.json());

// Configurando a conexão com o MongoDB
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId;
const ConStr = process.env.DB_CONNECTION_STRING;
const client = new MongoClient(ConStr);

async function connectToDB() {
  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log('Conectado ao MongoDB com sucesso!');

    db = client.db('crud_clientes_db'); // 'db' global
    collection = db.collection('clientes'); // 'collection' global
    console.log('Banco de dados e coleção selecionados.');

    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  } catch (ex) {
    console.error('Erro ao conectar ao MongoDB:', ex);
    process.exit(1);
  }
}

connectToDB().catch(ex => {
  console.error('connectToDB error:', ex);
  process.exit(1);
});

// Rota teste
app.get ('/', (req, res) => {
    res.send('API de CRUD de Clientes está funcionando!');
});

// Rota listar
app.get('/clientes', async (req, res) => {
  try {
    const clientes = await collection.find({}).toArray();
    res.status(200).json(clientes);

  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    res.status(500).json({ message: 'Erro ao buscar clientes' });
  }
});

app.post('/clientes', async (req, res) => {
  try {
    const novoCliente = req.body;
    novoCliente.dataCadastro = new Date();

    const resultado = await collection.insertOne(novoCliente);
    res.status(201).json({ message: 'Cliente criado com sucesso', id: resultado.insertedId });
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    res.status(500).json({ message: 'Erro ao criar cliente' });
  }
});

app.delete('/clientes/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const query = { _id: new ObjectId(id) };

    const resultado = await collection.deleteOne(query);

    if (resultado.deletedCount === 1) {
      res.status(200).json({ message: 'Cliente deletado com sucesso' });
    } else {
      res.status(404).json({ message: 'Cliente não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao deletar cliente:', error);
    res.status(500).json({ message: 'Erro ao deletar cliente' });
  }
});

app.put('/clientes/:id', async (req, res) => {
    try {
        // Url ID
        const id = req.params.id;
        // Novos dados no corpo da requisição
        const dadosAtualizados = req.body;
        delete dadosAtualizados._id; // Remove o campo _id do objeto
        // Criando a query para encontrar o documento pelo ID
        const query = { _id: new ObjectId(id) };
        // Criando a operacao de atualização
        const updateOperation = {
            $set: dadosAtualizados
        };
        // Executando a atualização
        const resultado = await collection.updateOne(query, updateOperation);
        // Verificando se a modificação foi bem sucedida
        if (resultado.matchedCount === 1) {
            res.status(200).json({ message: 'Cliente atualizado com sucesso' });
        }
        else {
            res.status(404).json({ message: 'Cliente não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao atualizar cliente:', error);
        res.status(500).json({ message: 'Erro ao atualizar cliente' });
    }
});

module.exports = app;
