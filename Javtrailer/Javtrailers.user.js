// ==UserScript==
// @name        Javtrailers Plus
// @namespace   Javtrailers_Plus
// @description Shows Avcollectors and Sukebei search links on the Javtrailers webpage. Copy the DVD ID to the clipboard.
// @icon        https://www.google.com/s2/favicons?sz=256&domain=javtrailers.com
// @version     6
// @author      Sappurit
// @updateURL   https://github.com/Sappurit/Userscript/raw/main/Javtrailers/Javtrailers.user.js
// @downloadURL https://github.com/Sappurit/Userscript/raw/main/Javtrailers/Javtrailers.user.js
// @license     MIT
// @match       https://*.javtrailers.com/*
// ==/UserScript==

//-----------------------------------------------------------------------------
// https://stackoverflow.com/questions/12897446/userscript-to-wait-for-page-to-load-before-executing-code-techniques/
//-----------------------------------------------------------------------------

var observeElement = document.body;
var observeOptions = { childList: true, subtree: true };
var observePage = new MutationObserver(observeCallback);

console.log('Observe Start : ' + new Date().toLocaleString());
observePage.observe(observeElement, observeOptions);

async function observeCallback(mutations)
{
    try
    {
        let dvdElement = document.querySelector('#info-row p:nth-of-type(1):not([data-mod])');

        if ( dvdElement )
        {
            Javtrailers();
            dvdElement.setAttribute('data-mod', true);
        }
    } catch(e) {}
}

//-----------------------------------------------------------------------------

function Javtrailers()
{
    try
    {
        let targetElement = document.querySelector('#info-row p:nth-of-type(1):not([data-mod])');
        let dvdId = targetElement.lastChild.textContent.trim();

        let clipboardCopy = document.createElement('span');
        clipboardCopy.innerText = '📋';
        clipboardCopy.style.cursor = 'pointer';
        clipboardCopy.style.textDecoration = 'none';
        clipboardCopy.addEventListener('click', function(e){copyText(e, dvdId)}, false);

        let avcollectorsAnchor = document.createElement('a');
        avcollectorsAnchor.setAttribute('target', '_blank');
        avcollectorsAnchor.setAttribute('href', 'https://www.google.co.th/search?q=site:avcollectors.com+ซับไทย+"' + dvdId + '"');
        avcollectorsAnchor.innerText = 'AVC';

        let sukebeiAnchor = document.createElement('a');
        sukebeiAnchor.setAttribute('target', '_blank');
        sukebeiAnchor.setAttribute('href', 'https://sukebei.nyaa.si/?f=0&c=2_2&q=' + dvdId);
        sukebeiAnchor.innerText = 'SKB';

        //---------------------------------------------------------------------

        targetElement.append(' · ', clipboardCopy);
        targetElement.append(' · ', avcollectorsAnchor);
        targetElement.append(' · ', sukebeiAnchor);

    } catch(e) {}
}

//-----------------------------------------------------------------------------

function copyText(e, text)
{
    let textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    textarea.value = text;
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    // console.log(e.target);
    // console.log(text);
}

//-----------------------------------------------------------------------------

/******************************************************************************

https://developer.mozilla.org/en-US/docs/Web/API/Element

Element.before()
Element.prepend()
Element.append()        // Allows several Node and string objects. No return value.
Element.after()

Element.insertAdjacentElement()
Element.insertAdjacentText()
Element.insertAdjacentHTML()

<!-- 'beforebegin' Before the element. -->
<p>
    <!-- 'afterbegin' Inside the element, before the first child. -->
    foo
    <!-- 'beforeend' Inside the element, after the last child. -->
</p>
<!--'afterend' After the element. -->


https://developer.mozilla.org/en-US/docs/Web/API/Node

Node.appendChild()      // Only accepts one Node objects. Returns the appended Node object.
Node.insertBefore()
There is no Node.insertAfter() method. It can be emulated by Node.insertBefore(newElement, Node.nextSibling)

******************************************************************************/



