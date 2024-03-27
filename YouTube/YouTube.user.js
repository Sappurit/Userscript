// ==UserScript==
// @name        YouTube Plus
// @namespace   YouTube_Plus
// @description Shows Clipboard Icon to Copy the Video Info.
// @icon        https://www.google.com/s2/favicons?sz=256&domain=youtube.com
// @version     14
// @author      Sappurit
// @updateURL   https://github.com/Sappurit/Userscript/raw/main/YouTube/YouTube.user.js
// @downloadURL https://github.com/Sappurit/Userscript/raw/main/YouTube/YouTube.user.js
// @license     MIT
// @match       https://*.youtube.com/*
// ==/UserScript==

//-----------------------------------------------------------------------------

// console.log('Load : ' + new Date().toLocaleString());

//-----------------------------------------------------------------------------

var observeElement = document.body;
var observeOptions = { childList: true, subtree: true };

var observePage;

//-----------------------------------------------------------------------------
// https://stackoverflow.com/questions/34077641/how-to-detect-page-navigation-on-youtube-and-modify-its-appearance-seamlessly
// How to inspect a site-specific events. Run getEventListeners(document) and getEventListeners(window) in devtools console.
//-----------------------------------------------------------------------------

document.addEventListener('yt-navigate-finish', function (event) {

    if ( document.location.href.match(/youtube.com\/watch\?/) )
    {
	    observePage = new MutationObserver(observeCallbackWatch);
        observePage.observe(observeElement, observeOptions);
        console.log('Observe Start Watch : ' + new Date().toLocaleString());
    }

    if ( document.location.href.match(/youtube.com\/results\?/) )
    {
	    observePage = new MutationObserver(observeCallbackSearch);
        observePage.observe(observeElement, observeOptions);
        console.log('Observe Start Search : ' + new Date().toLocaleString());
    }
});

//-----------------------------------------------------------------------------
/******************************************************************************

window.addEventListener('DOMContentLoaded', function (event) {
    console.log(document.location.href);
    console.log(event.state);
});

//-----------------------------------------------------------------------------

window.addEventListener('popstate', function (event) {
    console.log(document.location.href);
    console.log(event.state);
});

//-----------------------------------------------------------------------------
// https://stackoverflow.com/questions/56760727/how-to-observe-a-change-in-the-url-using-javascript
// https://stackoverflow.com/questions/4570093/how-to-get-notified-about-changes-of-the-history-via-history-pushstate
//-----------------------------------------------------------------------------

(function(){
    var ps = history.pushState;  // Preserve the original function
    history.pushState = function(){
        console.log("navigating", arguments);
        let output = ps.apply(history, arguments); // Apply the original functionality
        return output;
    };

    history.replaceState = function(){
        console.log("navigating", arguments);
        let output = History.prototype.replaceState.apply(history, arguments); // No need to store the original function. Use History interface.
        return output;
    };
}());

******************************************************************************/
//-----------------------------------------------------------------------------
// https://stackoverflow.com/questions/12897446/userscript-to-wait-for-page-to-load-before-executing-code-techniques/
//-----------------------------------------------------------------------------

async function observeCallbackWatch(mutations)
{
    try
    {
        let element   = document.querySelector('ytd-watch-metadata:not([data-mod])');
        let title     = element.querySelector('yt-formatted-string').textContent;
        let desc      = element.querySelector('ytd-text-inline-expander').textContent.replaceAll(/\n+/g, ' ').trim().substr(0,140);
        let id        = element.getAttribute('video-id');
        let link      = 'https://www.youtube.com/watch?v=' + id;
        let thumbnail = 'https://i.ytimg.com/vi/' + id + '/maxresdefault.jpg';

        //-----------------------------------------------------

        // console.log(title);
        // console.log(desc);
        // console.log(link);
        // console.log(thumbnail);

        //-----------------------------------------------------

        if ( title && desc && id )
        {
            observePage.disconnect();
            console.log('Observe Stop Watch : ' + new Date().toLocaleString());

            //---------------------------------------------------------------------

            let clipboardCopy = document.createElement('span');
            clipboardCopy.innerText = '📋';
            clipboardCopy.style.cursor = 'pointer';
            clipboardCopy.style.textDecoration = 'none';
            clipboardCopy.addEventListener('click', function(e){copyText(e, `${title}\n${link}`)}, false); // default false = bubbling, true = capturing

            //---------------------------------------------------------------------

            let h1 = element.querySelector('div#title > h1');
            h1.append(' • ', clipboardCopy);
            element.setAttribute('data-mod', true);
        }
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

    // https://stackoverflow.com/questions/5963669/whats-the-difference-between-event-stoppropagation-and-event-preventdefault
    // return false; // don't work
    e.preventDefault(); // prevent the default browser action on that event eg. open link
    e.stopPropagation(); // stop further dispatch of the event to the other EventListeners

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

//-----------------------------------------------------------------------------

async function observeCallbackSearch(mutations)
{

//<div id="contents">
//	<ytd-video-renderer class="style-scope ytd-item-section-renderer">
//				<div id="dismissible">
//					<a id="video-title" title href>
//
//
//				<div class="metadata-snippet-container style-scope ytd-video-renderer style-scope ytd-video-renderer">
//					<span id="time">
//					<yt-formatted-string class="metadata-snippet-text-navigation style-scope ytd-video-renderer">
//
//					<yt-formatted-string class="metadata-snippet-text style-scope ytd-video-renderer">


    for (let element of document.querySelectorAll('div#contents > ytd-video-renderer:not([data-mod])'))
    {
        try
        {
            let anchorElement = element.querySelector('div#dismissible a#video-title')
            let title = anchorElement.title;
            let link  = anchorElement.href.replace(/&(pp|t)=.*/, '');
            let desc  = element.querySelector('span#time + yt-formatted-string').textContent;

            //-----------------------------------------------------

//          console.log(title);
//          console.log(link);
//          console.log(desc);

            //-----------------------------------------------------

            if ( title && link && desc )
            {
                let clipboardCopy = document.createElement('a');
//              clipboardCopy.setAttribute('href', '');
                clipboardCopy.innerText = '📋';
                clipboardCopy.style.cursor = 'pointer';
                clipboardCopy.style.textDecoration = 'none';
                clipboardCopy.addEventListener('click', function(e){copyText(e, `${title}\n${link}`)}, false); // default false = bubbling, true = capturing

                //-----------------------------------------------------

                anchorElement.append(' • ', clipboardCopy);
                element.setAttribute('data-mod', true);
            }
        } catch(e) {}
    }
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



