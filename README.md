# API - CRUD de Clientes

Esta é a API RESTful (backend) para o sistema de cadastro de clientes, construída com Node.js, Express e MongoDB. Ela foi desenvolvida como parte de um treinamento full-stack.

Esta API foi feita para ser consumida pelo frontend em Angular, que está disponível neste repositório:
**➡️ Repositório do Frontend (Angular): [https://github.com/EnricoNSilva/CRUD-Clientes](https://github.com/EnricoNSilva/CRUD-Clientes)**

---

## Tecnologias Utilizadas

* **Node.js:** Ambiente de execução do servidor.
* **Express:** Framework para gerenciamento das rotas e do servidor HTTP.
* **MongoDB (com MongoDB Atlas):** Banco de dados NoSQL para armazenamento dos clientes.
* **`node-mongodb-native`:** Driver oficial do MongoDB para conectar o Node.js ao banco.
* **`cors`:** Para permitir que o frontend (em `localhost:4200`) se comunique com esta API (em `localhost:3000`).
* **`dotenv`:** Para gerenciamento seguro de variáveis de ambiente (como a string de conexão do banco).

---

## 🚀 Como Rodar a API (Backend)

Siga estes passos para configurar e rodar o servidor da API localmente.

### 1. Pré-requisitos

* [Node.js](https://nodejs.org/) (que inclui o npm)
* [Git](https://git-scm.com/)
* Uma string de conexão válida do [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

### 2. Instalação

1.  **Clone este repositório:**
    ```bash
    git clone [https://github.com/EnricoNSilva/crud-clientes-api.git](https://github.com/EnricoNSilva/crud-clientes-api.git)
    cd crud-clientes-api
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as Variáveis de Ambiente:**
    * Crie  um arquivo .env e coloque uma connection string, como o exemplo:
    ```
    DB_CONNECTION_STRING=mongodb+srv://***************
    ```

### 3. Executando o Servidor

1.  Inicie o servidor:
    ```bash
    node index.js
    ```

2.  O servidor deverá exibir as seguintes mensagens no console, indicando sucesso:
    ```
    Conectado ao MongoDB com sucesso!
    Banco de dados e coleção selecionados.
    Servidor rodando na porta 3000
    ```

A API estará no ar e ouvindo em `http://localhost:3000`.

---

## Endpoints da API

Esta API expõe os seguintes endpoints RESTful para o CRUD de clientes:

### 1. Listar todos os Clientes
* **Método:** `GET`
* **URL:** `/clientes`
* **Resposta de Sucesso (200):** Um array JSON com todos os documentos de clientes.
    ```json
    [
      { "_id": "...", "nome": "Cliente A", "email": "...", ... },
      { "_id": "...", "nome": "Cliente B", "email": "...", ... }
    ]
    ```

### 2. Cadastrar um Novo Cliente
* **Método:** `POST`
* **URL:** `/clientes`
* **Corpo da Requisição (Body):** JSON com os dados do novo cliente.
    ```json
    {
      "nome": "Novo Cliente",
      "email": "novo@email.com",
      "telefone": "11999999999"
    }
    ```
* **Resposta de Sucesso (201):** O ID do novo cliente inserido.
    ```json
    { "insertedId": "..." }
    ```

### 3. Alterar um Cliente
* **Método:** `PUT`
* **URL:** `/clientes/:id` (onde `:id` é o `_id` do cliente)
* **Corpo da Requisição (Body):** JSON com os campos a serem alterados.
    ```json
    {
      "nome": "Nome Atualizado",
      "telefone": "11888888888"
    }
    ```
* **Resposta de Sucesso (200):**
    ```json
    { "message": "Cliente alterado com sucesso" }
    ```

### 4. Excluir um Cliente
* **Método:** `DELETE`
* **URL:** `/clientes/:id` (onde `:id` é o `_id` do cliente)
* **Resposta de Sucesso (200):**
    ```json
    { "message": "Cliente excluído com sucesso" }
    ```