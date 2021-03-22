import React, { Component } from "react";
import Products from "./components/Products";
import data from "./data.json";

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      size: "",
    };
  }
  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">Ecart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
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
