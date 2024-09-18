const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());

app.post('/calculate', async (req, res) => {
    const { file, product } = req.body;

    if (!file) {
        return res.json({ file: null, error: 'Invalid JSON input.' });
    }

    const filePath = path.join('../data', file);

    if (!fs.existsSync(filePath)) {
        return res.json({ file, error: 'File not found.' });
    }

    try {
        const response = await axios.post('http://container2:7000/calculate', { file, product });
        return res.json(response.data);
    } catch (error) {
        return res.json({ file, error: error.message });
    }
});

const PORT = 6000;
app.listen(PORT, () => {
    console.log(`Container 1 is running on port ${PORT}`);
});
