const Web3 = require('web3');
const web3 = new Web3("http://127.0.0.1:9545");
const contract = require("./Contract");

async function getContract(){
    let escrowContract = await contract();
    return escrowContract;
} 

// ========================> getting the nonce

async function getNonceForAddress(address){
    let nonce = await web3.eth.getTransactionCount(address);
    console.log(nonce);
    return nonce;
}


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
            console.log("========================>");
            console.log(reciept.events.raw)
            return reciept;
    }
    catch(err){
        console.log(Object.values(err.data)[0].reason);
        return err.data;
    }
}

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

async function getDepositStatus(depositorAddress){
    try{
        let contractObj = await getContract();
        let reciept = await contractObj.methods.getDepositStatus(depositorAddress).send({
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

getDepositStatus("0x7e5f519016277434da984e820b36578d62a3885e");

async function getContractBalance(){
    try{
        let contractObj = await getContract();
    }catch(err){
        console.log(Object.values(err.data)[0].reason);
        return err.data;
    }
}