// import "bootstrap/dist/css/bootstrap.css";
import React, { Component } from "react";
import logo from "./react-fuse.svg";
import { FuseBox, InputBus, CurrentResults } from "../lib";
import {
  Container,
  CardTitle,
  CardBody,
  Row,
  Col,
  Navbar,
  NavbarBrand,
  Input,
  Card,
} from "reactstrap";
import styled from "styled-components";

class App extends Component {
  state = {
    list: [],
  };

  componentDidMount() {
    fetch("https://ghibliapi.herokuapp.com/films")
      .then(r => r.json())
      .then(list => this.setState({ list }));
  }

  render() {
    return (
      <FuseBox keys={["title", "description"]} list={this.state.list}>
        <div className="App">
          <Navbar light color="light">
            <NavbarBrand href="#">React Fuse</NavbarBrand>
            <Col lg={3}>
              <InputBus component={Input} autoFocus placeholder="Search title or description" />
            </Col>
          </Navbar>

          <br />
          <div className="App-intro">
            <CurrentResults>
              {({ state }) => {
                return (
                  <Container>
                    <Row>
                      {state.results.map(({ item }, index) => {
                        const active = state.selectedIndex === index;
                        const color = active ? "light" : null;
                        return (
                          <Col lg={3} key={item.id}>
                            <Card color={color}>
                              <CardBody>
                                <CardTitle>{item.title}</CardTitle>
                                {item.description}
                              </CardBody>
                            </Card>
                            <br />
                          </Col>
                        );
                      })}
                    </Row>
                  </Container>
                );
              }}
            </CurrentResults>
          </div>
        </div>
      </FuseBox>
    );
  }
}

export default App;
