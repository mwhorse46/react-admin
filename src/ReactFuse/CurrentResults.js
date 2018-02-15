import React from "react";
import PropTypes from "prop-types";

import { FuseContext } from "./FuseBox";

export default class CurrentResults extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
  };

  render() {
    return (
      <FuseContext.Consumer>
        {({ state }) => {
          return state.results.map((result, index) => {
            const active = state.selectedIndex === index;
            return this.props.children({ result, index, active });
          });
        }}
      </FuseContext.Consumer>
    );
  }
}
