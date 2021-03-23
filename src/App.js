import React, { Component } from "react";
import Products from "./components/Products";
import Filter from "./components/Filter";
import data from "./data.json";

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: "",
    };
  }
  filterProducts = (event) => {
    this.setState({
      size: event.target.value,
      products: data.products.filter(
        (product) => product.availableSizes.indexOf(event.target.value) >= 0
      ),
    });
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
              <Products products={this.state.products} />
            </div>
            <div className="sidebar">Cart</div>
          </div>
        </main>
        <footer>All rights reserved!</footer>
      </div>
    );
  }
}

export default App;
