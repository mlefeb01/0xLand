pragma solidity >=0.4.22 <0.9.0;

import "./ERC721Impl.sol";

contract ERC721Mock is ERC721Impl {

    constructor () ERC721Impl("ERC721Mock", "721MOCK") {}

    function mintToken(address _to, uint256 _tokenId) public {
        super.mint(_to, _tokenId);
    }

}