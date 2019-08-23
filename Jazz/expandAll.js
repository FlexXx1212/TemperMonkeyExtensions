// ==UserScript==
// @name           Jazz expand all
// @namespace      Flex
// @version        0.2
// @updateURL      https://raw.githubusercontent.com/FlexXx1212/TemperMonkeyExtensions/master/Jazz/expandAll.js
// @downloadURL    https://raw.githubusercontent.com/FlexXx1212/TemperMonkeyExtensions/master/Jazz/expandAll.js
// @description    expand all features
// @author         FlexNiko
// @include        https://bt-clmserver01.hqs.sbt.siemens.com*
// @include        http://bt-clmserver01.hqs.sbt.siemens.com*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

function delayedCheck() {
  if (
    document.querySelector(
      "#com_ibm_team_rtc_foundation_web_ui_widgets_FlatButton_8 > div > a"
    ) === null
  ) {
    console.log("nicht da");
    setTimeout(delayedCheck, 100);
  } else {
    console.log("da");
    setTimeout(clickExpand, 800);
  }
}

function clickExpand() {
  document
    .querySelector(
      "#com_ibm_team_rtc_foundation_web_ui_widgets_FlatButton_8 > div > a"
    )
    .click();
}

jQuery(function() {
  delayedCheck();
});

// fix: script wouldnt load when pressing BACK
window.onunload = function() {};
