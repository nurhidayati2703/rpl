//import modules
const express = require('express');
const app = express();

//method get
app.get('/test', (req, res)=>{
    res.end('Ini get');
});

//method post
app.post('/test', (req, res)=>{
    res.end('Ini post');
});

//inisilaisasi port
app.listen('1234', (e)=>{
    console.log(e);
});