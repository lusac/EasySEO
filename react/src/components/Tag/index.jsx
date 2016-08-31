import React from 'react';
import ReactDom from 'react-dom';

class Tag extends React.Component {
  render () {
    return (
      <li className={this.props.className}
          data-term={this.props.dataTerm}
          onClick={this.props.onClick}>
        {this.props.label}
      </li>
    );
  }
};

export default Tag;
