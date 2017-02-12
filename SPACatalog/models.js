class Model{
  constructor(store){
    this.pubSub = new PubSub();
    this.store = store;
  }
  on(event, handler){
    this.pubSub.subscribe(event, handler);
  }
  trigger(event, data){
    this.pubSub.publish(event, data);
  }
}

class AddItemModel extends Model{
  addItem(item){
    this.store.addItem(item);
    setTimeout(()=>{
    this.pubSub.publish('itemAdded')}, 300);
  }
  state(){
    return {
      addItemAllowed : this.store.addItemAllowed
    }
  }
}

class CatalogModel extends Model{
  state(){
    return {
      items : this.store.getCatalog(),
      updateAllowed : this.store.addItemAllowed,
      purchaseAllowed : this.store.purchaseItemAllowed
    }
  }
}


class MenuModel extends Model{
  constructor(store){
    super(store);
    this.activeItemKey = this.store.getMenu()[0].key;
  }
  state(){
    return {
      items : this.store.getMenu(),
      activeItemKey : this.activeItemKey
    };
  }
  setActiveItem(key){
    this.activeItemKey = key;
    this.pubSub.publish('select');
  }
}
