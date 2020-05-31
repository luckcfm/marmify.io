import React from 'react';
import {connect} from 'react-redux'

const Homepage = (props) => {
  console.log('Home ', props.auth);
  return (
    <div>
      {props.auth.token !== null && props.auth.token !== undefined ? 'hello' : <p>Please <a onClick={() => {props.history.push('/login')}}>login</a> to continue</p>}
    </div>
  );
};
const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}
export default connect(mapStateToProps,null)(Homepage);