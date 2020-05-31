import React, { Component } from 'react'
import * as actions from '../../../store/actions/index'
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
class Logout extends Component {
    componentDidMount() {
        console.log("disparando logout!");
        this.props.onLogout();
    }
    render() {
        return (
           <Redirect to="/login"></Redirect>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    }
}
export default connect(null,mapDispatchToProps)(Logout);
