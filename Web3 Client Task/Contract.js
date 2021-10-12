// ===========================>
const { inherits } = require('util');
const Web3 = require('web3');
const web3 = new Web3("http://127.0.0.1:9545");

const Escrow = require("../Solidity Task/build/contracts/Escrow.json");


// const init = async ()=>{
    // const id = await web3.eth.net.getId(); // get id 
    // const deployedNetwork = Escrow.networks[id]; // get network
    // const contractAddressInNetwork = deployedNetwork.address; // get network address
    
    // const contract = new web3.eth.Contract(
    //     Escrow.abi,
    //     contractAddressInNetwork
    // )



// call() function in web3
    // const result = await contract.methods.getData().call();

    // const addresses = await web3.eth.getAccounts();

    // console.log(addresses);
// send() function in web3
    // const recipt = await contract.methods.setData(177277).send({
    //     from: addresses[0],
    // })

    // console.log(recipt);

// send ether to smartContract
    // const reciept = await contract.methods.sendEther().send({
    //     from: addresses[0],
    //     value: "100000000000000000"
    // })

    // console.log(reciept);

// send ether to smartContract with fallback funciotn
        // const reciept = await web3.eth.sendTransaction({
        //     from: addresses[0],
        //     to: contract.options.address,
        //     value:"10000000000000000"
        // })

        // console.log(reciept);

// send ether to an account directly
        // const reciept = await web3.eth.sendTransaction({
        //     from: addresses[0],
        //     to: addresses[3],
        //     value: "10000000000000"
        // })

        // console.log(reciept)

// }

// init();

module.exports = async function(){
    const id = await web3.eth.net.getId();                      // get id 
    const deployedNetwork = Escrow.networks[id];                // get network
    const contractAddressInNetwork = deployedNetwork.address;   // get network address
    
    const contract = new web3.eth.Contract(
        Escrow.abi,
        contractAddressInNetwork
    )
    return contract;
}
