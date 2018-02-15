import React from "react";
import PropTypes from "prop-types";

import { FuseContext } from "./FuseBox";

export default class CurrentResults extends React.Component {
  static defaultProps = {
    maxResults: Infinity,
  };

  static propTypes = {
    children: PropTypes.func.isRequired,
  };

  render() {
    return (
      <FuseContext.Consumer>
        {({ state }) => {
          return state.results.slice(0, this.props.maxResults).map((result, index) => {
            const active = state.selectedIndex === index;
            return this.props.children({ result, index, active });
          });
        }}
      </FuseContext.Consumer>
    );
  }
}
