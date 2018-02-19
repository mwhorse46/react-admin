import React from "react";
import PropTypes from "prop-types";
import Fuse from "fuse.js";
import createReactContext from "create-react-context";

export const FuseContext = React.createContext({})
  ? React.createContext({})
  : createReactContext({});

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
    const results = this.getResults(fuse, value);

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
      const results = this.getResults(fuse, this.state.value);
      this.setState({ fuse, results });
    }
  }

  getOptions(props) {
    return {
      includeMatches: true,
      includeScore: true,
      shouldSort: true,
      // tokenize: true,
      // threshold: 0.4,
      minMatchCharLength: 2,
      keys: props.keys,
      ...props.options,
    };
  }

  // if there are no search results, show the entire list.
  // convert the props list into the same output shape that comes from fuse.
  getResults = (fuse, value) => {
    const searchResults = fuse.search(value);
    const emptyResults = value ? [] : this.props.list.map(item => ({ item, matches: [] }));
    const results = searchResults.length ? searchResults : emptyResults;

    return results;
  };

  handleInputChange = event => {
    event.preventDefault();
    const { value } = event.target;
    const results = this.getResults(this.state.fuse, value);
    this.setState({ results, value });

    // Move the selected item down as the list shrinks.
    if (this.state.selectedIndex > results.length - 1) {
      this.setState({ selectedIndex: Math.max(results.length - 1, 0) });
    }

    this.props.handleChange(event);
  };

  handleInputKeyDown = event => {
    switch (event.keyCode) {
      case 38: // ArrowUp
        event.preventDefault();
        return this.setState(state => ({
          selectedIndex: Math.max(--state.selectedIndex, 0),
        }));

      case 40: // ArrowDown
        event.preventDefault();
        // Greater than 0, but less than the results.
        return this.setState(state => ({
          selectedIndex: Math.min(++state.selectedIndex, Math.max(0, state.results.length - 1)),
        }));

      case 13: // Enter
        event.preventDefault();
        const item = this.state.results[this.state.selectedIndex].item;
        return this.props.handleSubmit(item);

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
