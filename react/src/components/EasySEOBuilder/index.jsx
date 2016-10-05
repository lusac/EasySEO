import React from 'react';
import ReactDom from 'react-dom';
import Tooltip from 'components/Tooltip';
import index from './index.scss';

let SYNONYMS = {
  'remover': ['tirar', 'transportar', 'arredar', 'mover', 'levar', 'mudar'],
  'make': ['maquiagem', 'maquilagem'],
  'limpar': ['tirar','lavar', 'assear', 'mundificar', 'higienizar', 'varrer', 'ensaboar', 'despoluir', 'espanar', 'escovar', 'esfregar', 'desempoar', 'desempoeirar', 'absterger', 'detergir', 'desencardir', 'desenxovalhar', 'desenodoar', 'desenfarruscar', 'apagar', 'abluir'],
  'tinta': ['colorante', 'tintura', 'pigmento', 'corante'],
  'caneta': ['tinteiro'],
  'aprenda': ['descobrir', 'conhecer', 'estudar', 'assimilar', 'saber', 'perceber', 'entender', 'compreender', 'instruir-se'],
  'customizar': ['personalizar', 'individualizar', 'individuar', 'particularizar', 'singularizar'],
  'passos': ['etapas', 'fases', 'pontos', 'estágios', 'estádios']
};

class EasySEOBuilder extends React.Component {

