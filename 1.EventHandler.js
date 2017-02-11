function getParents(element){
  var parents = [];
  while(element){
    parents.unshift(element);
    element = element.parentElement;
  }
  return parents;
}

function getCommonAncestor(el1, el2){
  if(!el2)
    return el1;
  var el1Parents = getParents(el1);
  var el2Parents = getParents(el2);
  var i = 0;
  while(el1Parents[i]===el2Parents[i])i++;
  return el1Parents[i-1];
}

function getHandlerTarget(elements, cb){
  if(Array.isArray(elements) && elements.length){
    if(elements.length === 1){
      return elements[0];
    }
    var ancestor = null;
    for(var i=0; i<elements.length; i++){
      if(cb) cb(elements[i], i);
      ancestor = getCommonAncestor(elements[i], ancestor);
    }
    return ancestor;
  }
}

function attachHandler(elements){
  var handlerTarget = getHandlerTarget(elements, function(element, index){
    element.setAttribute('data-index', index);
  });
  if(handlerTarget){
    handlerTarget.addEventListener('click', function(ev){
      var index = ev.target.getAttribute('data-index')
      if(index)
        alert(+index);
    })
  }
}

/* sample of usage
* var elements = document.getElementsByTagName('p');
* attachHandler([...elements]);
*/
