// ==UserScript==
// @name           Youtube Watch Later Buttons
// @namespace      Flex
// @version        1.2
// @description    Add buttons to playlist to easily remove
// @author         FlexNiko
// @include        https://*youtube.com/*
// @require        https://code.jquery.com/jquery-3.7.1.min.js
// @require        https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant          GM_addStyle
// @grant          GM_setValue
// @grant          GM_getValue
// ==/UserScript==


waitForKeyElements("ytd-playlist-video-renderer", addButtons);
var added = false;
function addButtons(elem) {
    if(!window.location.href.includes('playlist?list=WL')) {return}
    var videoCards = document.getElementsByTagName("ytd-playlist-video-renderer");
    var btnRemove = document.createElement("button");
    btnRemove.classList.add("customRemoveButton");
    btnRemove.innerText = "REMOVE";
    btnRemove.addEventListener("click", removeVideo);
    elem[0].appendChild(btnRemove);
}

function removeVideo(event) {
    event = event || window.event;
    event.currentTarget.parentElement.children[2].children[0].children[2].click();
    setTimeout(clickRemove,100);
}

function clickRemove() {
    document.getElementsByTagName("ytd-menu-service-item-renderer")[2].click();
}

// fix: script wouldnt load when pressing BACK
window.onunload = function() {};


GM_addStyle(`
.customRemoveButton {
  border: none;
  color: white;
  padding: 7px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  outline:none;
  cursor: pointer;
  margin: 5px;
  width: 150px;
  background-color: #f44336;
}

`);
