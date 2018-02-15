import React from "react";
import PropTypes from "prop-types";

import { FuseContext } from "./FuseBox";

export default class InputBus extends React.Component {
  static defaultProps = {
    Component: "input",
  };

  static propTypes = {
    Component: PropTypes.any,
  };

  render() {
    const { Component, ...rest } = this.props;

    return (
      <FuseContext.Consumer>
        {({ state, onKeyDown, onChange }) => (
          <Component {...rest} value={state.value} onKeyDown={onKeyDown} onChange={onChange} />
        )}
      </FuseContext.Consumer>
    );
  }
}
