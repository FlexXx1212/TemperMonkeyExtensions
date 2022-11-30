// ==UserScript==
// @name           SAP - Overtime
// @namespace      Flex
// @version        1.0
// @description    Adds an overtime display
// @author         FlexNiko
// @include        https://hr-selfservice.intra.men.de:44309/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require        https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant          GM_addStyle
// @grant          GM_setValue
// @grant          GM_getValue
// ==/UserScript==


if(window.location.href.includes("#TimeEntry-displayTimestatement")) {
    waitForKeyElements("#__toolbar0", overtimeDisplay);
}

function handleNegativeEntries(){
  var foundEntries = $(".sapMObjectNumberStatusError");
  foundEntries.each(function(index) {
      this.parentElement.nextElementSibling.firstChild.classList.add("sapMObjectNumberStatusError");
      var percentage = parseFloat(this.firstChild.innerText.replace("-",""));
      var totalHours = parseFloat(this.parentElement.previousElementSibling.previousElementSibling.firstChild.firstChild.innerText);
      this.parentElement.nextElementSibling.firstChild.firstChild.innerText = "-" + (totalHours * percentage / 100).toFixed(2);
   });
}

function handleTotals() {
  var rows = $(".sapMListTblRow");
  var lastRow = rows.splice(-1)[0];
  var newRow = lastRow.cloneNode(true);
  newRow.id = "totalHours";
  newRow.setAttribute("data-sap-ui","totalhours");
  lastRow.parentElement.appendChild(newRow);

  for(var i = 0; i < newRow.children.length; i++) {
    if(i != 5 && i != 0 && i != 9) {
      newRow.children[i].firstChild.remove();
    }
  }

  var overtime = $("div[id*='cellOverTime']");
  var overtimeTotal = 0.00;
  overtime.each(function(index) {
    if(index != overtime.length-1) {
      overtimeTotal += parseFloat(this.firstChild.innerText);
    } else {
      this.firstChild.innerText = overtimeTotal.toFixed(2);
      this.firstChild.style.fontWeight = "bolder";
      this.firstChild.style.fontSize = "18px";
    }
  });
}

function overtimeDisplay() {
    handleNegativeEntries();
    handleTotals();
}

// fix: script wouldnt load when pressing BACK
window.onunload = function() {};
