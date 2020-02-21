import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress'
import Login from './Login'
import {login as loginAction} from 'store/user/userAction'

function LoginWrapper(props) {

    return (
      <div>
          {props.loading && <LinearProgress variant="query" />}
          <Login login={props.loginAction} error={props.user.error}/>
      </div>
    );
}

const mapStateToProps = (state) => ({
  user : state.userReducer
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({loginAction},dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(LoginWrapper);
