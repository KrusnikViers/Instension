// Register context menu items.
function AddContextMenuItem(title, actionType) {
  chrome.contextMenus.create({
    'contexts': ['page', 'image', 'link'],
    'documentUrlPatterns': ['*://*.instagram.com/*'],
    'title': title,
    'onclick': function(_, tab) {
      chrome.tabs.sendMessage(tab.id, {'actionType': actionType})
    }
  });
}

AddContextMenuItem('Open in new tab', 'content_open');
AddContextMenuItem('Download', 'content_download');

// Add listener for extension messages. Content scripts are not allowed to open
// tabs or download files, so command to do so should be handled here.
chrome.extension.onMessage.addListener(function(message, _, sendResponse) {
  switch (message.actionType) {
    case 'background_open':
      chrome.tabs.create({url: message.contentUrl});
      break;

    case 'background_download':
      chrome.downloads.download({url: message.contentUrl});
      break;
  }
  sendResponse();
});
