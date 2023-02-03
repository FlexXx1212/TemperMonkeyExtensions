// ==UserScript==
// @name           Trading Course remove header
// @namespace      Flex
// @version        0.1
// @description    Removing header because it blocks view
// @author         FlexNiko
// @include        https://training.mammothinteractive.com/courses/*
// @include        http://training.mammothinteractive.com/courses/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require        https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==

waitForKeyElements(".lecture_heading", removeHeader);

function removeHeader() {
    document.getElementById("lecture_heading").style.display = "none"
}
// fix: script wouldnt load when pressing BACK
window.onunload = function() {};
