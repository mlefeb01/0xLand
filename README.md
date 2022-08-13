## Introduction

NFT-Based Minecraft chunk ownership done on a first come first serve basis (no whitelist,
no reserved chunks, etc.)

## Features
Smart contract (Solidity)
- ERC721 [Non-Fungible Token Standard](https://eips.ethereum.org/EIPS/eip-721)
- Each token corresponds to a chunk in-game (metadata contains the X/Z coordinate)
- Unit tests

Minecraft Plugin (Java)
- Allows users to link addresses
- Prevents interacting with chunks the player does not own
- Chunk border visualization

Web App (React)
- Allows users to connect MetaMask wallet and “mint” 


## Getting Started
### Installation and Setup
1. Install [Solidity](https://docs.soliditylang.org/en/v0.8.16/installing-solidity.html#installing-solidity), [Truffle](https://trufflesuite.com/docs/vscode-ext/installation-guide/),  [Java](https://www.oracle.com/java/technologies/downloads/), [Maven](https://maven.apache.org/download.cgi), [React]()
2. Clone this repository

        > git clone https://github.com/mlefeb01/0xLand.git

3. Smart Contracts

        > cd contracts
        > npm install
        > truffle test
        Edit the truffle-config.js deployments section
        > nano truffle-config.js
        > truffle deploy

4. Web App

        > cd frontend
        > npm install
        > cd src
        Update the contractAddress variable to the address of the contract (Land.sol) deployed in previous section
        > nano config.js
        > cd ..
        > npm start

5. Minecraft Plugin

        > cd plugin
        > mvn clean package
        Upload the plugin jar into the /plugins directory of your Minecraft server
        Run the server to generate the plugins datafolder and config file then update the config variables

## Demo video

https://youtu.be/90hDuw4OJ6c

## Contributors

* Matt Lefebvre (lefebvrem@wit.edu), Team Lead
* Munir Baara (baaram@wit.edu), Developer
