// ==UserScript==
// @name         Meta Planner
// @namespace    Meta_Planner
// @description  Change font color to black
// @icon         https://www.google.com/s2/favicons?sz=256&domain=facebook.com
// @version      1
// @author       Sappurit
// @updateURL    https://github.com/Sappurit/Userscript/raw/main/Meta_Planner/Meta_Planner.user.js
// @downloadURL  https://github.com/Sappurit/Userscript/raw/main/Meta_Planner/Meta_Planner.user.js
// @license      MIT
// @match        https://business.facebook.com/latest/content_calendar?asset_id=*
// ==/UserScript==

var observeElement = document.body;
var observeOptions = { childList: true, subtree: true };

var observerPlanner;

document.addEventListener('click', function (event) {

	observerPlanner = new MutationObserver(observeCallback);
    observerPlanner.observe(observeElement, observeOptions);
    console.log('Observe Start : ' + new Date().toLocaleString());

});

async function observeCallback(mutations)
{
    try
    {
        var elements = document.getElementsByClassName('xbsr9hj');
        for (let i = 0; i < elements.length; i++)
        {
            elements[i].style.color = 'black';
        }

        elements = document.getElementsByClassName('x1fcty0u');
        for (let i = 0; i < elements.length; i++)
        {
            elements[i].style.fontWeight = '500';
        }

        elements = document.getElementsByClassName('xo1l8bm');
        for (let i = 0; i < elements.length; i++)
        {
            elements[i].style.fontWeight = '500';
        }

    } catch(e) {}
}

