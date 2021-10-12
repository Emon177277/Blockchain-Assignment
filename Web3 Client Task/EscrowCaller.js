const Web3 = require('web3');
const web3 = new Web3("http://127.0.0.1:9545");
const contract = require("./Contract");
var Tx = require("ethereumjs-tx").Transaction;

async function getContract(){
    let escrowContract = await contract();
    return escrowContract;
} 

async function getAccountBalance(accountAddress){
    let resonseObject ={
        
    }
    
    try{
        let balance = await web3.eth.getBalance(accountAddress);
        resonseObject.response_status   = "success";
        resonseObject.message           = "the balance was successfully retrieved"
        resonseObject.detailed_response = balance;
    }
    catch(err){
        resonseObject.response_status   = "failure";
        resonseObject.message           = err.data
        resonseObject.detailed_response = err
    }
    
    console.log(resonseObject);

    return resonseObject;
}
// getAccountBalance("0x7e5f519016277434da984e820b36578d62a3885e");

async function getNonceForAddress(address){
    
    let resonseObject ={
       
    }
    try{
        
        let nonce = await web3.eth.getTransactionCount(address);
        
        resonseObject.response_status   = "success";
        resonseObject.message           = ""
        resonseObject.detailed_response = nonce

        // console.log(nonce);
    
    }catch(err){
        
        resonseObject.response_status   = "failure";
        resonseObject.message           = err.data;
        resonseObject.detailed_response = err;
    
    }
    // console.log(resonseObject);
    return resonseObject;
}
// getNonceForAddress("0x7e5f519016277434da984e820b36578d62a3885e");

async function createDeposite(  depositorAddress, 
                                recipeintAddress, 
                                amount,
                                ){
    let resonseObject ={
        
    }
    try{
        let contractObj = await getContract();
        let reciept = await contractObj.methods.depositeCreate(recipeintAddress).send({ 
                            from: depositorAddress,
                            value: amount,
                            gasLimit: "300000"
                        });
        resonseObject.response_status   = "success";
        resonseObject.message           = ""
        resonseObject.detailed_response = reciept;
        
    }
    catch(err){

        resonseObject.response_status   = "failure";
        resonseObject.message           = Object.values(err.data)[0].reason
        resonseObject.detailed_response = err.data;
        
    }
    console.log(resonseObject);
    return resonseObject;
}
// createDeposite("0xee46cbafdd18a8d8e43894fcb29bca48589f004b","0xbd9caec906414d0691fa0ebf1dd51c0c6fdc38af","2000000000000000000")

async function confirmServiceDelivery(depositorAddress){
    
    let resonseObject ={
        
    }
    
    try{
        let contractObj = await getContract();
        let reciept = await contractObj.methods.confirmServiceDelivery().send({
                            from : depositorAddress,
                            gasLimit: "300000"
                        });  
        
        resonseObject.response_status   = "success";
        resonseObject.message           = "";
        resonseObject.detailed_response = reciept;

    }catch(err){
        
        resonseObject.response_status   = "failure";
        resonseObject.message           = Object.values(err.data)[0].reason
        resonseObject.detailed_response = err.data
    
    }

    console.log(resonseObject)
    return resonseObject;
}
// confirmServiceDelivery("0xee46cbafdd18a8d8e43894fcb29bca48589f004b");

async function unlockDeposite(arbitrorAddress, depositorAddress){
    
    let resonseObject ={
        
    }
    
    try{
        let contractObj = await getContract();
        let reciept = await contractObj.methods.unlockDeposite(depositorAddress).send({
                            from : arbitrorAddress,
                            gasLimit: "300000"
                        })

        resonseObject.response_status   = "success";
        resonseObject.message           = ""
        resonseObject.detailed_response = reciept;

    }catch(err){
        
        resonseObject.response_status   = "failure";
        resonseObject.message           = Object.values(err.data)[0].reason
        resonseObject.detailed_response = err.data
    
    }
    console.log(resonseObject);
    return resonseObject;
}
// unlockDeposite("0xf6a9bce0c5cab5f1b079089a13d230a7ba99e154","0xee46cbafdd18a8d8e43894fcb29bca48589f004b");

