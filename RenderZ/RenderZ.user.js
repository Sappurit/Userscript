// ==UserScript==
// @name         RenderZ
// @namespace    RenderZ
// @description  RenderZ
// @icon         https://www.google.com/s2/favicons?sz=256&domain=renderz.app
// @version      5
// @author       Sappurit
// @updateURL    https://github.com/Sappurit/Userscript/raw/main/RenderZ/RenderZ.user.js
// @downloadURL  https://github.com/Sappurit/Userscript/raw/main/RenderZ/RenderZ.user.js
// @license      MIT
// @match        https://*.renderz.app/24/player*
// ==/UserScript==

//-----------------------------------------------------------------------------

//    document.querySelector('div.card-animation').style.zIndex = 0;
//    document.querySelector('img.background').style.zIndex = 1;
//    document.querySelector('img.player-img').style.zIndex = 1;
//    document.querySelector('img.club-img').style.zIndex = 1;
//    document.querySelector('img.nation-img').style.zIndex = 1;
//    document.querySelector('span.rating').style.zIndex = 1;
//    document.querySelector('span.position').style.zIndex = 1;
//    document.querySelector('span.name').style.zIndex = 1;

//-----------------------------------------------------------------------------

var observeElement = document.body;
var observeOptions = { childList: true, subtree: true };
var observeWeb = new MutationObserver(observeCallback);

observeWeb.observe(observeElement, observeOptions);
console.log('Observe Start : ' + new Date().toLocaleString());

//-----------------------------------------------------------------------------

async function observeCallback(mutations)
{
    for (let mutation of mutations)
    {
        if ( mutation.type === 'childList' && mutation.addedNodes.length > 0 )
        {
            try
            {
                let DivElements = mutation.target.querySelectorAll('div[class^="player-card-fm23 card-size-lg"] > div[class="player-info"]');

                for (let DivElement of DivElements)
                {
                    if ( DivElement.getAttribute('data-mod') ) { continue; }

                    let ovr = DivElement.querySelector('div[class^="rating"]').innerText;
                    let pos = DivElement.querySelector('div[class^="position"]').innerText;
                    let name = DivElement.querySelector('div[class^="name"]').innerText;

                    let cardname = document.createElement('div');
                    cardname.innerText = (`${ovr} ${pos} ${name}`).toUpperCase();
                    cardname.style.fontWeight = '700';
                    cardname.style.fontSize = '14px';
                    cardname.style.color = '#AAA';

                    DivElement.parentElement.before(cardname);
                    DivElement.setAttribute('data-mod', true);

//                  observeWeb.disconnect();
                }

            } catch(e) {}
        }
    }
}

//-----------------------------------------------------------------------------

/***

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

***/

//-----------------------------------------------------------------------------

