// Importando as bibliotecas necessárias
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongodb = require('mongodb');


// Inicializando o aplicativo Express
const app = express();
const port = 3000;

// Configurando plugins/middlewares
app.use(cors());
app.use(express.json());

// Rota teste
app.get ('/', (req, res) => {
    res.send('API de CRUD de Clientes está funcionando!');
});

// Configurando a conexão com o MongoDB
const MongoClient = mongodb.MongoClient;
const ConStr = process.env.DB_CONNECTION_STRING;
const client = new MongoClient(ConStr);

async function connectToDB() {
    try {
        await client.connect();
        await client.db('admin').command({ ping: 1 });
        console.log('Conectado ao MongoDB com sucesso!');
        app.listen(3000, () => {
            console.log('Servidor rodando na porta 3000');
        });
    } finally {
        await client.close();
    }
}

connectToDB().catch(console.dir);

