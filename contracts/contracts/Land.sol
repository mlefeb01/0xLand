pragma solidity >=0.4.22 <0.9.0;

import "./ERC721Impl.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract Land is ERC721Impl {

    struct Chunk {
        int128 x;
        int128 z;
    }

    event Mint(uint256 _tokenId, int128 x, int128 z, address owner);

    mapping(uint256 => Chunk) _tokenIdToChunk;
    mapping(int256 => bool) _claimed;

    constructor() ERC721Impl("0xLand", "0XLAND") {}

    function claim(int128 x, int128 z) public {
        int256 hash = (x << 32) | z;

        require(!_claimed[hash], "This chunk has already been claimed!");

        uint256 tokenId = super.totalSupply() + 1;
        _tokenIdToChunk[tokenId] = Chunk(x, z);

        _claimed[hash] = true;
        
        super.mint(msg.sender, tokenId);

        emit Mint(tokenId, x, z, msg.sender);
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(super.exists(_tokenId), "Invalid TokenId");

        Chunk storage chunk = _tokenIdToChunk[_tokenId];

        bytes memory dataURI = abi.encodePacked(
            '{',
                '"name": "0xLand",',
                '"description": "Ownership of chunk",',
                '"type": "object",',
                '"properties": {',
                    abi.encodePacked('"x": ', chunk.x, ','),
                    abi.encodePacked('"z": ', chunk.z, ''),
                '}',
            '}'
        );

        return string(
            abi.encodePacked(
                "data:application/json;base64,",
                Base64.encode(dataURI)
            )
        );
    }

}
