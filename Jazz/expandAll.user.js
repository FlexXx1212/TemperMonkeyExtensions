// ==UserScript==
// @name           Jazz expand all
// @namespace      Flex
// @version        1.0
// @description    expand all features
// @author         FlexNiko
// @include        https://bt-clmserver01.hqs.sbt.siemens.com*
// @include        http://bt-clmserver01.hqs.sbt.siemens.com*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

function waitForElemToExist(elemSelector, handle, waitTime = 1000) {
  if (document.querySelector(elemSelector) === null) {
    setTimeout(waitForElemToExist, 100);
  } else {
    setTimeout(handle, waitTime, elemSelector);
  }
}

function clickExpand(elemSelector) {
  document.querySelector(elemSelector).click();
}

jQuery(function() {
  waitForElemToExist(
    "#com_ibm_team_rtc_foundation_web_ui_widgets_FlatButton_8 > div > a",
    clickExpand
  );
});

// fix: script wouldnt load when pressing BACK
window.onunload = function() {};
