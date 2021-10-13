# Blockchain-Assignment 
## __Part - 1 : Running the network and deploying the smart contract in the network__  
---  

___Step 1 : Download/Clone this repository___  
___Step 2 : install Truffle___  
- open cmd/terminal and enter the following command. This will install Truffle globally in your machine

~~~
npm install -g truffle  
~~~

___Step 3 : compiling the Smart Contract___
- open terminal/cmd in the __'Solidity TasK'__ folder
- run the command below to compile the contracts
~~~
truffle compile
~~~
- above line will compile both of the smart contracts in the contracts folder.  
(running truffle init provided one default contract which I didn't delete)

___Step 4 : Run the Network___
- from the __'Solidity Task'__ folder run the command below in the terminal/cmd.

~~~
truffle develop
~~~
- you can see that after this command, 10 unlocked accounts and their private keys will be genarated for your use  


___Step 5 : Migrate the Smart Contracts in the Network___  

- again from the __'Solidity Task'__ folder. run the command below

~~~
migrate --reset
~~~
- after this command your contracts will be compiled and deployed in the network using the first account from the genarated account list. This account is going to be our arbitror's account. 

__* note: Keep it running, don't close the terminal.__
  
---

## __Part - 2 : Running the Dapp__  
--- 
___Step 1 : Installing dependencies___
- move to ___'Web3 Client Task'___ folder and open cmd/terminal and run the command.

~~~
npm install
~~~

- above command will install all the necessary dependencies for the project.

___Step 2 : Runing the web3 server client.___
- although I've installed nodemon but for some reason. Its not working. if you wish you can run the project with the following command which uses nodemon. but don't expect that it will reset the server automatically in case of error, because nodemon does run the program but it isn't restarting in case of error __(which is not suppose to be the case)__.

~~~
npm start
~~~

- if ou wish you can run the project with this command too.

~~~
node index.js
~~~

- this will start the server and the api will be available which you can use to communicate with the web3 client. its running in [localhost:8085]().

- I've provided a __'web3.json'__ file which you can import in post man to communicate with the api 

__I'm still woking on the frontend part of the project, once I get done with that, You no longer need to use post man to use the api.  
But till then, I'll provide the details in the section below.__


