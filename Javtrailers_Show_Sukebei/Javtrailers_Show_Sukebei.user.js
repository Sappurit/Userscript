// ==UserScript==
// @name        Javtrailers Show Sukebei
// @namespace   Javtrailers_Show_Sukebei
// @description Shows Avcollectors and Sukebei search links on the Javtrailers webpage. Copy the DVD ID to the clipboard.
// @icon        https://www.google.com/s2/favicons?sz=256&domain=javtrailers.com
// @version     2
// @author      Sappurit
// @updateURL   https://github.com/Sappurit/Userscript/raw/main/Javtrailers_Show_Sukebei/Javtrailers_Show_Sukebei.user.js
// @downloadURL https://github.com/Sappurit/Userscript/raw/main/Javtrailers_Show_Sukebei/Javtrailers_Show_Sukebei.user.js
// @license     MIT
// @match       https://*.javtrailers.com/video/*
// ==/UserScript==

(function() {
    'use strict';

    let targetElement = document.querySelector('#info-row > div:nth-of-type(2) > p:nth-of-type(1)');
    let id = targetElement.firstElementChild.nextSibling.textContent.trim();
    targetElement.firstElementChild.nextSibling.textContent = id;

    let clipboardCopy = document.createElement('a');
    clipboardCopy.innerText = '📋';
    clipboardCopy.style.cursor = 'pointer';
    clipboardCopy.addEventListener('click', copyText, false);

    let avcollectorsAnchor = document.createElement('a');
    avcollectorsAnchor.setAttribute('target', '_blank');
    avcollectorsAnchor.setAttribute('href', 'https://www.google.co.th/search?q=site:avcollectors.com+ซับไทย+"' + id + '"');
    avcollectorsAnchor.innerText = 'AVC';

    let sukebeiAnchor = document.createElement('a');
    sukebeiAnchor.setAttribute('target', '_blank');
    sukebeiAnchor.setAttribute('href', 'https://sukebei.nyaa.si/?f=0&c=2_2&q=' + id);
    sukebeiAnchor.innerText = 'SKB';

    targetElement.append(' · ', clipboardCopy);
    targetElement.append(' · ', avcollectorsAnchor);
    targetElement.append(' · ', sukebeiAnchor);

    function copyText()
    {
        let node = this.previousElementSibling.nextSibling;
        let range = document.createRange();
        let selection = document.getSelection();
//      range.selectNodeContents(node);
        range.selectNode(node);
        selection.removeAllRanges(); // Can't merge selections. It will ignore addRange.
        selection.addRange(range);
        document.execCommand("copy");
    }

})();

/********************************************************

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

*********************************************************/



