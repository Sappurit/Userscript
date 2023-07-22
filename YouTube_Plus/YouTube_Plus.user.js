// ==UserScript==
// @name        YouTube Plus
// @namespace   YouTube_Plus
// @description Shows Clipboard Icon to Copy the Video Info.
// @icon        https://www.google.com/s2/favicons?sz=256&domain=youtube.com
// @version     10
// @author      Sappurit
// @updateURL   https://github.com/Sappurit/Userscript/raw/main/YouTube_Plus/YouTube_Plus.user.js
// @downloadURL https://github.com/Sappurit/Userscript/raw/main/YouTube_Plus/YouTube_Plus.user.js
// @license     MIT
// @match       https://*.youtube.com/*
// ==/UserScript==

//-----------------------------------------------------------------------------

// console.log('Load : ' + new Date().toLocaleString());

//-----------------------------------------------------------------------------

var Old = { title: undefined, desc: undefined, id: undefined, link: undefined, thumbnail: undefined };
var New = { title: undefined, desc: undefined, id: undefined, link: undefined, thumbnail: undefined };

//-----------------------------------------------------------------------------

var observeElement = document.body;
var observeOptions = { childList: true, subtree: true };

var observerWatch = new MutationObserver(observeWatchCallback);
var observerSearch = new MutationObserver(observeSearchCallback);

//-----------------------------------------------------------------------------
// https://stackoverflow.com/questions/34077641/how-to-detect-page-navigation-on-youtube-and-modify-its-appearance-seamlessly
// How to inspect a site-specific events. Run getEventListeners(document) and getEventListeners(window) in devtools console.
//-----------------------------------------------------------------------------

document.addEventListener('yt-navigate-finish', function (event) {

    if ( document.location.href.match(/youtube.com\/watch\?/) )
    {
	if ( observerSearch ) observerSearch.disconnect();
        console.log('Observe Start Video : ' + new Date().toLocaleString());
        observerWatch.observe(observeElement, observeOptions);
    }

    if ( document.location.href.match(/youtube.com\/results\?/) )
    {
	if ( observerWatch ) observerWatch.disconnect();
        console.log('Observe Start Search : ' + new Date().toLocaleString());
        observerSearch.observe(observeElement, observeOptions);
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

async function observeWatchCallback(mutations)
{
    try
    {
        New.title     = document.querySelector('div#title > h1 > yt-formatted-string').textContent;
        New.desc      = document.querySelector('span#snippet-text > yt-attributed-string').textContent.replaceAll(/\n+/g, ' ').trim().substr(0,140);
        New.id        = document.querySelector('ytd-page-manager#page-manager > ytd-watch-flexy').getAttribute('video-id');
        New.link      = 'https://www.youtube.com/watch?v=' + New.id;
        New.thumbnail = 'https://i.ytimg.com/vi/' + New.id + '/maxresdefault.jpg';
    } catch(e) {}

    if ( New.title && New.desc && New.id && Old.title !== New.title && Old.desc !== New.desc && Old.id !== New.id )
    {
        observerWatch.disconnect();
        YouTube();
        Old.title    = New.title;
        Old.metadata = New.metadata;
        Old.id       = New.id;
        console.log(New.title);
        console.log(New.desc);
        console.log(New.link);
        console.log(New.thumbnail);
        console.log('Observe Stop Video : ' + new Date().toLocaleString());
    }
}

//-----------------------------------------------------------------------------

function YouTube()
{
    try
    {
        let clipboardCopy = document.querySelector('span#clipboardCopy');

        if ( clipboardCopy )
        {
            clipboardCopy.previousSibling.remove();
            clipboardCopy.remove();
        }

        clipboardCopy = document.createElement('span');
        clipboardCopy.setAttribute('id', 'clipboardCopy');
        clipboardCopy.innerText = '📋';
        clipboardCopy.style.cursor = 'pointer';
        clipboardCopy.style.textDecoration = 'none';
        clipboardCopy.addEventListener('click', function(e){copyText(e, `${New.title}\n${New.link}`)}, false);

        //---------------------------------------------------------------------

        let h1 = document.querySelector('div#title > h1[class="style-scope ytd-watch-metadata"]');
        h1.append(' • ', clipboardCopy);

        //---------------------------------------------------------------------

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

async function observeSearchCallback(mutations)
{

//<div id="contents">
//	<ytd-video-renderer class="style-scope ytd-item-section-renderer">
//		<div id="dismissible">
//			<a id="video-title" title href>
//
//
//		<div class="metadata-snippet-container style-scope ytd-video-renderer style-scope ytd-video-renderer">
//			<span id="time">
//			<yt-formatted-string class="metadata-snippet-text-navigation style-scope ytd-video-renderer">
//
//			<yt-formatted-string class="metadata-snippet-text style-scope ytd-video-renderer">


    for (let element of document.querySelectorAll('div#contents > ytd-video-renderer'))
    {
        try
        {
            let anchorElement = element.querySelector('div#dismissible a#video-title')
            let title = anchorElement.getAttribute('title');
            let link  = anchorElement.getAttribute('href');

            let desc  = element.querySelector('span#time + yt-formatted-string').textContent;
            let clipboardCopy = element.querySelector('div#dismissible span#clipboardCopy');

            //-----------------------------------------------------

            console.log(title);
            console.log(link);
            console.log(desc);
            console.log(clipboardCopy);

            //-----------------------------------------------------

            if ( title && link && desc && ! clipboardCopy )
            {
                let clipboardCopy = document.createElement('span');
                clipboardCopy.setAttribute('id', 'clipboardCopy');
                clipboardCopy.innerText = '📋';
                clipboardCopy.style.cursor = 'pointer';
                clipboardCopy.style.textDecoration = 'none';
                clipboardCopy.addEventListener('click', function(e){copyText(e, `${title}\n${link}`)}, false);

                //-----------------------------------------------------

                anchorElement.append(' • ', clipboardCopy);
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



