import React, {Component} from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import './App.css';
import axios from 'axios';
import {BrowserRouter as Router, Route} from "react-router-dom";

// Apex landing page. This currently has nothing particularly interesting on it but will include other components as I
// experiment more with React.
class Index extends Component {
  render() {
    return (
      <div className="App">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">Jonathan Pulfer</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/afrita">Afrita</Nav.Link>
              <Nav.Link href="/travel">Travel Info</Nav.Link>
            </Nav>
            <SocialNav/>
          </Navbar.Collapse>
        </Navbar>
        <Jumbotron fluid>
          <h1>Hello, world!</h1>
          <p>
            Here be dragons...
          </p>
        </Jumbotron>
        <p>
          Home to things I'm currently messing around with.
        </p>
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
        <Route path="/afrita/" component={Afrita}/>
      </div>
    </Router>
  );
}

// These are my common social links used in the nav bar.
function SocialNav() {
  return (
    <Nav>
      <Nav.Link href="https://keybase.io/jonp">Keybase</Nav.Link>
      <Nav.Link href="https://github.com/jonpulfer">Github</Nav.Link>
      <Nav.Link href="https://www.linkedin.com/in/jon-pulfer-3b407b2/">LinkedIn</Nav.Link>
      <Nav.Link href="https://twitter.com/jonathanpulfer">@jonathanpulfer</Nav.Link>
    </Nav>

  );
}

export default AppRouter;

// /travel page that loads content from APIs and aggregates the information that is relevant for my common journeys
// like my commute.
class TravelInfo extends Component {
  render() {
    return (
      <div className="App">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">Jonathan Pulfer</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/afrita">Afrita</Nav.Link>
              <Nav.Link href="/travel" active>Travel Info</Nav.Link>
            </Nav>
            <SocialNav/>
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
                <Card.Body>
                  <a className="twitter-timeline" data-width="220" data-height="400"
                     href="https://twitter.com/greateranglia?ref_src=twsrc%5Etfw">Tweets by greateranglia</a>
                  <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
                </Card.Body>
              </Card>
              <LoadTfLLivStrStationStatus/>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

// Load the line status information for the selected lines from the TfL API.
class LoadTfLTubeLineStatus extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lineStatus: []
    }
  }

  componentDidMount() {
    axios.get('https://api.tfl.gov.uk/Line/circle%2Chammersmith-city%2Cmetropolitan%2Cvictoria/Status', {
      params: {
        app_id: '40643cfa',
        app_key: '5fe0a9809625e701fdc1e05bad9aaaac',
        detail: true
      }
    })
      .then(json => this.setState({
        lineStatus: json.data
      }))
      .catch(error => alert(error))
  }

