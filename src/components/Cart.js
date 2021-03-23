import React, { Component } from "react";
import formatCurrency from "../Util";

export default class Cart extends Component {
  render() {
    const { cartItems } = this.props;
    console.log(cartItems);
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
          </div>
          {cartItems.length !== 0 && (
            <div className="cart">
              <div className="total">
                <div>
                  Total{"  "}
                  {formatCurrency(
                    cartItems.reduce((a, c) => a + c.price * c.count, 0)
                  )}
                </div>
                <button className="button primary">Checkout</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
