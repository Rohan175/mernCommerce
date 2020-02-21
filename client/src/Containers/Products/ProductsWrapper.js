import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress'
import Products from './Products'
import {fetchProducts} from 'store/products/productAction'
import {addToCart} from 'store/cart/cartAction'

function ProductsWrapper(props) {

    useEffect(() => {
      props.fetchProducts()
    }, [])

    return (
      <div>
          {props.loading && <LinearProgress variant="query" />}
          <Products 
            addToCart={props.addToCart}
            products={props.products ? props.products.data : []}
          />
      </div>
    );
}

const mapStateToProps = (state) => ({
  products : state.productsReducer.data
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({fetchProducts,addToCart},dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ProductsWrapper);
