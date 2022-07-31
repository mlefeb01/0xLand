pragma solidity >=0.4.22 <0.9.0;

import "./ERC721Impl.sol";

contract Land is ERC721Impl {

    struct Chunk {
        uint256 x;
        uint256 z;
    }

    Chunk[] private chunks;

    constructor() ERC721Impl("", "") {}

    function claim(uint256 x, uint256 z) public {

    }

}
