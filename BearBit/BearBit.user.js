// ==UserScript==
// @name        BearBit Plus
// @namespace   BearBit_Plus
// @description Show posters on the browse page. Clean out useless icons and pics.
// @icon        https://www.google.com/s2/favicons?sz=256&domain=bearbit.co
// @version     11
// @author      Sappurit
// @updateURL   https://github.com/Sappurit/Userscript/raw/main/BearBit/BearBit.user.js
// @downloadURL https://github.com/Sappurit/Userscript/raw/main/BearBit/BearBit.user.js
// @license     MIT
// @match       https://*.bearbit.co/viewbrsb.php*
// @match       https://*.bearbit.co/viewno18sb.php*
// @match       https://*.bearbit.co/details.php*
// ==/UserScript==

//------------------------------------------------------------------------
// For the best results, add this code into uBlock Origin.
//------------------------------------------------------------------------
/**
! Remove Tips
bearbit.co##.outer > p:has-text(Tip:)

! Remove usericons and slogans
!||bearbit.co/pic/usericon/*$image
bearbit.co##img[src*="pic/usericon/"][title]
bearbit.co##td[width="260"][align="left"] > font[class="small"][color="gray"]

! Remove useless icons
||bearbit.co/pic/pn_inbox.gif
||bearbit.co/pic/stickyt.gif
||bearbit.co/pic/s-hot.gif
||bearbit.co/pic/hot1.gif
||bearbit.co/pic/new1.gif
||bearbit.co/pic/imdb_siambit.png
||bearbit.co/pic/on.gif
||bearbit.co/pic/off.gif
||bearbit.co/pic/fb_id.png
||bearbit.co/pic/star.gif
||bearbit.co/pic/crown.gif
||bearbit.co/pic/crown3.gif
||bearbit.co/pic/Crown20000new.gif
||bearbit.co/pic/downloadpic.gif
||bearbit.co/pic/online.gif
||bearbit.co/pic/offline.gif
||bearbit.co/pic/Pause.png
||bearbit.co/pic/male.gif
||bearbit.co/pic/female.gif
||bearbit.co/pic/gay.gif
||bearbit.co/pic/smilies/yehh.gif
||bearbit.co/pic/smilies/thumbsup.gif
||bearbit.co/pic/smilies/zeza-SirensJY2U.gif
**/
//------------------------------------------------------------------------

if (document.location.pathname.match(/(viewbrsb.php|viewno18sb.php)/))
{
    browsePage();
}

if (document.location.pathname.match(/details.php/))
{
    detailsPage();
}

//------------------------------------------------------------------------

