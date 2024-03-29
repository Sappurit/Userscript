// ==UserScript==
// @name        RARBG Show Poster Plus
// @namespace   RARBG_Show_Poster_Plus
// @description Shows high-quality posters on the browse page.
// @icon        https://www.google.com/s2/favicons?sz=256&domain=rarbg.to
// @version     33
// @author      Sappurit
// @updateURL   https://github.com/Sappurit/Userscript/raw/main/RARBG_Show_Poster_Plus/RARBG_Show_Poster_Plus.user.js
// @downloadURL https://github.com/Sappurit/Userscript/raw/main/RARBG_Show_Poster_Plus/RARBG_Show_Poster_Plus.user.js
// @license     MIT
// @match       https://*.rarbg.to/torrents.php*
// @match       https://*.rargb.to/torrents.php*
// @match       https://*.rarbgget.org/torrents.php*
// @match       https://*.rarbgenter.org/torrents.php*
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
var subLang = 'Thai';

// Choose the highlight color when found your subtitle languages.
// var subColor = 'Cornsilk';
// var subColor = 'rgb(255, 248, 220)';
var subColor = '#FFF8DC';

// Choose the delay (milisec) between loop while fetch all torrents data to avoid IP ban.
var delay = 1000;

//---------------------------------------------------------------------

var blockTitleRegExp = new RegExp(`${blockTitle}`, 'si');
var regLang = new RegExp(`${subLang}.srt`, 'gi');
var regList = new RegExp('[A-Za-z]+.srt', 'gi');
var num = 0;

//---------------------------------------------------------------------

