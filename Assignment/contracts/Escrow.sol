// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Escrow{
    
    
    //  ==== > Constructor
    
    constructor(){
        arbitror = msg.sender;  // making them admin of the contract so that certain features can only be available to them
    }
    
    // ===== > State Variables 
    
    address arbitror;
    
    enum CONFIRMATION_STATUS { 
        INACTIVE            ,           
        FINALIZE_PAYMENT    ,           
        PENDING                         
    }
    
    struct Deposite{
        address payable depositor               ;
        address payable recipient               ;
        uint amount                             ;
        uint depositeTime                       ;
        CONFIRMATION_STATUS confirmation_status ;
    }
    
    mapping (address => Deposite) deposites;                // to have a mapping of all the deposites;
    
    mapping (address => bool) disabled_depositor;           // to check if the depositor has any pending deposite
    
    event DepositeStatusUpdate(address depositor_address, string deposite_status); //updates on the deposites
    
    // ====== > Moifiers
    
    modifier checkIfDepositorCanDeposite(address depositorAddress){
        require(disabled_depositor[depositorAddress] == false, "There is already an incomplete transaction for this depositor");
        disableDepositorToDeposite(depositorAddress);
        _;
    }
    
    modifier checkIfArbitror(address _requester){
        require(_requester == arbitror, "Sorry, only arbitror has access to this feature");
        _;
    }
    
    modifier withdrawalTimePermmission(address _requester){
        Deposite memory _depositeForThisAddress = deposites[_requester];
        require(block.timestamp - _depositeForThisAddress.depositeTime >= 1 days, "Amount can not be withdrawn within 24 hours of deposite"); // cheking needs to be done
        _;
    }
    
    modifier depositeStatusPermission( address _requester){
        Deposite memory _depositeForThisAddress = deposites[_requester];
        require(_depositeForThisAddress.confirmation_status == CONFIRMATION_STATUS.PENDING, "Access denied, can not perform action for this deposite");
        _;
    }
    
    modifier checkIfDipositorIsValid(address _requester){
        require(disabled_depositor[_requester] == true, "This account does not have permission to perform this action");
        _;
    }
    
    modifier checkIfPaymentHasBeenConfirmedByDepositor(address _depositor){
        require(deposites[_depositor].confirmation_status == CONFIRMATION_STATUS.FINALIZE_PAYMENT, "The depositor has not yet finalized the payment");
        _;
    }
    
    
    // ======= > Functions 
    
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
    
    function getDepositStatus(address depositorAddress) external view checkIfArbitror(msg.sender) returns(Deposite memory){ // this can only be called by the arbitror
        return deposites[depositorAddress];
    }
    
    function getContractBalance() external view returns(uint){
        return address(this).balance;
    }
    
    function disableDepositorToDeposite(address _depositorAddress) internal{
        disabled_depositor[_depositorAddress] = true;
    }
    

}