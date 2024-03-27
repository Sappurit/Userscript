// ==UserScript==
// @name        TorrentGalaxy Plus
// @namespace   TorrentGalaxy_Plus
// @description Shows high-quality posters on the browse page.
// @icon        https://www.google.com/s2/favicons?sz=256&domain=TorrentGalaxy.to
// @version     8
// @author      Sappurit
// @updateURL   https://github.com/Sappurit/Userscript/raw/main/TorrentGalaxy/TorrentGalaxy.user.js
// @downloadURL https://github.com/Sappurit/Userscript/raw/main/TorrentGalaxy/TorrentGalaxy.user.js
// @license     MIT
// @match       https://*.TorrentGalaxy.to/torrents.php*
// @match       https://*.TorrentGalaxy.mx/torrents.php*
// ==/UserScript==

//---------------------------------------------------------------------

// Choose your annoy titles to filter out from the browse page.
var blockTitle = '(CHINESE|JAPANESE)';

// Choose the subtitle languages to highlight the entire row.
// Set to none or some unique word if you don't want to highlight any subtitle.
// var subLang = '(German|Russian|Thai)';
// var subLang = 'Portu*';
// var subLang = 'none or unique word';
// var subLang = 'English';
var subLang = '(thai|th.srt|tha.srt)';

// Choose the highlight color when found your subtitle languages.
// var subColor = 'Cornsilk';
// var subColor = 'rgb(255, 248, 220)';
var subColor = '#FFF8DC';

// Choose the highlight color when found a guess possible Thai subtitle.
var subColorEdith = '#D8F2FA';

// Choose the delay (milisec) between loop while fetch all torrents data to avoid IP ban.
var delay = 200;

//---------------------------------------------------------------------

var regBlock = new RegExp(`${blockTitle}`, 'si');
//var regEdith = new RegExp('(?=.*Arabic)(?=.*German)(?=.*Greek)(?=.*Finnish)(?=.*French)(?=.*Hebrew)(?=.*Indonesian)(?=.*Italian)(?=.*Japanese)(?=.*Korean)(?=.*Polish)', 'si');
//var regEdith = new RegExp('(?=.*Arabic)(?=.*Greek)(?=.*Finnish)(?=.*French)(?=.*Hebrew)(?=.*Indonesian)(?=.*Japanese)(?=.*Korean)(?=.*Polish)', 'si');
var regEdith = new RegExp('(?=.*Arabic)(?=.*Greek)(?=.*Finnish)(?=.*French)(?=.*Hebrew)(?=.*Indonesian)(?=.*Japanese)(?=.*Korean)', 'si');
var regLang = new RegExp(`${subLang}`, 'si');
var regList = new RegExp('[A-Za-z]+.srt', 'gi');
var num = 0;

//---------------------------------------------------------------------

