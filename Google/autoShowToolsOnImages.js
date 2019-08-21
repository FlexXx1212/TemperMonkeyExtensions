// ==UserScript==
// @name           Google Automatically Show Tools
// @namespace      Flex
// @version        0.1
// @description    More functionality
// @author         FlexNiko
// @include        http://www.google.*
// @include        http://google.*
// @include        https://www.google.*
// @include        https://google.*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require        https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==

jQuery(function() {
  document.getElementById("hdtb-tls").click();
});

// fix: script wouldnt load when pressing BACK
window.onunload = function() {};
