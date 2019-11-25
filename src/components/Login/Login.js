import { h, Component } from 'preact';

const Login = (props) => {
        return (
            <div>
                <input onChange={props.onChangeUserName} type="text" value={props.username} name="name" placeholder="enter you name" />
                <button onClick={props.onLoginHandler} name="Login" >Login </button>
            </div>
        )
}

export default Login