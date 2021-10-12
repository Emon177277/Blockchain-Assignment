const escrowCaller = require('./EscrowCaller');
const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();

// app.use(express.static('public'));




// async function callEscrow(){
//     try{
//         let response = await escrowCaller.createDeposite("0xbd9caec906414d0691fa0ebf1dd51c0c6fdc38af","0x9d557ec322490bdc4f218943b7846d8f4fca4626","2000000000000000000")
//         console.log(response);
//     }catch(err){
//         console.log(err);
//     }
// }

// callEscrow();


app.get('/',(req, res)=>{
    res.sendFile(path.join(__dirname, './public/index.html'));
    console.log(__dirname);
});

app.get('/static/arbitror',(req, res)=>{
    res.sendFile(path.join(__dirname, './public/static/arbitror.html'));
});

app.get('/static/depositor',(req, res)=>{
    res.sendFile(path.join(__dirname, './public/static/depositor.html'));
});

const port = 8085;
app.listen(port,()=>{
    console.log("server started successfully at port " + port);
});