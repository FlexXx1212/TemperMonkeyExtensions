// ==UserScript==
// @name           SAP - Hour Calc
// @namespace      Flex
// @version        1.0
// @description    Adds a Display of Current Daily hours, and hour diff
// @author         FlexNiko
// @include        https://hr-selfservice.intra.men.de:44309/sap/bc/ui5_ui5/ui2/ushell/shells/abap/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require        https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant          GM_addStyle
// @grant          GM_setValue
// @grant          GM_getValue
// ==/UserScript==
if(window.location.href.includes("#TimeEntry-change")) {
    waitForKeyElements("#__toolbar0", createDisplay);
}

if(window.location.href.includes("#TimeEntry-displayTimestatement")) {
    waitForKeyElements("#__toolbar0", overtimeDisplay);
}
var currentSeconds = 0;
const dailySeconds = 8 * 60 * 60;
const pauseThreshold = 6 * 60 * 60;
const pauseSeconds = 30 * 60;
var subtractPause = true;

var currentHoursElement, remainingHoursElement, pauseBookedElement;

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


function calcHours() {
   var timeElements = $(".sapMObjectIdentifierText");
   var timeStarted = convertToSeconds(timeElements[0].innerText);
   var currentlyWorking = true;
   var lastSeconds = -1;
   currentSeconds = 0;
   timeElements.each(function(index) {
       currentlyWorking = !currentlyWorking
       var currentTime = convertToSeconds($(this).text());
       if(index > 0 && currentlyWorking) {
           var timeDiff = currentTime - lastSeconds;
           currentSeconds += timeDiff;
       }
       lastSeconds = currentTime;
   });
   var now = convertToSeconds(new Date().toTimeString().substr(0,8));
   if(!currentlyWorking) {
       var timeDiff = now - lastSeconds;
       currentSeconds += timeDiff;
   }
}

function displayHours() {
    var displayTime = convertToTimeString(currentSeconds);
    var displayTimeRemaining = convertToTimeString(dailySeconds - currentSeconds);

    if(subtractPause && currentSeconds > pauseThreshold ) {
        displayTime = convertToTimeString(currentSeconds - pauseSeconds) + " (-30 min)";
        displayTimeRemaining = convertToTimeString(dailySeconds + pauseSeconds - currentSeconds) + " (+30 min)";
    }
    currentHoursElement.innerText = "Hours done: " + displayTime;
    remainingHoursElement.innerText = "Hours left: " + displayTimeRemaining;
}

function createDisplay() {
  var toolbar = $("#__toolbar0")[0];
  var container = document.createElement("div");
  currentHoursElement = document.createElement("span");
  remainingHoursElement = document.createElement("span");
  pauseBookedElement = document.createElement("input");
  var pauseBookedLabel = document.createElement("label");

  container.classList.add("float-right");
  currentHoursElement.classList.add("marge");
  remainingHoursElement.classList.add("marge");
  pauseBookedElement.classList.add("marge");
  pauseBookedElement.type = "checkbox";
  pauseBookedElement.addEventListener('change', function() {
      subtractPause = !this.checked;
      displayHours();
  });
  pauseBookedLabel.innerText = "Booked Pause";

  toolbar.appendChild(container);
  container.appendChild(pauseBookedElement);
  container.appendChild(pauseBookedLabel);
  container.appendChild(currentHoursElement);
  container.appendChild(remainingHoursElement);

  setInterval(function() {
      calcHours();
      displayHours();
  },1000);
}

function convertToSeconds(inputString){
    var splitted = inputString.split(":");
    return (+splitted[0] * 60 * 60) + (+splitted[1] * 60) + (+splitted[2]);
}

function convertToTimeString(inputSeconds) {
    return new Date(inputSeconds * 1000).toISOString().substr(11, 8);
}


// fix: script wouldnt load when pressing BACK
window.onunload = function() {};

GM_addStyle(`
 .marge {
    margin-left: 100px;
 }

`);
