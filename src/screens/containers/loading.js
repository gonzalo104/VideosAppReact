import React, { Component } from 'react';
import {connect} from 'react-redux';
import LoadingLayout from '../../sections/components/loading';

class Login extends Component {

    componentDidMount(){
        if (this.props.user) {
            this.props.navigation.navigate('App');
        }else{
            this.props.navigation.navigate('Login');
        }
    }

    render() {
        return (
           <LoadingLayout/>
        );
    }
}

const mapStateTiProps = (state) => {
    return{
        user: state.user
    }
}

export default connect(mapStateTiProps)(Login);