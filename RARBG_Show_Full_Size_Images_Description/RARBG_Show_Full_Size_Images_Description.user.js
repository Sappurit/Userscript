// ==UserScript==
// @name        RARBG Show Full Size Images Description
// @namespace   RARBG_Show_Full_Size_Images_Description
// @description Shows full-size images in the description. Work with some uploaders (p33Rn3t, Scene, OldFart, rartv, Dohrnii, daniel76).
// @icon        https://www.google.com/s2/favicons?sz=256&domain=rarbg.to
// @version     13
// @author      Sappurit
// @updateURL   https://github.com/Sappurit/Userscript/raw/main/RARBG_Show_Full_Size_Images_Description/RARBG_Show_Full_Size_Images_Description.user.js
// @downloadURL https://github.com/Sappurit/Userscript/raw/main/RARBG_Show_Full_Size_Images_Description/RARBG_Show_Full_Size_Images_Description.user.js
// @license     MIT
// @match       https://*.rarbg.to/torrent/*
// @match       https://*.rarbgget.org/torrent/*
// @match       https://*.rarbgenter.org/torrent/*
// ==/UserScript==

(function() {
    'use strict';

    let torrentElement = document.querySelector('table[class="lista-rounded"] table:nth-of-type(1) a[href*="download.php"]');
    torrentElement.style.textDecoration = 'none';
    torrentElement.previousElementSibling.remove(); // remove download.png
    torrentElement.before('📥 ');
    let torrentName = torrentElement.innerText.replace(/(.+?)\.(\d\d\d\d|S\d+).+/i, '$1').replace(/\./g, ' ');
    console.log(torrentName);


    let magnetElement = document.querySelector('table[class="lista-rounded"] table:nth-of-type(1) a[href*="magnet:"]')
    let magnetHash = magnetElement.href.replace(/.*\b(\w{40})\b.*/, '$1').toUpperCase();
    magnetElement.innerText = magnetHash;
    magnetElement.style.textDecoration = 'none';
    magnetElement.insertAdjacentHTML('beforebegin', '<br>');
    magnetElement.before('🧲 ');

    //-------------------------------------------------------------------------

    let torrentStyle = window.getComputedStyle(torrentElement); // final CSS

    let clipboardCopy = document.createElement('a');
    clipboardCopy.innerText = 'Copy Magnet Link to Clipboard';
    clipboardCopy.style.cursor = torrentStyle.cursor;
    clipboardCopy.style.font = torrentStyle.font;
    clipboardCopy.style.color = torrentStyle.color;
    clipboardCopy.style.textDecoration = 'none';
    clipboardCopy.addEventListener('click', copyText, false);
    magnetElement.after('⏺️  ', clipboardCopy);
    magnetElement.insertAdjacentHTML('afterend', '<br>');

    function copyText()
    {
       let textarea = document.createElement('textarea');
       document.body.appendChild(textarea);
       textarea.value = this.previousElementSibling.previousElementSibling.getAttribute('href');
       textarea.select();
       document.execCommand('copy');
       document.body.removeChild(textarea);
    }

    //-------------------------------------------------------------------------

    let images = document.getElementById('description').querySelectorAll('img');

    for (let image of images)
    {
        let style = image.getAttribute('style');
        let src = image.getAttribute('src');

        style = style.replace(/max-width:50%/, 'max-width:100%');

        // Dohrnii
        src = src.replace(/22pixx.xyz\/(\w)s\//, '22pixx.xyz/$1/');

        // p33Rn3t, Scene, OldFart, rartv
        src = src.replace(/imagecurl.com\/images\/(\d+)_thumb.(.+)/, 'cdn.imagecurl.com/images/$1.$2');

        // daniel76
        src = src.replace(/\/tn\/t(\d+)\/(.+)/, '/tn/i$1/$2');

        image.setAttribute('style', style);
        image.setAttribute('src', src);
    }

    //-------------------------------------------------------------------------

})();

/********************************************************

https://developer.mozilla.org/en-US/docs/Web/API/Element

Element.nextElementSibling
Element.previousElementSibling

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



