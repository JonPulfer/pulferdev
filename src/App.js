import React, {Component} from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import './App.css';
import axios from 'axios';
import {BrowserRouter as Router, Route} from "react-router-dom";

class Index extends Component {
  render() {
    return (
      <div className="App">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">Jonathan Pulfer</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/travel/">Travel Info</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="https://twitter.com/jonathanpulfer">@jonathanpulfer</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Jumbotron fluid>
          <h1>Hello, world!</h1>
          <p>
            Here be dragons...
          </p>
        </Jumbotron>
      </div>
    );
  }
}

function AppRouter() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Index}/>
        <Route path="/travel/" component={TravelInfo}/>
        <Route path="/about/" component={About}/>
      </div>
    </Router>
  );
}

export default AppRouter;

class TravelInfo extends Component {
  render() {
    return (
      <div className="App">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">Jonathan Pulfer</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/travel">Travel Info</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="https://twitter.com/jonathanpulfer">@jonathanpulfer</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Jumbotron fluid>
          <h1>Hello, world!</h1>
          <p>
            Here be dragons...
          </p>
        </Jumbotron>
        <LoadTfLTubeLineStatus/>
      </div>
    );
  }
}

class LoadTfLTubeLineStatus extends React.Component {
  0

  constructor(props) {
    super(props);
    this.state = {
      lineStatus: []
    }
  }

  componentDidMount() {
    axios.get('https://api.tfl.gov.uk/Line/victoria%2Ccircle/Status?detail=true')
      .then(json => this.setState({
        victoriaLineStatus: json.data[1].lineStatuses[0].statusSeverityDescription,
        circleLineStatus: json.data[0].lineStatuses[0].statusSeverityDescription
      }))
      .catch(error => alert(error))
  }

  render() {
    return (
      <Container>
        <Col>
          <Card style={{width: '18rem'}}>
            <Card.Header>Tube line Status</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>Victoria Line: {this.state.victoriaLineStatus}</ListGroup.Item>
              <ListGroup.Item>Circle Line: {this.state.circleLineStatus}</ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Container>
    )
  }
}

class About extends Component {
  render() {
    return (
      <div className="App">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">Jonathan Pulfer</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/travel">Travel Info</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="https://twitter.com/jonathanpulfer">@jonathanpulfer</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Jumbotron fluid>
          <h1>Hello, world!</h1>
          <p>
            Here be dragons...
          </p>
        </Jumbotron>
        <p>
          I'm a system engineer currently living in Ipswich and working in London.
        </p>
      </div>
    );
  }
}