const ERC721Mock = artifacts.require("../contracts/ERC721Mock");
const truffleAssert = require("truffle-assertions");
const zeroAddress = "0x0000000000000000000000000000000000000000";

// TODO make sure assert.equal(actual,expected)

/* ERC721 */

contract("ERC721Impl balanceOf", (accounts) => {

    it("should throw when balanceOf is called with zero address", async () => {
        const contract = await ERC721Mock.deployed();

        await truffleAssert.fails(
            contract.balanceOf(zeroAddress),
            truffleAssert.ErrorType.REVERT
        );
    });

    it("should return 0 when balanceOf is called by an account with 0 tokens", async () => {
        const contract = await ERC721Mock.deployed();
        const account = accounts[0];

        const balance = await contract.balanceOf(account);

        assert.equal(balance, 0);
    });

    it("should return 1 when balanceOf is called by an account with 1 token", async () => {
        const contract = await ERC721Mock.deployed();
        const account = accounts[0];
        const tokenId = 1;


        await contract.mintToken(account, tokenId);
        const balance = await contract.balanceOf(account);

        assert.equal(balance, 1);
    });

    it("should return 2 when balanceOf is called by an account with 2 tokens", async () => {
        const contract = await ERC721Mock.deployed();
        const account = accounts[0];
        const tokenId = 2;

        // tokenId 1 already minted to accounts[0] in previous test
        await contract.mintToken(account, tokenId);
        const balance = await contract.balanceOf(account);

        assert.equal(balance, 2);
    });

});

contract("ERC721Impl ownerOf", (accounts) => {

    it("should throw when ownerOf is called on an unminted tokenId", async () => {
        const contract = await ERC721Mock.deployed();
        const tokenId = 1;

        await truffleAssert.fails(
            contract.ownerOf(tokenId),
            truffleAssert.ErrorType.REVERT
        );
    });

    it("should return the owner when ownerOf is called on a minted tokenId", async () => {
        const contract = await ERC721Mock.deployed();
        const account = accounts[0];
        const tokenId = 1;

        await contract.mintToken(accounts[0], tokenId);

        const owner = await contract.ownerOf(tokenId);

        assert.equal(account, owner);
    });

});

contract("ERC721Impl safeTransferFrom/4", (accounts) => {

});

contract("ERC721Impl safeTransferFrom/3", (accounts) => {

});

contract("ERC721Impl transferFrom", (accounts) => {

});

contract("ERC721Impl approve", (accounts) => {

    it("should throw when approve is called with an invalid tokenId", async () => {
        const contract = await ERC721Mock.deployed();
        const tokenId = 1;
        const approved = accounts[1];

        await truffleAssert.fails(
            contract.approve(approved, tokenId),
            truffleAssert.ErrorType.REVERT
        );
    });

    it("should throw when approve is called with msg.sender not owning / not being an operator for the token", async () => {
        const contract = await ERC721Mock.deployed();
        const account = accounts[0];
        const tokenId = 1;

        const caller = accounts[1];

        await contract.mintToken(account, tokenId);

        await truffleAssert.fails(
            contract.approve(caller, tokenId, { from: caller }),
            truffleAssert.ErrorType.REVERT
        );
    });

    it("should add an approver when approve is called by token owner", async () => {
        const contract = await ERC721Mock.deployed();
        const tokenId = 1;
        const approved = accounts[2];

        await contract.approve(approved, tokenId);
        const result = await contract.getApproved(tokenId);

        assert.equal(result, approved);
    });

    it("should remove an approver when approve is called by token owner", async () => {
        const contract = await ERC721Mock.deployed();
        const tokenId = 1;

        await contract.approve(zeroAddress, tokenId);
        const result = await contract.getApproved(tokenId);

        assert.equal(result, zeroAddress);
    });

    it("should add an approver when approve is called by an operator for the token", async () => {
        const contract = await ERC721Mock.deployed();
        const account = accounts[0];
        const tokenId = 1;
        const operator = accounts[1];
        const approved = accounts[2];

        await contract.setApprovalForAll(operator, true);
        await contract.approve(approved, tokenId, { from: operator });
        const result = await contract.getApproved(tokenId);

        assert.equal(result, approved);
    });

    it("should remove an approver when approve is called by an operator for the token", async () => {
        const contract = await ERC721Mock.deployed();
        const account = accounts[0];
        const tokenId = 1;
        const operator = accounts[1];

        await contract.setApprovalForAll(operator, true);
        await contract.approve(zeroAddress, tokenId, { from: operator });
        const result = await contract.getApproved(tokenId);

        assert.equal(result, zeroAddress);
    });

});

