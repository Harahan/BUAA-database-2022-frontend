import React from 'react'
import WrappedRegistrationForm from '../../components/login/registerComp'
import wallpaper from '../../assets/wallpaper.jpg'
import './login.css'

class Register extends React.Component {
    render () {
        return (
            <div className="RegisterPage">
                <div
                    className="leftImage"
                    style={ { backgroundImage: `url(${ wallpaper })` } }
                ></div>
                <WrappedRegistrationForm history={ this.props.history } className="loginForm" />
            </div>
        )
    }
}


export default Register;