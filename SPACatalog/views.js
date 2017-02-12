class View{
  constructor(element){
    this.element = element;
    this.pubSub = new PubSub(element);
  }
  on(event, handler){
    this.pubSub.subscribe(event, handler);
  }
  off(event, hander){
    this.pubSub.unsubscribe(event, handler);
  }
  trigger(event, message){
    this.pubSub.publish(event, message)
  }
  setAttributes(element, attributes){
    Object.keys(attributes).forEach(key=>{
      element.setAttribute(key, attributes[key]);
    })
  }
  appendElements(target, ...elements){
    elements.forEach(elem=>target.appendChild(elem));
  }
}

class ItemView extends View{
  render(model){
    this.element.innerHTML = `<div>${model.name}:${model.price}USD</div>`;
  }
}



class AddItemView extends View{
  render(model){
    var form = document.createElement('form');
    this.setAttributes(form, {id : 'frmAddItem'});
    var name = document.createElement('input');
    this.setAttributes(name,{id : 'name', type:'text', required : true, value:'abc'});
    var price = document.createElement('input');
    this.setAttributes(price, {id : 'price', type:'number', step:0.01, required:true, value:14});
    var submit = document.createElement('input');
    this.setAttributes(submit, {type:'submit'});
    submit.value = 'Append';
    this.appendElements(form, name, price, submit);
    form.addEventListener('submit', (ev)=>{
      ev.preventDefault();
      this.trigger('newItem', {name : name.value, price : price.value});
    })
    this.element.appendChild(form);
  }
}

class CatalogView extends View{
  render(model){
    this.element.innerHTML = '';
    var list = document.createElement('ul');
    model.items.forEach(item=>{
      var listItem = document.createElement('li');
      var itemView = new ItemView(listItem);
      itemView.render(item);
      list.appendChild(listItem);
    });
    this.element.appendChild(list);
  }
}

class MenuView extends View{
  render(model){
    var list = document.createElement('ul');
    model.items.forEach(({key, name})=>{
      var listItem = document.createElement('li');
      listItem.setAttribute('data-key', key);
      if(model.activeItemKey ===  key)
        listItem.className = 'active';
      listItem.innerHTML = name;
      list.appendChild(listItem);
    })
    list.addEventListener('click', (ev)=>{
      var key = ev.target.getAttribute('data-key');
      if(key)
        this.trigger('select', key);
    })
    this.element.innerHTML = '';
    this.element.appendChild(list);
  }
}
