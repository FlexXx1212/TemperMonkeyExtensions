// ==UserScript==
// @name           Youtube - Anti Translate
// @namespace      Flex
// @version        1.0
// @description    Use untranslated titles if possible
// @author         FlexNiko
// @match          https://www.youtube.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require        https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant          GM_addStyle
// @grant          GM_setValue
// @grant          GM_getValue
// ==/UserScript==

var mutationIdx = 0;
let titleReplace = [];
const MUTATION_UPDATE_STEP = 2;
const FIRST_CHILD_DESC_ID = "ytantitranslate_desc_div";
const cache = new Map();

function makeHttpObject() {
  try {
    return new XMLHttpRequest();
  } catch (error) {}
  try {
    return new ActiveXObject("Msxml2.XMLHTTP");
  } catch (error) {}
  try {
    return new ActiveXObject("Microsoft.XMLHTTP");
  } catch (error) {}

  throw new Error("Could not create HTTP request object.");
}

function makeLinksClickable(html) {
  return html.replace(
    /(https?:\/\/[^\s]+)/g,
    "<a rel='nofollow' target='_blank' dir='auto' class='yt-simple-endpoint style-scope yt-formatted-string' href='$1'>$1</a>"
  );
}

function get(url, callback) {
  if (cache.has(url)) {
    callback(cache.get(url));
    return;
  }
  var request = makeHttpObject();
  request.open("GET", url, true);
  request.send(null);
  request.onreadystatechange = function () {
    if (request.readyState == 4) {
      cache.set(url, request);
      callback(request);
    }
  };
}

function trimYoutube(title) {
  return title.replace(/ - YouTube$/, "");
}

function setTitleNode(text, afterNode) {
  if (document.getElementById("yt-anti-translate-fake-node")) {
    const node = document.getElementById("yt-anti-translate-fake-node");
    node.textContent = text;
    return;
  }

  const node = document.createElement("span");
  node.className = "style-scope ytd-video-primary-info-renderer";
  node.id = "yt-anti-translate-fake-node";
  node.textContent = text;
  afterNode.after(node);
}

function untranslateCurrentVideo() {
  let translatedTitleElement = document.querySelector(
    "#title > h1 > yt-formatted-string"
  );

  if (!translatedTitleElement || !translatedTitleElement.textContent) {
    translatedTitleElement = document.querySelector(
      "h1 > yt-formatted-string:not(.cbCustomTitle)"
    );
  }

  // that means we cannot find youtube title, so there is nothing we can do
  if (!translatedTitleElement || !translatedTitleElement.textContent) {
    return;
  }

  get(
    "https://www.youtube.com/oembed?url=" + document.location.href,
    function (response) {
      if (response.status !== 200) {
        return;
      }

      const realTitle = JSON.parse(response.responseText).title;

      if (!realTitle || !translatedTitleElement) {
        // Do nothing if video is not loaded yet
        return;
      }

      console.log(
        "data",
        document.title,
        translatedTitleElement.textContent,
        realTitle
      );
      document.title = document.title.replace(
        translatedTitleElement.textContent,
        realTitle
      );

      if (realTitle === translatedTitleElement.textContent) {
        // Do not revert already original videos
        return;
      }

      // untranslate video by creating its copy
      translatedTitleElement.style.visibility = "hidden";
      translatedTitleElement.style.display = "none";

      console.log(`[YoutubeAntiTranslate] translated title to "${realTitle}"`);

      setTitleNode(realTitle, translatedTitleElement);
    }
  );
}

function untranslateOtherVideos() {
  function untranslateArray(otherVideos) {
    for (let i = 0; i < otherVideos.length; i++) {
      let video = otherVideos[i];

      // video was deleted
      if (!video) {
        return;
      }

      let videoThumbnail = video.querySelector("a#thumbnail");

      // false positive result detected
      if (!videoThumbnail) {
        continue;
      }

      let videoId = videoThumbnail.href;

      if (!video.untranslatedByExtension || video.untranslatedKey !== videoId) {
        // do not request same video multiply times
        let href = video.querySelector("a");
        video.untranslatedByExtension = true;
        video.untranslatedKey = videoId;
        get(
          "https://www.youtube.com/oembed?url=" + href.href,
          function (response) {
            if (response.status !== 200) {
              return;
            }

            const title = JSON.parse(response.responseText).title;
            const titleElement = video.querySelector(
              "#video-title:not(.cbCustomTitle)"
            );
            if (title !== titleElement.innerText) {
              console.log(
                `[YoutubeAntiTranslate] translated from "${titleElement.innerText}" to "${title}"`
              );
              if (titleElement) {
                video.querySelector(
                  "#video-title:not(.cbCustomTitle)"
                ).innerText = title;
                video.querySelector("#video-title:not(.cbCustomTitle)").title =
                  title;
                if (
                  video.querySelector("a#video-title-link:not(.cbCustomTitle)")
                ) {
                  // home page
                  video.querySelector(
                    "a#video-title-link:not(.cbCustomTitle)"
                  ).title = title;
                }
              }
            }
          }
        );
      }
    }
  }

  untranslateArray(document.querySelectorAll("ytd-video-renderer"));
  untranslateArray(document.querySelectorAll("ytd-rich-item-renderer"));
  untranslateArray(document.querySelectorAll("ytd-compact-video-renderer"));
  untranslateArray(document.querySelectorAll("ytd-grid-video-renderer"));
  untranslateArray(document.querySelectorAll("ytd-playlist-video-renderer"));
  untranslateArray(
    document.querySelectorAll("ytd-playlist-panel-video-renderer")
  );

}

function untranslate() {
  if (mutationIdx % MUTATION_UPDATE_STEP == 0) {
    untranslateCurrentVideo();
    untranslateOtherVideos();
  }
  mutationIdx++;
}

function run() {
  let target = document.body;
  let config = { childList: true, subtree: true };
  let observer = new MutationObserver(untranslate);
  observer.observe(target, config);
}

run();
