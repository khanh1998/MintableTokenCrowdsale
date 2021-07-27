pragma solidity ^0.8.4;

import "./MintedCrowdsale.sol";
import "./Kyc.sol";

contract KTokenSale is MintedCrowdsale {
    Kyc kyc;
    constructor(
        uint256 rate, // rate in TKNbits
        address payable wallet,
        IERC20 token,
        Kyc _kyc
    ) Crowdsale(rate, wallet, token) {
        kyc = _kyc;
    }

    function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view override {
        super._preValidatePurchase(beneficiary, weiAmount);
        require(kyc.kycCompleted(msg.sender), "kyc not completed, perchase not allowed");
    }
}
