const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const fs = require('fs/promises');
const path = require('path');

const app = express();
app.use(bodyParser.json());

const PORT = Number(process.env.PORT) || 6000;
const CONTAINER_2_ENDPOINT = process.env.CONTAINER_2_ENDPOINT || "http://container2-service:90/calculate";
const FILE_DIR = process.env.FILE_DIR || "/parth_PV_dir";


app.post('/store-file', async (req, res) => {
    const { file, data } = req.body;

    if (!file || !data) {
        return res.json({ file: null, error: 'Invalid JSON input.' });
    }

    try {
        const filePath = path.join(FILE_DIR, file); 

        await fs.writeFile(filePath, data);

        return res.json({ file, message: 'Success.' });
    } catch (error) {
        console.log(error);
        return res.json({ file, error: 'Error while storing the file to the storage.' });
    }
});

app.post('/calculate', async (req, res) => {
    const { file, product } = req.body;

    if (!file) {
        return res.json({ file: null, error: 'Invalid JSON input.' });
    }

    const filePath = path.join('../data', file);

    try {
        const response = await axios.post(CONTAINER_2_ENDPOINT, { file, product });
        return res.json(response.data);
    } catch (error) {
        return res.json({ file, error: "errorr: "+error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Container 1 is running on port ${PORT}`);
});


//testing1234
//testing-abcd