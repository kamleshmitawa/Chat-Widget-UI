import { h, Component } from "preact";
import ChatScreen from "../chatScreen/ChatScreen";
import axios from "axios";
import uuid from 'uuid/v4'
import Login from "../Login/Login";
import baseURL from '../../../config';

let Twilio = window.Twilio

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChatScreen: false,
      username: '',
      loading : false
    }
  }

  componentDidMount() {
    axios.post(`${baseURL}/get-token/${uuid()}`)
      .then(token => {
        this.chatInit(token.data.jwt)
      })
      .catch(err => console.log('err', err))
  }

  chatInit = (token) => {
    console.log(token, 'tokentokentokentoken')
    Twilio.Chat.Client.create(token).then(client => {
      console.log('client', client)
      this.chatClient = client;

      client.on('channelJoined', (channel) => {
        this.setState({ loading : false })
        console.log('Joined channel ' + channel.friendlyName);
      });

      client.on('channelAdded', (channel) => {
        console.log('channelAdded' + channel.friendlyName);

        channel.on('messageAdded', function (message) {
          console.log(message.author, message.body);
        });
        channel.on('memberJoined', function (member) {
          console.log(member.identity + 'has joined the channel.');
        });
        channel.on('memberInfoUpdated', function (member) {
          console.log(member.identity + 'updated their info.');
        });
        channel.on('memberLeft', function (member) {
          console.log(member.identity + 'has left the channel.');
        });
        channel.on('typingStarted', function (member) {
          console.log(member.identity + 'is currently typing.');
        });
        channel.on('typingEnded', function (member) {
          console.log(member.identity + 'has stopped typing.');
        });
      });

      client.on('channelRemoved', function (channel) {
        console.log('Channel removed: ' + channel.friendlyName);
      });
      client.on('channelUpdated', function (channel) {
        console.log('Channel updates: ' + channel.sid);
      });

      this.getChannels()
    })
      .catch(error => console.log(error, 'client error'));
  }


  getChannels = () => {
    return this.chatClient.getPublicChannelDescriptors().then((paginator)=> {
      for (let i = 0; i < paginator.items.length; i++) {
        const channel = paginator.items[i];
        console.log(channel.status, 'channelchannelchannel')
        channel.join()
        // if (channel.status !== 'Joined') {
        //         channel.join();
        //    }
        console.log('Channel:=====sdfnnsgn ' + channel.friendlyName);
        return channel
      }
    })
    .catch(err => {
      console.log(err, 'erors')
      return err
    })
  }

  channelHandler = (channelName) => {
    console.log( this.chatClient, ' this.chatClient this.chatClient')
      return this.chatClient.createChannel({
          uniqueName: channelName,
          friendlyName: uuid(),
        })
        .then((channel) => {
          this.channel = channel;
          console.log('Created general channel:');
          console.log(channel);
          channel.join()
          return channel;
        })
        .catch(err => {
          console.log('channel create error', err)
          return err
        })
    }

  onLoginHandler = (e) => {
    if (this.state.username) {
      this.setState((prevState, props) => {
        return { isChatScreen: !prevState.isChatScreen, loading: true };
      });

      this.channelHandler(this.state.username)
      let loginData = { username: this.state.username, isLogin: true }
      localStorage.setItem('login', JSON.stringify(loginData))
    }
  }

  onChangeUserName = (e) => {
    this.setState({ username: e.target.value })
  }
  onChatStart = () => {
    let isLoggedIn = JSON.parse(localStorage.getItem('login'));
    if (isLoggedIn && isLoggedIn.isLogin) {
      this.setState((prevState, props) => {
        return { isChatScreen: !prevState.isChatScreen };
      });
    }
    else {
      this.setState((prevState, props) => {
        return { isChatScreen: !prevState.isChatScreen };
      });
    }
  }

  render({ themeColor }, state) {
    return (
      <div className="widget-block">
        {state.isChatScreen ? <ChatScreen loading={state.loading} /> : null}

        <div className="webchat-widget" onClick={this.onChatStart}>
          Chat
        </div>
        {state.isLoginScreen ? <Login onLoginHandler={this.onLoginHandler} onChangeUserName={this.onChangeUserName} username={state.username} /> : null}
      </div>
    );
  }
}
