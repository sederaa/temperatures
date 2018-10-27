import React, { Component } from 'react';
import './App.css';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Form, FormGroup, Label, InputGroup, InputGroupAddon } from 'reactstrap';
import classnames from 'classnames';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';


class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
      startDate: moment().subtract(7, 'days'),
      endDate: moment()
    };
    this.toggle = this.toggle.bind(this);
    this.handleDateChangeStart = this.handleDateChangeStart.bind(this);
    this.handleDateChangeEnd = this.handleDateChangeEnd.bind(this);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  handleDateChangeStart(date) {
    this.setState({
      startDate: date
    });
  }

  handleDateChangeEnd(date) {
    this.setState({
      endDate: date
    });
  }

  render() {
    return (
      <div className="App" style={{ maxWidth: 1000 + "px", margin: "0 auto" }}>
        <h1>Temperatures</h1>

        <Form inline>
          <FormGroup style={{marginRight:"1em"}}>
            <Label for="startDate" style={{margin:"0.5em"}}>From</Label>
            <DatePicker
              id="startDate"
              selected={this.state.startDate}
              selectsStart
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onChange={this.handleDateChangeStart}
              dateFormat="DD/MM/YYYY"
            />
          </FormGroup>
          <FormGroup>
            <Label for="endDate" style={{margin:"0.5em"}}>To</Label>
            <DatePicker
              id="endDate"
              selected={this.state.endDate}
              selectsEnd
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onChange={this.handleDateChangeEnd}
              dateFormat="DD/MM/YYYY"
            />
          </FormGroup>
        </Form>
        <br />

        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Table
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Graph
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <h4>Tab 1 Contents</h4>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="6">
                <Card body>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  <Button>Go somewhere</Button>
                </Card>
              </Col>
              <Col sm="6">
                <Card body>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  <Button>Go somewhere</Button>
                </Card>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default App;
