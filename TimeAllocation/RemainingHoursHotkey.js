// ==UserScript==
// @name           TimeAllocation - Remaining Hours
// @namespace      Flex
// @version        1.0
// @description    Press R on cell to input remaining hours
// @author         FlexNiko
// @include        https://webapps.ct.siemens.de/timeallocation/allocation.xhtml
// @include        http://webapps.ct.siemens.de/timeallocation/allocation.xhtml
// @include        https://webapps.ct.siemens.de/timeallocation/*
// @include        http://webapps.ct.siemens.de/timeallocation/*
// @grant          GM_addStyle
// @grant          GM_setValue
// @grant          GM_getValue
// ==/UserScript==

function keyUpEventListener(e) {
  if (e.code === "KeyR") {
    if (e.target.classList.contains("treeTableInText")) {
      var id = e.target.id;
      var columnIndex = id.split(":")[6];
      var totals = document.getElementsByClassName("dayCellTotalClass");
      var selectedTotal = totals[columnIndex];
      var calculatedTotal = parseFloat(selectedTotal.textContent);
      var remainingHours = 8 - calculatedTotal;
      e.target.value = remainingHours;
    }
  }
}

document.addEventListener("keyUp", keyUpEventListener);