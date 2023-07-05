// ==UserScript==
// @name        IMDB Show RARBG
// @namespace   IMDB_Show_RARBG
// @description Shows Subscene and RARBG search links on the IMDB webpage. The default is set to x264/1080 and TV HD Series.
// @icon        https://www.google.com/s2/favicons?sz=256&domain=imdb.com
// @version     10
// @author      Sappurit
// @updateURL   https://github.com/Sappurit/Userscript/raw/main/IMDB_Show_RARBG/IMDB_Show_RARBG.user.js
// @downloadURL https://github.com/Sappurit/Userscript/raw/main/IMDB_Show_RARBG/IMDB_Show_RARBG.user.js
// @license     MIT
// @match       https://*.imdb.com/title/tt*
// ==/UserScript==

(function() {
    'use strict';

    let id = document.querySelector('meta[property="imdb:pageConst"]').getAttribute('content');
    let title = document.querySelector('meta[property="og:title"]').getAttribute('content').replace(/ - IMDb/, '').replace(/ \(\d\d\d\d\)$/, '');

    let targetElement = document.querySelector('h1[data-testid="hero__pageTitle"] + ul[role="presentation"][class^="ipc-inline-list ipc-inline-list--show-dividers"]');

    //-----------------------------------------------------

    let subsceneLi = document.createElement('li');
    subsceneLi.setAttribute('role', 'presentation');
    subsceneLi.setAttribute('class', 'ipc-inline-list__item');

    let subsceneAnchor = document.createElement('a');
    subsceneAnchor.setAttribute('target', '_blank');
    subsceneAnchor.setAttribute('class', 'ipc-link ipc-link--baseAlt ipc-link--inherit-color');
    subsceneAnchor.setAttribute('href', 'https://subscene.com/subtitles/searchbytitle?query=' + title);
    subsceneAnchor.innerText = 'SUBSCENE';

    subsceneLi.append(subsceneAnchor);

    //-----------------------------------------------------

    let rarbgLi = document.createElement('li');
    rarbgLi.setAttribute('role', 'presentation');
    rarbgLi.setAttribute('class', 'ipc-inline-list__item');

    let rarbgAnchor = document.createElement('a');
    rarbgAnchor.setAttribute('target', '_blank');
    rarbgAnchor.setAttribute('class', 'ipc-link ipc-link--baseAlt ipc-link--inherit-color');
//  rarbgAnchor.setAttribute('href', 'https://rarbgenter.org/torrents.php?category[]=41&category[]=54&imdb=' + id);
    rarbgAnchor.setAttribute('href', 'https://rarbgenter.org/torrents.php?category=41;44&imdb=' + id);
    rarbgAnchor.innerText = 'RARBG';

//  41 = TV HD Episodes
//  49 = TV UHD Episodes
//  44 = x264/1080       50 = x264/4k
//  54 = x265/1080       51 = x265/4k

    rarbgLi.append(rarbgAnchor);

    //-----------------------------------------------------

    let ytsLi = document.createElement('li');
    ytsLi.setAttribute('role', 'presentation');
    ytsLi.setAttribute('class', 'ipc-inline-list__item');

    let ytsAnchor = document.createElement('a');
    ytsAnchor.setAttribute('target', '_blank');
    ytsAnchor.setAttribute('class', 'ipc-link ipc-link--baseAlt ipc-link--inherit-color');
    ytsAnchor.setAttribute('href', 'https://yts.mx/browse-movies/' + id);
    ytsAnchor.innerText = 'YTS';

    ytsLi.append(ytsAnchor);

    //-----------------------------------------------------

    let torrentgalaxyLi = document.createElement('li');
    torrentgalaxyLi.setAttribute('role', 'presentation');
    torrentgalaxyLi.setAttribute('class', 'ipc-inline-list__item');

    let torrentgalaxyAnchor = document.createElement('a');
    torrentgalaxyAnchor.setAttribute('target', '_blank');
    torrentgalaxyAnchor.setAttribute('class', 'ipc-link ipc-link--baseAlt ipc-link--inherit-color');
    torrentgalaxyAnchor.setAttribute('href', 'https://torrentgalaxy.to/torrents.php?c41=1&c42=1&search=' + id + '#results');
    torrentgalaxyAnchor.innerText = 'TG';

    torrentgalaxyLi.append(torrentgalaxyAnchor);

    //-----------------------------------------------------

    targetElement.append(subsceneLi);
    targetElement.append(rarbgLi);
    targetElement.append(ytsLi);
    targetElement.append(torrentgalaxyLi);

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



