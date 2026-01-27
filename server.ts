import express from 'express';

const app = express();

// Verbos HTTP

app.get('/daniel', (req, res) => {
    res.send('Hola Daniel')
});

app.post('/', (req, res) => {
    res.send('Hello World! POST');
});

app.put('/', (req, res) => {
    res.send('Hello World! PUT');
});

app.delete('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(4000, () => {
    console.log("Server running on port 4000");
});
