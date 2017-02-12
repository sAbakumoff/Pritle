var store = new Store();
var presenter = new MainPresenter(store);
presenter.render(document.getElementById('app-container'));
