// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Escrow{
    
    
    //  ============================== > Constructor
    
    constructor(){
        arbitror = msg.sender;  // making them admin of the contract so that certain features can only be available to them
    }
    
    // ============================== > State Variables 
    
    address arbitror;
    
    enum CONFIRMATION_STATUS { 
        INACTIVE            ,           // 0, this is the default status 
        FINALIZE_PAYMENT    ,           // 2, when depositor confirms that recipient can recieve the money
        PENDING                         // 5, when the deposite is still active but the payment to the recipient is yet pending
    }
    
    struct Deposite{
        address payable depositor               ;
        address payable recipient               ;
        uint amount                             ;
        uint depositeTime                       ;
        CONFIRMATION_STATUS confirmation_status ;
    }
    
    mapping (address => Deposite) deposites;                // to have a mapping of all the deposites,deposites are identified by the depositor's address;
    
    mapping (address => bool) disabled_depositor;           // to check if the depositor has any pending deposite, in case 'yes' they will not be able to deposite any further ammount unless they withdraw or their recipient recieves the money
    
    event DepositeStatusUpdate(address depositor_address, string deposite_status); // updates on the deposites
    
    // ============================== > Moifiers
    
    // modifier:1 -> this confirms that the dipositor is unable to deposite more than once,
    // they can only deposite when they don't have any pending payment or if they cancel their previous deposite
    modifier checkIfDepositorCanDeposite(address depositorAddress){
        require(disabled_depositor[depositorAddress] == false, "There is already an incomplete transaction for this depositor");
        disableDepositorToDeposite(depositorAddress);
        _;
    }
    
    // modifier:2 -> this checks if the invoker of the funciton is the arbritror or not
    modifier checkIfArbitror(address _requester){
        require(_requester == arbitror, "Sorry, only arbitror has access to this feature");
        _;
    }
    
    // modifier:3 -> this checks if the depositor is trying to withdraw their deposite within 24 hours or not
    modifier withdrawalTimePermmission(address _requester){
        Deposite memory _depositeForThisAddress = deposites[_requester];
        require(block.timestamp - _depositeForThisAddress.depositeTime >= 1 days, "Amount can not be withdrawn within 24 hours of deposite"); // cheking needs to be done
        _;
    }
    
    // modifier:4 -> this modifier ensures that the arbritror won't be able to send the money to the 
    // recipent until the depositor confirms it
    modifier depositeStatusPermission( address _requester){
        Deposite memory _depositeForThisAddress = deposites[_requester];
        require(_depositeForThisAddress.confirmation_status == CONFIRMATION_STATUS.PENDING, "Access denied, can not perform action for this deposite");
        _;
    }
    
    // modifier:5 -> this checks if the depositor is valid one, this modifier is a bit redundant 
    // but there might come certain situations when this could be useful
    modifier checkIfDipositorIsValid(address _requester){
        require(disabled_depositor[_requester] == true, "This depositor address is not valid for this action");
        _;
    }
    
    // modifier:6 -> checks if the depositor has finalized the payment, after this, 
    // the arbitror can unlock the money for the recipient
    modifier checkIfPaymentHasBeenConfirmedByDepositor(address _depositor){
        require(deposites[_depositor].confirmation_status == CONFIRMATION_STATUS.FINALIZE_PAYMENT, "The depositor has not yet finalized the payment");
        _;
    }
    
    
    
    // ============================== > Functions 
    
    // function:1 ->
    // 1. checks if the depositor has permission to deposite
    // 2. creates the deposite with all necessary informations
    // 3. adds the deposite information in the map , where depositor's address is the key and the deposite is the value. This deposite can be tracked again with the depositor's id only
    // 4. emits an event after successfully createing a new deposite
    function depositeCreate(address payable _recipient) external payable checkIfDepositorCanDeposite(msg.sender){
        address payable _depositor = payable(msg.sender);
        Deposite memory _deposite = Deposite(
                                        {
                                            depositor               :   _depositor,
                                            recipient               :   _recipient,
                                            amount                  :   msg.value,
                                            depositeTime            :   block.timestamp,
                                            confirmation_status     :   CONFIRMATION_STATUS.PENDING 
                                        }
                                    );
        deposites[_depositor] = _deposite;
        
        emit DepositeStatusUpdate(_deposite.depositor, "Deposite CREATED, Status for this depositor's deposite is : PENDING");
    }
    
    // function:2 ->
    // This function helps the depositor to change the status of the deposite and finalize the payment, so that the arbritror can
    // unlock the deposite and send it to the recipient. After successful execution, this function emits an event so that the
    // arbritror may become aware of the confimation(arbritor needs to listen to the event from outside the network)
    function confirmServiceDelivery() external checkIfDipositorIsValid(msg.sender)  depositeStatusPermission(msg.sender) {
        
        deposites[msg.sender].confirmation_status = CONFIRMATION_STATUS.FINALIZE_PAYMENT;
        
        emit DepositeStatusUpdate(msg.sender, "payment for recipient CONFIRMED, Status for this depositor's deposite is : FINALIZE_PAYMENT , please wait for the arbitror to unlock the deposite");
    }
    
    function unlockDeposite(address _depositor) external checkIfArbitror(msg.sender) checkIfDipositorIsValid(_depositor) checkIfPaymentHasBeenConfirmedByDepositor( _depositor) {                 // this can only be called by the arbitror
        
        Deposite memory _deposite = deposites[_depositor];
        uint amount_to_be_transferred = _deposite.amount;
        
        _deposite.recipient.transfer(amount_to_be_transferred);
        
        delete deposites[_depositor];
        delete disabled_depositor[_depositor];
        
        emit DepositeStatusUpdate(_depositor,  "payment sent to recipient, Status for this depositor's deposite is : INACTIVE");
    }
    
    function withdrawDeposite() external checkIfDipositorIsValid(msg.sender) withdrawalTimePermmission(msg.sender) depositeStatusPermission(msg.sender){    
        
        Deposite memory _deposite = deposites[msg.sender];        
        _deposite.depositor.transfer(_deposite.amount);
        
        delete deposites[msg.sender];
        delete disabled_depositor[msg.sender];
        
        emit DepositeStatusUpdate(_deposite.depositor, "Deposite WITHDRAWN, Status for this depositor's deposite is : INACTIVE");
    }
    
    function getDepositStatus(address _depositorAddress) external view checkIfArbitror(msg.sender) checkIfDipositorIsValid(_depositorAddress) returns(Deposite memory){ // this can only be called by the arbitror
        
        return deposites[_depositorAddress];
    
        
    }
    
    function getContractBalance() external view returns(uint){
        return address(this).balance;
    }
    
    function disableDepositorToDeposite(address _depositorAddress) internal{
        disabled_depositor[_depositorAddress] = true;
    }
    

}