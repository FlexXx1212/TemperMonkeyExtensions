// ==UserScript==
// @name         Twitch autocollect
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Auto collects twitch channel points
// @author       You
// @match        https://www.twitch.tv/*
// @match        http://www.twitch.tv/*
// @match        https://twitch.tv/*
// @match        http://twitch.tv/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitch.tv
// @grant        none
// ==/UserScript==

setInterval(function () {
    var c = document.querySelectorAll("[class^='ScCoreButtonLabel']");
    if(c.length > 6) {
        for(var i = 0; i < c.length; i++) {
            if(c[i].parentElement.nextElementSibling != null) {
                if(c[i].parentElement.nextElementSibling.innerHTML === 'Klicken und Bonus abholen!') {
                    c[i].click();
                    console.log("clicked");
                }
            }
        }
    }
}, 1000);