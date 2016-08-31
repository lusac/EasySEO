import React from 'react';
import ReactDom from 'react-dom';

class Graphic extends React.Component {
  render () {
    return (
      <iframe id={this.props.id}
              className='hide'
              frameBorder='0'
              width='540'
              height='340'
              src={this.props.attrs.src}
              className={this.props.attrs.className} />
    );
  }
};

export default Graphic;
