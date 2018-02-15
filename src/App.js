import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { FuseBox, InputBus, CurrentResults } from "./ReactFuse";

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

            <ul>
              <CurrentResults>
                {({ result, index, active }) => {
                  return <li key={result.item.id}>{result.item.title}</li>;
                }}
              </CurrentResults>
            </ul>
          </FuseBox>
        </div>
      </div>
    );
  }
}

export default App;
