import {h, Component } from 'preact';
import Header from './Header';
import Chat from './Chat';
import InputField from './InputField';

class ChatScreen extends Component{
    render({ themeColor , loading}, state){
        if(loading){
            return <div className="conversation-block">loading ....</div>
        }
        return(
            <div className="conversation-block" style={{ borderColor: themeColor ? themeColor : "" }}>
            <Header/>
            <Chat/>
            <InputField/>
            </div>
        )
    }
}

export default ChatScreen