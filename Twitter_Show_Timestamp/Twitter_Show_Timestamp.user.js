// ==UserScript==
// @name        Twitter Show Timestamp
// @namespace   Twitter_Show_Timestamp
// @description Show the local DateTime of every tweet.
// @icon        https://www.google.com/s2/favicons?sz=256&domain=twitter.com
// @version     9
// @author      Sappurit
// @updateURL   https://github.com/Sappurit/Userscript/raw/main/Twitter_Show_Timestamp/Twitter_Show_Timestamp.user.js
// @downloadURL https://github.com/Sappurit/Userscript/raw/main/Twitter_Show_Timestamp/Twitter_Show_Timestamp.user.js
// @license     MIT
// @match       https://*.twitter.com/*
// ==/UserScript==

(function() {
    'use strict';

    let observer = new MutationObserver(observeCallback);
    let observeElement = document.querySelector('body');
    let observeOptions = { childList: true, subtree: true };
    let timeOptions = { dateStyle: 'medium', timeStyle: 'short' };

    observer.observe(observeElement, observeOptions);

    function observeCallback(mutations)
    {
        for (let mutation of mutations)
        {
            for (let node of mutation.addedNodes)
            {
//              if (!(node instanceof HTMLDivElement)) // track only DIV elements.
                if (!(node instanceof HTMLElement)) // track only HTML elements.
                {
                    continue;
                }

//              console.log(node);

//              for (let element of node.querySelectorAll('div[data-testid="cellInnerDiv"] article[data-testid="tweet"] div[data-testid="User-Names"] time[datetime]'))
//              for (let element of node.querySelectorAll('article[data-testid="tweet"] div[data-testid="User-Names"] time[datetime]'))
                for (let element of node.querySelectorAll('time[datetime]'))
                {
//                  console.log(element);

                    try
                    {
                        let isoDateTime = element.getAttribute('datetime');
//                      console.log(isoDateTime);

                        let localDateTime = new Date(isoDateTime).toLocaleString('en-US', timeOptions).replace(/^(\w+ \d+, \d+), (.+)$/, '$1 · $2');
//                      console.log(localDateTime);

//                      if ( element.innerText.length < 13 ) element.innerText = localDateTime + ' · ' + element.innerText;
                        if ( element.innerText.length < 13 ) element.innerText = localDateTime;
                    }
                    catch(e) {}
                }
            } // mutation.addedNodes
        } // mutations
    } // observeCallback

})();



