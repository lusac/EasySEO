/*
  Frases:
  Como remover o make?
  Limpar tinta de caneta.
  Aprenda a customizar seu tênis em poucos passos. Veja a dica.
*/

window.EasySEO = window.EasySEO || {};

SYNONYMOUS = {
  'como': ['da maneira que', 'do jeito que', 'do modo que', 'que nem', 'tal como', 'tal e qual', 'tanto quanto'],
  'remover': ['tirar', 'transportar', 'arredar', 'mover', 'levar', 'mudar'],
  'make': ['maquiagem', 'maquilagem'],
  'limpar': ['tirar','lavar', 'assear', 'mundificar', 'higienizar', 'varrer', 'ensaboar', 'despoluir', 'espanar', 'escovar', 'esfregar', 'desempoar', 'desempoeirar', 'absterger', 'detergir', 'desencardir', 'desenxovalhar', 'desenodoar', 'desenfarruscar', 'apagar', 'abluir'],
  'tinta': ['colorante', 'tintura', 'pigmento', 'corante'],
  'caneta': ['tinteiro'],
  'aprenda': ['descobrir', 'conhecer', 'estudar', 'assimilar', 'saber', 'perceber', 'entender', 'compreender', 'instruir-se'],
  'customizar': ['personalizar', 'individualizar', 'individuar', 'particularizar', 'singularizar'],
  'poucos': ['alguns'],
  'passos': ['etapas', 'fases', 'pontos', 'estágios', 'estádios']
};

EasySEO.init = function () {
  google.load('visualization', '1');
  this.iframe = document.getElementById('trends-graphic-iframe');
};

EasySEO.searchTopRelated = function (self) {
  new this.TopRelated({ sentence: self.value}).init();
};

EasySEO.showGraphic = function (self, term) {
  var active = document.getElementsByClassName('active')[0];

  if (active) {
    active.className = active.className.replace('active', '');
  }

  self.className = self.className + ' active';
  this.iframe.src = new this.TopRelated().getTrendsApiUrl(term, true);
  this.iframe.className = this.iframe.className.replace('hide', '');
};

EasySEO.createTag = function (term) {
  var tags = document.getElementById('tags'),
  nodeTemplate = '<li class="tag" data-term="' + term + '" onClick="EasySEO.showGraphic(this, \'' + term + '\')">' + term + '</li>';
  tags.insertAdjacentHTML('beforeend', nodeTemplate);
};

EasySEO.TopRelated = function (params) {
  params = params || {};
  this.sentence = params.sentence || null;
};

EasySEO.TopRelated.prototype.init = function () {
  var terms = this.getTermsFromSentence();
  this.cleanLists();

  for(var i=0; i<=terms.length-1; i++) {
    this.getTopRelated(terms[i]);
  }
};

EasySEO.TopRelated.prototype.getTopRelated = function (term) {
  var url = this.getTrendsApiUrl(term);

  if (url) {
    var query = new google.visualization.Query(url);
    query.send(this.handleQueryResponse);
  }
};

EasySEO.TopRelated.prototype.getTrendsApiUrl = function (term, is_graphic) {
  var synonymous = this.getTermSynonymous(term);

  if (synonymous) {
    var terms = term + ',' + synonymous,
        _export = (is_graphic == true) ? 5 : '3&w=500&h=300',
        url = 'http://www.google.com/trends/fetchComponent?hl=pt-BR&q=' + terms + '&cid=TIMESERIES_GRAPH_0&export=' + _export;
    return url;
  }
  return '';
};

EasySEO.TopRelated.prototype.getTermSynonymous = function (term) {
  try {
    return SYNONYMOUS[term];
  }
  catch (err) {
    return [];
  }
};

EasySEO.TopRelated.prototype.handleQueryResponse = function (response) {
  var listContainer = document.getElementById('terms-container'),
      _terms = response.G.Mf,
      terms = _terms.splice(1, _terms.length-1),
      mainTerm = terms[0].label,
      _termsPontuation = response.G.Nf,
      termsPontuation = _termsPontuation[_termsPontuation.length-1].c,
      bestPontuation = 0,
      bestTerm;

  for (var i=1; i<=termsPontuation.length-1; i++) {
    if (termsPontuation[i].v > bestPontuation) {
      bestTerm = terms[i-1].label;
      bestPontuation = termsPontuation[i].v;
    }
  }

  if (bestTerm !== 'undefined' && bestTerm !== mainTerm) {
    var msg = '<li>Usar a palavra <b>' + bestTerm + '</b> no lugar de <b>' + mainTerm + '</b></li>';
    listContainer.insertAdjacentHTML('beforeend', msg);
    EasySEO.createTag(mainTerm);
  }
};

EasySEO.TopRelated.prototype.getTermsFromSentence = function () {
  var newSentence = this.sentence.toLowerCase(),
      punctuationless = newSentence.replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()]/g, '');
      finalSentence = punctuationless.replace(/\s{2,}/g, ' ');
  return finalSentence.split(' ');
};

EasySEO.TopRelated.prototype.cleanLists = function () {
  document.getElementById('terms-container').innerHTML = '';
  document.getElementById('tags').innerHTML = '';
};

EasySEO.init();
