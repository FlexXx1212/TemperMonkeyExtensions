// ==UserScript==
// @name           Amazon Freeve Skip ads
// @namespace      Flex
// @version        1.0
// @description    Skip Amazon Freeve ads automatically
// @author         FlexNiko
// @match          https://www.amazon.de/7-vs-Wild-Kanada/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// ==/UserScript==

function extractNumberFromString(inputString) {
    const regex = /\d+/;
    const match = inputString.match(regex);
    if (match) {
      const number = parseInt(match[0], 10);
      return number;
    } else {
      return null;
    }
  }

  $( document ).ready(function() {
      setInterval(function () {
          var videoElements = document.getElementsByTagName("video");
          var video;
          var longestDuration = 0;
          for (const curVideo of videoElements) {
              if(curVideo.duration > longestDuration) {
                  longestDuration = curVideo.duration;
                  video = curVideo;
              }
          }
          var ad = document.getElementsByClassName("atvwebplayersdk-adtimeindicator-text");
          if(!video.paused && ad.length > 0 && video.currentTime > 1){
              video.currentTime += extractNumberFromString(ad[0].innerText);
          }
      }, 1000);
  });