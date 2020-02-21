import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress'
import Signup from './Signup'
import {signup as signupAction} from 'store/user/userAction'

function SignupWrapper(props) {

    return (
      <div>
          {props.loading && <LinearProgress variant="query" />}
          <Signup signup={props.signupAction} error={props.user.error}/>
      </div>
    );
}

const mapStateToProps = (state) => ({
  user : state.userReducer
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({signupAction},dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(SignupWrapper);
