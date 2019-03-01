
var isFirefox = typeof InstallTrigger !== 'undefined';

//https://stackoverflow.com/questions/784929/what-is-the-not-not-operator-in-javascript
// !!object caste un object en boolean, sa valeur vaut faux si il contenait une falsy value (0, null, undefined....)
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

// https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser/9851769
// "!!window.chrome && !!window.chrome.webstore" ne marche plus depuis la version 71.0.3578.80
// on ajoute !isOpera à isChrome car la method utilisée fait un faux positif sous Opera
// https://stackoverflow.com/questions/4565112/javascript-how-to-find-out-if-the-user-browser-is-chrome
// /value/ est une écriture de regex valable en js
var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor) && !isOpera;