contract("ERC721Impl setApprovalForAll", (accounts) => {

    it("should set an approved operator when setApprovalForAll is called with true", async () => {
        const contract = await ERC721Mock.deployed();
        const account = accounts[0];
        const operator = accounts[1];

        await contract.setApprovalForAll(operator, true);
        const approved = await contract.isApprovedForAll(account, operator);

        assert.equal(approved, true);
    });

    it("should remove a previously approved operator when setApprovalForAll is called with false", async () => {
        const contract = await ERC721Mock.deployed();
        const account = accounts[0];
        const operator = accounts[1];

        await contract.setApprovalForAll(operator, false);
        const approved = await contract.isApprovedForAll(account, operator);

        assert.equal(approved, false);
    });

});

contract("ERC721Impl getApproved", (accounts) => {

    it("should throw when getApproved is called with an invalid tokenId", async () => {
        const contract = await ERC721Mock.deployed();
        const tokenId = 1;

        await truffleAssert.fails(
            contract.getApproved(tokenId),
            truffleAssert.ErrorType.REVERT
        );
    });

    it("should return the zero address when getApproved is called on a tokenId with no address approved", async () => {
        const contract = await ERC721Mock.deployed();
        const account = accounts[0];
        const tokenId = 1;

        await contract.mintToken(account, tokenId);
        const result = await contract.getApproved(tokenId);

        assert.equal(result, zeroAddress);
    });

    it("should return the approved address when getApproval is called on a tokenId with an approved address", async () => {
        const contract = await ERC721Mock.deployed();
        const tokenId = 1;
        const approved = accounts[1];

        await contract.approve(approved, tokenId);
        const result = await contract.getApproved(tokenId);

        assert.equal(result, approved);
    });

    it("should return the zero address when getApproval is called on a tokenId with the approver removed", async () => {
        const contract = await ERC721Mock.deployed();
        const tokenId = 1;

        await contract.approve(zeroAddress, tokenId);
        const result = await contract.getApproved(tokenId);

        assert.equal(result, zeroAddress);
    });

});

contract("ERC721Impl isApprovedForAll", (accounts) => {

    it("should return false when isApprovedForAll is called on an address with no approved operators", async () => {
        const contract = await ERC721Mock.deployed();
        const account = accounts[0];
        const operator = accounts[1];

        const result = await contract.isApprovedForAll(account, operator);

        assert.equal(result, false);
    });

    it("should return true when isApprovedForAll is called on an address with an approved operator", async () => {
        const contract = await ERC721Mock.deployed();
        const account = accounts[0];
        const operator = accounts[1];

        await contract.setApprovalForAll(operator, true);
        const result = await contract.isApprovedForAll(account, operator);

        assert.equal(result, true);
    });

    it("should return false when isApprovedForAll is called on an address with a previously approved operator removed", async () => {
        const contract = await ERC721Mock.deployed();
        const account = accounts[0];
        const operator = accounts[1];

        await contract.setApprovalForAll(operator, false);
        const result = await contract.isApprovedForAll(account, operator);

        assert.equal(result, false);
    });

});

/* ERC721Metadata */

contract("ERC721Impl name", (accounts) => {

    it("should return the name when name is called", async () => {
        const contract = await ERC721Mock.deployed();

        const name = await contract.name();

        assert.equal(name, "ERC721Mock");
    });

});

contract("ERC721Impl symbol", (accounts) => {

    it("should return the symbol when symbol is called", async () => {
        const contract = await ERC721Mock.deployed();

        const symbol = await contract.symbol();

        assert.equal(symbol, "721MOCK");
    });

});

contract("ERC721Impl tokenURI", (accounts) => {

    it("should throw when tokenURI is called on an invalid tokenId", async () => {
        const contract = await ERC721Mock.deployed();
        const tokenId = 1;

        await truffleAssert.fails(
            contract.tokenURI(tokenId),
            truffleAssert.ErrorType.REVERT
        );
    });

    it("should return a valid URI when tokenURI is called on a valid tokenId", async () => {
        const contract = await ERC721Mock.deployed();
        const account = accounts[0];
        const tokenId = 1;

        await contract.mintToken(account, tokenId);
        const tokenURI = await contract.tokenURI(tokenId);

        // child contracts are expected to override this method, default impl returns empty string
        assert.equal(tokenURI, "");
    });

});

/* ERC721Enumerable */

