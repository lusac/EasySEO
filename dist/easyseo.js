!function(e,a){"object"==typeof exports&&"object"==typeof module?module.exports=a():"function"==typeof define&&define.amd?define([],a):"object"==typeof exports?exports.easyseo=a():e.easyseo=a()}(this,function(){return function(e){function a(t){if(r[t])return r[t].exports;var n=r[t]={exports:{},id:t,loaded:!1};return e[t].call(n.exports,n,n.exports,a),n.loaded=!0,n.exports}var r={};return a.m=e,a.c=r,a.p="/dist/",a(0)}([function(e,a){function r(e,a,r){for(var t,n=document.getElementById("terms-container"),o=e.G.Mf.splice(1,e.G.Mf.length-1),i=o[0].label,s=e.G.Nf[e.G.Nf.length-1].c,l=0,d=1;d<=s.length-1;d++)s[d].v>l&&(t=o[d-1].label,l=s[d].v);if("undefined"!==t&&t!==i){var u="<li>Usar a palavra <b>"+t+"</b> no lugar de <b>"+i+"</b></li>";n.insertAdjacentHTML("beforeend",u),c(i)}}function t(e){try{return SYNONYMOUS[e]}catch(a){return[]}}function n(e,a){var r=t(e);if(r){var n=e+","+r,o=1==a?5:"3&w=500&h=300";return url="http://www.google.com/trends/fetchComponent?hl=pt-BR&q="+n+"&cid=TIMESERIES_GRAPH_0&export="+o,url}return""}function o(e){var a=n(e);if(a){var t=new google.visualization.Query(a);t.send(r)}}function i(e){var e=e.toLowerCase(),a=e.replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()]/g,"");return finalSentence=a.replace(/\s{2,}/g," "),finalSentence.split(" ")}function s(){document.getElementById("terms-container").innerHTML="",document.getElementById("tags").innerHTML=""}function c(e){var a=document.getElementById("tags"),r='<li class="tag" data-term="'+e+'" onClick="showGraphic(this, \''+e+"')\">"+e+"</li>";a.insertAdjacentHTML("beforeend",r)}function l(e,a){var r=document.getElementById("trends-graphic-iframe"),t=document.getElementsByClassName("active")[0];t&&(t.className=t.className.replace("active","")),e.className=e.className+" active",r.src=n(a,!0),r.className=r.className.replace("hide","")}function d(e){var a=e.value,r=i(a);s();for(var t=0;t<=r.length-1;t++)o(r[t])}google.load("visualization","1"),window.SYNONYMOUS={como:["da maneira que","do jeito que","do modo que","que nem","tal como","tal e qual","tanto quanto"],remover:["tirar","transportar","arredar","mover","levar","mudar"],make:["maquiagem","maquilagem"],limpar:["tirar","lavar","assear","mundificar","higienizar","varrer","ensaboar","despoluir","espanar","escovar","esfregar","desempoar","desempoeirar","absterger","detergir","desencardir","desenxovalhar","desenodoar","desenfarruscar","apagar","abluir"],tinta:["colorante","tintura","pigmento","corante"],caneta:["tinteiro"],aprenda:["descobrir","conhecer","estudar","assimilar","saber","perceber","entender","compreender","instruir-se"],customizar:["personalizar","individualizar","individuar","particularizar","singularizar"],poucos:["alguns"],passos:["etapas","fases","pontos","estágios","estádios"]},window.searchTopRelated=d,window.showGraphic=l}])});
//# sourceMappingURL=easyseo.js.map