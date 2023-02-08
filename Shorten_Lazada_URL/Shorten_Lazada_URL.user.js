// ==UserScript==
// @name        Shorten Lazada URL
// @namespace   Shorten_Lazada_URL
// @description Get rid of all those useless parameters on the product item URL.
// @icon        https://www.google.com/s2/favicons?sz=256&domain=lazada.com
// @version     1
// @author      Sappurit
// @updateURL   https://github.com/Sappurit/Userscript/raw/main/Shorten_Lazada_URL/Shorten_Lazada_URL.user.js
// @downloadURL https://github.com/Sappurit/Userscript/raw/main/Shorten_Lazada_URL/Shorten_Lazada_URL.user.js
// @license     MIT
// @match       https://*.lazada.co.id/products/*.html*
// @match       https://*.lazada.co.th/products/*.html*
// @match       https://*.lazada.com.my/products/*.html*
// @match       https://*.lazada.com.ph/products/*.html*
// @match       https://*.lazada.sg/products/*.html*
// @match       https://*.lazada.vn/products/*.html*
// ==/UserScript==

(function() {
	'use strict';

	let oldURL = location.href;
	oldURL = oldURL.replace(/products\/.+-(i\d+-s\d+.html).*/, 'products/$1');
	history.replaceState(null, null, oldURL);

	let observer = new MutationObserver(callback);
	let element = document.querySelector('body');
	let options = { childList: true, subtree: true };

	function callback (mutations)
	{
	//	for (let mutation of mutations)
		if ( oldURL != location.href )
		{
			oldURL = location.href;
			oldURL = oldURL.replace(/products\/.+-(i\d+-s\d+.html).*/, 'products/$1');
			history.replaceState(null, null, oldURL);
		}
	}

	observer.observe(element, options);

})();

// https://stackoverflow.com/questions/3522090/event-when-window-location-href-changes
// https://www.smashingmagazine.com/2019/04/mutationobserver-api-guide/
// https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver


