import React, { Component } from "react";
import logo from "./fuse.svg";
import "./App.css";
import { FuseBox, InputBus, CurrentResults } from "./../ReactFuse";

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
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          <FuseBox keys={["title", "description"]} list={this.state.list}>
            <InputBus />

            <CurrentResults>
              {({ state }) => {
                return (
                  <ul>
                    {state.results.map((result, index) => {
                      const active = state.selectedIndex === index;
                      return (
                        <li key={result.item.id}>
                          {active && "💩"}
                          <big>{result.item.title}</big> -&nbsp;
                          <small>{result.item.description}</small>
                        </li>
                      );
                    })}
                  </ul>
                );
              }}
            </CurrentResults>
          </FuseBox>
        </div>
      </div>
    );
  }
}

export default App;
