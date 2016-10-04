!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("React"),require("ReactDOM")):"function"==typeof define&&define.amd?define(["React","ReactDOM"],t):"object"==typeof exports?exports.easyseo=t(require("React"),require("ReactDOM")):e.easyseo=t(e.React,e.ReactDOM)}(this,function(e,t){return function(e){function t(o){if(r[o])return r[o].exports;var n=r[o]={exports:{},id:o,loaded:!1};return e[o].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var r={};return t.m=e,t.c=r,t.p="/dist/",t(0)}([function(e,t,r){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function n(e){this.init(e)}var a=r(1),s=o(a),i=r(2),l=o(i),p=r(3),f=o(p);n.prototype.init=function(e){this.fields=e.fields||[],this.synonymsApiHost=e.synonymsApiHost,this.googleInit(),this.build()},n.prototype.googleInit=function(){google.load("visualization","1")},n.prototype.build=function(){for(var e=0;e<=this.fields.length-1;e++){var t=this.fields[e],r="easyseo-id-"+t.name;this.insertContainer(t,r),this.renderReactComponent(t,r)}},n.prototype.insertContainer=function(e,t){var r=document.createElement("span");r.id=t,e.parentNode.insertBefore(r,e.nextSibling)},n.prototype.renderReactComponent=function(e,t){l["default"].render(s["default"].createElement(f["default"],{refer:e,synonymsApiHost:this.synonymsApiHost}),document.getElementById(t))},window.EasySEO=n},function(t,r){t.exports=e},function(e,r){e.exports=t},function(e,t,r){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,r,o){return r&&e(t.prototype,r),o&&e(t,o),t}}(),l=r(1),p=o(l),f=r(2),u=(o(f),r(4)),c=o(u),d=r(11),m=(o(d),{remover:["tirar","transportar","arredar","mover","levar","mudar"],make:["maquiagem","maquilagem"],limpar:["tirar","lavar","assear","mundificar","higienizar","varrer","ensaboar","despoluir","espanar","escovar","esfregar","desempoar","desempoeirar","absterger","detergir","desencardir","desenxovalhar","desenodoar","desenfarruscar","apagar","abluir"],tinta:["colorante","tintura","pigmento","corante"],caneta:["tinteiro"],aprenda:["descobrir","conhecer","estudar","assimilar","saber","perceber","entender","compreender","instruir-se"],customizar:["personalizar","individualizar","individuar","particularizar","singularizar"],passos:["etapas","fases","pontos","estágios","estádios"]}),h=function(e){function t(e){n(this,t);var r=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.synonyms=m,r.refer=e.refer,r.synonymsApiHost=e.synonymsApiHost,r.prefixClass="easyseo-id-"+r.props.refer.name,r.containerId=r.prefixClass+"-container",r.termsId=r.prefixClass+"-terms",r.iframeId=r.prefixClass+"-iframe",r.initSearchVars(),r.bindEvents(),r}return s(t,e),i(t,[{key:"initSearchVars",value:function(){this.state={sentence:"",terms:[],tooltip:{}}}},{key:"emptyState",value:function(){this.state.sentece="",this.state.terms=[]}},{key:"bindEvents",value:function(){var e=this;this.refer.addEventListener("change",function(){e.searchTopRelated(this)}),this.refer.addEventListener("keyup",function(){e.setState({sentence:this.value})}),document.getElementsByTagName("html")[0].addEventListener("click",function(t){if(t.target!==e.refer&&!t.target.closest("#easyseo__tooltip")){var r=e.state.tooltip;r.isHidden=!0,e.setState({tooltip:r})}})}},{key:"searchTopRelated",value:function(e){if(e.value){this.emptyState(),this.state.sentence=e.value;var t=this.getTermsFromSentence(this.state.sentence);this.synonymsApiHost?this.getSynonymsFromApi(t):this.getTopRelatedTermFromTerms(t)}}},{key:"getSynonymsFromApi",value:function(e){var t=this,r=new XMLHttpRequest;r.onreadystatechange=function(){4==this.readyState&&200==this.status&&(t.synonyms=JSON.parse(this.responseText),t.getTopRelatedTermFromTerms(e))},r.open("GET",this.synonymsApiHost+e.join(),!0),r.send()}},{key:"getTopRelatedTermFromTerms",value:function(e){for(var t=0;t<=e.length-1;t++)this.getTopRelatedTerm(e[t])}},{key:"getTermsFromSentence",value:function(e){var t=e.toLowerCase(),r=t.replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()]/g,""),o=r.replace(/\s{2,}/g," ");return o.split(" ")}},{key:"getTopRelatedTerm",value:function(e){if(void 0==sessionStorage[e]||0==sessionStorage[e].length){var t=this.getTrendsApiUrl(e);t&&(sessionStorage[e]=[],this.sendGoogleQuery(t))}else console.log("Getting term from cache: "+e),this.updateTerms(JSON.parse(sessionStorage[e]))}},{key:"getTrendsApiUrl",value:function(e){var t=this.getTermSynonyms(e);if(t&&t.length){var r=e+","+t;return this.buildTrendsApiUrl(r)}return""}},{key:"getTermSynonyms",value:function(e){try{return this.synonyms[e]}catch(t){return[]}}},{key:"sendGoogleQuery",value:function(e){var t=new google.visualization.Query(e);t.send(this.handleSingleTermQueryResponse.bind(this))}},{key:"handleSingleTermQueryResponse",value:function(e){try{var t=this.getTermsPontuationFromResponse(e);this.updateTerms(t),sessionStorage.setItem(t.main,JSON.stringify(t))}catch(r){console.log(r)}}},{key:"updateTerms",value:function(e){this.state.terms.push(e),this.setState({terms:this.state.terms})}},{key:"getTermsPontuationFromResponse",value:function(e){var t=e.G.Mf,r=t.splice(1,t.length-1),o=r[0].label,n=e.G.Nf,a=n[n.length-1].c,s=void 0;try{s=this.populateTermsList(r,a)}catch(i){a=n[n.length-2].c,s=this.populateTermsList(r,a)}return{main:o,all:s}}},{key:"populateTermsList",value:function(e,t){for(var r=[],o=0;o<=e.length-1;o++)r.push({label:e[o].label,value:t[o].v});return r.sort(function(e,t){return t.value-e.value}),r}},{key:"buildTrendsApiUrl",value:function(e){return"http://www.google.com/trends/fetchComponent?hl=pt-BR&q="+e+"&geo=BR&date=today%2012-m&cid=TIMESERIES_GRAPH_0&export=3"}},{key:"getHighlightedSentence",value:function(){var e={__html:""};if(this.state.sentence.length>0){for(var t=[],r=this.state.sentence.split(" "),o=0;o<this.state.terms.length;o++)t.push(this.state.terms[o].main);for(var o=0;o<r.length;o++)t.includes(r[o])&&(r[o]=['<span class="easyseo__el-highlight">',r[o],"</span>"].join(""));e.__html=r.join(" ")}return e}},{key:"showTooltip",value:function(e,t){for(var r=void 0,o=e.textContent,n=0;n<=this.state.terms.length-1;n++)if(this.state.terms[n].main==o){r=this.state.terms[n];break}this.setState({tooltip:{tooltipHandler:this.tooltipHandler.bind(this),isHidden:!1,terms:r,pos:{top:t.top,left:t.left}}})}},{key:"tooltipHandler",value:function(e){var t=this.state.sentence.replace(e.currentTarget.dataset.oldterm,e.currentTarget.dataset.newterm);this.setState({sentence:t}),this.refer.value=t,this.refer.dispatchEvent(new Event("change"))}},{key:"componentDidMount",value:function(){var e=this;document.getElementById(this.containerId).appendChild(this.refer),this.refer.className=this.refer.className+" easyseo__el-text",this.mirrorElement=document.querySelector("#"+this.containerId+" .easyseo__el-mirror"),this.mirrorElement.style.cssText=document.defaultView.getComputedStyle(this.refer,"").cssText,this.refer.addEventListener("click",function(t){for(var r=t.clientX,o=t.clientY,n=document.getElementsByClassName("easyseo__el-highlight"),a=0;a<=n.length-1;a++){var s=n[a],i=s.getBoundingClientRect();if(r>=i.left&&r<=i.right&&o>=i.top&&o<=i.bottom){e.showTooltip(s,{top:i.bottom+window.window.scrollY+10,left:(i.left+i.right)/2});break}}})}},{key:"render",value:function(){return p["default"].createElement("span",null,p["default"].createElement("div",{id:this.containerId,className:"easyseo__el-container"},p["default"].createElement("div",{className:"easyseo__el-mirror",contentEditable:!0,dangerouslySetInnerHTML:this.getHighlightedSentence()})),p["default"].createElement(c["default"],{params:this.state.tooltip}))}}]),t}(p["default"].Component);t["default"]=h},function(e,t,r){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,r,o){return r&&e(t.prototype,r),o&&e(t,o),t}}(),l=r(1),p=o(l),f=r(2),u=(o(f),r(5)),c=o(u),d=r(6),m=o(d),h=r(7),y=(o(h),function(e){function t(e){n(this,t);var r=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.props.params.isHidden=r.props.params.isHidden||!0,r.props.params.terms=r.props.params.terms||{},r.props.params.pos=r.props.params.pos||{top:0,left:0},r}return s(t,e),i(t,[{key:"renderTerms",value:function(){var e=this;if(this.props.params.terms.all)return p["default"].createElement("span",null,this.props.params.terms.all.map(function(t,r){if(e.props.params.terms.main!==t.label)return p["default"].createElement("span",{className:"easyseo__tooltip-info-term",key:r,"data-newterm":t.label,"data-oldterm":e.props.params.terms.main,onClick:e.changeTerms.bind(e)},p["default"].createElement("span",{className:"main-term"},e.props.params.terms.main),p["default"].createElement("span",{className:"other-term"},p["default"].createElement(c["default"],null),p["default"].createElement(m["default"],null),p["default"].createElement("a",null,t.label)))}))}},{key:"getWidth",value:function(){var e=document.getElementById("easyseo__tooltip");return e?e.offsetWidth:0}},{key:"changeTerms",value:function(e){this.props.params.tooltipHandler(e),this.closeHandler()}},{key:"closeHandler",value:function(){this.props.params.isHidden=!0,this.setState({params:this.props.params})}},{key:"getGoogleTrendsUrl",value:function(){if(0!==Object.keys(this.props.params.terms).length){var e=this.props.params.terms.all.map(function(e){return e.label}).join();return"https://www.google.com.br/trends/explore?q="+e}return"#"}},{key:"render",value:function(){var e={visibility:this.props.params.isHidden?"hidden":"visible",top:this.props.params.pos.top,left:this.props.params.pos.left-this.getWidth()/2};return p["default"].createElement("span",{id:"easyseo__tooltip",className:"easyseo__tooltip",style:e},p["default"].createElement("span",{className:"easyseo__tooltip-close",onClick:this.closeHandler.bind(this)},"✕"),p["default"].createElement("strong",{className:"easyseo__tooltip-title"},"Redomendação de SEO"),p["default"].createElement("p",{className:"easyseo__tooltip-subtitle"},"Substitua as palavras para ganhar mais relevância no Google"),p["default"].createElement("span",{className:"easyseo__tooltip-info"},this.renderTerms()),p["default"].createElement("a",{href:this.getGoogleTrendsUrl(),target:"_blank",className:"easyseo__tooltip-details"},"ver detalhes"))}}]),t}(p["default"].Component));t["default"]=y},function(e,t,r){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,r,o){return r&&e(t.prototype,r),o&&e(t,o),t}}(),l=r(1),p=o(l),f=r(2),u=(o(f),function(e){function t(){return n(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return s(t,e),i(t,[{key:"render",value:function(){return p["default"].createElement("span",{className:"easyseo__arrow-right"},p["default"].createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16px",height:"8px",viewBox:"0 0 16 8",version:"1.1"},p["default"].createElement("g",{stroke:"none",fill:"none"},p["default"].createElement("g",{transform:"translate(-631, -628)"},p["default"].createElement("g",{transform:"translate(495, 432)"},p["default"].createElement("g",{transform:"translate(144, 200) rotate(-90) translate(-144, -200) translate(132, 188)"},p["default"].createElement("g",null,p["default"].createElement("polygon",{points:"0 0 24 0 24 24 0 24"}),p["default"].createElement("polygon",{fill:"#CCCCCC",points:"8 16 12 20 16 16"}),p["default"].createElement("rect",{fill:"#CCCCCC",x:"11",y:"4",width:"2",height:"12"}))))))))}}]),t}(p["default"].Component));t["default"]=u},function(e,t,r){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,r,o){return r&&e(t.prototype,r),o&&e(t,o),t}}(),l=r(1),p=o(l),f=r(2),u=(o(f),function(e){function t(){return n(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return s(t,e),i(t,[{key:"render",value:function(){return p["default"].createElement("span",{className:"easyseo__arrow-reverse"},p["default"].createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16",version:"1.1"},p["default"].createElement("g",{stroke:"none",fill:"none"},p["default"].createElement("g",{transform:"translate(-631, -584)"},p["default"].createElement("g",{transform:"translate(527, 577)"},p["default"].createElement("g",{transform:"translate(112, 15) rotate(-90) translate(-112, -15) translate(100, 3)"},p["default"].createElement("g",null,p["default"].createElement("polygon",{points:"0 0 24 0 24 24 0 24"}),p["default"].createElement("polygon",{fill:"#FAFAFA",points:"12 16 16 20 20 16"}),p["default"].createElement("rect",{fill:"#FAFAFA",x:"15",y:"4",width:"2",height:"12"}),p["default"].createElement("polygon",{fill:"#FAFAFA",transform:"translate(8, 6) scale(-1, -1) translate(-8, -6) ",points:"4 4 8 8 12 4"}),p["default"].createElement("rect",{fill:"#FAFAFA",transform:"translate(8, 14) scale(-1, -1) translate(-8, -14) ",x:"7",y:"8",width:"2",height:"12"}))))))))}}]),t}(p["default"].Component));t["default"]=u},function(e,t,r){var o=r(8);"string"==typeof o&&(o=[[e.id,o,""]]);r(10)(o,{});o.locals&&(e.exports=o.locals)},function(e,t,r){t=e.exports=r(9)(),t.push([e.id,'@font-face{font-family:OpenSans Bold;src:url("http://s.glbimg.com/gl/ba/fonts/opensans-bold-webfont.eot");src:url("http://s.glbimg.com/gl/ba/fonts/opensans-bold-webfont.eot?#iefix") format("embedded-opentype"),url("http://s.glbimg.com/gl/ba/fonts/opensans-bold-webfont.woff") format("woff"),url("http://s.glbimg.com/gl/ba/fonts/opensans-bold-webfont.ttf") format("truetype"),url("http://s.glbimg.com/gl/ba/fonts/opensans-bold-webfont.svg") format("svg");font-weight:400;font-style:normal}@font-face{font-family:OpenSans Regular;src:url("http://s.glbimg.com/gl/ba/fonts/opensans-regular-webfont.eot");src:url("http://s.glbimg.com/gl/ba/fonts/opensans-regular-webfont.eot?#iefix") format("embedded-opentype"),url("http://s.glbimg.com/gl/ba/fonts/opensans-regular-webfont.woff") format("woff"),url("http://s.glbimg.com/gl/ba/fonts/opensans-regular-webfont.ttf") format("truetype"),url("http://s.glbimg.com/gl/ba/fonts/opensans-regular-webfont.svg") format("svg");font-weight:400;font-style:normal}.easyseo__tooltip{z-index:5;width:400px;display:block;position:absolute;border-radius:2px;background-color:#fff;box-sizing:border-box;padding:32px 32px 25px 24px;box-shadow:0 1px 4px 0 rgba(0,0,0,.4)}.easyseo__tooltip:after{content:\'\';top:-2px;left:50%;width:12px;height:12px;display:block;background:#fff;position:absolute;border-top:1px solid rgba(0,0,0,.1);border-left:1px solid rgba(0,0,0,.1);transform:rotate(45deg) translate(-50%)}.easyseo__tooltip-info,.easyseo__tooltip-subtitle,.easyseo__tooltip .main-term,.easyseo__tooltip .other-term{font-family:OpenSans Regular}.easyseo__tooltip-details,.easyseo__tooltip-title{font-family:OpenSans Bold}.easyseo__tooltip-title{color:#333;font-size:16px;font-weight:700;line-height:1.25;letter-spacing:-.5px}.easyseo__tooltip-subtitle{color:#999;font-size:14px;line-height:1.43;margin-bottom:32px;letter-spacing:-.3px}.easyseo__tooltip-info{color:#666;display:block;font-size:16px;line-height:1.5;margin-bottom:66px;letter-spacing:-.5px}.easyseo__tooltip-info a{color:#0669de}.easyseo__tooltip-info-term{cursor:pointer;margin-top:14px;margin-left:24px;border-radius:20px;display:inline-block}.easyseo__tooltip-info-term:first-child{margin-top:0}.easyseo__tooltip-info-term:hover{background-color:#d9ebff}.easyseo__tooltip-info-term:hover .main-term{color:#405e80}.easyseo__tooltip-info-term:hover .other-term{color:#fff;background-color:#0669de}.easyseo__tooltip-info-term:hover .other-term a{color:#fff}.easyseo__tooltip-info-term:hover .easyseo__arrow-right{display:none}.easyseo__tooltip-info-term:hover .easyseo__arrow-reverse{height:20px;display:inline-block;vertical-align:middle}.easyseo__tooltip-info-term .other-term{margin-left:2px}.easyseo__tooltip-info-term .main-term,.easyseo__tooltip-info-term .other-term{font-size:16px;line-height:1.5;padding:4px 14px;border-radius:50px;display:inline-block;font-family:OpenSans Regular;letter-spacing:-.5px}.easyseo__tooltip-info-term .easyseo__arrow-reverse,.easyseo__tooltip-info-term .easyseo__arrow-right{margin-right:30px}.easyseo__tooltip-info-term .easyseo__arrow-reverse{display:none}.easyseo__tooltip-details{color:#333;float:right;font-size:12px;font-weight:700;line-height:1.33;text-decoration:none;text-transform:uppercase}.easyseo__tooltip-close{top:0;right:0;color:#999;font-size:15px;cursor:pointer;padding:12px 14px;position:absolute}',""])},function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var r=this[t];r[2]?e.push("@media "+r[2]+"{"+r[1]+"}"):e.push(r[1])}return e.join("")},e.i=function(t,r){"string"==typeof t&&(t=[[null,t,""]]);for(var o={},n=0;n<this.length;n++){var a=this[n][0];"number"==typeof a&&(o[a]=!0)}for(n=0;n<t.length;n++){var s=t[n];"number"==typeof s[0]&&o[s[0]]||(r&&!s[2]?s[2]=r:r&&(s[2]="("+s[2]+") and ("+r+")"),e.push(s))}},e}},function(e,t,r){function o(e,t){for(var r=0;r<e.length;r++){var o=e[r],n=d[o.id];if(n){n.refs++;for(var a=0;a<n.parts.length;a++)n.parts[a](o.parts[a]);for(;a<o.parts.length;a++)n.parts.push(p(o.parts[a],t))}else{for(var s=[],a=0;a<o.parts.length;a++)s.push(p(o.parts[a],t));d[o.id]={id:o.id,refs:1,parts:s}}}}function n(e){for(var t=[],r={},o=0;o<e.length;o++){var n=e[o],a=n[0],s=n[1],i=n[2],l=n[3],p={css:s,media:i,sourceMap:l};r[a]?r[a].parts.push(p):t.push(r[a]={id:a,parts:[p]})}return t}function a(e,t){var r=y(),o=v[v.length-1];if("top"===e.insertAt)o?o.nextSibling?r.insertBefore(t,o.nextSibling):r.appendChild(t):r.insertBefore(t,r.firstChild),v.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");r.appendChild(t)}}function s(e){e.parentNode.removeChild(e);var t=v.indexOf(e);t>=0&&v.splice(t,1)}function i(e){var t=document.createElement("style");return t.type="text/css",a(e,t),t}function l(e){var t=document.createElement("link");return t.rel="stylesheet",a(e,t),t}function p(e,t){var r,o,n;if(t.singleton){var a=b++;r=g||(g=i(t)),o=f.bind(null,r,a,!1),n=f.bind(null,r,a,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(r=l(t),o=c.bind(null,r),n=function(){s(r),r.href&&URL.revokeObjectURL(r.href)}):(r=i(t),o=u.bind(null,r),n=function(){s(r)});return o(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;o(e=t)}else n()}}function f(e,t,r,o){var n=r?"":o.css;if(e.styleSheet)e.styleSheet.cssText=_(t,n);else{var a=document.createTextNode(n),s=e.childNodes;s[t]&&e.removeChild(s[t]),s.length?e.insertBefore(a,s[t]):e.appendChild(a)}}function u(e,t){var r=t.css,o=t.media;if(o&&e.setAttribute("media",o),e.styleSheet)e.styleSheet.cssText=r;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(r))}}function c(e,t){var r=t.css,o=t.sourceMap;o&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var n=new Blob([r],{type:"text/css"}),a=e.href;e.href=URL.createObjectURL(n),a&&URL.revokeObjectURL(a)}var d={},m=function(e){var t;return function(){return"undefined"==typeof t&&(t=e.apply(this,arguments)),t}},h=m(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),y=m(function(){return document.head||document.getElementsByTagName("head")[0]}),g=null,b=0,v=[];e.exports=function(e,t){t=t||{},"undefined"==typeof t.singleton&&(t.singleton=h()),"undefined"==typeof t.insertAt&&(t.insertAt="bottom");var r=n(e);return o(r,t),function(e){for(var a=[],s=0;s<r.length;s++){var i=r[s],l=d[i.id];l.refs--,a.push(l)}if(e){var p=n(e);o(p,t)}for(var s=0;s<a.length;s++){var l=a[s];if(0===l.refs){for(var f=0;f<l.parts.length;f++)l.parts[f]();delete d[l.id]}}}};var _=function(){var e=[];return function(t,r){return e[t]=r,e.filter(Boolean).join("\n")}}()},function(e,t,r){var o=r(12);"string"==typeof o&&(o=[[e.id,o,""]]);r(10)(o,{});o.locals&&(e.exports=o.locals)},function(e,t,r){t=e.exports=r(9)(),t.push([e.id,".easyseo__el-highlight{background:#eee;border-radius:2px;border-bottom:2px solid #2993e1}.easyseo__el-container{overflow:hidden;position:relative}.easyseo__el-text{position:relative;background:transparent!important}.easyseo__el-mirror{top:0!important;left:0!important;right:0!important;bottom:0!important;z-index:0!important;color:transparent!important;position:absolute!important;-webkit-text-fill-color:transparent!important}",""])}])});
//# sourceMappingURL=easyseo.js.map