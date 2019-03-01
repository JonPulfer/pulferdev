import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Jonathan Pulfer</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#travel">Travel Info</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="https://twitter.com/jonathanpulfer">@jonathanpulfer</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Jumbotron>
          <h1>Hello, world!</h1>
          <p>
            Here be dragons...
          </p>
        </Jumbotron>
      </div>
    );
  }
}

export default App;
