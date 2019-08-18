// Record last page element, for which context menu was called.
var lastContextedElement = null;

document.addEventListener('contextmenu', function(event) {
  lastContextedElement = event.target;
}, true);

// Listen to the events from context menu handler.
// Chrome does not allow opening new tab or downloading from content script, so
// we're sending message with this task back to the background script.
chrome.extension.onMessage.addListener(function(message, _, sendResponse) {
  let content = null;
  if (lastContextedElement)
    content = getCurrentPostElements(lastContextedElement);
  if (content) {
    switch (message.actionType) {
      case 'content_open':
        chrome.runtime.sendMessage({
          'actionType': 'background_open',
          'contentUrl': content.currentContent
        });
        break;
      case 'content_download':
        chrome.runtime.sendMessage({
          'actionType': 'background_download',
          'contentUrls': [content.currentContent]
        });
        break;
      case 'content_download_all':
        chrome.runtime.sendMessage({
          'actionType': 'background_download',
          'contentUrls': content.allContents
        });
        break;
    }
  }
  sendResponse();
});
