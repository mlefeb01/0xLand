const Land = artifacts.require("../contracts/Land");
const truffleAssert = require("truffle-assertions");

contract("Land claim", (accounts) => {

    it("should claim an available chunk when claim is called", async () => {
        const contract = await Land.deployed();
        const account = accounts[0];
        const x = 0;
        const z = 0;

        const balanceBefore = await contract.balanceOf(account);
        assert.equal(balanceBefore, 0);

        await contract.claim(x, z);

        const balanceAfter = await contract.balanceOf(account);
        assert.equal(balanceAfter, 1);

        const tokenId = await contract.tokenOfOwnerByIndex(account, 0);
        const chunk = await contract.chunkByTokenId(tokenId);
        assert.equal(chunk['x'], x);
        assert.equal(chunk['z'], z);
    });

    it("should throw when claim is called on an already claimed chunk", async () => {
        const contract = await Land.deployed();
        const account = accounts[0];
        const x = 0;
        const z = 0;

        await truffleAssert.fails(
            contract.claim(x, z),
            truffleAssert.ErrorType.REVERT
        );
    })

});

contract("Land tokenURI", (accounts) => {

    it("should throw when tokenURI is called with an invalid token id", async () => {
        const contract = await Land.deployed();

        await truffleAssert.fails(
            contract.tokenURI(1),
            truffleAssert.ErrorType.REVERT
        );
    });

    it("should return a valid URI when tokenURI is called with a valid token id", async () => {
        const contract = await Land.deployed();
        const account = accounts[0];
        const x = 3;
        const z = 4;

        await contract.claim(x, z);
        const tokenId = await contract.tokenOfOwnerByIndex(account, 0);
        const uri = await contract.tokenURI(tokenId);

        // TODO check base64?
        assert.equal(true, true);
    });

});

contract("Land chunkByTokenId", (accounts) => {

    it("should throw when chunkByTokenId is called with an invalid token id", async() => {
        const contract = await Land.deployed();
        const tokenId = 1;

        await truffleAssert.fails(
            contract.chunkByTokenId(tokenId),
            truffleAssert.ErrorType.REVERT
        );
    });

    it("should return the corresponding chunk when chunkByTokenId is called with an invalid token id", async() => {
        const contract = await Land.deployed();
        const account = accounts[0];
        const x = 5;
        const z = 5;

        await contract.claim(x, z);

        const tokenId = await contract.tokenOfOwnerByIndex(account, 0);
        const chunk = await contract.chunkByTokenId(tokenId);
        assert.equal(chunk['x'], x);
        assert.equal(chunk['z'], z);
    });

});