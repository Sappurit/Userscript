// ==UserScript==
// @name        SiamBit Show Poster
// @namespace   SiamBit_Show_Poster
// @description Shows high quality posters on torrent lists.
// @icon        https://www.google.com/s2/favicons?sz=256&domain=siambit.me
// @version     9
// @author      Sappurit
// @updateURL   https://openuserjs.org/meta/Sapp/SiamBit_Show_Poster.meta.js
// @license     MIT
// @match       https://*.siambit.me/viewbrsb.php*
// @match       https://*.siambit.me/viewno18sb.php*
// ==/UserScript==

(function() {
    'use strict';

    let thumbWidth = '200px';
    let thumbHeight = '300px';

    let header = document.createElement('td');
    header.setAttribute('class', 'colhead');
    header.setAttribute('align', 'center');
    header.style.width = thumbWidth;
    header.innerText = 'Poster';

    let table = document.querySelector('table[width="100%"][border="1"][cellspacing="0"][cellpadding="5"]');
    table.rows[0].insertBefore(header, table.rows[0].cells[1]);

//  for (let row of table.rows)
    for (let i = 1; i < table.rows.length; i++)
    {
        let row = table.rows[i];

        let poster = document.createElement('td');
        poster.setAttribute('align', 'center');

        try
        {
    	    let anchor = row.querySelector('img[title="รูปภาพตัวอย่าง"]').parentElement;
            let link = anchor.href;

            let thumbImage = document.createElement('img');
            thumbImage.src = link;
            thumbImage.style.minWidth = thumbWidth;
            thumbImage.style.maxWidth = thumbWidth;
            thumbImage.style.maxHeight = thumbHeight;
            thumbImage.style.objectFit = 'cover';

            let thumbAnchor = document.createElement('a');
            thumbAnchor.href = link;
            thumbAnchor.setAttribute('target', '_blank');

            thumbAnchor.append(thumbImage);
            poster.append(thumbAnchor);
        } catch(e) {}

        row.insertBefore(poster, row.cells[1]);
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


