// ==UserScript==
// @name           Video Hotkeys
// @namespace      Flex
// @version        1.5
// @description    Play Skip Rewind Pause for Youtube or any other Websites on Keys : A S D & Unlimited Playback Rates (x2.5 etc.)
// @author         FlexNiko
// @match          *://*/*
// @grant          GM_addStyle
// @grant          GM_setValue
// @grant          GM_getValue
// ==/UserScript==

var lastPlaybackRate = -1;
var originalTitle = "";
function doc_keyUp(e) {
  if(originalTitle == "") {
      originalTitle = document.getElementsByTagName("title")[0].innerText;
  }
  if (
    e.target.tagName.toLowerCase() == "textarea" ||
    e.target.id === "search" ||
    e.target.id === "masthead-search-term" ||
    e.target.className === "comment-simplebox-text" ||
    e.target.tagName.toLowerCase() === "yt-formatted-string"
  ) {
    return;
  }
  if (
    e.target.classList.contains("yt-formatted-string") &&
    e.target.tagName.toLowerCase() !== "a"
  ) {
    return;
  }
  var video = document.getElementsByTagName("video")[0];
  if (e.keyCode == 65) {
    video.currentTime -= 5;
  }
  if (e.keyCode == 68) {
    video.currentTime += 5;
  }
  if (e.keyCode == 190 && e.shiftKey == true) {
    if(lastPlaybackRate == -1) {
        lastPlaybackRate = video.playbackRate;
    } else {
        video.playbackRate = lastPlaybackRate + 0.25;
        var b = document.getElementsByClassName("ytp-bezel-text");
        if(b != null && b.length > 0) {
            b[0].innerText = video.playbackRate + "x";
        } else {
            document.getElementsByTagName("title")[0].innerText = video.playbackRate + "x - " + originalTitle
        }
        lastPlaybackRate = video.playbackRate;
    }
  }
  if (e.keyCode == 188 && e.shiftKey == true) {
      if(lastPlaybackRate == -1) {
          lastPlaybackRate = video.playbackRate;
      } else if(lastPlaybackRate > 0.25) {
          video.playbackRate = lastPlaybackRate - 0.25;
          var c = document.getElementsByClassName("ytp-bezel-text");
          if(c != null && c.length > 0) {
            c[0].innerText = video.playbackRate + "x";
          } else {
            document.getElementsByTagName("title")[0].innerText = video.playbackRate + "x - " + originalTitle
          }
          lastPlaybackRate = video.playbackRate;
      }
  }
  if (e.keyCode == 83) {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }
}
document.addEventListener("keyup", doc_keyUp, false);
