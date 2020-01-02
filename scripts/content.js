// Channel for the message exchange between background and content scripts.
var port = chrome.runtime.connect({name: 'base_port'});

// Listener to the right click menu event, that tries to find an Instagram
// content (image or video) on the clicked element, and enables context menu
// items if the content was found.
document.addEventListener('mousedown', function(event) {
  if (event.button != 2) return false;
  let instagramContent = getPostContent(event.target);
  port.postMessage({
    'event': 'content_update',
    'url': instagramContent
  });
}, true);
