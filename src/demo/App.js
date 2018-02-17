// import "bootstrap/dist/css/bootstrap.css";
import React, { Component } from "react";
import logo from "./react-fuse.svg";
import { Highlighter, FuseBox, InputBus, CurrentResults } from "../lib";
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
                      {state.results.map(({ item, matches }, index) => {
                        const active = state.selectedIndex === index;
                        const color = active ? "light" : null;

                        const title = (
                          <Highlighter
                            match={matches.find(o => o.key === "title")}
                            key="title"
                            string={item.title}
                          />
                        );

                        const description = (
                          <Highlighter
                            match={matches.find(o => o.key === "description")}
                            key="description"
                            string={item.description}
                          />
                        );

                        return (
                          <Col lg={3} key={item.id}>
                            <Card color={color}>
                              <CardBody>
                                <CardTitle>{title}</CardTitle>
                                {description}
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
