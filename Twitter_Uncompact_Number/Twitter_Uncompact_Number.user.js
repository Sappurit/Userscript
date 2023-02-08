// ==UserScript==
// @name        Twitter Uncompact Number
// @namespace   Twitter_Uncompact_Number
// @description Uncompact total number of Tweets, Following, Followers, Likes, Lists and Moments.
// @icon        https://www.google.com/s2/favicons?sz=256&domain=twitter.com
// @version     5
// @author      Sappurit
// @updateURL   https://github.com/Sappurit/Userscript/raw/main/Twitter_Uncompact_Number/Twitter_Uncompact_Number.user.js
// @downloadURL https://github.com/Sappurit/Userscript/raw/main/Twitter_Uncompact_Number/Twitter_Uncompact_Number.user.js
// @license     MIT
// @match       https://twitter.com/*
// @require     https://code.jquery.com/jquery-3.3.1.slim.min.js
// ==/UserScript==


$(function(){
    let tweets = $(".ProfileNav-item--tweets .ProfileNav-stat").attr("title").replace(/ Tweets?/, "");
    $(".ProfileNav-item--tweets .ProfileNav-stat .ProfileNav-value").text(tweets);

    let following = $(".ProfileNav-item--following .ProfileNav-stat").attr("title").replace(/ Following/, "");
    $(".ProfileNav-item--following .ProfileNav-stat .ProfileNav-value").text(following);

    let followers = $(".ProfileNav-item--followers .ProfileNav-stat").attr("title").replace(/ Followers?/, "");
    $(".ProfileNav-item--followers .ProfileNav-stat .ProfileNav-value").text(followers);

    let favorites = $(".ProfileNav-item--favorites .ProfileNav-stat").attr("title").replace(/ Likes?/, "");
    $(".ProfileNav-item--favorites .ProfileNav-stat .ProfileNav-value").text(favorites);

    let lists = $(".ProfileNav-item--lists .ProfileNav-stat").attr("title").replace(/ Lists?/, "");
    $(".ProfileNav-item--lists .ProfileNav-stat .ProfileNav-value").text(lists);

    let moments = $(".ProfileNav-item--moments .ProfileNav-stat").attr("title").replace(/ Moments?/, "");
    $(".ProfileNav-item--moments .ProfileNav-stat .ProfileNav-value").text(moments);
});


/******************************************************************************

<li class="ProfileNav-item ProfileNav-item--tweets is-active">
<a class="ProfileNav-stat ProfileNav-stat--link u-borderUserColor u-textCenter js-tooltip js-nav" title="27,893 Tweets" data-nav="tweets" tabindex="0">
   <span class="ProfileNav-label" aria-hidden="true">Tweets</span>
   <span class="u-hiddenVisually">Tweets, current page.</span>
   <span class="ProfileNav-value" data-count="27893" data-is-compact="true">27.9K</span>
</a></li>

<li class="ProfileNav-item ProfileNav-item--following">
<a class="ProfileNav-stat ProfileNav-stat--link u-borderUserColor u-textCenter js-tooltip js-nav u-textUserColor" title="59 Following" data-nav="following">
   <span class="ProfileNav-label" aria-hidden="true">Following</span>
   <span class="u-hiddenVisually">Following</span>
   <span class="ProfileNav-value" data-count="59" data-is-compact="false">59</span>
</a></li>

<li class="ProfileNav-item ProfileNav-item--followers is-active">
<a class="ProfileNav-stat ProfileNav-stat--link u-borderUserColor u-textCenter js-tooltip js-nav" data-nav="followers" tabindex="0" data-original-title="29,633 Followers">
   <span class="ProfileNav-label" aria-hidden="true">Followers</span>
   <span class="u-hiddenVisually">Followers, current page.</span>
   <span class="ProfileNav-value" data-count="29633" data-is-compact="true">29.6K</span>
</a></li>

<li class="ProfileNav-item ProfileNav-item--favorites" data-more-item=".ProfileNav-dropdownItem--favorites">
<a class="ProfileNav-stat ProfileNav-stat--link u-borderUserColor u-textCenter js-tooltip js-nav u-textUserColor" data-nav="favorites" data-original-title="3,828 Likes">
   <span class="ProfileNav-label" aria-hidden="true">Likes</span>
   <span class="u-hiddenVisually">Likes</span>
   <span class="ProfileNav-value" data-count="3828" data-is-compact="false">3,828</span>
</a></li>

<li class="ProfileNav-item ProfileNav-item--lists is-active" data-more-item=".ProfileNav-dropdownItem--lists">
<a class="ProfileNav-stat ProfileNav-stat--link u-borderUserColor u-textCenter js-tooltip js-nav" data-nav="all_lists" tabindex="0" data-original-title="3 Lists">
   <span class="ProfileNav-label" aria-hidden="true">Lists</span>
   <span class="u-hiddenVisually">Lists, current page.</span>
   <span class="ProfileNav-value" data-is-compact="false">3</span>
</a></li>

<li class="ProfileNav-item ProfileNav-item--moments" data-more-item=".ProfileNav-dropdownItem--userMoments">
<a class="ProfileNav-stat ProfileNav-stat--link u-borderUserColor u-textCenter js-tooltip js-nav u-textUserColor" data-nav="user_moments" data-original-title="49 Moments">
   <span class="ProfileNav-label" aria-hidden="true">Moments</span>
   <span class="u-hiddenVisually">Moments</span>
   <span class="ProfileNav-value" data-is-compact="false">49</span>
</a></li>

******************************************************************************/


