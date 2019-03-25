// ==UserScript==
// @name           Youtube
// @namespace      Flex
// @version        0.1
// @description    More functionality
// @author         FlexNiko
// @include        http://www.youtube.com/*
// @include        http://youtube.com/*
// @include        https://www.youtube.com/*
// @include        https://youtube.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require        https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant          GM_addStyle
// @grant          GM_setValue
// @grant          GM_getValue
// ==/UserScript==

waitForKeyElements("#end", createMenu);
waitForKeyElements("#yt-masthead-user", createMenu);

function createMenu() {
    var menuTop = document.getElementById("end");

    if(menuTop === null) {
      menuTop = document.getElementById("yt-masthead-user");
    }
    var btnMenu = document.createElement("button");
    var popupMenu = document.createElement("span");
    var btnHideEndCards = document.createElement("button");
    var btnShowThumbnail = document.createElement("button");

    btnMenu.classList.add("customButton");
    btnMenu.classList.add("blue");
    btnMenu.classList.add("popup");
    btnMenu.addEventListener("click", openMenu);
    btnMenu.innerText = "MENU";

    popupMenu.classList.add("popuptext");
    popupMenu.id = "popupMenu";

    btnHideEndCards.addEventListener("click", toggleEndcards);
    btnHideEndCards.innerText = "Hide EndCards";
    btnHideEndCards.classList.add("customButton");
    btnHideEndCards.classList.add("gray");
    btnHideEndCards.id = "btnHideEndCards";

    btnShowThumbnail.addEventListener("click", showThumbnail);
    btnShowThumbnail.innerText = "Show Thumb";
    btnShowThumbnail.classList.add("customButton");
    btnShowThumbnail.classList.add("gray");
    btnShowThumbnail.id = "btnShowThumbnail";

    popupMenu.appendChild(btnHideEndCards);
    popupMenu.appendChild(btnShowThumbnail);
    btnMenu.appendChild(popupMenu);
    menuTop.insertBefore(btnMenu, menuTop.firstChild);
}

function openMenu() {
    var popup = document.getElementById("popupMenu");
    //disable buttons if not on watch page
    var isVideo = location.href.includes("watch");
    var btnHideEndCards = document.getElementById("btnHideEndCards");
    var btnShowThumbnail = document.getElementById("btnShowThumbnail");
    if(!isVideo) {
      btnHideEndCards.disabled = true;
      btnHideEndCards.classList.add("disabled-btn")
      btnShowThumbnail.disabled = true;
      btnShowThumbnail.classList.add("disabled-btn")
    } else {
      btnHideEndCards.disabled = false;
      btnHideEndCards.classList.remove("disabled-btn")
      btnShowThumbnail.disabled = false;
      btnShowThumbnail.classList.remove("disabled-btn")
    }
    popup.classList.toggle("show");
}

function toggleEndcards() {
    var cards = document.getElementsByClassName("ytp-ce-element");
    for (var i = 0; i < cards.length; i++) {
        cards[i].style.visibility = cards[i].style.visibility == "hidden" ? "visible" : "hidden";
    }
}

function showThumbnail() {
    var url = "https://img.youtube.com/vi/" + location.href.substr(32,11) + "/maxresdefault.jpg";
    window.open(url, '_blank');
}

window.addEventListener('visibilitychange', () => {
    var video = document.getElementsByTagName("video")[0];
    if (video) {
        switch (document.visibilityState) {
            case 'hidden':
                video.pause();
                break;
            case 'visible':
                video.play();
                break;
        }
    }
});

// fix: script wouldnt load when pressing BACK
window.onunload = function() {};

GM_addStyle(`
.customButton {
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
}
.red  { background-color: #f44336;}
.blue { background-color: #008CBA;}
.green{ background-color: #4CAF50;}
.gray { background-color: #e7e7e7; color: black;}
.disabled-btn { background-color: #d6d6d6; color: #f8f8f8;}

.popup {
  position: relative;
  display: inline-block;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* The actual popup */
.popup .popuptext {
  visibility: hidden;
  width: 160px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 8px 0;
  position: absolute;
  z-index: 1;
  top: 125%;
  left: 50%;
  margin-left: -80px;
}

/* Popup arrow */
.popup .popuptext::after {
  content: "";
  position: absolute;
  bottom: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent #555 transparent;
}

/* Toggle this class - hide and show the popup */
.popup .show {
  visibility: visible;
}



`);