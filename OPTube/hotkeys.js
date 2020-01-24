// ==UserScript==
// @name           OP Tube Hotkeys
// @namespace      Flex
// @version        0.1
// @description    Play Skip Rewind Pause for One Piece Tube on Keys : A S D
// @author         FlexNiko
// @include        http://www.onepiece-tube.com/*
// @include        http://onepiece-tube.com/*
// @include        https://www.onepiece-tube.com/*
// @include        https://onepiece-tube.com/*
// @include        https://aniclouds.org/*
// @include        https://www.aniclouds.org/*
// @include        http://aniclouds.org/*
// @include        http://www.aniclouds.org/*
// @grant          GM_addStyle
// @grant          GM_setValue
// @grant          GM_getValue
// ==/UserScript==

function doc_keyUp(e) {
  console.log(document);
  console.log(document.getElementsByTagName("video"));
  return;
  var video = document.getElementsByTagName("video")[0];
  console.log(document);
  console.log(
    document.evaluate(
      "/html/body/div/div[2]/video",
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue
  );
  if (e.keyCode == 65) {
    video.currentTime -= 5;
  }
  if (e.keyCode == 68) {
    video.currentTime += 5;
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
