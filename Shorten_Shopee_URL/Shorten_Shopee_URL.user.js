// ==UserScript==
// @name        Shorten Shopee URL
// @namespace   Shorten_Shopee_URL
// @description Get rid of all those useless parameters on the product item URL.
// @icon        https://www.google.com/s2/favicons?sz=256&domain=shopee.com
// @version     15
// @author      Sappurit
// @updateURL   https://github.com/Sappurit/Userscript/raw/main/Shorten_Shopee_URL/Shorten_Shopee_URL.user.js
// @downloadURL https://github.com/Sappurit/Userscript/raw/main/Shorten_Shopee_URL/Shorten_Shopee_URL.user.js
// @license     MIT
// @match       https://*.shopee.co.id/*
// @match       https://*.shopee.co.th/*
// @match       https://*.shopee.com/*
// @match       https://*.shopee.com.br/*
// @match       https://*.shopee.com.co/*
// @match       https://*.shopee.com.mx/*
// @match       https://*.shopee.com.my/*
// @match       https://*.shopee.cl/*
// @match       https://*.shopee.ph/*
// @match       https://*.shopee.pl/*
// @match       https://*.shopee.sg/*
// @match       https://*.shopee.tw/*
// @match       https://*.shopee.vn/*
// ==/UserScript==

(function() {
	'use strict';

	let oldURL = location.href;
	oldURL = oldURL.replace(/.+-i\.(\d+)\.(\d+).*/, 'product/$1/$2');
	history.replaceState(null, null, oldURL);

	let observer = new MutationObserver(observeCallback); 
	let observeElement = document.querySelector('body');
	let observeOptions = { childList: true, subtree: true };

	observer.observe(observeElement, observeOptions);

	function observeCallback (mutations)
	{
	//	for (let mutation of mutations)
		if ( oldURL != location.href )
		{
			oldURL = location.href;
			oldURL = oldURL.replace(/.+-i\.(\d+)\.(\d+).*/, 'product/$1/$2');
			history.replaceState(null, null, oldURL);
		}
	}

})();

// https://stackoverflow.com/questions/3522090/event-when-window-location-href-changes
// https://www.smashingmagazine.com/2019/04/mutationobserver-api-guide/
// https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver



