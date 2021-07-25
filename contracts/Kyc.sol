pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Kyc is Ownable {
    mapping(address => bool) allowed;

    function setKycCompleted(address _add) public onlyOwner {
        allowed[_add] = true;
    }

    function setKycRevork(address _add) public onlyOwner {
        allowed[_add] = false;
    }

    function kycCompleted(address _add) public view returns(bool) {
        return allowed[_add];
    }
}