(function() {
    'use strict';

    // Fix GalaxyFence URL Redirection https://torrentgalaxy.to/forum/perma/364764
    if (window.location.href.match(/&amp;/))
    {
        location.href = window.location.href.replaceAll(/&amp;/g, '&').concat('#results');
    }

    let thumbWidth  = '100px';
    let thumbHeight = '150px';

    let posterHeader = document.createElement('div');
    posterHeader.setAttribute('align', 'center');
    posterHeader.setAttribute('class', 'tgxtablecell');
    posterHeader.style.width = thumbWidth;
    posterHeader.innerText = 'Poster';

    let table = document.querySelector('div.tgxtable');

    // Easy way by remove column from right to left.
    // .children = element
    table.children[0].children[9].remove(); // Views
    table.children[0].children[8].remove(); // Comments
    table.children[0].children[5].remove(); // Rating
    table.children[0].children[4].remove(); // DL
    table.children[0].children[2].remove(); // Language
    table.children[0].children[1].remove(); // Verified
    table.children[0].insertBefore(posterHeader, table.children[0].children[1]); // Before Name

    for (let i = 1; i < table.children.length; i++)
    {
        let row = table.children[i];

        // Suspend anonymous Event Listener on 3rd party webpage https://stackoverflow.com/a/74395281/2784466
        // Disable onmouseover to show the cover image.
        row.addEventListener('mouseover', function(event) { event.stopImmediatePropagation() }, true);
        // row.onmouseover = null;
        // row.removeAttribute('onmouseover');

        // Disable clickable cell in the column Name and Uploader.
        // row.addEventListener('click', function(event) { event.stopImmediatePropagation() }, true);
        row.addEventListener('click', function(event) { event.stopPropagation() }, true);

        // Disable enlarge row when hover.
        row.style.transform = 'none';

        try
        {
            let torrent = row.children[3].querySelector('a[title]');
            torrent.setAttribute('target', '_blank');

            let torrentTitle = torrent.getAttribute('title'); // or torrent.title
            let torrentSize  = row.children[7].innerText;
            let torrentStyle = window.getComputedStyle(torrent); // final CSS

            //---------------------------------------------------------------------

            let blockTitleArray = torrentTitle.match(regBlock);
            if (blockTitleArray) { row.replaceChildren(); continue; }

            //---------------------------------------------------------------------

            let posterLink = row.getAttribute('onmouseover');
            if (posterLink)  posterLink = (posterLink.match(/src=\\'(.*)?\\'/))[1]; // 0=whole match  1=captured group
            if (!posterLink) posterLink = 'https://torrentgalaxy.to/common/images/coverstub.png';

            let posterElement = document.createElement('div');
            posterElement.setAttribute('align', 'center');
            posterElement.setAttribute('class', 'tgxtablecell');
            posterElement.style.width = thumbWidth;

            let posterAnchor = document.createElement('a');
            posterAnchor.href = posterLink;
            posterAnchor.setAttribute('target', '_blank');

            let posterImage = document.createElement('img');
            posterImage.src = posterLink;
            posterImage.style.minWidth = thumbWidth;
            posterImage.style.maxWidth = thumbWidth;
//          posterImage.style.maxHeight = thumbHeight;
//          posterImage.style.objectFit = 'cover';

            posterAnchor.append(posterImage);
            posterElement.append(posterAnchor);

            posterImage.onerror = function() {
                posterImage.src   = 'https://img.wonkychickens.org/static/noposter.jpg';
                posterAnchor.href = 'https://img.wonkychickens.org/static/noposter.jpg';
            };

            //---------------------------------------------------------------------

            let torrentElement = row.children[4].querySelector('a:nth-of-type(1)');
            torrentElement.innerText = '📥 Torrent';
            torrentElement.style.textDecoration = 'none';

            //---------------------------------------------------------------------

            let magnetElement = row.children[4].querySelector('a:nth-of-type(2)');
            let magnetHash = magnetElement.href.replace(/.*\b(\w{40})\b.*/, '$1').toUpperCase();
//          magnetElement.href += '&tr=http%3A%2F%2Ftracker.gbitt.info%2Fannounce';
//          magnetElement.href += '&tr=http%3A%2F%2Fopen.acgnxtracker.com%2Fannounce';
//          magnetElement.href += '&tr=http%3A%2F%2Fopentracker.i2p.rocks%2Fannounce';
//          magnetElement.href += '&tr=http%3A%2F%2Ftracker.opentrackr.org%2Fannounce';
//          magnetElement.href += '&tr=http%3A%2F%2Ftracker.tamersunion.org%2Fannounce';
//          magnetElement.href += '&tr=http%3A%2F%2Ftracker.openbittorrent.com%2Fannounce';
            magnetElement.innerText = '🧲 Magnet';
            magnetElement.style.textDecoration = 'none';

            //---------------------------------------------------------------------

            let copyMagnet = document.createElement('span');
            copyMagnet.innerText = '📋 Magnet';
            copyMagnet.style.cursor = torrentStyle.cursor;
            copyMagnet.style.font = torrentStyle.font;
            copyMagnet.style.color = torrentStyle.color;
            copyMagnet.style.textDecoration = 'none';
            copyMagnet.addEventListener('mousedown', function(e){copyText(e, magnetElement.href)}, false);

            //---------------------------------------------------------------------

            let copyInfo = document.createElement('span');
            copyInfo.innerText = '📋 Info';
            copyInfo.style.cursor = torrentStyle.cursor;
            copyInfo.style.font = torrentStyle.font;
            copyInfo.style.color = torrentStyle.color;
            copyInfo.style.textDecoration = 'none';
            copyInfo.addEventListener('mousedown', function(e){copyText(e, `${torrentTitle}\n${torrentSize}\n${magnetHash}\n${magnetElement.href}\n`)}, false);

            //---------------------------------------------------------------------

            let subsceneElement = magnetElement.cloneNode();
            subsceneElement.href = 'https://subscene.com/subtitles/searchbytitle?query=' + torrentTitle.replace(/S\d\dE\d\d.*$/i, '').replace(/\d{4}.*$/, '').replace(/\./g, ' ');
            subsceneElement.setAttribute('target', '_blank');
            subsceneElement.innerText = '♌ SubScene';

            //---------------------------------------------------------------------

            torrent.parentElement.insertAdjacentHTML('beforeend', '<br>');
            torrent.parentElement.append('📅 ', magnetHash);
            torrent.parentElement.insertAdjacentHTML('beforeend', '<br>');
            torrent.parentElement.append(torrentElement);
            torrent.parentElement.append('  󠀠 ', magnetElement);
            torrent.parentElement.append('  󠀠 ', copyMagnet);
            torrent.parentElement.append('   ', copyInfo);
            torrent.parentElement.append('   ', subsceneElement);

            //---------------------------------------------------------------------


            let torrentIMDB = row.children[3].querySelector('a[href^="/torrents.php?search=tt"]');
            if (torrentIMDB)
            {
                torrentIMDB.setAttribute('target', '_blank');

                let imdbElement = torrentIMDB.cloneNode();
                imdbElement.href = imdbElement.href.replace(/torrentgalaxy....torrents.php.search=/, 'imdb.com/title/');
                imdbElement.innerText = 'ℹ️ IMDB';
                imdbElement.style.textDecoration = 'none';
                torrent.parentElement.append('  󠀠 ', imdbElement);
            }

            //---------------------------------------------------------------------

            // Easy way by remove column from right to left.
            // .children = element
            row.children[9].remove(); // Views
            row.children[8].remove(); // Comments
            row.children[5].remove(); // Rating
            row.children[4].remove(); // DL
            row.children[2].remove(); // Language
            row.children[1].remove(); // Verified
            row.insertBefore(posterElement, row.children[1]); // Before Name

            //---------------------------------------------------------------------

            // row.children[2].style.setProperty('min-width', '530px', 'important');
            // row.children[2].style.setProperty('max-width', '530px', 'important');
            // row.children[3].style.setProperty('min-width', '70px', 'important');
            // row.children[3].style.setProperty('max-width', '70px', 'important');
            // row.children[4].style.setProperty('min-width', '70px', 'important');
            // row.children[4].style.setProperty('max-width', '70px', 'important');

            // row.children[0].style.setProperty('border-radius', '0px', 'important');

            row.children[0].classList.remove('rounded');
            row.children[1].classList.remove('rounded');
            row.children[2].classList.remove('rounded', 'highlight');
            row.children[3].classList.remove('rounded');
            row.children[4].classList.remove('rounded');
            row.children[5].classList.remove('rounded');
            row.children[6].classList.remove('rounded');

            //---------------------------------------------------------------------

            let torrentPage = torrent.href; // gets full path with origin while getAttribute('href') may get only pathname.
            getDocFromURL(torrentPage).then((torrentDoc) => {

                let coverElement = torrentDoc.querySelector('div#covercell > img');
                if (coverElement)
                {
                    posterImage.src   = coverElement.dataset.src;
                    posterAnchor.href = coverElement.dataset.src;
                }

                //---------------------------------------------------------------------

//              let descElement = torrentDoc.querySelector('div[class="col-lg-10 col-sm-12"]');
//              let descElement = torrentDoc.querySelector('div#main');
                let descElement = torrentDoc.querySelector('div[class*="slidingDivf"]');
                if (descElement)
                {
                    torrent.parentElement.insertAdjacentHTML('beforeend', '<br>───');

                    let subEdithArray = descElement.textContent.match(regEdith);
                    let subLangArray = descElement.textContent.match(regLang);
                    let subListArray = descElement.textContent.match(regList);

                    if (subEdithArray)
                    {
                        row.style.backgroundColor = subColorEdith;
                    }

                    if (subLangArray)
                    {
                        row.style.backgroundColor = subColor;
                    }

                    if (subListArray)
                    {
                        subListArray = [...new Set(subListArray)].sort(); // unique and sort array
                        subListArray = subListArray.map((sub) => {
                            sub = sub.replace(/.srt/, '');
                            return sub[0].toUpperCase() + sub.substr(1).toLowerCase(); // titlecase
                        });

                        let subSpan = document.createElement('span');
                        subSpan.innerText = '💬 ' + subListArray.join(' ');
                        torrent.parentElement.insertAdjacentHTML('beforeend', '<br>');
                        torrent.parentElement.append(subSpan);
                    }
                }

            });
        } catch(e) { console.error(e); }
    }

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

//-----------------------------------------------------------------------------

function getDocFromURL(url)
{
    return new Promise((resolve) => {
        setTimeout(async () => {
            let html = await fetch(url)
                .then((response) => response.text())
                .catch((error) => console.log(error));
            let parser = new DOMParser();
            let doc = parser.parseFromString(html, 'text/html');
            resolve(doc);
        }, delay * num++);
   });
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


