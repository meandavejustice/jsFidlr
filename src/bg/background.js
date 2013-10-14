chrome.browserAction.onClicked.addListener(function(tab) {
  if (tab.url.indexOf("chrome-devtools://") == -1) {
    chrome.tabs.executeScript(tab.id, {file: "js/jszip/jszip.min.js"});
    chrome.tabs.executeScript(tab.id, {file: "src/inject/inject.js"});
  }
});


