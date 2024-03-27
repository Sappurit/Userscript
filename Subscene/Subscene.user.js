// ==UserScript==
// @name        Subscene Plus
// @namespace   Subscene_Plus
// @description Shows high-quality posters on the browse page. Show extra subtitle download, IMDB and RARBG links. Ability to filter out the annoy titles.
// @icon        https://www.google.com/s2/favicons?sz=256&domain=subscene.com
// @version     13
// @author      Sappurit
// @updateURL   https://github.com/Sappurit/Userscript/raw/main/Subscene/Subscene.user.js
// @downloadURL https://github.com/Sappurit/Userscript/raw/main/Subscene/Subscene.user.js
// @license     MIT
// @match       https://*.subscene.com/*
// ==/UserScript==

//---------------------------------------------------------------------

// https://unicode.org/iso15924/iso15924-codes.html
// https://unicode.org/Public/UCD/latest/ucd/PropertyValueAliases.txt

// 285	Bopo	Bopomofo
// 286	Hang	Hangul
// 287	Kore	Korean				Han + Hangul

// 500	Hani	Han (Hanzi, Kanji, Hanja)
// 501	Hans	Han (Simplified variant)
// 502	Hant	Han (Traditional variant)
// 503	Hanb	Han with Bopomofo		Han + Bopomofo

// 410	Hira	Hiragana
// 411	Kana    Katakana
// 412	Hrkt	Katakana_Or_Hiragana		Hiragana + Katakana
// 413	Jpan	Japanese			Han + Hiragana + Katakana

//---------------------------------------------------------------------

// Choose your annoy titles to filter out from the browse page. Eg. Korean, Chinese, Japanese character sets.
var blockTitle = '(Mobeomtaeksi|[\\p{sc=Hang}\\p{sc=Hani}\\p{sc=Hira}\\p{sc=Kana}]{2})';

// Choose the delay (milisec) between loop while fetch all subtitles data to avoid IP ban.
var delay = 1000;

// Choose the poster size
var posterWidth = '120px';
var posterHeight = '180px';

// Choose RARBG Category filter to display
// 41  TV HD          49  TV UHD
// 44  x264/1080      50  x264/4k
// 54  x265/1080      51  x265/4k
var rarbgCategory = 'category=41;44';

// Choose TorrentGalaxy Category filter to display
//         SD      HD     UHD    PACK
// TV     c5=1   c41=1   c11=1   c6=1
// Movie  c1=1   c42=1    c3=1   c4=1
// XXX           c35=1
// Bollywood     c46=1
var torrentGalaxyCategory = 'c5=1&c41=1&c11=1&c6=1&c1=1&c42=1&c3=1&c4=1&c46=1';

//---------------------------------------------------------------------

var blockTitleRegExp = new RegExp(`${blockTitle}`, 'siu');
var num = 0;

//---------------------------------------------------------------------

if (document.location.pathname.match(/^\/upload/))
{
    uploadPage();
}

if (document.location.pathname.match(/^\/browse/))
{
    browsePage();
}
else
{
    otherPage();
}

//---------------------------------------------------------------------

function uploadPage()
{
    var observeElement = document.getElementById('filelist');
    var observeOptions = { childList: true, subtree: true };
    var observePage = new MutationObserver(observeCallback);

    observePage.observe(observeElement, observeOptions);
    console.log('Observe Start : ' + new Date().toLocaleString());

    //-------------------------------------------------------

    let releaseElement = document.getElementById('Subtitle_ReleaseType');
    let productionElement = document.getElementById('Subtitle_ProductionType');

    releaseElement.value = 7;        // Web
    productionElement.value = 1;     // From retail
}

//---------------------------------------------------------------------

function injectScript()
{
    let script = document.createElement('script');
    script.textContent = `AddReleaseName();`;
    (document.head || document.body).appendChild(script);
    script.remove();
}

//---------------------------------------------------------------------

async function observeCallback(mutations)
{
    for (let mutation of mutations)
    {
        if ( mutation.type === 'childList' && mutation.addedNodes.length > 0 )
        {
            try
            {
                let fileElements = mutation.target.querySelectorAll('input[id="Files"]:not([data-mod])');

                for (let fileElement of fileElements)
                {
                    let releaseElement = document.querySelector('input[id^="ReleaseNames"]:not([data-mod])');

                    if ( ! releaseElement ) injectScript();

                    releaseElement = document.querySelector('input[id^="ReleaseNames"]:not([data-mod])');
                    releaseElement.value = fileElement.value.replace(/\.srt$/i, '').replace(/\.\d+$/, '').replace(/\.Thai$/i, '');

                    fileElement.setAttribute('data-mod', true);
                    releaseElement.setAttribute('data-mod', true);
                }
            } catch(e) {}
        }
    }
}