function browsePage()
{
    let thumbWidth = '200px';
    let thumbHeight = '300px';

    let header = document.createElement('td');
    header.setAttribute('class', 'colhead');
    header.setAttribute('align', 'center');
    header.style.width = thumbWidth;
    header.innerText = 'Poster';

    let table = document.querySelector('table[width="100%"][border="1"][cellspacing="0"][cellpadding="5"]');
    table.rows[0].insertBefore(header, table.rows[0].cells[1]);

//  for (let row of table.rows)
    for (let i = 1; i < table.rows.length; i++)
    {
        let row   = table.rows[i];
        let title = row.cells[1];
        let name  = row.cells[11];

        //----------------------------------------------------------------

        try
        {
            //------------------------------------------------------------
            // Remove hilight onmouseover  #E6E6FA
            //------------------------------------------------------------

            row.removeAttribute('onmouseover');
            row.removeAttribute('onmouseout');

            //------------------------------------------------------------
            // Remove hilight auto sticky  #EDF4F5
            // Remove hilight 150 seed     #F5ECCE
            //------------------------------------------------------------

            for (let cell of row.children) cell.removeAttribute('bgcolor');

            //------------------------------------------------------------
            // Ban IDs
            //------------------------------------------------------------

            if ( name.innerText.match(/(PORSCHE|suriya2009|thesaintxxx|Triamkerdsap|Ouji2561)/i) ||
                 title.innerText.match(/60fps/i) ||
                 title.innerText.match(/(x|h)\.?265/i) )
            {
                row.style.display = 'none';
                continue;
            }

            //------------------------------------------------------------
            // Line-through some words. Hilight some IDs and words
            //------------------------------------------------------------

            if ( title.innerText.match(/(google|แปล|จีน|เกาหลี|ญี่ปุ่น|เวียดนาม|ฮ่องกง)/i) )
            {
                title.style.textDecoration = 'line-through double';
            }
            else
            {
                if ( name.innerText.match(/(JEDAi|John1|MerkavaMII|Evilragnarok|ลิโอเนลเมสซี่)/i) ) row.style.backgroundColor  = '#FFFAD1';
                if ( title.innerText.match(/(2023|2024)/i) )                                     row.style.backgroundColor  = '#FFFAD1';
            }

            //------------------------------------------------------------
            // Change Streaming Logos
            //------------------------------------------------------------

            title.innerHTML = title.innerHTML.replace(/src="pic\/cams.gif " style="border:none"/g, 'src="pic/cam.gif" style="vertical-align:bottom" height=13');                  //Fix Cam
            title.innerHTML = title.innerHTML.replace(/\[ฝรั่ง\]-/g,          ' <img src=https://s6.imgcdn.dev/Wkde2.png style="vertical-align:bottom" height=13> ');    //US Flag
            title.innerHTML = title.innerHTML.replace(/\[Apple TV\+\]/ig,   ' <img src=https://s6.imgcdn.dev/WyTM2.png style="vertical-align:bottom" height=13> ');    //Apple TV+
            title.innerHTML = title.innerHTML.replace(/\[AppleTV\+\]/ig,    ' <img src=https://s6.imgcdn.dev/WyTM2.png style="vertical-align:bottom" height=13> ');    //Apple TV+
            title.innerHTML = title.innerHTML.replace(/\[Apple TV\]/ig,     ' <img src=https://s6.imgcdn.dev/WyTM2.png style="vertical-align:bottom" height=13> ');    //Apple TV+
            title.innerHTML = title.innerHTML.replace(/\[AppleTV\]/ig,      ' <img src=https://s6.imgcdn.dev/WyTM2.png style="vertical-align:bottom" height=13> ');    //Apple TV+
            title.innerHTML = title.innerHTML.replace(/\[AMAZON\]/ig,       ' <img src=https://s6.imgcdn.dev/WkZDt.png style="vertical-align:bottom" height=13> ');    //Amazon
            title.innerHTML = title.innerHTML.replace(/\[PRIME\]/ig,        ' <img src=https://s6.imgcdn.dev/WkZDt.png style="vertical-align:bottom" height=13> ');    //Amazon
            title.innerHTML = title.innerHTML.replace(/\[HBO\]/ig,          ' <img src=https://s6.imgcdn.dev/WkVg9.png style="vertical-align:bottom" height=13> ');    //HBO
            title.innerHTML = title.innerHTML.replace(/\[HULU\]/ig,         ' <img src=https://s6.imgcdn.dev/WktQy.png style="vertical-align:bottom" height=13> ');    //hulu
            title.innerHTML = title.innerHTML.replace(/\[NETFLIX\]/ig,      ' <img src=https://s6.imgcdn.dev/WkWG8.png style="vertical-align:bottom" height=13> ');    //NetFlix
            title.innerHTML = title.innerHTML.replace(/\[NF\]/ig,           ' <img src=https://s6.imgcdn.dev/WkWG8.png style="vertical-align:bottom" height=13> ');    //NetFlix
            title.innerHTML = title.innerHTML.replace(/\[Disney\+\]/ig,     ' <img src=https://s6.imgcdn.dev/WkROD.png style="vertical-align:bottom" height=13> ');    //Disney

        } catch(e) {}

        //----------------------------------------------------------------

        let poster = document.createElement('td');
        poster.setAttribute('align', 'center');
        row.insertBefore(poster, row.cells[1]);

        //----------------------------------------------------------------

        try
        {
            let anchor = row.querySelector('img[title="รูปภาพตัวอย่าง"]').parentElement;
            let link = anchor.href;

            let thumbImage = document.createElement('img');
            thumbImage.src = link;
            thumbImage.style.minWidth = thumbWidth;
            thumbImage.style.maxWidth = thumbWidth;
            thumbImage.style.maxHeight = thumbHeight;
            thumbImage.style.objectFit = 'cover';

            let thumbAnchor = document.createElement('a');
            thumbAnchor.href = link;
            thumbAnchor.setAttribute('target', '_blank');

            thumbAnchor.append(thumbImage);
            poster.append(thumbAnchor);
        } catch(e) {}

    }
}

//------------------------------------------------------------------------

function detailsPage()
{
    //--------------------------------------------------------------------
    // Auto Say Thanks
    //--------------------------------------------------------------------

    try
    {
        let download = document.querySelector('td[class="rowhead"][width="8%"] + td[width="88%"] > a[class="index"]');
        let id = (download.href.match(/id=(\d+)/))[1];

        // download.setAttribute('onmouseover', `sndReq('action=say_thanks&id=${id}', 'saythanks')`);
        injectScript(id);

    } catch(e) {}
}

//------------------------------------------------------------------------

function injectScript(id)
{
    let script = document.createElement('script');
    script.textContent = `sndReq('action=say_thanks&id=${id}', 'saythanks');`;
    (document.head || document.body).appendChild(script);
    script.remove();
}

//------------------------------------------------------------------------
/*

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

*/
//------------------------------------------------------------------------



