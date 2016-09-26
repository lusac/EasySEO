import React from 'react';
import ReactDom from 'react-dom';
import ArrowRight from 'components/icons/arrow_right';
import ArrowReverse from 'components/icons/arrow_reverse';

class Tooltip extends React.Component {

  constructor(props) {
    super(props);
    this.props.params.isHidden = this.props.params.isHidden || true;
    this.props.params.terms = this.props.params.terms || {};
    this.props.params.pos = this.props.params.pos || {top: 0, left: 0};
    this.width = 0;
  }

  renderTerms () {
    if (this.props.params.terms.all) {
      return (
        <span>
          {this.props.params.terms.all.map((term, i) => {
            return (
              <span className='easyseo__tooltip-info-term' key={i}>
                <span className='main-term'>
                  {this.props.params.terms.main}

                  <span className='other-term'>
                    <ArrowRight />
                    <ArrowReverse />
                    {term.label}
                  </span>
                </span>
              </span>
            );
          })}
        </span>
      )
    }
  }

  getWidth () {
    let el = document.getElementById('easyseo__tooltip');
    if (el) {
      return el.offsetWidth;
    }
    return 0;
  }

  render () {
    let width = this.getWidth();
    let style = {
      visibility: this.props.params.isHidden ? 'hidden' : 'visible',
      top: this.props.params.pos.top,
      left: this.props.params.pos.left - width / 2
    };

    return (
      <span id='easyseo__tooltip' className='easyseo__tooltip' style={style}>
        <span className='easyseo__tooltip-close'>✕</span>
        <strong className='easyseo__tooltip-title'>Redomendação de SEO</strong>
        <p className='easyseo__tooltip-subtitle'>Substitua as palavras para ganhar mais relevância no Google</p>
        <span className='easyseo__tooltip-info' key={'ola'}>
          {this.renderTerms()}
        </span>
        <a href='#' className='easyseo__tooltip-details'>ver detalhes</a>
      </span>
    );
  }
};

export default Tooltip;
