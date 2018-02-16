import React from "react";
import PropTypes from "prop-types";

import { FuseContext } from "./FuseBox";

export default class InputBus extends React.Component {
  static defaultProps = {
    component: "input",
  };

  static propTypes = {
    component: PropTypes.any,
  };

  render() {
    const { component: Component, ...rest } = this.props;

    return (
      <FuseContext.Consumer>
        {({ state, onKeyDown, onChange }) => (
          <Component {...rest} value={state.value} onKeyDown={onKeyDown} onChange={onChange} />
        )}
      </FuseContext.Consumer>
    );
  }
}
