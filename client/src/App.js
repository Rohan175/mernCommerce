import React from 'react';
import {Switch ,Route, Redirect } from 'react-router-dom'
import Products from  'Containers/Products/ProductsWrapper.js'
import Cart from  'Containers/Cart/CartWrapper.js'
import Login from 'Containers/Login/LoginWrapper.js'
import Signup from 'Containers/SignUp/SignupWrapper.js'

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => localStorage.getItem("auth") !== null
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function App() {

  return (
    <div>
      <main>
          
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />

          <PrivateRoute exact path="/cart" component={Cart} />
          <PrivateRoute exact path="/home" component={Products} />
          <PrivateRoute exact path="/" component={Products} />
          <PrivateRoute path="*" component={Products}/>
        </Switch>
      </main>    
    </div>
  );
}

export default App;
