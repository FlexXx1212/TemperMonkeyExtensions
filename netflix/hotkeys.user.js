// ==UserScript==
// @name           Netflix Hotkeys
// @namespace      Flex
// @version        0.1
// @description    Hotkeys
// @author         FlexNiko
// @include        http://www.netflix.com/*
// @include        http://netflix.com/*
// @include        https://www.netflix.com/*
// @include        https://netflix.com/*
// ==/UserScript==

function skip() {
  clickBtn("button-nfplayerFastForward");
}

function back() {
  clickBtn("button-nfplayerBackTen");
}

function clickBtn(s) {
  var btns = document.getElementsByClassName(s);
  if (btns.length > 0) {
    btns[0].click();
    return true;
  }
  return false;
}

document.onkeyup = function(e) {
  var video = document.getElementsByTagName("video")[0];
  if (e.which == 65) {
    back();
    setTimeout(function() {
      video.play();
    }, 500);
  } else if (e.which == 83) {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  } else if (e.which == 68) {
    skip();
    setTimeout(function() {
      video.play();
    }, 500);
  }
};
