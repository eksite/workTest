import React from 'react';
import styled from 'styled-components';

const Container = styled.form`
    display:flex;
    justify-content:center;
`
class Messanger extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message: '',
            socket: props.socket,
            messages: [],
        }
    }

    componentDidMount() {
        this.state.socket.on('message', (data) => {
            this.setState({ messages: this.state.messages.concat(data) })
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
                <Container onSubmit={this.submit}>
                    <input type="text" value={this.state.message} id="message" onChange={this.handleInput} />
                    <button type="submit" value="Submit" />
                </Container>
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