(function() {
    'use strict';

    let thumbWidth = '200px';
    let thumbHeight = '300px';

    let posterHeader = document.createElement('td');
    posterHeader.setAttribute('align', 'center');
    posterHeader.setAttribute('class', 'header6 header header40');
    posterHeader.style.width = thumbWidth;
    posterHeader.innerText = 'Poster';

    let table = document.querySelector('table.lista2t');
    table.rows[0].insertBefore(posterHeader, table.rows[0].cells[1]);

//  for (let row of table.rows)
    for (let i = 1; i < table.rows.length; i++)
    {

        let row = table.rows[i];

        try
        {
            let torrent = row.querySelector('a[title]');
            torrent.setAttribute('target', '_blank');

            let torrentTitle = torrent.innerText;
            let torrentSize  = row.cells[3].innerText;
            let torrentStyle = window.getComputedStyle(torrent); // final CSS

            //---------------------------------------------------------------------

            let blockTitleArray = torrentTitle.match(blockTitleRegExp);
            if (blockTitleArray) { row.replaceChildren(); continue; }

            //---------------------------------------------------------------------

            let torrentIMDB = row.querySelector('a[href^="/torrents.php?imdb="]');
            if (torrentIMDB) torrentIMDB.setAttribute('target', '_blank');

            //---------------------------------------------------------------------

            let posterLink = (torrent.getAttribute('onmouseover').match(/src=\\'(.*)?\\'/))[1];    // 0=whole match  1=captured group
            posterLink = posterLink.replace(/static\/over\/(.)/, 'posters2/$1/$1');    // Category XXX, Games, FLAC, Software.
            posterLink = posterLink.replace(/over_opt/, 'poster_opt');                 // Category Movies.
            posterLink = posterLink.replace(/_small/, '_banner_optimized');            // Category TV.

            let posterElement = document.createElement('td');
            posterElement.setAttribute('align', 'center');
            posterElement.setAttribute('class', 'lista');

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
            row.insertBefore(posterElement, row.cells[1]);

            //---------------------------------------------------------------------

            row.cells[2].style.setProperty('min-width', '530px', 'important');
            row.cells[2].style.setProperty('max-width', '530px', 'important');
            row.cells[3].style.setProperty('min-width', '70px', 'important');
            row.cells[3].style.setProperty('max-width', '70px', 'important');
            row.cells[4].style.setProperty('min-width', '70px', 'important');
            row.cells[4].style.setProperty('max-width', '70px', 'important');

            //---------------------------------------------------------------------

            let torrentPage = torrent.href; // gets full path with origin while getAttribute('href') may get only pathname.
            getDocFromURL(torrentPage).then((torrentDoc) => {

                let filesElement = torrentDoc.getElementById('files');
                if (filesElement)
                {
                    let subLangArray = filesElement.textContent.match(regLang);
                    let subListArray = filesElement.textContent.match(regList);

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

                //---------------------------------------------------------------------

//              let torrentElement = torrentDoc.querySelector('table[class="lista-rounded"] table:nth-of-type(1) tr:nth-of-type(1) td:nth-of-type(2) a:nth-of-type(1)');
                let torrentElement = torrentDoc.querySelector('table[class="lista-rounded"] table:nth-of-type(1) a[href*="download.php"]');
                torrentElement.innerText = '📥 Torrent';
                torrentElement.style.textDecoration = 'none';
                torrentElement.removeAttribute('onmouseover');
                torrentElement.removeAttribute('onmouseout');

                //---------------------------------------------------------------------

                let magnetElement = torrentDoc.querySelector('table[class="lista-rounded"] table:nth-of-type(1) a[href*="magnet:"]');
                let magnetHash = magnetElement.href.replace(/.*\b(\w{40})\b.*/, '$1').toUpperCase();
                magnetElement.href = magnetElement.href.replace('&tr=http%3A%2F%2Ftracker.trackerfix.com%3A80%2Fannounce', '');
                magnetElement.href += '&tr=http%3A%2F%2Ftracker.gbitt.info%2Fannounce';
                magnetElement.href += '&tr=http%3A%2F%2Fopen.acgnxtracker.com%2Fannounce';
                magnetElement.href += '&tr=http%3A%2F%2Fopentracker.i2p.rocks%2Fannounce';
                magnetElement.href += '&tr=http%3A%2F%2Ftracker.opentrackr.org%2Fannounce';
                magnetElement.href += '&tr=http%3A%2F%2Ftracker.tamersunion.org%2Fannounce';
                magnetElement.href += '&tr=http%3A%2F%2Ftracker.openbittorrent.com%2Fannounce';
                magnetElement.innerText = '🧲 Magnet';
                magnetElement.style.textDecoration = 'none';

                //---------------------------------------------------------------------

                let copyMagnet = document.createElement('span');
                copyMagnet.innerText = '📋 Magnet';
                copyMagnet.style.cursor = torrentStyle.cursor;
                copyMagnet.style.font = torrentStyle.font;
                copyMagnet.style.color = torrentStyle.color;
                copyMagnet.style.textDecoration = 'none';
                copyMagnet.addEventListener('click', function(e){copyText(e, magnetElement.href)}, false);

                //---------------------------------------------------------------------

                let copyInfo = document.createElement('span');
                copyInfo.innerText = '📋 Info';
                copyInfo.style.cursor = torrentStyle.cursor;
                copyInfo.style.font = torrentStyle.font;
                copyInfo.style.color = torrentStyle.color;
                copyInfo.style.textDecoration = 'none';
                copyInfo.addEventListener('click', function(e){copyText(e, `${torrentTitle}\n${torrentSize}\n${magnetHash}\n${magnetElement.href}\n`)}, false);

                //---------------------------------------------------------------------

                torrent.parentElement.insertAdjacentHTML('beforeend', '<br>');
                torrent.parentElement.append('📅 ', magnetHash);
                torrent.parentElement.insertAdjacentHTML('beforeend', '<br>');
                torrent.parentElement.append(torrentElement);
                torrent.parentElement.append('  󠀠 ', magnetElement);
                torrent.parentElement.append('  󠀠 ', copyMagnet);
                torrent.parentElement.append('   ', copyInfo);

                //---------------------------------------------------------------------

                let imdbElement = torrentDoc.querySelector('table[class="lista-rounded"] table:nth-of-type(1) a[href*="imdb.com/title"]');
                if (imdbElement)
                {
                    imdbElement.innerText = 'ℹ️ IMDB';
                    imdbElement.style.textDecoration = 'none';
                    torrent.parentElement.append('  󠀠 ', imdbElement);
                }

                //---------------------------------------------------------------------

                let trailerElement = torrentDoc.querySelector('table[class="lista-rounded"] table:nth-of-type(1) a[href*="trailers.php"]');
                if (trailerElement)
                {
                    trailerElement.innerText = '▶️ Trailer';
                    trailerElement.style.textDecoration = 'none';
                    torrent.parentElement.append('  󠀠 ', trailerElement);
                }

                //---------------------------------------------------------------------



                //---------------------------------------------------------------------
            });
        } catch(e) {}
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


