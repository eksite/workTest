import React from 'react';
import styled from 'styled-components';
import Messanger from './messanger';
const Container = styled.div`
    display:flex;
flex-direction:column;
    align-items:center;
    
`;
const Submitform = styled.form`
display:flex; 
flex-direction:column;
justify-content:center;
align-items:center;
width:400px;
    height:400px;
    flex:1;
    `
const Inputfield = styled.input`
width:205px;
height:20px
`
const Divcontainer = styled.div`
 display: flex;
      flex-direction: column;
      flex: 1;
      height:20px;
      justify-content:center;
      alight-content:center;
`
const Submit = styled.button`
weight:300px;
`
class Mainpage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            room: this.props.room || '',
            messageMode: false,
            socket: this.props.socket
        }
    }

    handleInputName = (e) => {
        this.setState({ name: e.target.value })
    }

    handleInputRoom = (e) => {
        this.setState({ room: e.target.value })
    }

    submit = (e) => {
        e.preventDefault();
        if (this.state.name.trim().length > 0 && this.state.room.trim().length > 0) {
            this.state.socket.emit("join Room", { username: this.state.name, room: this.state.room }, (data) => {
                if (data.namaAvailable) {
                    window.history.pushState('Page', 'yeye', `room/${this.state.room}`);
                    this.setState({ messageMode: true })
                }
            })
        }
    }

    render() {
        if (!this.state.messageMode) {
            return (
                <Container>
                    <h1>Welcome to my chat</h1>
                    <Submitform onSubmit={this.submit} >
                        <Divcontainer>
                            <label>Name:</label>
                            <Inputfield id="name" onChange={this.handleInputName} value={this.state.name} />
                        </Divcontainer>
                        <Divcontainer>
                            <label>Room:</label>
                            <Inputfield id="room" onChange={this.handleInputRoom} value={this.state.room} />
                        </Divcontainer>
                        <Submit type="submit" value="Submit" />
                    </Submitform>
                </Container>
            )
        }
        else {
            return <Messanger socket={this.state.socket} />
        }
    }
}

export default Mainpage;