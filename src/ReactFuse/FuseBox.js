import React from "react";
import PropTypes from "prop-types";
import Fuse from "fuse.js";

// import InputBus from "./InputBus";
// import CurrentResult from "./CurrentResult";

export const FuseContext = React.createContext({});

export default class FuseBox extends React.Component {
  static defaultProps = {
    search: "",
    maxResults: 20,
    handleChange: () => {},
    handleSubmit: () => {},
  };

  static propTypes = {
    keys: PropTypes.array.isRequired,
    list: PropTypes.array.isRequired,
    maxResults: PropTypes.number,
    options: PropTypes.object,
    search: PropTypes.string,
  };

  constructor(props) {
    super(props);

    const value = this.props.search;
    const fuse = new Fuse(this.props.list, this.getOptions(this.props));
    const results = fuse.search(value);

    this.state = {
      value,
      fuse,
      results,
      selectedIndex: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    const fuse = new Fuse(nextProps.list, this.getOptions(nextProps));
    const results = this.getFuseResults(fuse, this.state.value);
    this.setState({ fuse, results });
  }

  getFuseResults = (fuse, value) => {
    return fuse.search(value).slice(0, this.props.maxResults);
  };

  getOptions(props) {
    return {
      includeMatches: true,
      shouldSort: true,
      threshold: 0.4,
      minMatchCharLength: 2,
      keys: this.props.keys,
      ...props.options,
    };
  }

  handleInputChange = event => {
    event.preventDefault();
    const { value } = event.target;
    const results = this.getFuseResults(this.state.fuse, value);
    this.setState({ value, results });
    this.props.handleChange(event);
  };

  handleInputKeyDown = event => {
    switch (event.keyCode) {
      case 38: // ArrowUp
        event.preventDefault();
        this.setState(state => ({ selectedIndex: Math.max(--state.selectedIndex, 0) }));
        break;

      case 40: // ArrowDown
        event.preventDefault();
        this.setState(state => ({
          selectedIndex: Math.min(++state.selectedIndex, state.results.length),
        }));
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
      onKeyDown: this.onKeyDown,
    };

    return <FuseContext.Provider value={value}>{this.props.children}</FuseContext.Provider>;
  }
}
