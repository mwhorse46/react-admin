import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { combineChunks, fillInChunks } from "highlight-words-core";

const Light = styled.mark`
  padding: 0;
  background: lightgreen;
`;

// Takes a 'match' object from fuse.js and highlights the listed values.
export default class Highlighter extends React.Component {
  static defaultProps = {
    Mark: Light,
    Wrapper: "span",
  };

  static propTypes = {
    className: PropTypes.string,
    Mark: PropTypes.any,
    match: PropTypes.shape({
      indices: PropTypes.array.isRequired,
      value: PropTypes.string.isRequired,
    }),
    string: PropTypes.string.isRequired,
    Wrapper: PropTypes.any,
  };

  indicesToChunks = ([start, end]) => {
    return { start, end: end + 1 };
  };

  renderContent() {
    const { indices = [], value = "" } = this.props.match;

    const chunks = indices.map(this.indicesToChunks);
    const stringZones = fillInChunks({
      chunksToHighlight: combineChunks({ chunks }),
      totalLength: value ? value.length : 0,
    });

    return stringZones.map((chunk, index) => {
      const text = value.slice(chunk.start, chunk.end);
      const Tag = chunk.highlight ? this.props.Mark : "span";
      return <Tag key={index}>{text}</Tag>;
    });
  }

  render() {
    const { Wrapper } = this.props;
    return (
      <Wrapper className={this.props.className}>
        {this.props.match ? this.renderContent() : this.props.string}
      </Wrapper>
    );
  }
}