  render() {
    return (
      <ListGroup>
        <Card>
          <Card.Header>Tube line Status</Card.Header>
          <Card.Body>
            <ListGroup><TfLLineList lines={this.state.lineStatus}/></ListGroup>
          </Card.Body>

        </Card>
      </ListGroup>
    )
  }
}

// For the provided list of TfL lines, render as a list the cards containing the details.
function TfLLineList(props) {
  console.log(process.env.API_KEY);
  const lines = props.lines;
  const lineItems = lines.map((line) =>
    <Card key={line.id}>
      <Card.Header>{line.name}</Card.Header>
      <Card.Body>
        <TfLLineStatusList lineStatuses={line.lineStatuses}/>
      </Card.Body>
    </Card>
  );

  return (
    <ListGroup>{lineItems}</ListGroup>
  );
}

// Render the details of a line status as a card to be placed in a list.
function TfLLineStatusList(props) {
  const lines = props.lineStatuses;
  const lineStatusItems = lines.map((status, index) =>
    <div key={index}>
      <h4>{status.statusSeverityDescription}</h4>
      <p>{status.reason}</p>
      <hr/>
    </div>
  );

  return (
    <ListGroup>{lineStatusItems}</ListGroup>
  );
}

// Load the Liverpool street station disruption information from the TfL API.
class LoadTfLLivStrStationStatus extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      livStreetStatus: []
    }
  }

  componentDidMount() {
    axios.get('https://api.tfl.gov.uk/StopPoint/HUBLST/Disruption', {
      params: {
        app_id: '40643cfa',
        app_key: '5fe0a9809625e701fdc1e05bad9aaaac',
        getFamily: false,
        includeRouteBlockedStops: false,
      }
    })
      .then(json => this.setState({
        livStreetStatus: json.data
      }))
      .catch(error => alert(error))
  }

  render() {
    return (
      <Card>
        <Card.Header>Liverpool Street disruptions</Card.Header>
        <Card.Body>
          <ListGroup>
            {this.state.livStreetStatus.fromDate}<br/>
            {this.state.livStreetStatus.toDate}<br/>
            <p>{this.state.livStreetStatus.description}</p>
          </ListGroup>
        </Card.Body>
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
              <Nav.Link href="/about" active>About</Nav.Link>
              <Nav.Link href="/afrita">Afrita</Nav.Link>
              <Nav.Link href="/travel">Travel Info</Nav.Link>
            </Nav>
            <SocialNav/>
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
              I'm a programmer (predominantly Go and Rust) living in Ipswich and currently commuting into London.
              Although this does mean I travel more than some, it enables me to work with some really interesting
              people using technology that challenges me. I enjoy helping people and fixing things, which provides
              me with plenty to learn and helps keep me energised.
            </p>
            <p>
              I'm always happy to hear about new opportunities and welcome connections via one of the social
              accounts in the links at the top.
            </p>
            <p>
              When I'm not working, the main draw on my time is my sailing vessel, Afrita.
            </p>
            <p>Other hobbies I enjoy are: -
              <ListGroup>
                <li>Painting in Acrylics</li>
                <li>Knitting</li>
                <li>Sewing and making clothes</li>
                <li>Music</li>
                <li>Playing Guitar</li>
              </ListGroup>
            </p>
          </div>
        </Col>
      </div>
    );
  }
}

class Afrita extends Component {
  render() {
    return (
      <div className="App">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">Jonathan Pulfer</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/afrita" active>Afrita</Nav.Link>
              <Nav.Link href="/travel">Travel Info</Nav.Link>
            </Nav>
            <SocialNav/>
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
            <Col xs lg="4">
              <Card>
                <Card.Header>
                  Specifications:
                </Card.Header>
                <Card.Body>
                  <p>
                    <a href="https://www.c032.org/">Contessa 32</a>
                  </p>
                  <p>
                    <ul>
                      <li>Length (LOA): 32 ft / 9.75m</li>
                      <li>Width (Beam): 10ft / 3m</li>
                      <li>Keel (Draft): 5ft 6in / 1.75m</li>
                      <li>Year (Constructed): 1978</li>
                    </ul>
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Header>Afrita</Card.Header>
                <Card.Body>
                  <div class="float-left"><Image src={"/Afrita.png"} rounded/></div>
                  <p>
                    Afrita was completed in 1978 by the Jeremy Rogers boat yard in Lymington.
                    Originally she was called Sunrise and then, at some point before 1984, her name was changed. I
                    purchased her from a lovely family in Scotland in 2016 and have been enjoying sailing her ever
                    since.
                  </p>
                  <p>
                    Currently I berth her at Ipswich Haven marina in the historic dock in town. This means she is only a
                    few minutes walk away from home, one of the local cafes/restaurants or shops.
                  </p>
                  <p>
                    I'm still building up my offshore experience with the goal to eventually cross oceans. My dream is
                    to
                    explore the pacific islands. Particularly Galapagos, the Atolls and Hawaii before arriving in
                    Sydney.
                    What I'll do if I make it that far is not in the dream at the moment but who knows!
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}