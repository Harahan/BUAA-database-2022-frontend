import React from 'react'
import WrappedNormalLoginForm from '../../components/login/loginComp'
import wallpaper from '../../assets/wallpaper.jpg'
import './login.css'

class Login extends React.Component {
    render () {
        return (
            <div className="LoginPage">
                <div
                    className="leftImage"
                    style={ { backgroundImage: `url(${ wallpaper })` } }
                ></div>
                <WrappedNormalLoginForm history={ this.props.history } className="loginForm" />
            </div>

        )
    }
}


export default Login;