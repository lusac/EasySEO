import React from 'react';
import ReactDom from 'react-dom';

class ArrowReverse extends React.Component {
  render () {
    return (
      <span className='easyseo__arrow-reverse'>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" version="1.1">
          <g stroke="none" fill="none">
            <g transform="translate(-631, -584)">
              <g transform="translate(527, 577)">
                <g transform="translate(112, 15) rotate(-90) translate(-112, -15) translate(100, 3)">
                  <g>
                    <polygon points="0 0 24 0 24 24 0 24"/>
                    <polygon fill="#FAFAFA" points="12 16 16 20 20 16"/>
                    <rect fill="#FAFAFA" x="15" y="4" width="2" height="12"/>
                    <polygon fill="#FAFAFA" transform="translate(8, 6) scale(-1, -1) translate(-8, -6) " points="4 4 8 8 12 4"/>
                    <rect fill="#FAFAFA" transform="translate(8, 14) scale(-1, -1) translate(-8, -14) " x="7" y="8" width="2" height="12"/>
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

export default ArrowReverse;
