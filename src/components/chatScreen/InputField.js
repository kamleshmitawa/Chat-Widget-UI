import { h, Component } from 'preact';

class InputField extends Component {
    onChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render(props, state) {
        return (
            <div className="inputfield-block">
                <div class="message-input-block">
                    <input name="message" class="message-input" value={this.state.messgae} onChange={this.onChangeHandler} placeholder="Type Message..." autocomplete="off" />
                </div>
                <div class="send-button-block">
                    <i class="fa fa-caret-right send-button" aria-hidden="true"></i>
                </div>
            </div>
        )
    }
}

export default InputField