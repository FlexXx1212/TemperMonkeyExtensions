// ==UserScript==
// @name           SAP - Hour Calc
// @namespace      Flex
// @version        1.2
// @description    Adds a Display of Current Daily hours, and hour diff
// @author         FlexNiko
// @include        https://hr-selfservice.intra.men.de:44309/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require        https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant          GM_addStyle
// @grant          GM_setValue
// @grant          GM_getValue
// ==/UserScript==

waitForKeyElements('[id^="__title"][id*="-inner"]:contains("Zeitereignisse")', createDisplay);

var currentSeconds = 0;
const dailySeconds = 8 * 60 * 60;
const pauseThreshold = 6 * 60 * 60;
const pauseSeconds = 30 * 60;
var subtractPause = true;

var currentHoursElement, remainingHoursElement, pauseBookedElement;

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
  var toolbar = $("[id^=__toolbar")[0];
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
    if(!inputSeconds) inputSeconds = 0;
    return new Date(inputSeconds * 1000).toISOString().substr(11, 8);
}


// fix: script wouldnt load when pressing BACK
window.onunload = function() {};

GM_addStyle(`
 .marge {
    margin-left: 100px;
 }

`);
