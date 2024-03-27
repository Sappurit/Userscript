// ==UserScript==
// @name         Flash Express Plus
// @namespace    Flash_Express_Plus
// @description  Auto Expand Tracking Details.
// @icon         https://www.google.com/s2/favicons?sz=256&domain=flashexpress.com
// @version      0.1
// @author       Sappurit
// @updateURL    https://github.com/Sappurit/Userscript/raw/main/Flash_Express/Flash_Express.user.js
// @downloadURL  https://github.com/Sappurit/Userscript/raw/main/Flash_Express/Flash_Express.user.js
// @license      MIT
// @match        https://www.flashexpress.co.th/fle/tracking*
// @match        https://www.flashexpress.com/fle/tracking*
// ==/UserScript==

//-----------------------------------------------------------------------------
// https://stackoverflow.com/questions/34077641/how-to-detect-page-navigation-on-youtube-and-modify-its-appearance-seamlessly
// How to inspect a site-specific events. Run getEventListeners(document) in devtools console.
//-----------------------------------------------------------------------------

var observer = new MutationObserver(observeCallback);
var observeElement = document.body;
var observeOptions = { childList: true, subtree: true };

observer.observe(observeElement, observeOptions);

//-----------------------------------------------------------------------------
// https://stackoverflow.com/questions/12897446/userscript-to-wait-for-page-to-load-before-executing-code-techniques/
//-----------------------------------------------------------------------------

async function observeCallback(mutations)
{
    let wrapElement;

    try
    {
        wrapElement = document.querySelector('div.cont-wrap > div.content > div.cont-body-wrap');
    } catch(e) {}

    if ( wrapElement )
    {
        observer.disconnect();
        console.log('observer : disconnected');

        wrapElement.setAttribute('class', 'cont-body');

        let btnElement = document.querySelector('div.detailed-btn');
        btnElement.remove();

        let qrElement = document.querySelector('div.qrcode-wrap');
        qrElement.remove();

        let bottomElement = document.querySelector('div.tracking-bottom');
        bottomElement.remove();

        let footerElement = document.querySelector('footer');
        footerElement.remove();
    }
}

//-----------------------------------------------------------------------------


