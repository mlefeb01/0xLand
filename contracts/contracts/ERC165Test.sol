pragma solidity >=0.7.0 <0.9.0;

contract ERC165Test {
    bytes4 constant public ERC165_ID = 0x01ffc9a7;
    bytes4 constant public ERC721_ID = 0x80ac58cd;
    bytes4 constant public ERC721METADATA_ID = 0x5b5e139f;
    bytes4 constant public ERC721ENUMERABLE_ID = 0x780e9d63;

    function erc165InterfaceId() public pure returns(bytes4) {
        return 
            bytes4(keccak256('supportsInterface(bytes4)'))
        ;
    }

    function erc721InterfaceId() public pure returns (bytes4) {
        return 
            bytes4(keccak256('balanceOf(address)')) ^
            bytes4(keccak256('ownerOf(uint256)')) ^
            bytes4(keccak256('safeTransferFrom(address,address,uint256,bytes)')) ^
            bytes4(keccak256('safeTransferFrom(address,address,uint256)')) ^
            bytes4(keccak256('transferFrom(address,address,uint256)')) ^
            bytes4(keccak256('approve(address,uint256)')) ^
            bytes4(keccak256('setApprovalForAll(address,bool)')) ^
            bytes4(keccak256('getApproved(uint256)')) ^
            bytes4(keccak256('isApprovedForAll(address,address)'))
        ;    
    }

    function erc721MetadataInterfaceId() public pure returns (bytes4) {
        return 
            bytes4(keccak256('name()')) ^
            bytes4(keccak256('symbol()')) ^
            bytes4(keccak256('tokenURI(uint256)'))
        ;
    }

    function erc721EnumerableInterfaceId() public pure returns (bytes4) {
        return
            bytes4(keccak256('totalSupply()')) ^
            bytes4(keccak256('tokenByIndex(uint256)')) ^
            bytes4(keccak256('tokenOfOwnerByIndex(address,uint256)'))
        ;
    }


}