contract("ERC721Impl totalSupply", (accounts) => {

    it("should return 0 when totalSupply is called with no tokens minted", async () => {
        const contract = await ERC721Mock.deployed();

        const supply = await contract.totalSupply();

        assert.equal(supply, 0);
    });

    it("should return 1 when totalSupply is called with one token minted", async () => {
        const contract = await ERC721Mock.deployed();
        const account = accounts[0];
        const tokenId = 1;

        await contract.mintToken(account, tokenId);
        const supply = await contract.totalSupply();

        assert.equal(supply, 1);
    });

    it("should return 2 when totalSupply is called with two tokens minted", async () => {
        const contract = await ERC721Mock.deployed();
        const account = accounts[0];
        const tokenId = 2;

        await contract.mintToken(account, tokenId);
        const supply = await contract.totalSupply();

        assert.equal(supply, 2);
    });

});

contract("ERC721Impl tokenByIndex", (accounts) => {

    it("should throw when tokenByIndex is called with index < totalSupply", async () => {
        const contract = await ERC721Mock.deployed();

        await truffleAssert.fails(
            contract.tokenByIndex(1),
            truffleAssert.ErrorType.REVERT
        );
    });

    it("should return the 1st tokenId when tokenByIndex is called with 1 token minted", async () => {
        const contract = await ERC721Mock.deployed();
        const account = accounts[0];
        const tokenId = 5000;

        await contract.mintToken(account, tokenId);
        const tokenByIndex = await contract.tokenByIndex(0);

        assert.equal(tokenByIndex, tokenId);
    });

    it("should return the 2nd tokenId when tokenByIndex is called with 2 tokens minted", async () => {
        const contract = await ERC721Mock.deployed();
        const account = accounts[0];
        const tokenId = 7500;

        await contract.mintToken(account, tokenId);
        const tokenByIndex = await contract.tokenByIndex(1);

        assert.equal(tokenByIndex, tokenId);
    });

});

contract("ERC721Impl tokenOfOwnerByIndex", (accounts) => {

    it("should throw when tokenOfOwnerByIndex is called with an address that has no tokens", async () => {
        const contract = await ERC721Mock.deployed();
        const account = accounts[0];
        const index = 0;

        await truffleAssert.fails(
            contract.tokenOfOwnerByIndex(account, index),
            truffleAssert.ErrorType.REVERT
        );
    });

    it("should return the first tokenId when tokenOfOwnerByIndex is called with an address that has 1 token", async () => {
        const contract = await ERC721Mock.deployed();
        const account = accounts[0];
        const tokenId = 5000;
        const index = 0;

        await contract.mintToken(account, tokenId);
        const result = await contract.tokenOfOwnerByIndex(account, index);

        assert.equal(result, tokenId);
    });

    it("should return the second tokenId when tokenOfOwnerByIndex is called with an adress that has 2 tokens", async () => {
        const contract = await ERC721Mock.deployed();
        const account = accounts[0];
        const tokenId = 7500;
        const index = 1;

        await contract.mintToken(account, tokenId);
        const result = await contract.tokenOfOwnerByIndex(account, index);

        assert.equal(result, tokenId);
    });

});

/* ERC165 */

contract("ERC721Impl supportsInterface", (accounts) => {
    const ERC165_INTERFACID = "0x01ffc9a7";
    const ERC721_INTERFACEID = "0x80ac58cd";
    const ERC721METADATA_INTERFACEID = "0x5b5e139f";
    const ERC721ENUMERABLE_INTERFACEID = "0x780e9d63";

    it("should return true when supportsInterface is called with ERC165 interfaceId", async () => {
        const contract = await ERC721Mock.deployed();

        const supports = await contract.supportsInterface(ERC165_INTERFACID);

        assert.equal(supports, true);
    });

    it("should return true when supportsInterface is called with ERC721 interfaceId", async () => {
        const contract = await ERC721Mock.deployed();

        const supports = await contract.supportsInterface(ERC721_INTERFACEID);

        assert.equal(supports, true);
    });

    it("should return true when supportsInterface is called with ERC721Enumerable interfaceId", async () => {
        const contract = await ERC721Mock.deployed();

        const supports = await contract.supportsInterface(ERC721ENUMERABLE_INTERFACEID);

        assert.equal(supports, true);
    });

    it("should return true when supportsInterface is called with ERC721Metadata interfaceId", async () => {
        const contract = await ERC721Mock.deployed();

        const supports = await contract.supportsInterface(ERC721METADATA_INTERFACEID);

        assert.equal(supports, true);
    });

    it("should return false when supportsInterface is called with unknown interfaceId", async () => {
        const contract = await ERC721Mock.deployed();

        const supports = await contract.supportsInterface("0xaaabbbcc");

        assert.equal(supports, false);
    });

});