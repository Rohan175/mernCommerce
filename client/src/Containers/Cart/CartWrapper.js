import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress'
import Cart from './Cart'
import {fetchCart,subToCart,addToCart,addUnsafe,subUnsafe} from 'store/cart/cartAction'

function CartWrapper(props) {
  
    useEffect(() => {
      props.fetchCart()
    }, [])

    return (
      <div>
          {props.loading && <LinearProgress variant="query" />}
          <Cart {...props}/>
      </div>
    );
}

const mapStateToProps = (state) => ({
  Cart : state.cartReducer.data
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({fetchCart,addToCart,subToCart,addUnsafe,subUnsafe},dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(CartWrapper);
