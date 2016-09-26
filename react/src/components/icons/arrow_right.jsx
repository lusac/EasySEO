import React from 'react';
import ReactDom from 'react-dom';

class ArrowRight extends React.Component {
  render () {
    return (
      <span className='easyseo__arrow-right'>
        <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="8px" viewBox="0 0 16 8" version="1.1">
          <g stroke="none" fill="none">
            <g transform="translate(-631, -628)">
              <g transform="translate(495, 432)">
                <g transform="translate(144, 200) rotate(-90) translate(-144, -200) translate(132, 188)">
                  <g>
                    <polygon points="0 0 24 0 24 24 0 24"/>
                    <polygon fill="#CCCCCC" points="8 16 12 20 16 16"/>
                    <rect fill="#CCCCCC" x="11" y="4" width="2" height="12"/>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </svg>
      </span>
    )
  }
};

export default ArrowRight;
