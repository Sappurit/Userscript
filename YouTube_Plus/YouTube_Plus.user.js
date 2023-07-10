// ==UserScript==
// @name        YouTube Plus
// @namespace   YouTube_Plus
// @description Shows Clipboard Icon to Copy the Video Info.
// @icon        https://www.google.com/s2/favicons?sz=256&domain=youtube.com
// @version     5
// @author      Sappurit
// @updateURL   https://github.com/Sappurit/Userscript/raw/main/YouTube_Plus/YouTube_Plus.user.js
// @downloadURL https://github.com/Sappurit/Userscript/raw/main/YouTube_Plus/YouTube_Plus.user.js
// @license     MIT
// @match       https://*.youtube.com/watch?v=*
// ==/UserScript==

//-----------------------------------------------------------------------------

console.log('Load : ' + new Date().toLocaleString());

//-----------------------------------------------------------------------------
// https://stackoverflow.com/questions/12897446/userscript-to-wait-for-page-to-load-before-executing-code-techniques/
//-----------------------------------------------------------------------------

var observer = new MutationObserver(observeCallback);
var observeElement = document.querySelector('body');
var observeOptions = { childList: true, subtree: true };

observer.observe(observeElement, observeOptions);

async function observeCallback(mutations)
{
    if ( document.querySelector('h1[class="style-scope ytd-watch-metadata"]') )
    {
//      console.log(mutations);
        console.log('Pass : ' + new Date().toLocaleString());
        YouTube();
        observer.disconnect();
    }
} // observeCallback

//-----------------------------------------------------------------------------

function YouTube()
{
    'use strict';

    try
    {
        let title     = document.querySelector('meta[property="og:title"]').content;
        let metadata  = document.querySelector('meta[property="og:description"]').content;
        let link      = document.querySelector('meta[property="og:url"]').content;
        let thumbnail = document.querySelector('meta[property="og:image"]').content;

        //---------------------------------------------------------------------

        let copyInfo = document.createElement('span');
        copyInfo.innerText = '📋';
        copyInfo.style.cursor = 'pointer';
        copyInfo.style.textDecoration = 'none';
        copyInfo.addEventListener('click', function(e){copyText(e, `${title}\n${metadata}\n${link}`)}, false);

        //---------------------------------------------------------------------

        let h1 = document.querySelector('h1[class="style-scope ytd-watch-metadata"]');
        h1.append(' • ', copyInfo);

        //---------------------------------------------------------------------

        console.log(title);

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

(function init(){
   var counter = document.getElementById('id-of-element');

   if (counter) 
   { /* do something with counter element */ } 
   else 
   { setTimeout(init, 0);}
})();
