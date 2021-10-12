const escrowCaller = require('./EscrowCaller');
const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();


// async function callEscrow(){
//     try{
//         let response = await escrowCaller.createDeposite("0xbd9caec906414d0691fa0ebf1dd51c0c6fdc38af","0x9d557ec322490bdc4f218943b7846d8f4fca4626","2000000000000000000")
//         console.log(response);
//     }catch(err){
//         console.log(err);
//     }
// }

// callEscrow();


// app.post('/signup', async(req, res, next) => {
//     try {
//       await firstThing()
//     } catch (error) {
//       return next(error)
//     }
  
//     try {
//       await secondThing()
//     } catch (error) {
//       return next(error)
//     }
//   })

app.get('/', async (req, res)=>{
    res.status(200).send("it works");
});

const port = 8083;
app.listen(port,()=>{
    console.log("server started successfully at port " + port);
});