const Web3 = require('web3');
const web3 = new Web3("http://127.0.0.1:9545");
const contract = require("./Contract");

async function getContract(){
    let escrowContract = await contract();
    return escrowContract;
} 

async function getAccountBalance(accountAddress){
    let balance = await web3.eth.getBalance(accountAddress);
    console.log(balance);
    return balance;
}
// getAccountBalance("0x7e5f519016277434da984e820b36578d62a3885e");

async function getNonceForAddress(address){
    let nonce = await web3.eth.getTransactionCount(address);
    console.log(nonce);
    return nonce;
}
// getNonceForAddress("0x7e5f519016277434da984e820b36578d62a3885e");

//======================> contract function caller

async function createDeposite(  depositorAddress, 
                                recipeintAddress, 
                                amount,
                                ){
    try{
            let contractObj = await getContract();
            let reciept = await contractObj.methods.depositeCreate(recipeintAddress).send({ 
                                from: depositorAddress,
                                value: amount,
                                gasLimit: "300000"
                            });
            console.log(reciept);
            return reciept;
    }
    catch(err){
        console.log(Object.values(err.data)[0].reason);
        return err.data;
    }
}
// createDeposite("0x7e5f519016277434da984e820b36578d62a3885e","0xbd9caec906414d0691fa0ebf1dd51c0c6fdc38af","2000000000000000000")

async function confirmServiceDelivery(depositorAddress){
    try{
        let contractObj = await getContract();
        let reciept = await contractObj.methods.confirmServiceDelivery().send({
                            from : depositorAddress,
                            gasLimit: "300000"
                        });
        console.log(reciept);
        return reciept;
    }catch(err){
        console.log(Object.values(err.data)[0].reason);
        return err.data;
    }
}
// confirmServiceDelivery("0x7e5f519016277434da984e820b36578d62a3885e");

async function unlockServiceDelivery(arbitrorAddress, depositorAddress){
    try{
        let contractObj = await getContract();
        let reciept = await contractObj.methods.unlockDeposite(depositorAddress).send({
                            from : arbitrorAddress,
                            gasLimit: "300000"
                        })
        console.log(reciept);
        return reciept;
    }catch(err){
        console.log(Object.values(err.data)[0].reason);
        return err.data;
    }
}
// unlockServiceDelivery("0xf6a9bce0c5cab5f1b079089a13d230a7ba99e154","0x7e5f519016277434da984e820b36578d62a3885e");

async function withdrawDeposite(depositorAddress){
    try{
        let contractObj = await getContract();
        let reciept = await contractObj.methods.withdrawDeposite().send({
                            from: depositorAddress,
                            gasLimit: "300000"
                        })
        console.log(reciept);
        return reciept;
    }catch(err){
        console.log(Object.values(err.data)[0].reason);
        return err.data;
    }
}
// withdrawDeposite("0x7e5f519016277434da984e820b36578d62a3885e");

async function getDepositStatus(depositorAddress){
    try{
        let contractObj = await getContract();
        let reciept = await contractObj.methods.getDepositStatus(depositorAddress).call();
        console.log(reciept);
        return reciept;
    }catch(err){
        console.log(Object.values(err.data)[0].reason);
        return err.data;
    }
}
// getDepositStatus("0x7e5f519016277434da984e820b36578d62a3885e");

async function getContractBalance(){
    try{
        let contractObj = await getContract();
        let reciept = await contractObj.methods.getContractBalance().call();
        console.log(reciept);
        return reciept;
    }catch(err){
        console.log(Object.values(err.data)[0].reason);
        return err.data;
    }
}
// getContractBalance();

async function getDepositeInfo(depositorAddress){
  
    try{
        let contractObj = await getContract();
        let reciept = await contractObj.methods.getDepositInfo(depositorAddress).call();
        console.log(reciept);
        return reciept;
    }catch(err){
        console.log(Object.values(err.data)[0].reason);
        return err.data;
    }
   
}
// getDepositeInfo("0x7e5f519016277434da984e820b36578d62a3885e");