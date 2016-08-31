import React from 'react';
import ReactDom from 'react-dom';
import EasySEOBuilder from 'components/EasySEOBuilder'

function EasySEO (options) {
  this.init(options);
}

EasySEO.prototype.init = function (options) {
  this.fields = options.fields || [];
  this.googleInit();
  this.build();
};

EasySEO.prototype.googleInit = function () {
  google.load('visualization', '1');
};

EasySEO.prototype.build = function () {
  for (var i=0; i <= this.fields.length - 1; i++) {
    let field = this.fields[i],
        id = 'easyseo-id-' + field.name;

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
  ReactDom.render(
    <EasySEOBuilder refer={refer} />,
    document.getElementById(id));
};

window.EasySEO = EasySEO;
