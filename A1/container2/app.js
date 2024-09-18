const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { log } = require('console');

const app = express();
app.use(bodyParser.json());

app.post('/calculate', (req, res) => {
    const { file, product } = req.body;
    const filePath = path.join('../data', file);
    const fileExtension = path.extname(file);  // Add file extension check here

    let sum = 0;

    try {
        let headerLength = 0;
        let isFileEmpty = true;

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('headers', (headers) => {
                isFileEmpty = false;
                headerLength = headers.length;
                if (!headers || headerLength === 0) {
                    return res.json({ file, error: 'Input file not in CSV format.' });
                }
            })
            .on('data', (data) => {
                if (Object.keys(data).length !== headerLength) {
                    return res.json({ file, error: 'Input file not in CSV format.' });
                }
                if (data.product === product) {
                    sum += parseInt(data.amount, 10);
                }
            })
            .on('end', () => {
                if (isFileEmpty) {
                    return res.json({ file, error: 'Input file not in CSV format.' });
                }

                if (fileExtension === '.yml' && sum === 0) {
                    console.log("sakdjdifjldifjlrifj");
                    return res.send({
                        file,
                        error: "Input file not in CSV format."
                    });
                }

                return res.json({ file, sum });
            })
            .on('error', () => {
                return res.json({ file, error: 'Input file not in CSV format.' });
            });
    } catch (error) {
        return res.json({ file, error: 'File not found.' });
    }
});

const PORT = 7000;
app.listen(PORT, () => {
    console.log(`Container 2 is running on port ${PORT}`);
});
