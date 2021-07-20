// ==UserScript==
// @name           Youtube Media/Skip Keys
// @namespace      Flex
// @version        0.1
// @description    Adds two buttons for going back and skipping 10 seconds
// @author         FlexNiko
// @include        http://www.youtube.com/*
// @include        http://youtube.com/*
// @include        https://www.youtube.com/*
// @include        https://youtube.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require        https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==

waitForKeyElements(".ytp-left-controls", createButtons);

function createElementFromHTML(htmlString) {
  var div = document.createElement("div");
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstChild;
}

function createButtons() {
  var rightControls = document.getElementsByClassName("ytp-right-controls")[0];

  var skip10string =
    '<a class="ytp-skip-10-button ytp-button" role="button" aria-disabled="false" aria-label="Skip 10 Seconds" title="Skip 10 Seconds"><svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%"><path class="ytp-svg-fill" d="M 12,24 20.5,18 12,12 V 24 z" id="ytp-id-15"></path></svg></a>';
  var back10string =
    '<a class="ytp-back-10-button ytp-button" role="button" aria-disabled="false" aria-label="Back 10 Seconds" title="Back 10 Seconds"><svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%"><path class="ytp-svg-fill" d="M 12,24 0,18 12,12 V 24 z" id="ytp-id-15"></path></svg></a>';

  var skip10elem = createElementFromHTML(skip10string);
  var back10elem = createElementFromHTML(back10string);

  skip10elem.addEventListener("click", skipSeconds);
  back10elem.addEventListener("click", backSeconds);

  rightControls.insertBefore(skip10elem, rightControls.firstChild);
  rightControls.insertBefore(back10elem, rightControls.firstChild);
}

function skipSeconds() {
  var video = document.getElementsByTagName("video")[0];
  video.currentTime += 10;
}

function backSeconds() {
  var video = document.getElementsByTagName("video")[0];
  video.currentTime -= 10;
}

// fix: script wouldnt load when pressing BACK
window.onunload = function() {};
