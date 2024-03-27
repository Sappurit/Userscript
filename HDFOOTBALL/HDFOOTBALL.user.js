// ==UserScript==
// @name         HDFOOTBALL.NET
// @namespace    HDFOOTBALL.NET
// @description  Show all channels
// @icon         https://www.google.com/s2/favicons?sz=256&domain=hdfootball.net
// @version      1
// @author       Sappurit
// @updateURL    https://github.com/Sappurit/Userscript/raw/main/HDFOOTBALL/HDFOOTBALL.user.js
// @downloadURL  https://github.com/Sappurit/Userscript/raw/main/HDFOOTBALL/HDFOOTBALL.user.js
// @license      MIT
// @match        https://hdfootball.net/*
// ==/UserScript==


(function() {
    'use strict';

    let newDiv = document.createElement ('div');
    newDiv.className = 'panel logo-chaanel';
    newDiv.style.display = 'block';

    newDiv.innerHTML = ' \
<a href=javascript:play("epl1")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--1818.png></a> \
<a href=javascript:play("epl2")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--1819.png></a> \
<a href=javascript:play("epl3")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--1820.png></a> \
<a href=javascript:play("epl4")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--1821.png></a> \
<a href=javascript:play("epl5")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--1822.png></a> \
<a href=javascript:play("epl6")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--4603.png></a> \
<a href=javascript:play("epl7")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--4604.png></a> \
\
<a href=javascript:play("truesport1")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--1070.png></a> \
<a href=javascript:play("truesport2")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--1071.png></a> \
<a href=javascript:play("truesport3")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--1072.png></a> \
<a href=javascript:play("truesport4")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--1073.png></a> \
<a href=javascript:play("truesport5")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--1074.png></a> \
<a href=javascript:play("truesport6")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--1075.png></a> \
<a href=javascript:play("truesport7")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--1076.png></a> \
\
<a href=javascript:play("truesporthd")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--4101.png></a> \
<a href=javascript:play("truesporthd2")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--4102.png></a> \
<a href=javascript:play("truesporthd3")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--4103.png></a> \
<a href=javascript:play("truesporthd4")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--4104.png></a> \
<br> \
<a href=javascript:play("bein1englisharab")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--1166.png></a> \
<a href=javascript:play("bein2englisharab")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--1167.png></a> \
<a href=javascript:play("bein3englisharab")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--1168.png></a> \
\
<a href=javascript:play("bein1")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--1077.png></a> \
<a href=javascript:play("bein2")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--1078.png></a> \
<a href=javascript:play("bein3")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--1079.png></a> \
<a href=javascript:play("bein4")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--1080.png></a> \
<a href=javascript:play("bein5")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--4610.png></a> \
<a href=javascript:play("bein6")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--4611.png></a> \
<a href=javascript:play("bein7")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--4612.png></a> \
\
<a href=javascript:play("beinsportsarabia1hd")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--752.png></a> \
<a href=javascript:play("beinsportsarabia2hd")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--753.png></a> \
<a href=javascript:play("beinsportsarabia3hd")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--754.png></a> \
<a href=javascript:play("bein4arab")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--755.png></a> \
<a href=javascript:play("bein5arab")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--756.png></a> \
<a href=javascript:play("bein6arab")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--757.png></a> \
<a href=javascript:play("bein7arab")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--758.png></a> \
<br> \
<a href=javascript:play("skysportpremiere")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--90.png></a> \
<a href=javascript:play("skysportfootball")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--91.png></a> \
<a href=javascript:play("skysportarena")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--92.png></a> \
<a href=javascript:play("skysportmainevent")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--663.png></a> \
\
<a href=javascript:play("astrosupersport1")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--253.png></a> \
<a href=javascript:play("astrosupersport2")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--254.png></a> \
<a href=javascript:play("astrosupersport3")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--255.png></a> \
<a href=javascript:play("astrosupersport4")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--256.png></a> \
<a href=javascript:play("astrosupersport5")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--2758.png></a> \
\
<a href=javascript:play("foxsports1usa")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--60.png></a> \
<a href=javascript:play("foxsports2usa")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--61.png></a> \
<a href=javascript:play("foxsports3usa")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--61.png></a> \
\
<a href=javascript:play("foxsports1th")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--1089.png></a> \
<a href=javascript:play("foxsports2th")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--1089.png></a> \
<a href=javascript:play("foxsports3th")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--1090.png></a> \
\
<a href=javascript:play("supersportfootball")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--295.png></a> \
<a href=javascript:play("supersportepl")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--299.png></a> \
<br> \
<a href=javascript:play("ch3")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--295.png></a> \
<a href=javascript:play("tv3")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--299.png></a> \
<a href=javascript:play("ch7")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--295.png></a> \
<a href=javascript:play("tv7")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--299.png></a> \
<a href=javascript:play("pptv")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--299.png></a> \
<a href=javascript:play("thairath")><img src=https://api.cloud-streaming.com/images/channel-logo/tv-station--4500.png></a> \
    ';

    let channel = document.getElementById('channel');
    channel.prepend(newDiv);
})();


