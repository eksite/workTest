import React from 'react';
// import Styled from 'styled-components';


class Messanger extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message: '',
            socket: props.socket,
            messages: []
        }
    }
    componentDidMount() {
        this.state.socket.on('message', (data) => {
            // this.state.messages.push(data);
            this.setState({ messages: this.state.messages.concat(data) })
            console.log(this.state.messages);
        })
    }

    handleInput = (e) => {
        this.setState({ message: e.target.value })
    }


    submit = (e) => {
        e.preventDefault();
        this.state.socket.emit('chat message', this.state.message, () => {
            console.log(this.state.messages.length)
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submit}>
                    <input type="text" value={this.state.message} id="message" onChange={this.handleInput} />
                    <button type="submit" value="Submit" />
                </form>
                {
                    this.state.messages.map((message, index) => (
                        <div>
                            <p key={index}>{message.username} </p>
                            <li key={index}>{message.msg}</li>
                        </div>))
                }
            </div >
        )
    }
}

export default Messanger;
