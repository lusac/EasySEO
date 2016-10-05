import React from 'react';
import ReactDom from 'react-dom';
import ArrowRight from 'components/icons/arrow_right';
import ArrowReverse from 'components/icons/arrow_reverse';
import index from './index.scss';

class Tooltip extends React.Component {

  constructor(props) {
    super(props);
    this.props.params.order = this.props.params.order || {};
    this.props.params.isHidden = this.props.params.isHidden || true;
    this.props.params.terms = this.props.params.terms || {};
    this.props.params.pos = this.props.params.pos || {top: 0, left: 0};
  }

  renderTerms () {
    if (this.props.params.terms.all) {
      let html = [],
          terms = this.props.params.terms;

      for (var i = 0; i < terms.all.length; i++) {
        let term = terms.all[i];
        if (terms.main == term.label) {
          break;
        }
        html.push(<span className='easyseo__tooltip-info-term'
          key={i}
          data-newterm={term.label}
          data-oldterm={terms.main}
          onClick={this.changeTerms.bind(this)}>
            <span className='main-term'>
              {terms.main}
            </span>
            <span className='other-term'>
              <ArrowRight />
              <ArrowReverse />
              <a>{term.label}</a>
            </span>
        </span>);
      }
      return html;
    }
  }

  getWidth () {
    let el = document.getElementById('easyseo__tooltip');
    if (el) {
      return el.offsetWidth;
    }
    return 0;
  }

  changeTerms (e) {
    this.props.params.tooltipOnChangeHandler({'event': e, 'order': this.props.params.order});
    this.dispatchEvent('easyseoTermChanged', {'detail': e});
    this.closeHandler();
  }

  closeHandler () {
    this.props.params.isHidden = true;
    this.setState({
      params: this.props.params
    });
  }

  getGoogleTrendsUrl () {
    if (Object.keys(this.props.params.terms).length !== 0) {
      let terms = this.props.params.terms.all.map(item => item.label).join();
      return 'https://www.google.com.br/trends/explore?date=today%2012-m&geo=BR&q=' + terms;
    }
    return '#';
  }

  dispatchEvent (name, args) {
    var e = new CustomEvent(name, args);
    document.dispatchEvent(e);
  }

  render () {
    let style = {
      visibility: this.props.params.isHidden ? 'hidden' : 'visible',
      top: this.props.params.pos.top,
      left: this.props.params.pos.left - this.getWidth() / 2
    };

    return (
      <span id='easyseo__tooltip' className='easyseo__tooltip' style={style}>
        <span className='easyseo__tooltip-close' onClick={this.closeHandler.bind(this)}>✕</span>
        <strong className='easyseo__tooltip-title'>Recomendação de SEO</strong>
        <p className='easyseo__tooltip-subtitle'>Substitua as palavras para ganhar mais relevância no Google</p>
        <span className='easyseo__tooltip-info'>
          {this.renderTerms()}
        </span>
        <a href={this.getGoogleTrendsUrl()} target='_blank' className='easyseo__tooltip-details'>ver detalhes</a>
      </span>
    );
  }
};

export default Tooltip;
