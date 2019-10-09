// ==UserScript==
// @name                Recaptcha Resolve
// @namespace           @@marcosvinicius.santosmarques
// @icon                https://i.imgur.com/7WgHTT8.gif
// @website             https://tribalwarsbr100.wixsite.com/tw100
// @email               tribalwarsbr100@gmail.com
// @description 	    Solução para Resolver Recaptcha Automatico
// @author		        Marcos v.s Marques
// @include             http*://*.*game.php*
// @include      *
// @version             0.0.1
// @copyright           2018, Tribalwarsbr100 (https://openuserjs.org//users/Tribalwarsbr100)
// @version             0.0.1
// @license             AGPL-3.0-or-later
// @grant               GM_getResourceText
// @grant               GM_addStyle
// @grant               GM_getValue
// @grant               unsafeWindow
// ==/UserScript==

(function() {
    'use strict';
    setTimeout(function() { document.getElementsByClassName("recaptcha-checkbox-checkmark")[0].click(); }, 1000);
})();
