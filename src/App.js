import React, { Component } from "react";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";
import data from "./data.json";
import store from "./store";
import { Provider } from "react-redux";

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
      size: "",
      sort: "",
    };
  }
  createOrders = (orders) => {
    alert(orders);
  };
  removeItemFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems.filter((x) => x._id !== product._id),
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems.filter((x) => x._id !== product._id))
    );
  };

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyIncart = false;
    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyIncart = true;
      }
    });
    if (!alreadyIncart) {
      cartItems.push({ ...product, count: 1 });
    }
    this.setState({ cartItems });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };
  filterProducts = (event) => {
    if (event.target.value === "") {
      this.setState({ size: event.target.value, products: data.products });
    } else {
      this.setState({
        size: event.target.value,
        products: data.products.filter(
          (product) => product.availableSizes.indexOf(event.target.value) >= 0
        ),
      });
    }
  };

  sortProducts = (event) => {
    const sort = event.target.value;
    this.setState({
      sort: sort,
      products: this.state.products
        .slice()
        .sort((a, b) =>
          sort === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : sort === "highest"
            ? a.price < b.price
              ? 1
              : -1
            : a._id > b._id
            ? 1
            : -1
        ),
    });
  };

  render() {
    return (
      <Provider store={store}>
        <div className="grid-container">
          <header>
            <a href="/">Ecart</a>
          </header>
          <main>
            <div className="content">
              <div className="main">
                <Filter
                  count={this.state.products.length}
                  size={this.state.size}
                  sort={this.state.sort}
                  sortProducts={this.sortProducts}
                  filterProducts={this.filterProducts}
                />
                <Products addToCart={this.addToCart} />
              </div>
              <div className="sidebar">
                <Cart
                  cartItems={this.state.cartItems}
                  removeItemFromCart={this.removeItemFromCart}
                  createOrder={this.createOrders}
                />
              </div>
            </div>
          </main>
          <footer>All rights reserved!</footer>
        </div>
      </Provider>
    );
  }
}

export default App;
