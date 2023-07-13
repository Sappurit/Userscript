// ==UserScript==
// @name        Javtrailers Plus
// @namespace   Javtrailers_Plus
// @description Shows Avcollectors and Sukebei search links on the Javtrailers webpage. Copy the DVD ID to the clipboard.
// @icon        https://www.google.com/s2/favicons?sz=256&domain=javtrailers.com
// @version     5
// @author      Sappurit
// @updateURL   https://github.com/Sappurit/Userscript/raw/main/Javtrailers_Plus/Javtrailers_Plus.user.js
// @downloadURL https://github.com/Sappurit/Userscript/raw/main/Javtrailers_Plus/Javtrailers_Plus.user.js
// @license     MIT
// @match       https://*.javtrailers.com/*
// ==/UserScript==

//-----------------------------------------------------------------------------

// console.log('Load : ' + new Date().toLocaleString());

//-----------------------------------------------------------------------------

var Old = { title: undefined, metadata: undefined, id: undefined, link: undefined, thumbnail: undefined };
var New = { title: undefined, metadata: undefined, id: undefined, link: undefined, thumbnail: undefined };

//-----------------------------------------------------------------------------
// https://stackoverflow.com/questions/34077641/how-to-detect-page-navigation-on-youtube-and-modify-its-appearance-seamlessly
// How to inspect a site-specific events. Run getEventListeners(document) in devtools console.
//-----------------------------------------------------------------------------

document.addEventListener('fullscreenchange', function (event) {
    if ( document.location.href.match(/javtrailers.com\/video/) )
    {
        console.log('Observe Start : ' + new Date().toLocaleString());
        observer.observe(observeElement, observeOptions);
    }
});

//-----------------------------------------------------------------------------
// https://stackoverflow.com/questions/12897446/userscript-to-wait-for-page-to-load-before-executing-code-techniques/
//-----------------------------------------------------------------------------

var observer = new MutationObserver(observeCallback);
var observeElement = document.body;
var observeOptions = { childList: true, subtree: true };

async function observeCallback(mutations)
{
    try
    {
        New.id = document.querySelector('#info-row p:nth-of-type(1)').lastChild.textContent.trim();
    } catch(e) {}

    if ( New.id && Old.id !== New.id )
    {
        observer.disconnect();
        Javtrailers();
        Old.id = New.id;
        console.log(New.id);
        console.log('Observe Stop : ' + new Date().toLocaleString());
    }
}

//-----------------------------------------------------------------------------

function Javtrailers()
{
    try
    {
        let clipboardCopy = document.querySelector('span#clipboardCopy');

        if ( clipboardCopy )
        {
            clipboardCopy.previousSibling.remove();
            clipboardCopy.remove();
        }

        clipboardCopy = document.createElement('span');
        clipboardCopy.setAttribute('id', 'clipboardCopy');
        clipboardCopy.innerText = '📋';
        clipboardCopy.style.cursor = 'pointer';
        clipboardCopy.style.textDecoration = 'none';
        clipboardCopy.addEventListener('click', function(e){copyText(e, New.id)}, false);

        let avcollectorsAnchor = document.createElement('a');
        avcollectorsAnchor.setAttribute('target', '_blank');
        avcollectorsAnchor.setAttribute('href', 'https://www.google.co.th/search?q=site:avcollectors.com+ซับไทย+"' + New.id + '"');
        avcollectorsAnchor.innerText = 'AVC';

        let sukebeiAnchor = document.createElement('a');
        sukebeiAnchor.setAttribute('target', '_blank');
        sukebeiAnchor.setAttribute('href', 'https://sukebei.nyaa.si/?f=0&c=2_2&q=' + New.id);
        sukebeiAnchor.innerText = 'SKB';

        //---------------------------------------------------------------------

        let targetElement = document.querySelector('#info-row p:nth-of-type(1)');
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

function copyTextSelection()
{
    let node = this;
    let range = document.createRange();
    let selection = document.getSelection();
    range.selectNode(node);
    selection.removeAllRanges(); // Can't merge selections. It will ignore addRange.
    selection.addRange(range);
    document.execCommand("copy");
}

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



