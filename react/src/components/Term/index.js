import React from 'react';
import ReactDom from 'react-dom';

class Term extends React.Component {

  render () {
    return (
      <ul id={this.props.id}>
        {this.props.terms.map((term, index) => {
          let msg = 'Usar a palavra <b>' + term.bestTerm + '</b> no lugar de <b>' + term.mainTerm + '</b>';
          return (
            <li key={index}>{msg}</li>
          );
        })}
      </ul>
    );
  }
};

export default Term;
