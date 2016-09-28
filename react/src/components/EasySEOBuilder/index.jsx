import React from 'react';
import ReactDom from 'react-dom';
import Tooltip from 'components/Tooltip';

let SYNONYMOUS = {
  'remover': {
    def: 'verb',
    opts: ['tirar', 'transportar', 'arredar', 'mover', 'levar', 'mudar']
  },
  'make': {
    def: 'noun',
    opts: ['maquiagem', 'maquilagem']
  },
  'limpar': {
    def: 'verb',
    opts: ['tirar','lavar', 'assear', 'mundificar', 'higienizar', 'varrer', 'ensaboar', 'despoluir', 'espanar', 'escovar', 'esfregar', 'desempoar', 'desempoeirar', 'absterger', 'detergir', 'desencardir', 'desenxovalhar', 'desenodoar', 'desenfarruscar', 'apagar', 'abluir']
  },
  'tinta': {
    def: 'noun',
    opts: ['colorante', 'tintura', 'pigmento', 'corante']
  },
  'caneta': {
    def: 'noun',
    opts: ['tinteiro']
  },
  'aprenda': {
    def: 'verb',
    opts: ['descobrir', 'conhecer', 'estudar', 'assimilar', 'saber', 'perceber', 'entender', 'compreender', 'instruir-se']
  },
  'customizar': {
    def: 'verb',
    opts: ['personalizar', 'individualizar', 'individuar', 'particularizar', 'singularizar']
  },
  'passos': {
    def: 'noun',
    opts: ['etapas', 'fases', 'pontos', 'estágios', 'estádios']
  }
};

class EasySEOBuilder extends React.Component {

  constructor (props) {
		super(props);
    this.refer = props.refer;
    this.prefixClass = 'easyseo-id-' + this.props.refer.name;
    this.containerId = this.prefixClass + '-container';
    this.termsId = this.prefixClass + '-terms';
    this.iframeId = this.prefixClass + '-iframe';
    this.initSearchVars();
    this.bindEvents();
	}

  initSearchVars () {
    this.state = {
      sentence: '',
      terms: [],
      tooltip: {}
		}
  }

  emptyState () {
    this.state.sentece = '';
    this.state.terms = [];
  }

  bindEvents () {
    let self = this;
    this.refer.addEventListener('change', function() {
      self.searchTopRelated(this);
    });

    this.refer.addEventListener('keyup', function() {
      self.setState({
        sentence: this.value
      });
    }, false);
  }

  searchTopRelated (instance) {
    if (instance.value) {
      this.emptyState();
      this.state.sentence = instance.value;
      let terms = this.getTermsFromSentence(this.state.sentence);

      for(let i=0; i<=terms.length-1; i++) {
        this.getTopRelatedTerm(terms[i]);
      }
    }
  };

