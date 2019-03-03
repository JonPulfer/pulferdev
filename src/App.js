import React, {Component} from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
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
              <Nav.Link href="/travel" active>Travel Info</Nav.Link>
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
        <Container>
          <Row>
          <Col>
            <LoadTfLTubeLineStatus/>
          </Col>
          <Col>
            <Card>
              <Card.Header>Anglia Overground Rail</Card.Header>
              <a className="twitter-timeline" data-width="220" data-height="400"
                 href="https://twitter.com/greateranglia?ref_src=twsrc%5Etfw">Tweets by greateranglia</a>
              <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
            </Card>
          </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

class LoadTfLTubeLineStatus extends React.Component {

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
      <Card>
        <Card.Header>Tube line Status</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>Victoria Line: {this.state.victoriaLineStatus}</ListGroup.Item>
          <ListGroup.Item>Circle Line: {this.state.circleLineStatus}</ListGroup.Item>
        </ListGroup>
      </Card>
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
              <Nav.Link href="/about" active>About</Nav.Link>
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
        <Col>
          <div className="narrow">
            <p>
              I'm a programmer living in Ipswich and currently commuting into London. Although this does mean I travel
              more than some, it enables me to work with some really interesting people using technology that challenges
              me.
            </p>
            <p>
              At the moment I am working for a young company focused on finding and taking down illegal content created
              by large film and streaming companies. This isn't targeting the small, anonymous providers but the large
              commercial entities that are most likely using the content as a way to fund other illegal activities.
            </p>
          </div>
        </Col>
      </div>
    );
  }
}