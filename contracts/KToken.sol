pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract KToken is ERC20 {

    constructor(uint256 _initialSupply) ERC20('StarDucks Capu-Token', 'SCT') {
        _mint(msg.sender, _initialSupply);
    }

    function decimals() public pure override returns (uint8) {
        return 0;
    }
}