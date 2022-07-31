pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import "@openzeppelin/contracts/utils/introspection/IERC165.sol";

abstract contract ERC721Impl is IERC721, IERC721Enumerable, IERC721Metadata {
    mapping(address => uint256) private _balances;
    mapping(uint256 => address) private _owners;
    mapping(uint256 => address) private _approvals;
    mapping(address => mapping(address => bool)) private _operators;
    string private _name;
    string private _symbol;
    uint256 private _supply;
    uint256[] private _tokenIds;

    /**
     * 
     */
    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        symbol_ = symbol_;
    }

    // ERC721

    /**
     * 
     */
    function balanceOf(address owner)
        public
        view
        override
        returns (uint256 balance)
    {
        return 0;
    }

    /**
     * 
     */
    function ownerOf(uint256 tokenId)
        public
        view
        override
        returns (address owner)
    {
        return address(0);
    }

    /**
     * 
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes calldata data
    ) public override {}

    /**
     * 
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256
    ) public override {}

    /**
     * 
     */
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override {}

    /**
     * 
     */
    function approve(address to, uint256 tokenId) public override {}

    /**
     * 
     */
    function setApprovalForAll(address operator, bool _approved)
        public
        override
    {}

    /**
     * 
     */
    function getApproved(uint256 tokenId)
        public
        view
        override
        returns (address operator)
    {
        return address(0);
    }

    /**
     * 
     */
    function isApprovedForAll(address owner, address operator)
        public
        view
        override
        returns (bool)
    {
        return false;
    }

    // ERC721Metadata

    /**
     * 
     */
    function name() public view override returns (string memory) {
        return _name;
    }

    /**
     * 
     */
    function symbol() public view override returns (string memory) {
        return _symbol;
    }

    /**
     * 
     */
    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        return "";
    }

    // ERC721Enumerable

    /**
     * 
     */
    function totalSupply() public view override returns (uint256) {
        return 0;
    }

    /**
     * 
     */
    function tokenOfOwnerByIndex(address owner, uint256 index)
        public
        view
        override
        returns (uint256)
    {
        return 0;
    }

    /**
     * 
     */
    function tokenByIndex(uint256 index)
        public
        view
        override
        returns (uint256)
    {
        return 0;
    }

    // ERC165

    /**
     * 
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override
        returns (bool)
    {
        return false;
    }

    // Other

    function mint(address to, uint256 tokenId) internal {

    } 

}
