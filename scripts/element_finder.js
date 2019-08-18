function getNodeContent(node) {
  switch (node.nodeName) {
    case 'IMG':
      let srcset = node.getAttribute('srcset').split(/[\s,]/);
      if (srcset.length < 2) return null;
      return srcset[srcset.length - 2];
    case 'VIDEO':
      return node.getAttribute('src');
    case 'DIV':
    case 'LI':
    case 'A':
    case 'ARTICLE':
    case 'UL':
      for (let i = 0; i < node.childNodes.length; ++i) {
        let child = node.childNodes[i];
        let childContent = getNodeContent(child);
        if (childContent) return childContent;
      }
  }
}

function getTopParentElement(node) {
  let parentNode = node;
  while (parentNode.parentNode) {
    switch (parentNode.nodeName) {
      case 'DIV':
      case 'A':
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

function getCurrentPostElements(clickedElement) {
  // Right now structure of Instagram post in web is this one:
  // article => *div => [ul => li => ] => *div

  // Rising to the first |li| or |article| - whatever hit first.
  let parentNode = getTopParentElement(clickedElement);

  // If |li| was met, than we are in a multislide post.
  let isMultislide = (parentNode.nodeName == 'LI');

  let currentContent = getNodeContent(parentNode);
  if (!currentContent) return null;

  let allContents = [];
  if (isMultislide) {
    parentNode = parentNode.parentNode;
    for (let i = 0; i < parentNode.childNodes.length; ++i) {
      let child = parentNode.childNodes[i];
      if (child.nodeName == 'LI') allContents.push(getNodeContent(child));
    }
  } else {
    allContents.push(currentContent);
  }

  return {
    'isMultislide': isMultislide, 'currentContent': currentContent,
        'allContents': allContents
  }
}
