// ==UserScript==
// @name           Google
// @namespace      Flex
// @version        0.1
// @description    More functionality
// @author         FlexNiko
// @include        http://www.google.de/*
// @include        http://google.de/*
// @include        https://www.google.de/*
// @include        https://google.de/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require        https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==

jQuery(function() {
    document.getElementById("hdtb-tls").click();
  });

// fix: script wouldnt load when pressing BACK
window.onunload = function() {};
