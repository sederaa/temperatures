import React, { Component } from 'react';
import './App.css';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Form, FormGroup, Label, Table } from 'reactstrap';
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
      endDate: moment(),
      temperatures: [
        { When: moment(), ValueInCelsius: 23, Note: "Hello World!" },
      { When: moment(), ValueInCelsius: 23, Note: "Hello World!" },
      { When: moment(), ValueInCelsius: 23, Note: "Hello World!" }
    ]
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
          <FormGroup style={{ marginRight: "1em" }}>
            <Label for="startDate" style={{ margin: "0.5em" }}>From</Label>
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
            <Label for="endDate" style={{ margin: "0.5em" }}>To</Label>
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
                {this.state.temperatures.length > 0
                  ?
                  <Table striped hover size="sm" className="temperatures-table">
                    <thead>
                      <tr>
                        <th>Date &amp; Time</th>
                        <th>Value (°C)</th>
                        <th>Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.temperatures.map(t => <tr>
                        <td>{t.When.fromNow()} ({t.When.format("D MMM YYYY h:mm:A")})</td>
                        <td>{t.ValueInCelsius}</td>
                        <td>{t.Notes}</td>
                      </tr>)}
                    </tbody>
                  </Table>
                  : <p>No temperatures found for this date range.</p>}
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                Tab 2
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default App;
