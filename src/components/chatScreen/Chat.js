import { h, Component } from 'preact';

let abc = ['kamelsh', 'saini', 'mitawa', 'kamelsh', 'saini', 'mitawa', 'kamelsh', 'saini', 'mitawa', 'kamelsh', 'saini', 'mitawa', 'kamelsh', 'saini', 'mitawa', 'kamelsh', 'saini', 'mitawa', 'sainiii', 'kasdkdjk', 'ajkdhfb']


class Chat extends Component {
    render(props, state) {
        return (
            <div className="chat-block">
                {
                    abc && abc.length > 0 ? abc.map((val, index) => (
                        <div class={index % 2 == 0 ? "chat-message-customer" : "chat-message-agent"} key={index}>
                            <div class="message-design">
                                {val}
                            </div>
                        </div>
                    )) : null}

            </div>
        )
    }
}

export default Chat