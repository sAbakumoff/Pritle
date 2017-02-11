/*
Task: given a random HTML page.
Return an array containing an image url and image title.
Image title with elements index number must be a key to an url
so an element could be reached directly.
Propose any live URL to solve the problem.
*/

function normalizeUrl(url){
  if(!url)
    return 'n\\a';
  if(url.indexOf('http://') === 0 || url.indexOf('https://') === 0)
    return url;
  return window.location.host + url;
}

function getImages(){
  var imgElements = document && document.getElementsByTagName('img');
  if(imgElements && imgElements.length){
    return Array.prototype.map.call(imgElements, function(imgElem, index){
      var item = {};
      var key = index + ' ' + (imgElem.getAttribute('alt') || 'n\\a');
      var url = normalizeUrl(imgElem.getAttribute('src'));
      item[key] = url;
      return item;
    })
  }
}

// can be tested on http://www.w3schools.com/html/html_examples.asp
