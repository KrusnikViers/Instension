function _RegisterMenuItem(title) {
  // clang-format off
  return chrome.contextMenus.create({
    'contexts': ['page', 'image', 'link'],
    'documentUrlPatterns': ['*://*.instagram.com/*'],
    'title': title
  });
  // clang-format on
}

// Change this to add new actions in the context menu.
var contextMenuItems = {
  'open_tab': _RegisterMenuItem('Open in new tab'),
  'download': _RegisterMenuItem('Download')
};

// Add listener for extension messages. Content scripts are not allowed to
// open tabs or download files, so command to do so should be handled here.
chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == 'base_port');
  port.onMessage.addListener(function(message) {
    console.assert(message.event == 'content_update');
    let contentExists = (message.url != null)
    chrome.contextMenus.update(contextMenuItems['open_tab'], {
      enabled: contentExists,
      onclick: function(_, _) {
        chrome.tabs.create({url: message.url});
      }
    });
    chrome.contextMenus.update(contextMenuItems['download'], {
      enabled: contentExists,
      onclick: function(_, _) {
        chrome.downloads.download({url: message.url});
      }
    });
  });
})
