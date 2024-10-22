// ==UserScript==
// @name           Video Hotkeys
// @namespace      Flex
// @version        2.2
// @description    Play Skip Rewind Pause for Youtube or any other Websites on Keys : A S D & Unlimited Playback Rates (x2.5 etc.)
// @author         FlexNiko
// @include        *
// @grant          GM_addStyle
// @grant          GM_setValue
// @grant          GM_getValue
// ==/UserScript==

var lastPlaybackRate = -1;
var originalTitle = "";
function doc_keyUp(e) {
  if(originalTitle == "") {
      originalTitle = document.getElementsByTagName("title")[0]?.innerText;
  }
  if (
    e.target.tagName.toLowerCase() == "textarea" ||
    e.target.id === "search" ||
    e.target.id === "masthead-search-term" ||
    e.target.className === "comment-simplebox-text" ||
    e.target.tagName.toLowerCase() === "yt-formatted-string" ||
    e.target.role === "textbox" ||
    e.target.type === "text"
  ) {
    return;
  }
  if (
    e.target.classList.contains("yt-formatted-string") &&
    e.target.tagName.toLowerCase() !== "a"
  ) {
    return;
  }
  var videoElements = document.getElementsByTagName("video");
  var video;
  var longestDuration = 0;
  for (const curVideo of videoElements) {
      if(curVideo.duration > longestDuration) {
          longestDuration = curVideo.duration;
          video = curVideo;
      }
  }
  if (e.keyCode == 65) {
    video.currentTime -= 5;
  }
  if (e.keyCode == 68) {
    video.currentTime += 5;
  }
  let showCurrentSpeed = false;
  if (e.keyCode == 190 && e.shiftKey == true) {
    if(lastPlaybackRate == -1) {
        lastPlaybackRate = video.playbackRate;
    } else {
        video.playbackRate = lastPlaybackRate + 0.25;
        var b = document.getElementsByClassName("ytp-bezel-text");
        if(b != null && b.length > 0) {
            b[0].innerText = video.playbackRate + "x";
        }
        if(document.getElementsByTagName("title")[0] != null) {
          document.getElementsByTagName("title")[0].innerText = video.playbackRate + "x - " + originalTitle;
        }
        lastPlaybackRate = video.playbackRate;
    }
    showCurrentSpeed = true;
  }
  if (e.keyCode == 188 && e.shiftKey == true) {
      if(lastPlaybackRate == -1) {
          lastPlaybackRate = video.playbackRate;
      } else if(lastPlaybackRate > 0.25) {
          video.playbackRate = lastPlaybackRate - 0.25;
          var c = document.getElementsByClassName("ytp-bezel-text");
          if(c != null && c.length > 0) {
            c[0].innerText = video.playbackRate + "x";
          }
          if(document.getElementsByTagName("title")[0] != null) {
            document.getElementsByTagName("title")[0].innerText = video.playbackRate + "x - " + originalTitle;
          }
          lastPlaybackRate = video.playbackRate;
      }
      showCurrentSpeed = true;
  }
  if (e.keyCode == 83) {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }

  if(showCurrentSpeed && !window.location.href.includes("youtube.com")) {
      var wrapper = document.getElementById('showSpeedWrapper');
      if (wrapper) {
          wrapper.remove();
      }

      let bezelWrapper = document.createElement('div');
      bezelWrapper.id = "showSpeedWrapper";
      bezelWrapper.className = 'ytp-bezel-text-wrapper';

      // Create the inner div with class 'ytp-bezel-text'
      let bezelText = document.createElement('div');
      bezelText.className = 'ytp-bezel-text';
      bezelText.textContent = lastPlaybackRate+ 'x'; // Set the inner text

      // Append the inner div to the outer div
      bezelWrapper.appendChild(bezelText);

      video.parentElement.prepend(bezelWrapper);
      setTimeout(function(){bezelWrapper.remove();}, 1000)

  }
}
document.addEventListener("keyup", doc_keyUp, false);


GM_addStyle(`
.ytp-bezel-text-wrapper {
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 10%;
    z-index: 19;
}

.ytp-bezel-text {
    display: inline-block;
    padding: 10px 20px;
    font-size: 175%;
    background: rgba(0, 0, 0, .5);
    pointer-events: none;
    border-radius: 3px;
    color: white !important;
}

`);
