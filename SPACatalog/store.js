class Store{
  constructor(){
    this.catalog = [
    {name : 'coca cola', price: '14'},
    {name : 'sprite', price: '18'},
    {name : 'fanta', price: '29'}
    ];
    this.capabilities = {
      updateCatalog : true,
      purchaseItem : true
    }
  }
  getMenu(){
    return [
      {key : 'catalog', name : 'Catalog'},
      {key : 'transactions', name : 'Transactions'}
    ]
  }
  get addItemAllowed(){
    return this.capabilities.updateCatalog;
  }
  get purchaseItemAllowed(){
    return this.capabilities.purchaseItem
  }
  addItem(item){
    this.catalog.push(item);
  }
  getCatalog(){
    return this.catalog;
  }
}
