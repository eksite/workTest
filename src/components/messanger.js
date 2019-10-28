import React from 'react';
// import Styled from 'styled-components';


class Messanger extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message: '',
            socket: props.socket
        }
    }

    handleInput = (e) => {
        this.setState({ message: e.target.value })
    }
    submit(e) {
        e.preventDefault();
        this.state.socket.emit('chat message', { msg: this.state.message })
    }

    render() {
        return (
            <form onSubmit={this.submit}>
                <input type="text" value={this.state.message} id="message" onChange={this.handleInput} />
                <button type="submit" value="Submit" />
            </form>
        )
    }

}
export default Messanger;
