class PubSub{
  constructor(element){
    this.element = element || document;
    this.handlersMap = {};
  }
  publish(type, message){
    var event = new CustomEvent(type, {detail : message});
    this.element.dispatchEvent(event);
  }
  subscribe(type, handler){
    var eventHandler = function(ev){
      handler(ev.detail);
    }
    this.handlersMap[handler] = eventHandler;
    this.element.addEventListener(type, eventHandler);
  }
  unsubscribe(type, handler){
    delete this.handlersMap[handler];
    this.element.removeEventListener(type, this.handlersMap[handler]);
  }
}
