class Presenter{
  constructor(){
    this.pubSub = new PubSub();
  }
  trigger(event, data){
    this.pubSub.publish(event, data);
  }
  on(event, handler){
    this.pubSub.subscribe(event, handler);
  }
}

class CatalogPresenter extends Presenter{
  constructor(store){
    super();
    this.model = new CatalogModel(store);
  }
  renderAddItemLink(element){
    if(this.model.state().updateAllowed){
      var link=document.createElement('a');
      link.setAttribute('href', '#');
      link.innerHTML = 'add new...';
      link.addEventListener('click', (ev)=>{
        ev.preventDefault();
        this.trigger('changeView', 'addItem');
      })
      element.appendChild(link);
    }
  }
  render(element){
    var catalogView = new CatalogView(element);
    catalogView.render(this.model.state());
    this.renderAddItemLink(element);
  }
}

class AddItemPresenter extends Presenter{
  constructor(store){
    super();
    this.model = new AddItemModel(store);
  }
  render(element){
    var view = new AddItemView(element);
    view.on('newItem', (item)=>{
      this.model.addItem(item);
    })
    this.model.on('itemAdded', (ev)=>{
      this.trigger('changeView', 'catalog');
    })
    view.render(element);
  }
}

class TransactionsPresenter extends Presenter{
  constructor(){
    super();
  }
  render(element){
    element.innerHTML = 'transactions list';
  }
}

class MainPresenter{
  constructor(store){
    this.model = new MenuModel(store);
    this.presenters = {
      'catalog' : new CatalogPresenter(store),
      'addItem' : new AddItemPresenter(store),
      'transactions' : new TransactionsPresenter()
    }
    var changeViewHandler=(viewKey)=>{
      this.model.setActiveItem(viewKey);
    }
    Object.keys(this.presenters).forEach(key=>{
      this.presenters[key].on('changeView', changeViewHandler);
    })
  }
  renderActivePage(element){
    var activePageKey = this.model.state().activeItemKey;
    if(this.presenters[activePageKey]){
      element.innerHTML = '';
      this.presenters[activePageKey].render(element);
    }
    else{
      element.innerHTML = '';
    }
  }
  render(element){
    var menuElem = document.createElement('nav');
    var currentPageElem = document.createElement('section');
    var menuView = new MenuView(menuElem);

    this.model.on('select', ()=>{
      menuView.render(this.model.state());
      this.renderActivePage(currentPageElem);
    });
    menuView.on('select', (key)=>{
      this.model.setActiveItem(key)
    })

    menuView.render(this.model.state());
    this.renderActivePage(currentPageElem);

    element.appendChild(menuElem);
    element.appendChild(currentPageElem);
  }
}
