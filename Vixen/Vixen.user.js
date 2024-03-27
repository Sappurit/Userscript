// ==UserScript==
// @name        Vixen
// @namespace   Vixen
// @description Shows USA date and torrent file format for easy search.
// @icon        https://www.google.com/s2/favicons?sz=256&domain=vixen.com
// @version     1
// @author      Sappurit
// @updateURL   https://github.com/Sappurit/Userscript/raw/main/Vixen/Vixen.user.js
// @downloadURL https://github.com/Sappurit/Userscript/raw/main/Vixen/Vixen.user.js
// @license     MIT
// @match       https://*.blacked.com/*
// @match       https://*.blackedraw.com/*
// @match       https://*.deeper.com/*
// @match       https://*.slayed.com/*
// @match       https://*.tushy.com/*
// @match       https://*.tushyraw.com/*
// @match       https://*.vixen.com/*
// ==/UserScript==

//-----------------------------------------------------------------------------

// var observeElement = document.querySelector('div[data-test-component="VideoList"]');
var observeElement = document.body;
var observeOptions = { childList: true, subtree: true };
var observerVixen  = new MutationObserver(observeWatchCallback);

observerVixen.observe(observeElement, observeOptions);
console.log('Observe Start : ' + new Date().toLocaleString());

//-----------------------------------------------------------------------------

var web = location.hostname.replace(/(www.|.com)/g, '').toLowerCase();

//-----------------------------------------------------------------------------

async function observeWatchCallback(mutations)
{
    for (let mutation of mutations)
    {
        if ( mutation.type === 'childList' && mutation.addedNodes.length > 0 )
        {
            try
            {
                let DivDescriptions = mutation.target.querySelectorAll('div[class^="VideoThumbnailSummary__Description"]');

                for (let DivDescription of DivDescriptions)
                {
                    if ( DivDescription.getAttribute('data-moddesc') ) { continue; }

                    let DivTitleLink    = DivDescription.querySelector('a[data-test-component="TitleLink"]');
                    let DivRatingNumber = DivDescription.querySelector('span[data-test-component="RatingNumber"]');
                    let DivModels       = DivDescription.querySelector('div[data-test-component="Models"]');
                    let DivReleaseDate  = DivDescription.querySelector('div[data-test-component="ReleaseDateFormatted"]');

                    let TitleLink   = DivTitleLink.innerText;
                    let Models      = DivModels.innerText.replace(/ & .+$/, '').replace(/,/g, '').replace(/ /g, '.').toLowerCase();
                    let ReleaseDate = DivReleaseDate.innerText;

                    let optionsDate1 = { timeZone: 'America/Los_Angeles', year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
                    let optionsDate2 = { timeZone: 'America/Los_Angeles', year: 'numeric', month: 'long',    day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };

                    ReleaseDate = new Date(ReleaseDate);                               // Parse Browser ReleaseDate

                    let USA1 = ReleaseDate.toLocaleString(undefined, optionsDate1);    // 01/29/2024, 08:58:11 AM
                    let USA2 = ReleaseDate.toLocaleString(undefined, optionsDate2);    // January 29, 2024 at 08:58:11 AM

                    let m = USA1.match(/(\d\d).(\d\d).(\d\d), (\d\d):(\d\d):(\d\d) (\w\w)/);
                    // ['01/22/24, 09:00:00 AM', '01', '22', '24', '09', '00', '00', 'AM', index: 0, input: '01/22/24, 09:00:00 AM', groups: undefined]
                    USA1 = m[3] + '.' + m[1] + '.' + m[2];

                    let n = USA2.match(/(\w+) (\d\d), (\d\d\d\d) at (\d\d):(\d\d):(\d\d) (\w\w)/);
                    // ['September 30, 2023 at 10:00:00 AM', 'September', '30', '2023', '10', '00', '00', 'AM', index: 0, input: 'September 30, 2023 at 10:00:00 AM', groups: undefined]
                    USA2 = n[2] + ' ' + n[1] + ' ' + n[3];

                    DivTitleLink.innerHTML   = TitleLink + '<br>' + web + '.' + USA1 + '.' + Models;
                    DivReleaseDate.innerText = USA2;

                    DivDescription.setAttribute('data-moddesc', true);
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



