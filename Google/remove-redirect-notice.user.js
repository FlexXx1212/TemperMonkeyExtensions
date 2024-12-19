// ==UserScript==
// @name           google weiterleitungshinweis umgehen
// @namespace      Flex
// @version        1.0
// @description    google weiterleitungshinweis umgehen
// @author         FlexNiko
// @match          https://www.google.com/url?q=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// ==/UserScript==

function sekundenAusString(str) {
	const [minuten, sekunden] = str.split(':');
	return parseInt(minuten) * 60 + parseInt(sekunden);
  }
  
	$( document ).ready(function() {
		setInterval(function () {
			var link = document.getElementsByTagName("a")[0].href;
			window.location.href = link;
		}, 500);
	});