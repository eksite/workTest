import React from 'react';
// import Styled from 'styled-component';
import Messanger from './messanger';
import io from "socket.io-client"

const socket = io('http://localhost:4000/');



class Mainpage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            room: '',
            // socket: props.socket,
            messageMode: false,

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
        if (this.state.name.length > 0 && this.state.room.length > 0) {
            socket.emit("join Room", { username: this.state.name, room: this.state.room }, (data) => {
                if (data.success) {
                    this.setState({ messageMode: true })
                }
            })
        }
    }

    render() {
        if (!this.state.messageMode) {
            return (
                <form onSubmit={this.submit} >
                    <input id="name" onChange={this.handleInputName} value={this.state.name} />
                    <input id="room" onChange={this.handleInputRoom} value={this.state.room} />
                    <button type="submit"></button>
                </form>
            )
        }
        else {
            return <Messanger socket={socket} />
        }
    }


}


export default Mainpage;