// ==UserScript==
// @name           Youtube Watch Later Buttons
// @namespace      Flex
// @version        0.2
// @description    Add buttons to playlist to easily remove
// @author         FlexNiko
// @match          https://www.youtube.com/*
// @match          http://www.youtube.com/*
// @match          https://youtube.com/*
// @match          http://youtube.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require        https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant          GM_addStyle
// @grant          GM_setValue
// @grant          GM_getValue
// ==/UserScript==

var added = false;
const myInterval = setInterval(addButtons,1000);

function addButtons() {
    if(added === true) {
        clearInterval(myInterval);
        return;
    }
    if(!window.location.href.includes('playlist?list=WL')) {return}
    console.log("adding buttons");
    var videoCards = document.getElementsByTagName("ytd-playlist-video-renderer");
    var btnRemove = document.createElement("button");
    btnRemove.classList.add("customRemoveButton");
    btnRemove.innerText = "REMOVE";
    for(var i = 0; i < videoCards.length; i++) {
        btnRemove.setAttribute("removeID",i);
        //btnRemove.addEventListener("click", removeVideo);

        var currentButton = btnRemove.cloneNode(true);
        currentButton.addEventListener("click", removeVideo);
        videoCards[i].appendChild(currentButton);
    }
    added = true;
}

function removeVideo(event) {
     event = event || window.event;
    var removeID = event.srcElement.attributes.removeid.value;
    var videoCards = document.getElementsByTagName("ytd-playlist-video-renderer");
    videoCards[removeID].children[2].children[0].children[2].click();
    setTimeout(clickRemove,100);
}

function clickRemove() {
    document.getElementsByTagName("ytd-menu-service-item-renderer")[2].click();
    setTimeout(recalculateRemoveIDs, 200);
}

function recalculateRemoveIDs() {
    var videoCards = document.getElementsByTagName("ytd-playlist-video-renderer");
    for(var i = 0; i < videoCards.length; i++) {
        videoCards[i].lastChild.setAttribute("removeID",i);
    }
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