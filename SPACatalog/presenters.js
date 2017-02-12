class CatalogPresenter{
  constructor(store){
    this.model = new CatalogModel(store);
    this.addAddItemModel = new AddItemModel(store);
  }
  renderAddItemForm(element){
    if(this.addAddItemModel.state().addItemAllowed){
      var addItemView = new AddItemView(element);
      addItemView.render();
    }
  }
  render(element){
    var catalogView = new CatalogView(element);
    catalogView.on('newItem', (item)=>{
      this.model.addItem(item);
    })
    this.model.on('itemAdded', ()=>{
      catalogView.render(this.model.state());
      renderAddItemForm(element);
    });
    catalogView.render(this.model.state());
    this.renderAddItemForm(element);
  }
}

class TransactionsPresenter{
  render(element){
    element.innerHTML = 'transactions list';
  }
}

class MainPresenter{
  constructor(store){
    this.model = new MenuModel(store);
    this.presenters = {
      'catalog' : new CatalogPresenter(store),
      'transactions' : new TransactionsPresenter()
    }
  }
  renderActivePage(element){
    var activePageKey = this.model.state().activeItemKey;
    if(this.presenters[activePageKey]){
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
