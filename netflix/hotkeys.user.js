// ==UserScript==
// @name           Netflix Hotkeys
// @namespace      Flex
// @version        1.1
// @description    Hotkeys
// @author         FlexNiko
// @include        http://www.netflix.com/*
// @include        http://netflix.com/*
// @include        https://www.netflix.com/*
// @include        https://netflix.com/*
// ==/UserScript==

document.onkeyup = function(e) {
  const videoPlayer = netflix.appContext.state.playerApp.getAPI().videoPlayer;
  const playerSessionId = videoPlayer.getAllPlayerSessionIds()[0];
  const player = videoPlayer.getVideoPlayerBySessionId(playerSessionId);

  // back 10 sec
  if (e.which == 65) {
    player.seek(player.getCurrentTime() - 10000);
  }
  // play / pause
  else if (e.which == 83) {
    if (player.isPaused()) {
      player.play();
    } else {
      player.pause();
    }
  }
  // skip 10 secs
  else if (e.which == 68) {
    player.seek(player.getCurrentTime() + 10000);
  }
  // brightness
  else if (e.which == 87) {
    if (getBrightness() === "1") {
      setBrightness(2.5);
    } else {
      setBrightness(1);
    }
  }
};
var html = document.getElementsByTagName("html")[0];

function getBrightness() {
  return html.getAttribute("data-video-brightness") || 1;
}

function setBrightness(n) {
  html.setAttribute("data-video-brightness", n);

  var str = "brightness(" + n + ")";

  var netflix = document.getElementById("netflix-player");
  if (netflix) {
    netflix.style["-webkit-filter"] = str;
  } else {
    var videos = document.getElementsByTagName("video");
    if (videos) {
      for (var i = 0; i < videos.length; i++) {
        videos[i].style["-webkit-filter"] = str;
      }
    }
    var objects = document.getElementsByTagName("object");
    if (objects) {
      for (var i = 0; i < objects.length; i++) {
        objects[i].style["-webkit-filter"] = str;
      }
    }
  }
}
