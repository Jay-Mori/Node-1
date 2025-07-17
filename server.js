const express = require('express');
const fs = require('fs');

const file = 'files/data.txt';
const PORT = 9587;

const app = express();
app.use(express.json());


app.use((req, res, next) => {

    console.log(`[${req.method}] ${req.url}`);
    next();
})


app.get('/readfile', (req, res) => {
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) {
            res.send("Error Read File");
        }
        else {
            res.send(data);
        }
    });
});

app.post('/writefile', (req, res) => {
    const { content } = req.body;

    if (content) {
        fs.writeFile(file, content, (err) => {
            if (err) {
                res.send("Error Write File");
            }
            else {
                res.send('File written successfully');
            }
        })
    } else {
        res.send('Content required');
    }
})


app.post('/appendfile', (req, res) => {
    const { content } = req.body;

    if (content) {
        fs.appendFile(file, `\n${content}`, (err) => {
            if (err) {
                res.send('Error append to file');
            } else {
                res.send('Content append successfully');
            }
        });
    } else {
        res.send('Content required');
    }
})


app.get('/', (req, res) => {
  res.send(' Welcome to File Handling API');
})


app.listen(PORT, () => {
    console.log(`✅ Server is running at http://localhost:${PORT}`)
})