//---------------------------------------------------------------------

function otherPage()
{
    'use strict';

    let elements = document.querySelectorAll('a[class="imdb"][target="_blank"]');

    for (let i = 0; i < elements.length; i++)
    {
        let imdbElement = elements[i];
        imdbElement.innerText = 'IMDB';

        let id = imdbElement.href.match(/tt\d+/);

        let rarbgElement = document.createElement('a');
        rarbgElement.innerText = 'RARBG';
        rarbgElement.setAttribute('target', '_blank');
        rarbgElement.setAttribute('class', 'imdb');
        rarbgElement.setAttribute('href', 'https://rarbgenter.org/torrents.php?' + rarbgCategory + '&imdb=' + id);
        imdbElement.after(' ', rarbgElement);

        let ytsElement = document.createElement('a');
        ytsElement.innerText = 'YTS';
        ytsElement.setAttribute('target', '_blank');
        ytsElement.setAttribute('class', 'imdb');
        ytsElement.setAttribute('href', 'https://yts.mx/browse-movies/' + id);
        rarbgElement.after(' ', ytsElement);

        let torrentGalaxyElement = document.createElement('a');
        torrentGalaxyElement.innerText = 'TG';
        torrentGalaxyElement.setAttribute('target', '_blank');
        torrentGalaxyElement.setAttribute('class', 'imdb');
        torrentGalaxyElement.setAttribute('href', 'https://torrentgalaxy.to/torrents.php?' + torrentGalaxyCategory + '&search=' + id + '#results');
        ytsElement.after(' ', torrentGalaxyElement);
    }
}

//---------------------------------------------------------------------

