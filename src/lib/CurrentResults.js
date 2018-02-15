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
      <FuseContext.Consumer>{({ state }) => this.props.children({ state })}</FuseContext.Consumer>
    );
  }
}
