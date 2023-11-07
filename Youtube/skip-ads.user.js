// ==UserScript==
// @name           Youtube Skip ads
// @namespace      Flex
// @version        1.0
// @description    Skip YT ads automatically
// @author         FlexNiko
// @match          https://www.youtube.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// ==/UserScript==


$( document ).ready(function() {
    setInterval(function () {
        var ad = $("[id^=player-overlay]")[0];
        if(ad != null){
            var video = document.getElementsByTagName("video")[0];
            video.pause();
            video.currentTime = video.duration - 0.1;
            document.getElementsByClassName("ytp-ad-skip-button ytp-button")[0].click();
            video.play();
        }
    }, 100);
});