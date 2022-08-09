import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './images/logo.png';
import { useMetaMask } from "metamask-react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from 'react';
import { web3, landContract } from "./config.js";

function App() {
  // metamask auth
  // account will be null if unauthed, nonnull if authed
  const { status, connect, account, chainId, ethereum } = useMetaMask();

  const [state, setState] = useState({ x: 0, z: 0});

  function formatAddress(account) {
    return account.substring(0, 5) + '...' + account.substring(account.length - 4);
  }

  function setX(event) {
    state.x = event.target.value;
    setState(state);
  }

  function setZ(event) {
    state.z = event.target.value;
    setState(state);
  }

  function mint() {
    //landContract.methods.totalSupply().call().then(resp => console.log(resp));
    landContract.methods.claim(state.x, state.z).send({ from: account, gas: 5000000 }, function(error, hash) {
      console.log(error);
      console.log(hash);
    });
  }

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          {/* Logo */}
          <Navbar.Brand>
            <img
              src={logo}
              width="50"
              height="50"
            />
          </Navbar.Brand>
          {/* Title */}
          <Nav>
            <div>
              <h1 className="text">0xLand</h1>
            </div>
          </Nav>
          {/* MetaMask authentication */}
          <Nav>
            <div className="metamask-auth">
              <Button className="button" onClick={connect} disabled={account} variant="secondary">Connect to MetaMask</Button>{''}
              <div className="text">User: <b>{account ? formatAddress(account) : 'Not Conenctd'}</b></div>
            </div>
          </Nav>
        </Container>
      </Navbar>

      <div className="mint">
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">X</InputGroup.Text>
          <Form.Control
            placeholder="0"
            aria-label="X"
            aria-describedby="basic-addon1"
            disabled={!account}
            onChange={setX}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Z</InputGroup.Text>
          <Form.Control
            placeholder="0"
            aria-label="Z"
            aria-describedby="basic-addon1"
            disabled={!account}
            onChange={setZ}
          />
        </InputGroup>
        <Button disabled={!account} onClick={mint}>Mint</Button>{''}
      </div>
    </div>
  );
}

export default App;