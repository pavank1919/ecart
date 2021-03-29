import React, { Component } from "react";
import formatCurrency from "../Util";
import Fade from "react-reveal/Fade";
import ReactModal from "react-modal";
import Zoom from "react-reveal/Zoom";

ReactModal.setAppElement(document.getElementById("root"));
export default class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
    };
  }
  openModal = (product) => {
    this.setState({ product });
  };

  closeModal = () => {
    this.setState({ product: null });
  };

  render() {
    const customStyles = {};
    const { product } = this.state;
    return (
      <div>
        <Fade bottom cascade>
          <ul className="products">
            {this.props.products.map((product) => (
              <li key={product._id}>
                <div className="product">
                  <a href={"#" + product._id}>
                    <img
                      src={product.image}
                      alt={product.title}
                      onClick={() => this.openModal(product)}
                    />
                    <p>{product.title}</p>
                  </a>
                  <div className="product-price">
                    <div>{formatCurrency(product.price)}</div>
                    <button
                      onClick={() => this.props.addToCart(product)}
                      className="button primary"
                    >
                      Add to cart!
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Fade>
        {product && (
          <ReactModal
            style={customStyles}
            isOpen={true}
            onRequestClose={this.closeModal}
            onAfterOpen={() => this.openModal}
            contentLabel="Example Modal"
            ariaHideApp={false}
          >
            <Zoom>
              <button className="close-modal" onClick={this.closeModal}>
                X
              </button>
              <div className="product-details">
                <div className="product-img">
                  <img src={product.image} alt={product.title} />
                </div>
                <div className="product-details-declaration">
                  <p>
                    <strong>{product.title}</strong>
                  </p>
                  <p>{product.description}</p>
                  <p>
                    Available Sizes{" "}
                    {product.availableSizes.map((size) => (
                      <span>
                        {" "}
                        <button className="button">{size}</button>
                      </span>
                    ))}
                  </p>
                  <div className="product-price">
                    <div>{formatCurrency(product.price)}</div>
                    <button
                      className="button primary"
                      onClick={() => {
                        this.props.addToCart(product);
                        this.closeModal();
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </Zoom>
          </ReactModal>
        )}
      </div>
    );
  }
}
