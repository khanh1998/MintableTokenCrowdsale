pragma solidity ^0.8.4;

// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./ERC20Mintable.sol";

contract KToken is ERC20Mintable {

    // constructor(uint256 _initialSupply) ERC20Mintable('StarDucks Capu-Token', 'SCT') {
    //     _mint(msg.sender, _initialSupply);
    // }

    // we don't need initial supply anymore, because the token is mintable now
    // so we can mint token on fly
    constructor() ERC20Mintable('StarDucks Capu-Token', 'SCT') {}

    function decimals() public pure override returns (uint8) {
        return 0;
    }
}