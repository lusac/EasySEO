import React from 'react';
import ReactDom from 'react-dom';

class Tag extends React.Component {

  constructor (props) {
		super(props);
	}

  onClick () {
    alert('ae');
  }

  render () {
    return (
      <div className="easyseo__tag" onClick={this.onClick.bind(this)}>{'Ola'}</div>
    );
  }
};

export default Tag;
