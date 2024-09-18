const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

const pool = mysql.createPool({
    host: 'caci5409-a2-db.cv0y0zpjnt11.us-east-1.rds.amazonaws.com',
    user: 'parth',
    password: 'Parth.DATABASE132',
    database: 'cloud_a2',
});

app.post('/store-products', async (req, res) => {
    const { products } = req.body;

    console.log(req.data);

    try {

        if (!products || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ error: 'Invalid input.' });
        }

        await Promise.all(products.map(async (product) => {
            const { name, price, availability } = product;
            const query = 'INSERT INTO products (name, price, availability) VALUES (?, ?, ?)';
            await executeQuery(query, [name, price, availability]);
        }));

        res.status(200).json({ message: 'Success.' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error.' });
    }
});

app.get('/list-products', async (req, res) => {
    try {

        const query = 'SELECT name, price, availability FROM products';
        const products = await executeQuery(query);

        res.status(200).json({ products });

    } catch (error) {
        console.error('Error listing products:', error);
        res.status(500).json({ error: 'Internal Server Error.' });
    }
});

function executeQuery(sql, params = []) {
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});