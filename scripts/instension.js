function OpenInNewTab() {
    alert('OpenInNewTab');
}

function DownloadPost() {
    alert('DownloadAll');
}

function DownloadCurrent() {
    alert('DownloadCurrent');
}

function AddContextMenuItem(title, callback) {
    chrome.contextMenus.create({
        "contexts": [
            "page",
            "image"
        ],
        "documentUrlPatterns": [
            "*://*.instagram.com/*"
        ],
        "title": title,
        "onclick": callback
      }
    );
}

AddContextMenuItem("Open in new tab", OpenInNewTab);
AddContextMenuItem("Download", DownloadCurrent);
AddContextMenuItem("Download whole post", DownloadPost);
