// ==UserScript==
// @name           HotkeylessAHK
// @namespace      Flex
// @version        1.0
// @description    Using Streamdeck and Express server to control chrome without beeing active
// @author         FlexNiko
// @include        *
// @grant          GM_addStyle
// @grant          GM_setValue
// @grant          GM_getValue
// ==/UserScript==


(function() {
    'use strict';

    var subscribing = false;

    // Function to subscribe to the server and handle incoming messages
    function subscribeToServer() {
        console.log('Subscribing to the server...');

        // Use fetch API to subscribe to the server
        fetch('http://localhost:42800/subscribe', {
            method: 'GET'
        })
        .then(response => {
            if (response.ok) {
                return response.text();  // Read the response as text
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .then(command => {
            console.log('Received command from server:', command);
            // Handle the incoming command (command variable holds the response)

            if(subscribing) {
                videoAction(command);
            }

            // After receiving a command, resubscribe to keep listening
            subscribeToServer();
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
    }

    function handleVisibilityChange() {
        if (document.visibilityState === 'visible') {
            // Fetch subscribe if tab is active
            subscribing = true;
        } else {
            // Call /close if tab is not active
            subscribing = false;
        }
    }

	function getRate() {
		if(localStorage.getItem("lastPlaybackRate") != null) {
			return JSON.parse(localStorage.getItem("lastPlaybackRate"));
		} else {
			return -1;
		}
	}

	function setRate(rate) {
		localStorage.setItem("lastPlaybackRate", JSON.stringify(rate));
	}

    function videoAction(e) {
        console.log(getRate());
        var videoElements = document.getElementsByTagName("video");
        var video;
        var longestDuration = 0;
        for (const curVideo of videoElements) {
            if(curVideo.duration > longestDuration) {
                longestDuration = curVideo.duration;
                video = curVideo;
            }
        }
        if (e == "Chrome_Back") {
            video.currentTime -= 5;
        }
        if (e == "Chrome_Skip") {
            video.currentTime += 5;
        }

        if (e == "Chrome_Faster" || e == "Chrome_Slower") {
            if(getRate() == -1) {
                setRate(video.playbackRate);
            }
            if (e == "Chrome_Faster") {
                video.playbackRate = getRate() + 0.25;
            }
            if (e == "Chrome_Slower") {
                video.playbackRate = getRate() - 0.25;
            }
            var b = document.getElementsByClassName("ytp-bezel-text");
            if(b != null && b.length > 0) {
                b[0].innerText = video.playbackRate + "x";
            }
            setRate(video.playbackRate);
            var wrapper = document.getElementById('showSpeedWrapper');
            if (wrapper) {
                wrapper.remove();
            }

            let bezelWrapper = document.createElement('div');
            bezelWrapper.id = "showSpeedWrapper";
            bezelWrapper.className = 'ytp-bezel-text-wrapper';

            // Create the inner div with class 'ytp-bezel-text'
            let bezelText = document.createElement('div');
            bezelText.className = 'ytp-bezel-text';
            bezelText.textContent = getRate() + 'x'; // Set the inner text

            // Append the inner div to the outer div
            bezelWrapper.appendChild(bezelText);

            video.parentElement.prepend(bezelWrapper);
            setTimeout(function(){bezelWrapper.remove();}, 1000)
        }
    }

    // Initial check when the script first runs
    handleVisibilityChange();
    subscribeToServer();

    // Add an event listener for visibility changes
    document.addEventListener('visibilitychange', handleVisibilityChange);
})();
