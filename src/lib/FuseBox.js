import React from "react";
import PropTypes from "prop-types";
import Fuse from "fuse.js";

export const FuseContext = React.createContext({});

export default class FuseBox extends React.Component {
  static defaultProps = {
    defaultSearch: "",
    maxResults: 20,
    handleChange: () => {},
    handleSubmit: () => {},
  };

  static propTypes = {
    keys: PropTypes.array.isRequired,
    list: PropTypes.array.isRequired,
    maxResults: PropTypes.number,
    options: PropTypes.object,
    defaultSearch: PropTypes.string,
  };

  constructor(props) {
    super(props);

    const value = this.props.defaultSearch;
    const fuse = new Fuse(this.props.list, this.getOptions(this.props));
    const results = fuse.search(value);

    this.state = {
      value,
      fuse,
      results,
      selectedIndex: 0,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.list !== prevProps.list) {
      const fuse = new Fuse(this.props.list, this.getOptions(prevProps));
      const results = fuse.search(this.value);
      this.setState({ fuse, results });
    }
  }

  getOptions(props) {
    return {
      includeMatches: true,
      shouldSort: true,
      threshold: 0.4,
      minMatchCharLength: 2,
      keys: props.keys,
      ...props.options,
    };
  }

  handleInputChange = event => {
    event.preventDefault();
    const { value } = event.target;
    const results = this.state.fuse.search(value);
    this.setState({ value, results });

    if (this.state.selectedIndex > results.length - 1) {
      this.setState({ selectedIndex: Math.max(results.length - 1, 0) });
    }

    this.props.handleChange(event);
  };

  handleInputKeyDown = event => {
    switch (event.keyCode) {
      case 38: // ArrowUp
        event.preventDefault();
        this.setState(state => {
          return { selectedIndex: Math.max(--state.selectedIndex, 0) };
        });
        break;

      case 40: // ArrowDown
        event.preventDefault();
        this.setState(state => {
          return { selectedIndex: Math.min(++state.selectedIndex, state.results.length - 1) };
        });
        break;

      case 13: // Enter
        event.preventDefault();
        const item = this.state.results[this.state.selectedIndex].item;
        this.props.handleSubmit(item);
        break;

      default:
        return;
    }
  };

  render() {
    const value = {
      state: this.state,
      onChange: this.handleInputChange,
      onKeyDown: this.handleInputKeyDown,
    };

    return <FuseContext.Provider value={value}>{this.props.children}</FuseContext.Provider>;
  }
}
