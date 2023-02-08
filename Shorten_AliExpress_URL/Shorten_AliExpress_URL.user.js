// ==UserScript==
// @name        Shorten AliExpress URL
// @namespace   Shorten_AliExpress_URL
// @description Get rid of all those useless parameters on the product item URL.
// @icon        https://www.google.com/s2/favicons?sz=256&domain=aliexpress.com
// @version     12
// @author      Sappurit
// @updateURL   https://github.com/Sappurit/Userscript/raw/main/Shorten_AliExpress_URL/Shorten_AliExpress_URL.user.js
// @downloadURL https://github.com/Sappurit/Userscript/raw/main/Shorten_AliExpress_URL/Shorten_AliExpress_URL.user.js
// @license     MIT
// @match       https://*.aliexpress.com/item/*.html*
// @match       https://*.aliexpress.com/store/group/*/*.html*
// ==/UserScript==

(function() {
    'use strict';

    var newUrl = location.href;
    newUrl = newUrl.replace(/item\/(\d+.html).*/, 'item/$1');
    newUrl = newUrl.replace(/store\/group\/.+\/([\d_]+.html).*/, 'store/group/x/$1');
    
    history.replaceState(null, null, newUrl);

})();


