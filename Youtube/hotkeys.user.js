// ==UserScript==
// @name           Youtube Hotkeys
// @namespace      Flex
// @version        0.2
// @description    Play Skip Rewind Pause for Youtube on Keys : A S D
// @author         FlexNiko
// @include        http://www.youtube.com/*
// @include        http://youtube.com/*
// @include        https://www.youtube.com/*
// @include        https://youtube.com/*
// @grant          GM_addStyle
// @grant          GM_setValue
// @grant          GM_getValue
// ==/UserScript==

function doc_keyUp(e) {
  if (
    e.target.tagName.toLowerCase() == "textarea" ||
    e.target.id === "search" ||
    e.target.id === "masthead-search-term" ||
    e.target.className === "comment-simplebox-text" ||
    e.target.tagName.toLowerCase() === "yt-formatted-string"
  ) {
    return;
  }

  if ( e.target.classList.contains("yt-formatted-string") && e.target.tagName.toLowerCase() !== "a" ) {
    return;
  }

  var video = document.getElementsByTagName("video")[0];

  if (e.keyCode == 65) {
    video.currentTime -= 5;
  } else if (e.keyCode == 68) {
    video.currentTime += 5;
  } else if (e.keyCode == 83) {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  } else if (e.keyCode == 81) {
    video.currentTime += 5;
  }
}
document.addEventListener("keyup", doc_keyUp, false);
