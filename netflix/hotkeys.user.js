// ==UserScript==
// @name           Netflix Hotkeys
// @namespace      Flex
// @version        1.0
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
};
