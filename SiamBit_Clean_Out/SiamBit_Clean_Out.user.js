// ==UserScript==
// @name        SiamBit Clean Out
// @namespace   SiamBit_Clean_Out
// @description Clean out words to make easy reading. Clean out some useless icons and pics.
// @icon        https://www.google.com/s2/favicons?sz=256&domain=siambit.me
// @version     63
// @author      Sappurit
// @updateURL   https://github.com/Sappurit/Userscript/raw/main/SiamBit_Clean_Out/SiamBit_Clean_Out.user.js
// @downloadURL https://github.com/Sappurit/Userscript/raw/main/SiamBit_Clean_Out/SiamBit_Clean_Out.user.js
// @license     MIT
// @match       https://*.siambit.me/viewbrsb.php*
// @match       https://*.siambit.me/viewno18sb.php*
// @match       https://*.siambit.me/details.php*
// ==/UserScript==


//---------------------------------------------------------------------------------------------------------------------------------

var HTML = document.body.innerHTML;

//-------------------------------------------------------- Index -------------------------------------------------------------------

// All html tags automatic insert double quote. So we need to put "" on every html tags.

HTML = HTML.replace(/onmouseover="this.style.backgroundColor='#E6E6FA';"/g, '');                                   //Remove hilight on mouse over
HTML = HTML.replace(/bgcolor="#EDF4F5"/g, '');                                                                     //Remove hilight auto sticky
HTML = HTML.replace(/bgcolor="#F5ECCE"/g, '');                                                                     //Remove hilight 150 seed

HTML = HTML.replace(/<tr .+?>(((?!<\/tr>)(.|\n))+?642822(.|\n)+?)<\/tr>/g, '<tr bgcolor=#F5ECCE>$1</tr>');         //Add hilight JEDAi
HTML = HTML.replace(/<tr .+?>(((?!<\/tr>)(.|\n))+?20886(.|\n)+?)<\/tr>/g, '<tr bgcolor=#F5ECCE>$1</tr>');          //Add hilight John1

HTML = HTML.replace(/<tr .+?>(((?!<\/tr>)(.|\n))+?จีน(.|\n)+?)<\/tr>/g,       '<tr style="text-decoration: line-through double;">$1</tr>');     //Dim จีน
HTML = HTML.replace(/<tr .+?>(((?!<\/tr>)(.|\n))+?เกาหลี(.|\n)+?)<\/tr>/g,    '<tr style="text-decoration: line-through double;">$1</tr>');     //Dim เกาหลี
HTML = HTML.replace(/<tr .+?>(((?!<\/tr>)(.|\n))+?ญี่ปุ่น(.|\n)+?)<\/tr>/g,     '<tr style="text-decoration: line-through double;">$1</tr>');     //Dim ญี่ปุ่น
HTML = HTML.replace(/<tr .+?>(((?!<\/tr>)(.|\n))+?เวียดนาม(.|\n)+?)<\/tr>/g,  '<tr style="text-decoration: line-through double;">$1</tr>');     //Dim เวียดนาม
HTML = HTML.replace(/<tr .+?>(((?!<\/tr>)(.|\n))+?ฮ่องกง(.|\n)+?)<\/tr>/g,    '<tr style="text-decoration: line-through double;">$1</tr>');     //Dim ฮ่องกง
HTML = HTML.replace(/<tr .+?>(((?!<\/tr>)(.|\n))+?อินเดีย(.|\n)+?)<\/tr>/g,    '<tr style="text-decoration: line-through double;">$1</tr>');     //Dim อินเดีย

HTML = HTML.replace(/<tr ((?!<\/tr>)(.|\n))+?(x|h).?265(.|\n)+?<\/tr>/ig, '');                                     //Filter out x265
HTML = HTML.replace(/<tr ((?!<\/tr>)(.|\n))+?60fps(.|\n)+?<\/tr>/ig, '');                                          //Filter out 60fps
HTML = HTML.replace(/<tr ((?!<\/tr>)(.|\n))+?แปล Google(.|\n)+?<\/tr>/ig, '');                                     //Filter out แปล Google
HTML = HTML.replace(/<tr ((?!<\/tr>)(.|\n))+?id=222779(.|\n)+?<\/tr>/g, '');                                       //Filter out thesaintxxx
HTML = HTML.replace(/<tr ((?!<\/tr>)(.|\n))+?id=208302(.|\n)+?<\/tr>/g, '');                                       //Filter out PORSCHE
HTML = HTML.replace(/<tr ((?!<\/tr>)(.|\n))+?id=271434(.|\n)+?<\/tr>/g, '');                                       //Filter out suriya2009
HTML = HTML.replace(/<tr ((?!<\/tr>)(.|\n))+?id=600892(.|\n)+?<\/tr>/g, '');                                       //Filter out Triamkerdsap

HTML = HTML.replace(/src="pic\/cam.gif " style="border:none"/g, 'src="pic/cam.gif" style="vertical-align:bottom" height=13');                   //Fix Cam
HTML = HTML.replace(/\[ฝรั่ง\]-?/g,                    ' <img src=https://s3.imgcdn.dev/sOIEM.png style="vertical-align:bottom" height=13> ');    //Add US Flag
HTML = HTML.replace(/(\[netflix\]| netflix )/ig,     ' <img src=https://s3.imgcdn.dev/sOCO0.png style="vertical-align:bottom" height=13> ');    //Add NetFlix
HTML = HTML.replace(/(\[amazon\]| amazon )/ig,       ' <img src=https://s3.imgcdn.dev/sO6zH.png style="vertical-align:bottom" height=13> ');    //Add Amazon
HTML = HTML.replace(/(\[hulu\]| hulu )/ig,           ' <img src=https://s3.imgcdn.dev/sO45e.png style="vertical-align:bottom" height=13> ');    //Add hulu
HTML = HTML.replace(/(\[HBO ?(Max|Go)?\]| HBO )/ig,  ' <img src=https://s3.imgcdn.dev/sOuYC.png style="vertical-align:bottom" height=13> ');    //Add HBO
HTML = HTML.replace(/(\[?(walt )?disney(\+| \+| plus| ) ?(access|channel|classic|company|films?|hotstar|live action|original)?\]?)/ig,   ' <img src=https://s3.imgcdn.dev/sOMtS.png style="vertical-align:bottom" height=13> ');    //Add Disney

//-------------------------------------------------------- Detail -----------------------------------------------------------------

HTML = HTML.replace(/ต้องการกด Thanks .*? เช่นกัน/, 'Download');                                                                                //หน้า detail ช่อง Download
HTML = HTML.replace(/(href="downloadnew.php\?id=(\d+)\?)/, 'onmouseover="sndReq(\'action=say_thanks&id=$2\', \'saythanks\')" $1');           //หน้า detail ช่อง say thank / add onmouseover

//---------------------------------------------------------------------------------------------------------------------------------

document.body.innerHTML = HTML;

//---------------------------------------------------------------------------------------------------------------------------------