async function withdrawDeposite(depositorAddress){
    
    let resonseObject ={
        
    }

    try{
        let contractObj = await getContract();
        let reciept = await contractObj.methods.withdrawDeposite().send({
                            from: depositorAddress,
                            gasLimit: "300000"
                        })
        

        resonseObject.response_status   = "success";
        resonseObject.message           = ""
        resonseObject.detailed_response = reciept;

    }catch(err){
        
  
        resonseObject.response_status   = "failure";
        resonseObject.message           = Object.values(err.data)[0].reason
        resonseObject.detailed_response = err.data
    
    }
    console.log(resonseObject)
    return resonseObject;
}
// withdrawDeposite("0xbd9caec906414d0691fa0ebf1dd51c0c6fdc38af");

async function getDepositStatus(depositorAddress){
    
    let resonseObject ={
        
    }

    try{
        let contractObj = await getContract();
        let reciept = await contractObj.methods.getDepositStatus(depositorAddress).call();
        
        resonseObject.response_status   = "success";
        resonseObject.message           = ""
        resonseObject.detailed_response = reciept;

    }catch(err){
        resonseObject.response_status   = "failure";
        resonseObject.message           = Object.values(err.data)[0].reason
        resonseObject.detailed_response = err.data
    }
    console.log(resonseObject);
    return resonseObject;
}
// getDepositStatus("0xee46cbafdd18a8d8e43894fcb29bca48589f004b");

async function getContractBalance(){
    
    let resonseObject ={
        
    }
    
    try{
        let contractObj = await getContract();
        let reciept = await contractObj.methods.getContractBalance().call();

        resonseObject.response_status   = "success";
        resonseObject.message           = ""
        resonseObject.detailed_response = reciept;
    }catch(err){
        

        resonseObject.response_status   = "failure";
        resonseObject.message           = Object.values(err.data)[0].reason
        resonseObject.detailed_response = err
    
    }
    console.log(resonseObject)
    return resonseObject;
}
// getContractBalance();

async function getDepositeInfo(depositorAddress){
  
    let resonseObject ={
        
    }

    try{
        let contractObj = await getContract();
        let reciept = await contractObj.methods.getDepositInfo(depositorAddress).call();
        
        resonseObject.response_status   = "success";
        resonseObject.message           = "successfully retrived depositeInfo"
        resonseObject.detailed_response = reciept;

    }catch(err){
        
        resonseObject.response_status   = "failure";
        resonseObject.message           = Object.values(err.data)[0].reason
        resonseObject.detailed_response = err.data
    }
    console.log(resonseObject);
    return resonseObject;
   
}
// getDepositeInfo("0x7e5f519016277434da984e820b36578d62a3885e");




async function createDepositeSigned(depositorAddress, depositorPrivateKey, recipeintAddress, amount){
    try{
        let contractObj = await getContract();
        let noneInfo = await getNonceForAddress(depositorAddress)
        let nonceNo = noneInfo.detailed_response;
    
        transactionObject = {
            nonce:    web3.utils.toHex(nonceNo),
            gasLimit: web3.utils.toHex(300000),
            to: contractObj._address,
            value: web3.utils.toHex(web3.utils.toWei(amount, 'ether')),
            data: contractObj.methods.depositeCreate(recipeintAddress).encodeABI()
        }
    
        let txHex = await signTheTransaction(depositorPrivateKey, transactionObject)
    
        let result =  await web3.eth.sendSignedTransaction(txHex);
        
        console.log(result);
    }
    catch(err){
        console.log(err.data)
    }
    
}
// createDepositeSigned("0x9d557ec322490bdc4f218943b7846d8f4fca4626", "d4816c89f6c66be7999263ef3bab0e461e8eed1b4d6cee0bfcd753d4eb4385db", "0xbd9caec906414d0691fa0ebf1dd51c0c6fdc38af", "2")

async function signTheTransaction(privateKey, transactionObject){
    let bufferedPrivateKey = Buffer.from(privateKey, "hex");
    let tx = new Tx(transactionObject);
    tx.sign(bufferedPrivateKey);
    let serializedTx = tx.serialize();
    let txHex = "0x" + serializedTx.toString("hex");
    return txHex;
}



module.exports = {
    getAccountBalance,
    getNonceForAddress,
    createDeposite,
    confirmServiceDelivery, 
    unlockDeposite, 
    withdrawDeposite, 
    getDepositStatus, 
    getContractBalance, 
    getDepositeInfo
}