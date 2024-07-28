const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3001;

####

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                    }
                    .navbar {
                        background-color: white;
                        color: #333;
                        padding: 15px;
                        text-align: center;
                    }
                    .container {
                        width: 80%;
                        margin: auto;
                        overflow: hidden;
                    }
                    h1, h2 {
                        color: #333;
                    }
                    .form-container {
                        background: white;
                        padding: 20px;
                        margin: 20px 0;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    .form-group {
                        margin-bottom: 15px;
                    }
                    .form-group label {
                        display: block;
                        margin-bottom: 5px;
                    }
                    .form-group input, .form-group button {
                        width: 100%;
                        padding: 10px;
                        margin: 5px 0;
                    }
                    .item-list {
                        background: white;
                        padding: 20px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    .item-list ul {
                        list-style: none;
                        padding: 0;
                    }
                    .item-list li {
                        padding: 10px;
                        border-bottom: 1px solid #ddd;
                    }
                    .message {
                        margin: 10px 0;
                        padding: 10px;
                        border: 1px solid #ccc;
                        background-color: #f9f9f9;
                    }
                </style>
            </head>
            <body>
                <div class="navbar">
                    <h1>Loja de Produtos</h1>
                </div>
                <div class="container">
                    <h2>Banco de Dados 1</h2>
                    <div class="form-container">
                        <form id="add-item-db1-form">
                            <div class="form-group">
                                <label for="item-db1">Adicionar Item ao DB1:</label>
                                <input type="text" id="item-db1" name="item" required>
                            </div>
                            <button type="submit">Adicionar</button>
                        </form>
                        <form id="remove-item-db1-form">
                            <div class="form-group">
                                <label for="remove-item-db1">Remover Item do DB1:</label>
                                <input type="text" id="remove-item-db1" name="item" required>
                            </div>
                            <button type="submit">Remover</button>
                        </form>
                        <button id="list-items-db1">Listar Itens no DB1</button>
                        <div id="items-db1" class="item-list"></div>
                    </div>

                    <h2>Banco de Dados 2</h2>
                    <div class="form-container">
                        <form id="add-item-db2-form">
                            <div class="form-group">
                                <label for="item-db2">Adicionar Item ao DB2:</label>
                                <input type="text" id="item-db2" name="item" required>
                            </div>
                            <button type="submit">Adicionar</button>
                        </form>
                        <form id="remove-item-db2-form">
                            <div class="form-group">
                                <label for="remove-item-db2">Remover Item do DB2:</label>
                                <input type="text" id="remove-item-db2" name="item" required>
                            </div>
                            <button type="submit">Remover</button>
                        </form>
                        <button id="list-items-db2">Listar Itens no DB2</button>
                        <div id="items-db2" class="item-list"></div>
                    </div>

                    <h2>Comparar Itens</h2>
                    <div class="form-container">
                        <form id="compare-item-form">
                            <div class="form-group">
                                <label for="compare-item">Comparar Item:</label>
                                <input type="text" id="compare-item" name="item" required>
                            </div>
                            <button type="submit">Comparar</button>
                        </form>
                        <div id="compare-result" class="message"></div>
                    </div>
                </div>

                <script>
                    document.getElementById('add-item-db1-form').addEventListener('submit', async (event) => {
                        event.preventDefault();
                        const item = event.target.item.value;
                        try {
                            const response = await fetch('/add-item-db1', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ item })
                            });
                            const result = await response.json();
                            alert(result.message || result.error);
                        } catch (error) {
                            alert('Erro ao adicionar item ao DB1');
                        }
                    });

                    document.getElementById('remove-item-db1-form').addEventListener('submit', async (event) => {
                        event.preventDefault();
                        const item = event.target.item.value;
                        try {
                            const response = await fetch('/remove-item-db1', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ item })
                            });
                            const result = await response.json();
                            alert(result.message || result.error);
                        } catch (error) {
                            alert('Erro ao remover item do DB1');
                        }
                    });

                    document.getElementById('list-items-db1').addEventListener('click', async () => {
                        try {
                            const response = await fetch('/list-items-db1');
                            const result = await response.json();
                            document.getElementById('items-db1').innerHTML = '<ul>' + result.items.map(item => '<li>' + item + '</li>').join('') + '</ul>';
                        } catch (error) {
                            alert('Erro ao listar itens no DB1');
                        }
                    });

                    document.getElementById('add-item-db2-form').addEventListener('submit', async (event) => {
                        event.preventDefault();
                        const item = event.target.item.value;
                        try {
                            const response = await fetch('/add-item-db2', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ item })
                            });
                            const result = await response.json();
                            alert(result.message || result.error);
                        } catch (error) {
                            alert('Erro ao adicionar item ao DB2');
                        }
                    });

                    document.getElementById('remove-item-db2-form').addEventListener('submit', async (event) => {
                        event.preventDefault();
                        const item = event.target.item.value;
                        try {
                            const response = await fetch('/remove-item-db2', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ item })
                            });
                            const result = await response.json();
                            alert(result.message || result.error);
                        } catch (error) {
                            alert('Erro ao remover item do DB2');
                        }
                    });

                    document.getElementById('list-items-db2').addEventListener('click', async () => {
                        try {
                            const response = await fetch('/list-items-db2');
                            const result = await response.json();
                            document.getElementById('items-db2').innerHTML = '<ul>' + result.items.map(item => '<li>' + item + '</li>').join('') + '</ul>';
                        } catch (error) {
                            alert('Erro ao listar itens no DB2');
                        }
                    });

                    document.getElementById('compare-item-form').addEventListener('submit', async (event) => {
                        event.preventDefault();
                        const item = event.target.item.value;
                        try {
                            const response = await fetch('/compare?item=' + item);
                            const result = await response.json();
                            document.getElementById('compare-result').innerHTML = '<div class="message">' + 
                                'Item: ' + result.item + '<br>' +
                                'No DB1: ' + result.in_db1 + '<br>' +
                                'No DB2: ' + result.in_db2 + '</div>';
                        } catch (error) {
                            alert('Erro ao comparar item');
                        }
                    });
                </script>
            </body>
        </html>
    `);
});


app.post('/add-item-db1', async (req, res) => {
    const item = req.body.item;
    try {
        const response = await axios.post('http://backend:5000/items/db1', { name: item });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao adicionar item ao DB1' });
    }
});

app.post('/remove-item-db1', async (req, res) => {
    const item = req.body.item;
    try {
        const response = await axios.delete(`http://backend:5000/items/db1?name=${item}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao remover item do DB1' });
    }
});

app.get('/list-items-db1', async (req, res) => {
    try {
        const response = await axios.get('http://backend:5000/items/db1');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar itens no DB1' });
    }
});

app.post('/add-item-db2', async (req, res) => {
    const item = req.body.item;
    try {
        const response = await axios.post('http://backend:5000/items/db2', { name: item });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao adicionar item ao DB2' });
    }
});

app.post('/remove-item-db2', async (req, res) => {
    const item = req.body.item;
    try {
        const response = await axios.delete(`http://backend:5000/items/db2?name=${item}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao remover item do DB2' });
    }
});

app.get('/list-items-db2', async (req, res) => {
    try {
        const response = await axios.get('http://backend:5000/items/db2');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar itens no DB2' });
    }
});

app.get('/compare', async (req, res) => {
    const item = req.query.item;
    try {
        const response = await axios.get(`http://backend:5000/compare?item=${item}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao comparar item' });
    }
});

app.listen(PORT, () => {
    console.log(`Frontend running on port ${PORT}`);
});
