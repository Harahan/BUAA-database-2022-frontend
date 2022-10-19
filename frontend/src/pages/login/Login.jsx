import React from 'react'
import WrappedNormalLoginForm from '../../components/login/loginComp'

class Login extends React.Component{
    render(){
        return(
            <div>
                <WrappedNormalLoginForm history={this.props.history}/>
            </div>
        )
    }
}


export default Login;