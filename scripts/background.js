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
AddContextMenuItem('Download whole post', 'content_download_all');

chrome.extension.onMessage.addListener(function(message, _, sendResponce) {
  switch (message.actionType) {
    case 'background_open':
      chrome.tabs.create({url: message.contentUrl});
      break;
    case 'background_download':
      for (let i = 0; i < message.contentUrls.length; ++i)
        chrome.downloads.download({url: message.contentUrls[i]});
      break;
  }
  sendResponce();
});
