// ==UserScript==
// @name        Avcollectors Show Sukebei
// @namespace   Avcollectors_Show_Sukebei
// @description Shows Javtrailers and Sukebei search links on the Avcollectors webpage. Copy the title name to the clipboard.
// @icon        https://www.google.com/s2/favicons?sz=256&domain=avcollectors.com
// @version     1
// @author      Sappurit
// @updateURL   https://openuserjs.org/meta/Sapp/Avcollectors_Show_Sukebei.meta.js
// @license     MIT
// @match       http://*.avcollectors.com/board/index.php?topic=*
// @match       https://*.avcollectors.com/board/index.php?topic=*
// ==/UserScript==

(function() {
    'use strict';

    let meta = document.querySelector('meta[name="description"]').getAttribute('content');
    let title = meta.replace(/ซับไทย (\w+ \w+) (.+) (\w+\-\d+)/, '$1 $3 $2');
    let id = meta.replace(/.+ (\w+\-\d+)/, '$1');

    let targetElement = document.querySelector('div[id^="subject_"]');
    targetElement.firstElementChild.innerText = title; // a

    let clipboardCopy = document.createElement('a');
    clipboardCopy.innerText = '📋';
    clipboardCopy.style.cursor = 'pointer';
    clipboardCopy.addEventListener('click', copyText, false);

    let javtrailersAnchor = document.createElement('a');
    javtrailersAnchor.setAttribute('target', '_blank');
    javtrailersAnchor.setAttribute('href', 'https://javtrailers.com/search/' + id);
    javtrailersAnchor.innerText = 'JAVT';

    let sukebeiAnchor = document.createElement('a');
    sukebeiAnchor.setAttribute('target', '_blank');
    sukebeiAnchor.setAttribute('href', 'https://sukebei.nyaa.si/?f=0&c=2_2&q=' + id);
    sukebeiAnchor.innerText = 'SKB';

    targetElement.append(' · ', clipboardCopy);
    targetElement.append(' · ', javtrailersAnchor);
    targetElement.append(' · ', sukebeiAnchor);

    function copyText()
    {
        let node = this.previousElementSibling;
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



