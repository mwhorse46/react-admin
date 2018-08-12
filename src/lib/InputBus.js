import React from "react";
import PropTypes from "prop-types";

import { FuseContext } from "./FuseBox";

export default class InputBus extends React.Component {
  handleChange(consumerOnChange) {
    return e => {
      consumerOnChange(e);
      this.props.onChange(e);
    };
  }

  render() {
    const { component: Component, ...rest } = this.props;

    return (
      <FuseContext.Consumer>
        {({ state, onKeyDown, onChange }) => (
          <Component
            {...rest}
            value={state.value}
            onKeyDown={onKeyDown}
            onChange={this.handleChange(onChange)}
          />
        )}
      </FuseContext.Consumer>
    );
  }

  static defaultProps = {
    component: "input",
  };

  static propTypes = {
    component: PropTypes.any,
  };
}
