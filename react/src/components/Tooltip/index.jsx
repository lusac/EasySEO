import React from 'react';
import ReactDom from 'react-dom';

class Tooltip extends React.Component {

  constructor(props) {
    super(props);
    this.props.params.isHidden = this.props.params.isHidden || true;
    this.props.params.terms = this.props.params.terms || {};
  }

  renderTerms () {
    if (this.props.params.terms.all) {
      return (
        <span>
          {this.props.params.terms.all.map((term, i) => {
            return (
              <span className='easyseo__tooltip-info-term' key={i}>{this.props.params.terms.main} -> <a>{term.label}</a></span>
            );
          })}
        </span>
      )
    }
  }

  render () {
    let style = {
      display: this.props.params.isHidden ? 'none' : 'block'
    };

    return (
      <span className='easyseo__tooltip' style={style}>
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
