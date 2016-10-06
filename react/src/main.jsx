import React from 'react';
import ReactDom from 'react-dom';
import EasySEOBuilder from 'components/EasySEOBuilder'

function EasySEO (options) {
  this.init(options);
}

EasySEO.prototype.init = function (options) {
  this.fields = options.fields || [];
  this.synonymsApiHost = options.synonymsApiHost;
  this.googleInit();
  this.build();
};

EasySEO.prototype.googleInit = function () {
  google.load('visualization', '1');
};

EasySEO.prototype.build = function () {
  for (var i=0; i <= this.fields.length - 1; i++) {
    let field = this.fields[i],
        id = 'easyseo-id-' + this.getUUID();

    this.insertContainer(field, id);
    this.renderReactComponent(field, id);
  }
};

EasySEO.prototype.insertContainer = function (field, id) {
  let node = document.createElement('span');
  node.id = id;
  field.parentNode.insertBefore(node, field.nextSibling);
};

EasySEO.prototype.renderReactComponent = function (refer, id) {
  var self = this;
  setTimeout(function () {
    ReactDom.render(
      <EasySEOBuilder refer={refer} synonymsApiHost={self.synonymsApiHost}/>,
      document.getElementById(id));
  }, 500);
};

EasySEO.prototype.getUUID = function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

window.EasySEO = EasySEO;
