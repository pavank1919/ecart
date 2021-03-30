import React, { Component } from "react";
import formatCurrency from "../Util";
import Fade from "react-reveal/Fade";
import ReactModal from "react-modal";
import Zoom from "react-reveal/Zoom";
import { connect } from "react-redux";
import { fetchProducts } from "../actions/productActions.js";
import { bindActionCreators } from "redux";

ReactModal.setAppElement(document.getElementById("root"));
class Products extends Component {
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

  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    console.log(this.props.products);
    const customStyles = {};
    const { product } = this.state;
    return (
      <div>
        <Fade bottom cascade>
          {!this.props.products ? (
            <div>Loading...</div>
          ) : (
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
          )}
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

// export default connect(
//   (state) => ({ products: state.products.items }),
//   fetchProducts
// )(Products);

const mapStateToProps = (state) => ({
  products: state.products.items,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchProducts }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Products);

// import React, { Component } from "react";
// import { bindActionCreators } from "redux";
// import { connect } from "react-redux";
// import { requestHelloWorld, requestUserData } from "./actions";
// class Home extends Component {
//   componentDidMount() {
//     this.props.requestHelloWorld();
//     this.props.requestUserData();
//   }

//   person = (x, i) => {
//     return (
//       <div key={i}>
//         <div>Gender {x.gender}</div>
//         <div>Name {x.name.title}</div>
//         <div>Email {x.email}</div>
//         <div>Phone {x.phone}</div>
//         <div>
//           <img src={x.picture.large} width="100px" height="100px" />
//         </div>
//       </div>
//     );
//   };
//   render() {
//     const { results = [] } = this.props.userData;
//     return <h1>{results.map(this.person)}</h1>;
//   }
// }

// const mapStateToProps = (state) => ({
//   helloWorld: state.helloWorld,
//   userData: state.userData,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators({ requestHelloWorld, requestUserData }, dispatch);

// export default connect(mapStateToProps, mapDispatchToProps)(Home);
