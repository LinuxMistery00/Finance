// back-end/server.js
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const cors = require('cors'); // Certifique-se de ter instalado o pacote 'cors'.
const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const uri = 'mongodb://127.0.0.1:27017/finance';

async function connectToDatabase() {
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();
    return client.db();
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    throw error;
  }
}

app.get('/devs', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const financesCollection = db.collection('finances');
    const devs = await financesCollection.find().toArray();

    res.json(devs);
  } catch (error) {
    console.error('Erro ao buscar pessoas:', error);
    res.status(500).send('Erro ao buscar pessoas.');
  }
});

app.post('/addDev', async (req, res) => {
  const { nome } = req.body;

  try {
    const db = await connectToDatabase();
    const financesCollection = db.collection('finances');
    const dev = { nome };

    const result = await financesCollection.insertOne(dev);

    console.log('Pessoa inserida no MongoDB:', dev);

    res.json(result.ops[0]);
  } catch (error) {
    console.error('Erro ao inserir pessoa:', error);
    res.status(500).send('Erro ao inserir pessoa.');
  }
});

app.listen(port, () => {
  console.log(`Servidor em execução na porta ${port}`);
});
