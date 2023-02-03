// ==UserScript==
// @name           OP Tube Clean
// @namespace      Flex
// @version        0.1
// @description    Clean OP Tube Page
// @author         FlexNiko
// @include        http://www.onepiece-tube.com/*
// @include        http://onepiece-tube.com/*
// @include        https://www.onepiece-tube.com/*
// @include        https://onepiece-tube.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

var dict = {};

function waitForElemToExist(elemSelector, callBack, waitTime = 1000) {
  if (dict[elemSelector] !== undefined) {
    console.log("wait..." + elemSelector + " " + dict[elemSelector]);
    if (dict[elemSelector] >= 60) {
      return;
    }
    dict[elemSelector] += 1;
  } else {
    dict[elemSelector] = 0;
  }
  if (document.querySelector(elemSelector) === null) {
    setTimeout(waitForElemToExist, 100, elemSelector, callBack, waitTime);
  } else {
    setTimeout(callBack, waitTime, elemSelector);
  }
}

function removeElement(elemSelector) {
  document.querySelectorAll(elemSelector).forEach(function(item) {
    item.style.display = "none";
  });
}

function removeBG(elemSelector) {
  document.querySelectorAll(elemSelector).forEach(function(item) {
    item.style.background = "none";
  });
}

jQuery(function() {
  var toDelete = [
    "#leftcol",
    "#contenttb > table > tbody > tr:nth-child(1) > td",
    "#contenttb > table > tbody > tr:nth-child(3) > td > div > table:nth-child(6) > tbody > tr > td > div > div > div.adb",
    "#contenttb > table > tbody > tr:nth-child(3) > td > div > table:nth-child(6) > tbody > tr > td > div > table:nth-child(4)",
    "#contenttb > table > tbody > tr:nth-child(3) > td > div > span.extravote-count",
    "#contenttb > table > tbody > tr:nth-child(3) > td > div > div",
    "#topmenu",
    "#topcontainer",
    "#contenttb > table > tbody > tr:nth-child(3) > td > div > table:nth-child(6) > tbody > tr > td > table",
    "#contenttb > table > tbody > tr:nth-child(2)",
    "#contenttb > table > tbody > tr:nth-child(2) > td > div > table:nth-child(6) > tbody > tr > td > br",
    "#contenttb > table > tbody > tr:nth-child(3) > td > div > table:nth-child(6) > tbody > tr > td > br"
  ];

  toDelete.forEach(function(item) {
    waitForElemToExist(item, removeElement, 1000);
  });
  waitForElemToExist("#maincontainer", removeBG, 1000);
  //window.scrollTo(0, 530);
});

// fix: script wouldnt load when pressing BACK
window.onunload = function() {};
