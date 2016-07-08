google.load('visualization', '1');

/*
  Frases:
  Como remover o make?
  Limpar tinta de caneta.
  Aprenda a customizar seu tênis em poucos passos. Veja a dica.
*/

window.SYNONYMOUS = {
  'como': ['da maneira que', 'do jeito que', 'do modo que', 'que nem', 'tal como', 'tal e qual', 'tanto quanto'],
  'remover': ['tirar', 'transportar', 'arredar', 'mover', 'levar', 'mudar'],
  'make': ['maquiagem', 'maquilagem'],
  'limpar': ['tirar','lavar', 'assear', 'mundificar', 'higienizar', 'varrer', 'ensaboar', 'despoluir', 'espanar', 'escovar', 'esfregar', 'desempoar', 'desempoeirar', 'absterger', 'detergir', 'desencardir', 'desenxovalhar', 'desenodoar', 'desenfarruscar', 'apagar', 'abluir'],
  'tinta': ['colorante', 'tintura', 'pigmento', 'corante'],
  'caneta': ['tinteiro'],
  'aprenda': ['descobrir', 'conhecer', 'estudar', 'assimilar', 'saber', 'perceber', 'entender', 'compreender', 'instruir-se'],
  'customizar': ['personalizar', 'individualizar', 'individuar', 'particularizar', 'singularizar'],
  'poucos': ['alguns'],
  'passos': ['etapas', 'fases', 'pontos', 'estágios', 'estádios'],
}

function handleQueryResponse (response, x1, x2) {
  var listContainer = document.getElementById('terms-container'),
      terms = response.G.Mf.splice(1,response.G.Mf.length-1),
      mainTerm = terms[0].label,
      termsPontuation = response.G.Nf[response.G.Nf.length-1].c,
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
    listContainer.insertAdjacentHTML('beforeend', msg)
    createTag(mainTerm);
  }
}

function getTermSynonymous (term) {
  try {
    return SYNONYMOUS[term];
  }
  catch (err) {
    return [];
  }
}

function getTrendsApiUrl (term, is_graphic) {
  var synonymous = getTermSynonymous(term);

  if (synonymous) {
    var terms = term + ',' + synonymous,
        _export = (is_graphic == true) ? 5 : '3&w=500&h=300',
        url = 'http://www.google.com/trends/fetchComponent?hl=pt-BR&q=' + terms + '&cid=TIMESERIES_GRAPH_0&export=' + _export;
    return url;
  }
  return '';
}

function getTopRelated (term) {
  var url = getTrendsApiUrl(term);

  if (url) {
    var query = new google.visualization.Query(url);
    query.send(handleQueryResponse);
  }
}

function getTermsFromSentence (sentence) {
  var sentence = sentence.toLowerCase(),
      punctuationless = sentence.replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()]/g, '');
      finalSentence = punctuationless.replace(/\s{2,}/g, ' ');
  return finalSentence.split(' ');
}

function cleanLists() {
  document.getElementById('terms-container').innerHTML = '';
  document.getElementById('tags').innerHTML = '';
}

function createTag (term) {
  var tags = document.getElementById('tags'),
      nodeTemplate = '<li class="tag" data-term="' + term + '" onClick="showGraphic(this, \'' + term + '\')">' + term + '</li>';
  tags.insertAdjacentHTML('beforeend', nodeTemplate);
}

function showGraphic (self, term) {
  var iframe = document.getElementById('trends-graphic-iframe'),
      active = document.getElementsByClassName('active')[0];

  if (active) {
    active.className = active.className.replace('active', '');
  }

  self.className = self.className + ' active';
  iframe.src = getTrendsApiUrl(term, true);
  iframe.className = iframe.className.replace('hide', '');
}

function searchTopRelated (self) {
  var inputValue = self.value;
  var terms = getTermsFromSentence(inputValue);

  cleanLists();

  for(var i=0; i<=terms.length-1; i++) {
    getTopRelated(terms[i]);
  }
}

window.searchTopRelated = searchTopRelated;
window.showGraphic = showGraphic;