  constructor (props) {
		super(props);
    this.synonyms = SYNONYMS;
    this.refer = props.refer;
    this.synonymsApiHost = props.synonymsApiHost;
    this.prefixClass = 'easyseo-id-' + this.props.refer.name;
    this.containerId = this.prefixClass + '-container';
    this.termsId = this.prefixClass + '-terms';
    this.iframeId = this.prefixClass + '-iframe';
    this.initSearchVars();
    this.bindEvents();

    if (this.refer.value) {
      this.searchTopRelated(this.refer);
    }
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
      if (self.mirrorElement.style.height != this.style.height) {
        self.mirrorElement.style.height = this.style.height;
      }
    });

    document.getElementsByTagName('html')[0].addEventListener('click', function(e) {
      if (e.target !== self.refer && !e.target.closest('#easyseo__tooltip')) {
        let newTooltip = self.state.tooltip;
        newTooltip.isHidden = true;
        self.setState({
          tooltip: newTooltip
        });
      }
    });
  }

  searchTopRelated (instance) {
    if (instance.value) {
      this.emptyState();
      this.state.sentence = instance.value;
      let terms = this.getTermsFromSentence(this.state.sentence);
      if (this.synonymsApiHost) {
        this.getSynonymsFromApi(terms)
      } else {
        this.getTopRelatedTermFromTerms(terms);
      }
    }
  };

  getSynonymsFromApi (terms) {
    let self = this,
        xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        self.synonyms = JSON.parse(this.responseText);
        self.getTopRelatedTermFromTerms(terms)
      }
    };
    xhttp.open('GET', this.synonymsApiHost + terms.join(), true);
    xhttp.send();
  };

  getTopRelatedTermFromTerms (terms) {
    for(let i=0; i<=terms.length-1; i++) {
      this.getTopRelatedTerm(terms[i]);
    }
  }

  getTermsFromSentence (sentence) {
    let newSentence = sentence.toLowerCase(),
        punctuationless = newSentence.replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()]/g, ''),
        finalSentence = punctuationless.replace(/\s{2,}/g, ' ');
    return finalSentence.split(' ');
  }

  getTopRelatedTerm (term) {
    if (sessionStorage[term] == undefined || sessionStorage[term].length == 0) {
      let url = this.getTrendsApiUrl(term);

      if (url) {
        sessionStorage[term] = [];
        this.sendGoogleQuery(url);
      }
    } else {
      console.log('Getting term from cache: ' + term);
      this.updateTerms(JSON.parse(sessionStorage[term]));
    }
  }

  getTrendsApiUrl (term) {
    let synonyms = this.getTermSynonyms(term);

    if (synonyms && synonyms.length) {
      let terms = term + ',' + synonyms;
      return this.buildTrendsApiUrl(terms);
    }
    return '';
  }

  getTermSynonyms (term) {
    try {
      return this.synonyms[term];
    }
    catch (err) {
      return [];
    }
  }

  sendGoogleQuery (url) {
    let query = new google.visualization.Query(url);
    query.send(this.handleSingleTermQueryResponse.bind(this))
  }

  handleSingleTermQueryResponse (response) {
    try {
      let termsData = this.getTermsPontuationFromResponse(response);
      this.updateTerms(termsData);
      sessionStorage.setItem(termsData.main, JSON.stringify(termsData));
    }
    catch (err) {
      console.log(err);
    }
  }

  updateTerms (data) {
    this.state.terms.push(data);
    this.setState({
      terms: this.state.terms
    });
  }

  getTermsPontuationFromResponse (response) {
    let _terms = response.G.Mf,
        terms = _terms.splice(1, _terms.length-1),
        mainTerm = terms[0].label,
        _termsPontuation = response.G.Nf,
        termsPontuation = _termsPontuation[_termsPontuation.length-1].c,
        termsList;

    try {
      // try to get last pontuation
      termsList = this.populateTermsList(terms, termsPontuation.slice(1));
    } catch (err) {
      termsPontuation = _termsPontuation[_termsPontuation.length-2].c;
      termsList = this.populateTermsList(terms, termsPontuation.slice(1));
    }

    if (termsList[0].label !== mainTerm) {
      return {
        main: mainTerm,
        all: termsList
      };
    }
    return {}
  }

  populateTermsList (terms, termsPontuation) {
    let termsList = [];

    for (let i=0; i<=terms.length-1; i++) {
      termsList.push({
        label: terms[i].label,
        value: termsPontuation[i].v
      });
    }

    // Sort highest to lowest
    termsList.sort(function(a, b) {
      return b.value - a.value;
    });

    return termsList;
  }

  buildTrendsApiUrl (terms) {
    return 'http://www.google.com/trends/fetchComponent?hl=pt-BR&q=' + terms + '&geo=BR&date=today%2012-m&cid=TIMESERIES_GRAPH_0&export=3';
  }

  getHighlightedSentence () {
    let resp = {__html:''};
    if (this.state.sentence.length > 0) {
      let changeList = [],
          sentenceTerms = this.state.sentence.split(' ');

      for (var i=0; i < this.state.terms.length; i++) {
        changeList.push(this.state.terms[i].main);
      }

      for (var i=0; i < sentenceTerms.length; i++) {
        if (changeList.includes(sentenceTerms[i])) {
          sentenceTerms[i] = ['<span class="easyseo__el-highlight">', sentenceTerms[i], '</span>'].join('');
        }
      }
      resp.__html = sentenceTerms.join(' ');
    }
    return resp;
  }

  showTooltip (el, pos) {
    let tooltipTerm,
        term = el.textContent;

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

  tooltipHandler (e) {
    let newSentence = this.state.sentence.replace(e.currentTarget.dataset.oldterm, e.currentTarget.dataset.newterm);
    this.setState({
      sentence: newSentence
    });
    this.refer.value = newSentence;
    this.refer.dispatchEvent(new Event('change'));
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
      let clickX = e.clientX,
          clickY = e.clientY,
          highlights = document.getElementsByClassName('easyseo__el-highlight');

      for(let i=0; i<=highlights.length-1; i++) {
        let el = highlights[i],
            rect = el.getBoundingClientRect();

        if (clickX >= rect.left && clickX <= rect.right) {
          if (clickY >= rect.top && clickY <= rect.bottom) {
            self.showTooltip(el, {top: rect.bottom + window.window.scrollY + 10, left: (rect.left + rect.right)/2});
            break;
          }
        }
      }
    });
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