  getTermsFromSentence (sentence) {
    let newSentence = sentence.toLowerCase(),
        punctuationless = newSentence.replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()]/g, ''),
        finalSentence = punctuationless.replace(/\s{2,}/g, ' ');
    return finalSentence.split(' ');
  }

  getTopRelatedTerm (term) {
    let url = this.getTrendsApiUrl(term);

    if (url) {
      this.sendGoogleQuery(url);
    }
  }

  getTrendsApiUrl (term, is_graphic) {
    let synonymous = this.getTermSynonymous(term);

    if (synonymous.length) {
      let terms = term + ',' + synonymous,
          _export = (is_graphic == true) ? '5&w=500&h=300' : '3';
      return this.buildTrendsApiUrl(terms, _export);
    }
    return '';
  }

  getTermSynonymous (term) {
    try {
      return SYNONYMOUS[term].opts;
    }
    catch (err) {
      return [];
    }
  }

  sendGoogleQuery (url, callback) {
    let _callback = callback || this.handleSingleTermQueryResponse;
    let query = new google.visualization.Query(url);
    query.send(_callback.bind(this));
  }

  getTermsPontuationFromResponse (response) {
    let _terms = response.G.Mf,
        terms = _terms.splice(1, _terms.length-1),
        mainTerm = terms[0].label,
        _termsPontuation = response.G.Nf,
        termsPontuation = _termsPontuation[_termsPontuation.length-2].c,
        termsList = [];

    for (let i=1; i<=terms.length-1; i++) {
      termsList.push({
        label: terms[i-1].label,
        value: termsPontuation[i].v
      });
    }

    // Sort highest to lowest
    termsList.sort(function(a, b) {
      return b.value - a.value;
    });

    return {
      main: mainTerm,
      all: termsList
    };
  }

  handleSingleTermQueryResponse (response) {
    try {
      this.state.terms.push(this.getTermsPontuationFromResponse(response));
      this.setState({
        terms: this.state.terms
      });
    }
    catch (err) {
      console.log(err);
    }
  }

  buildTrendsApiUrl (terms, _export) {
    return 'http://www.google.com/trends/fetchComponent?hl=pt-BR&q=' + terms + '&geo=BR&date=today%2012-m&cid=TIMESERIES_GRAPH_0&export=' + _export;
  }

  getHighlightedSentence () {
    let resp = {__html:''};
    if (this.state.sentence.length > 0) {
      let self = this;
      let changeList = [];
      let sentenceTerms = this.state.sentence.split(' ');

      for (var i=0; i <= this.state.terms.length-1; i++) {
        changeList.push(this.state.terms[i].main);
      }

      // return (
      //   <span>
      //     {sentenceTerms.map((term, i) => {
      //       if (changeList.includes(term)) {
      //         return (
      //           <span className='easyseo__el-highlight' key={i}>{term}</span>
      //         )
      //       }
      //       else {
      //         return (<span key={i}> {term} </span>)
      //       }
      //     })};
      //   </span>
      // )

      for (var i=0, len=sentenceTerms.length; i < len; i++) {
        if (changeList.includes(sentenceTerms[i])) {
          sentenceTerms[i] = ['<span class="easyseo__el-highlight">', sentenceTerms[i], '</span>'].join('');
        }
      }
      resp.__html = sentenceTerms.join(' ');
    }
    return resp;
  }

  showTooltip (el, pos) {
    let term = el.textContent;
    let tooltipTerm;

    for(let i=0; i<=this.state.terms.length-1; i++) {
      if (this.state.terms[i].main == term) {
        tooltipTerm = this.state.terms[i];
        break;
      }
    }

    this.setState({
      tooltip: {
        tooltipHandler: this.tooltipHandler.bind(this),
        isHidden: false,
        terms: tooltipTerm,
        pos: {
          top: pos.top,
          left: pos.left
        }
      }
    });
  }

  componentDidMount () {
    let self = this;

    // set className to refer element
    document.getElementById(this.containerId).appendChild(this.refer);
    this.refer.className = this.refer.className + ' easyseo__el-text';

    // Copy css from brother element
    this.mirrorElement = document.querySelector('#' + this.containerId + ' .easyseo__el-mirror');
    this.mirrorElement.style.cssText =  document.defaultView.getComputedStyle(this.refer, '').cssText;

    // Add Click Events to refer
    this.refer.addEventListener('click', function (e) {
      let clickX = e.clientX;
      let clickY = e.clientY;
      let highlights = document.getElementsByClassName('easyseo__el-highlight');

      for(let i=0; i<=highlights.length-1; i++) {
        let el = highlights[i];
        let rect = el.getBoundingClientRect();

        if (clickX >= rect.left && clickX <= rect.right) {
          if (clickY >= rect.top && clickY <= rect.bottom) {
            self.showTooltip(el, {top: rect.bottom + 10, left: (rect.left + rect.right)/2});
            break;
          }
        }
      }
    });
  }

  tooltipHandler (e) {
    let newSentence = this.state.sentence.replace(e.currentTarget.dataset.oldterm, e.currentTarget.dataset.newterm);
    this.setState({
      sentence: newSentence
    });
    this.refer.value = newSentence;
  }

  render () {
    return (
      <span>
        <div id={this.containerId} className={'easyseo__el-container'}>
          <div className={'easyseo__el-mirror'} contentEditable={true} dangerouslySetInnerHTML={this.getHighlightedSentence()} />
        </div>
        <Tooltip params={this.state.tooltip} />
      </span>
    );
  }
};

export default EasySEOBuilder;
