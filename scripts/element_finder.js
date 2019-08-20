// Retrieve content link (direct link to the video, or direct link to the
// biggest image available) from the nodes tree.
function getNodeContent(node) {
  switch (node.nodeName) {
    case 'IMG':
      let srcset = node.getAttribute('srcset').split(/[\s,]/);
      if (srcset.length < 2) return null;
      return srcset[srcset.length - 2];
    case 'VIDEO':
      return node.getAttribute('src');
    case 'A':
    case 'ARTICLE':
    case 'DIV':
    case 'LI':
      for (let i = 0; i < node.childNodes.length; ++i) {
        let childContent = getNodeContent(node.childNodes[i]);
        if (childContent) return childContent;
      }
  }
}

// Finds top element of the post. For paged post this is <li> tag of the
// corresponding page; for post with single photo or video - <article>.
function getTopParentElement(node) {
  let parentNode = node;
  while (parentNode.parentNode) {
    switch (parentNode.nodeName) {
      case 'A':
      case 'DIV':
        parentNode = parentNode.parentNode;
        continue;
      case 'ARTICLE':
      case 'LI':
        return parentNode;
      default:
        return null;
    }
  }
}

function getPostContent(clickedElement) {
  let parentNode = getTopParentElement(clickedElement);
  if (parentNode) {
    let currentContent = getNodeContent(parentNode);
    if (currentContent) return currentContent;
  }
}
