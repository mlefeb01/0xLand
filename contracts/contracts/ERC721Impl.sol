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
        _symbol = symbol_;
    }

    // ERC721

    /**
     * 
     */
    function balanceOf(address _owner)
        public
        view
        override
        returns (uint256)
    {
        return _balances[_owner];
    }

    /**
     * 
     */
    function ownerOf(uint256 _tokenId)
        public
        view
        override
        returns (address)
    {
        address owner = _owners[_tokenId];
        require(owner != address(0), "TokenId not minted");
        return owner;
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
    function approve(address _approved, uint256 _tokenId) public override {
            address owner = _owners[_tokenId];
            require(msg.sender == owner || _operators[owner][msg.sender], "You are not owner or operator");
            if (_approved == address(0)) {
                delete _approvals[_tokenId];
            } else {
                _approvals[_tokenId] = _approved;
            }
    }

    /**
     * 
     */
    function setApprovalForAll(address _operator, bool _approved)
        public
        override
    {
        if (_approved) {
            _operators[msg.sender][_operator] = true;
        } else {
            delete _operators[msg.sender][_operator];
        }
    }

    /**
     * 
     */
    function getApproved(uint256 _tokenId)
        public
        view
        override
        returns (address)
    {
        require(_owners[_tokenId] != address(0), "Token Id not valid");
        return _approvals[_tokenId];
    }

    /**
     * 
     */
    function isApprovedForAll(address _owner, address _operator)
        public
        view
        override
        returns (bool)
    {
        return _operators[_owner][_operator];
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
