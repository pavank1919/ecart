import React, { Component } from "react";
import formatCurrency from "../Util";
import Fade from "react-reveal/Fade";

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCheckout: false,
      name: "",
      email: "",
      address: "",
    };
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createOrders = (e) => {
    e.preventDefault();
    let order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      orders: this.props.cartItems,
    };
    this.props.createOrder(order);
  };

  render() {
    const { cartItems } = this.props;
    return (
      <div>
        {cartItems && cartItems.length === 0 ? (
          <div className="cart cart-header">Your cart is empty</div>
        ) : (
          <div className="cart cart-header">
            You have {cartItems.length} item in your cart
          </div>
        )}
        <div>
          <div className="cart">
            <Fade right cascade>
              <ul className="cart-items">
                {cartItems.map((item) => (
                  <li key={item._id}>
                    <div>
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div>
                      <div>{item.title}</div>
                      <div className="right">
                        {formatCurrency(item.price)} X {item.count}{" "}
                        <button
                          className="button primary"
                          onClick={() => this.props.removeItemFromCart(item)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Fade>
          </div>
          {cartItems.length > 0 && (
            <div className="cart">
              <div className="total">
                <div>
                  Total{"  "}
                  {formatCurrency(
                    cartItems.reduce((a, c) => a + c.price * c.count, 0)
                  )}
                </div>
                <button
                  className="button primary"
                  onClick={() => this.setState({ showCheckout: true })}
                >
                  Proceed
                </button>
              </div>
              {this.state.showCheckout && cartItems.length !== 0 && (
                <div className="cart">
                  <form onSubmit={this.createOrders}>
                    <ul className="form-container">
                      <li>
                        <label>Name</label>
                        <input
                          name="name"
                          type="name"
                          required
                          onChange={this.handleInput}
                        />
                      </li>
                      <li>
                        <label>Email</label>
                        <input
                          name="email"
                          type="email"
                          required
                          onChange={this.handleInput}
                        />
                      </li>
                      <li>
                        <label>Address</label>
                        <input
                          name="address"
                          required
                          onChange={this.handleInput}
                        />
                      </li>
                      <li>
                        <button className="button primary">Checkout</button>
                      </li>
                    </ul>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
