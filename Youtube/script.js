// ==UserScript==
// @name           Youtube
// @namespace      Flex
// @version        0.1
// @description    More functionality
// @author         FlexNiko
// @include        http://www.youtube.com/watch*
// @include        http://youtube.com/watch*
// @include        https://www.youtube.com/watch*
// @include        https://youtube.com/watch*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require        https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant          GM_addStyle
// ==/UserScript==

waitForKeyElements("#end", createMenu);

function createMenu() {
    var menuTop = document.getElementById("end");
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

    btnHideEndCards.addEventListener("click", hideEndcards);
    btnHideEndCards.innerText = "Hide EndCards";
    btnHideEndCards.classList.add("customButton");
    btnHideEndCards.classList.add("gray");

    btnShowThumbnail.addEventListener("click", showThumbnail);
    btnShowThumbnail.innerText = "Show Thumb";
    btnShowThumbnail.classList.add("customButton");
    btnShowThumbnail.classList.add("gray");

    popupMenu.appendChild(btnHideEndCards);
    popupMenu.appendChild(btnShowThumbnail);
    btnMenu.appendChild(popupMenu);
    menuTop.insertBefore(btnMenu, menuTop.firstChild);
}

/*jQuery(function() {
  var node = document.createElement("a");
  var menuBar = document.getElementsByClassName("title style-scope ytd-video-primary-info-renderer");
  node.href = "https://img.youtube.com/vi/" + location.href.substr(32) + "/maxresdefault.jpg";
  node.innerHTML = "Thumb";
  node.classList.add("customButtons");
  menuBar[0].appendChild(node);
  var node2 = document.createElement("a");
  node2.classList.add("customButtons");
  node2.href = "javascript:hideEndcards()";
  node2.innerHTML = "Cards";
  menuBar[0].appendChild(node2);
});*/

function openMenu() {
    console.log("Open Menu");
    var popup = document.getElementById("popupMenu");
    popup.classList.toggle("show");
}

function hideEndcards() {
    var cards = document.getElementsByClassName("ytp-ce-element");
    for (var i = 0; i < cards.length; i++) {
        cards[i].style.visibility = "hidden";
    }
}

function showThumbnail() {
    window.location.href = "https://img.youtube.com/vi/" + location.href.substr(32) + "/maxresdefault.jpg";
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
}
.red  { background-color: #f44336;}
.blue { background-color: #008CBA;}
.green{ background-color: #4CAF50;}
.gray { background-color: #e7e7e7; color: black;}

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