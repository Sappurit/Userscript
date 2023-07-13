// ==UserScript==
// @name        YTS Plus
// @namespace   YTS_Plus
// @description Shows magnet links on the movie page. Click to copy the magnet links.
// @icon        https://www.google.com/s2/favicons?sz=256&domain=yts.mx
// @version     2
// @author      Sappurit
// @updateURL   https://github.com/Sappurit/Userscript/raw/main/YTS_Plus/YTS_Plus.user.js
// @downloadURL https://github.com/Sappurit/Userscript/raw/main/YTS_Plus/YTS_Plus.user.js
// @license     MIT
// @match       https://*.yts.mx/movies/*
// ==/UserScript==


var trackers = [];
trackers.push('http://tracker.opentrackr.org:1337/announce');
trackers.push('http://open.acgnxtracker.com/announce');
trackers.push('http://open.stealth.si/announce');
trackers.push('http://opentracker.i2p.rocks/announce');
trackers.push('http://tracker.gbitt.info/announce');
trackers.push('http://tracker.openbittorrent.com/announce');
trackers.push('http://tracker.tamersunion.org/announce');
trackers.push('http://tracker.torrent.eu.org/announce');
trackers.push('http://tracker1.itzmx.com/announce');
trackers.push('http://tracker2.dler.org/announce');


(function() {
    'use strict';

    try
    {
        let title = document.location.href.split('/').pop();

        let emElement = document.querySelector('div#movie-info > p[class="hidden-xs hidden-sm"] > em.pull-left');
        emElement.innerHTML = 'Torrent : &nbsp;';

        let magnetEmphasis = document.createElement('em');
        magnetEmphasis.setAttribute('class', 'pull-left');
        magnetEmphasis.innerHTML = 'Magnet : &nbsp;';

        emElement.before(magnetEmphasis);

        let elements = emElement.parentElement.querySelectorAll('a[rel="nofollow"]');

        for (let i = 0; i < elements.length; i++)
        {
            let hash = elements[i].href.match(/\w{40}$/);
            let text = elements[i].innerHTML;

            let magnetURL = 'magnet:?xt=urn:btih:' + hash + '&dn=' + title +'&tr=' + trackers.join('&tr=');

            let magnetAnchor = document.createElement('a');
            magnetAnchor.innerHTML = text;
            magnetAnchor.setAttribute('rel', 'nofollow');
            magnetAnchor.setAttribute('href', magnetURL);
            magnetAnchor.addEventListener('click', function(e){copyText(e, `${magnetURL}`)}, false);

            emElement.insertAdjacentElement('beforebegin', magnetAnchor);
            emElement.insertAdjacentHTML('beforebegin', '\n');
        }

        emElement.insertAdjacentHTML('beforebegin', '<br><br>');

    } catch(e) {}

})();

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



