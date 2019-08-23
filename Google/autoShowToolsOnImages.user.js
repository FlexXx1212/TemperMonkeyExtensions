// ==UserScript==
// @name           Google Automatically Show Tools
// @namespace      Flex
// @version        1.4
// @description    More functionality
// @author         FlexNiko
// @include        http://www.google.*/search?*
// @include        http://google.*/search?*
// @include        https://www.google.*/search?*
// @include        https://google.*/search?*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// ==/UserScript==

jQuery(function() {
  var elem = document.getElementById("hdtbMenus");
  elem.className = "hdtb-td-o";

  elem = document.getElementById("appbar");
  elem.classList.add("hdtb-ab-o");
});

// fix: script wouldnt load when pressing BACK
window.onunload = function() {};
