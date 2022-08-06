pragma solidity >=0.4.22 <0.9.0;

import "./ERC721Impl.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Land is ERC721Impl {

    struct Chunk {
        int128 x;
        int128 z;
    }

    event Mint(uint256 _tokenId, int128 x, int128 z, address owner);

    mapping(uint256 => Chunk) private _tokenIdToChunk;
    mapping(int256 => bool) private _claimed;

    constructor() ERC721Impl("0xLand", "0XLAND") {}

    function claim(int128 x, int128 z) public {
        int256 hash = (int256(x) << 128) | z;

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
                    abi.encodePacked('"x": "', signedIntToStr(chunk.x), '",'),
                    abi.encodePacked('"z": "', signedIntToStr(chunk.z), '"'),
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

    function chunkByTokenId(uint256 _tokenId) public view returns(Chunk memory) {
        require(exists(_tokenId), "Invalid tokenId");
        return _tokenIdToChunk[_tokenId];
    }

    function signedIntToStr(int128 num) internal pure returns(string memory) {
        bool negative = num < 0;
        uint256 flipped = uint256(int256(num < 0 ? num * -1 : num));
        if (negative) {
            return string(abi.encodePacked("-", Strings.toString(flipped)));
        } else {
            return string(abi.encodePacked(Strings.toString(flipped)));
        }
    }

}
