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
  if(Array.isArray(elements)){
    var ancestor = null;
    for(var i=0; i<elements.length; i++){
      if(typeof cb === 'function')
        cb(elements[i], i);
      ancestor = getCommonAncestor(elements[i], ancestor);
    }
    return ancestor;
  }
}

function attachHandler(elements){
  var DATA_ATTRIBUTE_NAME = 'data-index';
  function handler(ev){
    var index = ev.target.getAttribute(DATA_ATTRIBUTE_NAME);
    if(index)
      alert(+index);
  }
  function cleanup(){
    if(handlerTarget)
      handlerTarget.removeEventListener('click', handler);
    for(var i=0; i< elements.length;i++)
      elements[i].removeAttribute(DATA_ATTRIBUTE_NAME);
  }
  var handlerTarget = getHandlerTarget(elements, function(element, index){
    element.setAttribute(DATA_ATTRIBUTE_NAME, index);
  });
  if(handlerTarget){
    handlerTarget.addEventListener('click', handler);
  }
  else{
    cleanup();
  }
  return cleanup;
}

/* sample of usage :
* add handler :
* var elements = document.getElementsByTagName('p');
* var cleanup = attachHandler([...elements]);
* remove handler:
* cleanup();
*/