function browsePage()
{
    'use strict';

    // https://www.w3schools.com/jsref/dom_obj_style.asp

    // Set table to new background color
    // 217 .subtitles table { background-color: rgb(237, 228, 206); width: 100%; }
    document.styleSheets[0].cssRules[217].style.setProperty('background-color', 'rgb(232, 222, 200)');

    // Set vertical align to all td
    // 220 .subtitles td { overflow: hidden; white-space: nowrap; height: 25px; line-height: 25px; }
    document.styleSheets[0].cssRules[220].style.setProperty('vertical-align', 'middle');

    // Fix display bug in a1
    // 222 .subtitles td.a1 a:link { display: block; background-color: rgb(237, 228, 206); }  #ede4ce
    document.styleSheets[0].cssRules[222].style.removeProperty('display');
    document.styleSheets[0].cssRules[222].style.removeProperty('background-color');

    // Remove hover background color from a1
    // 223 .subtitles td.a1 a:hover { background-color: rgb(251, 242, 219); cursor: pointer; } #fbf2db
    document.styleSheets[0].cssRules[223].style.removeProperty('background-color');

    // Remove background color from a1
    // 224 .subtitles td.a1 a:visited, .subtitles td.a1 .visited { background-color: rgb(251, 242, 219); } #fbf2db
    document.styleSheets[0].cssRules[224].style.removeProperty('background-color');

    // Fix vertical align display bug in a5
    // 225 .subtitles td.a1 span, .subtitles td.a5, .subtitles td.comment, .subtitles td.a6 div { overflow: hidden; white-space: nowrap; display: block; }
    document.styleSheets[0].cssRules[225].style.removeProperty('display');

    // Fix Hearing Impaired image in a41
    // 231 .subtitles td.a41 { background: url("/content/images/icon-hearing-impaired.png") 0px 5px no-repeat; }
    document.styleSheets[0].cssRules[231].style.setProperty('background-position', 'center');

    // Change (year) color to black
    // 362 .subtle { color: rgb(153, 153, 153); font-weight: normal; }
    document.styleSheets[0].cssRules[362].style.removeProperty('color');
    document.styleSheets[0].cssRules[362].style.removeProperty('font-weight');

    // Add hover background color to all rows
    document.styleSheets[0].insertRule('.subtitles tbody tr:hover {background-color: Cornsilk;}', document.styleSheets[0].cssRules.length); // last index

    //---------------------------------------------------------------------

    let headerCell = document.createElement('td');
    headerCell.setAttribute('align', 'center');
    headerCell.style.width = posterWidth;
    headerCell.innerText = 'Poster';

    let table = document.querySelector('div[id="content"] table');
    table.rows[0].insertBefore(headerCell, table.rows[0].cells[0]);

    //---------------------------------------------------------------------

//  for (let row of table.rows)
    for (let i = 1; i < table.rows.length; i++)
    {
        let posterCell = document.createElement('td');
        posterCell.setAttribute('align', 'center');

        let row = table.rows[i];

        let blockTitleArray = row.innerHTML.match(blockTitleRegExp);
        if (blockTitleArray) { row.replaceChildren(); continue; }

        row.insertBefore(posterCell, row.cells[0]);

        try
        {
            let subtitleElement = row.querySelector('td[class="a1"] > a');
            subtitleElement.setAttribute('target', '_blank');

            let visitedElement = subtitleElement.querySelector('div[class="visited"]').cloneNode(true);
            visitedElement.children[0].setAttribute('class', 'l r');
            visitedElement.children[0].innerHTML = '&nbsp;';
            visitedElement.children[1].removeAttribute('class');
            visitedElement.children[1].replaceChildren();
            subtitleElement.after(visitedElement);

            let subtitleStyle = window.getComputedStyle(subtitleElement); // final CSS

            //---------------------------------------------------------------------

            let subtitlePage = subtitleElement.href; // gets full path with origin while getAttribute('href') may get only pathname.
            getDocFromURL(subtitlePage).then((subtitleDoc) => {

                //---------------------------------------------------------------------

                let posterElement = subtitleDoc.querySelector('div[class="poster"] > a');
                if (posterElement)
                {
                    posterElement.children[0].style.display = 'block'; // fix space at the bottom of img
                    posterElement.children[0].style.minWidth = posterWidth;
                    posterElement.children[0].style.maxWidth = posterWidth;
                    posterCell.append(posterElement);
                }

                //---------------------------------------------------------------------

                let downloadElement = subtitleDoc.getElementById('downloadButton');
                if (downloadElement)
                {
                    downloadElement.setAttribute('class', 'imdb');
                    visitedElement.children[1].append(downloadElement);
                }

                //---------------------------------------------------------------------

                let imdbElement = subtitleDoc.querySelector('a[class="imdb"][target="_blank"]');
                if (imdbElement)
                {
                    imdbElement.innerText = 'IMDB';
                    visitedElement.children[1].append(' · ', imdbElement);

                    let id = imdbElement.href.match(/tt\d+/);

                    let rarbgElement = document.createElement('a');
                    rarbgElement.innerText = 'RARBG';
                    rarbgElement.setAttribute('target', '_blank');
                    rarbgElement.setAttribute('class', 'imdb');
                    rarbgElement.setAttribute('href', 'https://rarbgenter.org/torrents.php?' + rarbgCategory + '&imdb=' + id);
                    visitedElement.children[1].append(' · ', rarbgElement);

                    let ytsElement = document.createElement('a');
                    ytsElement.innerText = 'YTS';
                    ytsElement.setAttribute('target', '_blank');
                    ytsElement.setAttribute('class', 'imdb');
                    ytsElement.setAttribute('href', 'https://yts.mx/browse-movies/' + id);
                    visitedElement.children[1].append(' · ', ytsElement);

                    let torrentGalaxyElement = document.createElement('a');
                    torrentGalaxyElement.innerText = 'TG';
                    torrentGalaxyElement.setAttribute('target', '_blank');
                    torrentGalaxyElement.setAttribute('class', 'imdb');
                    torrentGalaxyElement.setAttribute('href', 'https://torrentgalaxy.to/torrents.php?' + torrentGalaxyCategory + '&search=' + id + '#results');
                    visitedElement.children[1].append(' · ', torrentGalaxyElement);
                }

                //---------------------------------------------------------------------

            });
        } catch(e) {}
    }

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

document.createElement()
document.createTextNode()
node.parentNode
Element.replaceChildren()
.childNodes[]
.children[]
.cloneNode()
.empty()
.remove()
.removeNode()
.innerHTML = ''
.textContent = ''
.replaceChild()
.firstNode
.lastNode
node.removeChild()
node.firstChild
node.lastChild

https://developer.mozilla.org/en-US/docs/Web/API/Node

Node.appendChild()      // Only accepts one Node objects. Returns the appended Node object.
Node.insertBefore()
There is no Node.insertAfter() method. It can be emulated by Node.insertBefore(newElement, Node.nextSibling)

*********************************************************/


