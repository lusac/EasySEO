import React from 'react';
import ReactDom from 'react-dom';
import Tags from 'components/Tags';
import Term from 'components/Term';

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
    this.bindEvents();
    this.prefixClass = 'easyseo-id-' + this.props.refer.name;
    this.termsId = this.prefixClass + '-terms';
    this.tagsId = this.prefixClass + '-tags';
    this.iframeId = this.prefixClass + '-iframe';

    this.state = {
      sentence: '',
      terms: [],
      tags: [],
      activeTag: null,
      iframeAttrs: {
        src: '',
        className: ''
      }
		}
	}

  bindEvents () {
    let self = this;
    this.refer.addEventListener('change', function() {
      self.searchTopRelated(this);
    });
  }

  cleanSearchState () {
    this.state.terms = [];
    this.state.tags = [];
    this.state.activeTag = null;
    this.state.iframeAttrs = {
      src: '',
      className: ''
    };
  }

  searchTopRelated (instance) {
    if (instance.value) {
      this.cleanSearchState();
      let terms = this.getTermsFromSentence(instance.value);

      for(let i=0; i<=terms.length-1; i++) {
        this.getTopRelated(terms[i]);
      }
    }
  };

  getTermsFromSentence (sentence) {
    let newSentence = sentence.toLowerCase(),
        punctuationless = newSentence.replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()]/g, ''),
        finalSentence = punctuationless.replace(/\s{2,}/g, ' ');
    return finalSentence.split(' ');
  }

  handleQueryResponse (response) {
    let _terms = response.G.Mf,
        terms = _terms.splice(1, _terms.length-1),
        mainTerm = terms[0].label,
        _termsPontuation = response.G.Nf,
        termsPontuation = _termsPontuation[_termsPontuation.length-1].c,
        bestPontuation = 0,
        bestTerm;

    for (let i=1; i<=termsPontuation.length-1; i++) {
      if (termsPontuation[i].v > bestPontuation) {
        bestTerm = terms[i-1].label;
        bestPontuation = termsPontuation[i].v;
      }
    }

    if (bestTerm !== 'undefined' && bestTerm !== mainTerm) {
      this.state.terms.push({bestTerm: bestTerm, mainTerm: mainTerm});
      this.state.tags.push(mainTerm);

      this.setState({
  			terms: this.state.terms,
        tags: this.state.tags
  		});
    }
  }

  getTermSynonymous (term) {
    try {
      return SYNONYMOUS[term].opts;
    }
    catch (err) {
      return [];
    }
  }

  getTrendsApiUrl (term, is_graphic) {
    let synonymous = this.getTermSynonymous(term);

    if (synonymous) {
      let terms = term + ',' + synonymous,
          _export = (is_graphic == true) ? 5 : '3&w=500&h=300',
          url = 'http://www.google.com/trends/fetchComponent?hl=pt-BR&q=' + terms + '&geo=BR&date=today%2012-m&cid=TIMESERIES_GRAPH_0&export=' + _export;
      return url;
    }
    return '';
  }

  getTopRelated (term) {
    let url = this.getTrendsApiUrl(term);

    if (url) {
      let query = new google.visualization.Query(url);
      query.send(this.handleQueryResponse.bind(this));
    }
  }

  showGraphic (event) {
    let instance = event.currentTarget;

    this.setState({
      activeTag: instance,
      iframeAttrs: {
        src: this.getTrendsApiUrl(instance.textContent, true),
        className: ''
      }
    })
  }

  render () {
    return (
      <span>
        <Term id={this.termsId} terms={this.state.terms} />
        <Tags id={this.tagsId} iframeId={this.iframeId} iframeAttrs={this.state.iframeAttrs} tags={this.state.tags} activeTag={this.state.activeTag} handleClick={this.showGraphic.bind(this)} />
      </span>
    );
  }
};

export default EasySEOBuilder;
