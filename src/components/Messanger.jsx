import React from "react";
import styled from "styled-components";
const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Formcontainer = styled.form`
  width: 100%;
  display: flex;
  height: 50px;
`;
const Input = styled.input`
  width: 85%;
  height: 100%;
  font-size: 18px;
  &:focus {
    outline-width: 0;
  }
`;
const Button = styled.button`
  width: 15%;
  height: 100%;
  border: 0;
  background-color: lightsteelblue;
  color: #fff;
  font-size: 24px;
`;
const Chat = styled.div`
  // background-color: lightgrey;
  height: 100%;
  width: 100%;
  padding: 15px;
  overflow-y: auto;
`;
const Content = styled.div`
  overflow: hidden;
  width: 100%;
  // background-color: lightsteelblue;
  padding: 15px 25px;
  flex: 1;
`;
const Msg = styled.span`
  padding: 5px 15px;
  background-color: aquamarine;
  border: none;
  border-radius: 4px;
  box-sizing: border-box;
`;
const Othercontainer = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px 0;
  text-align: left;
`;
const Myselfcontainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 20px 0;
  text-align: right;
`;

class Messanger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      socket: props.socket,
      messages: [],
      name: props.name,
      persons: [],
      room: props.room
    };
  }

  componentDidMount = () => {
    this.state.socket.emit("get_users", { room: this.state.room });
    this.state.socket.on("get_users", data => {
      this.setState({ persons: [...data.users] });
    });
    this.state.socket.on("message", data => {
      this.setState({ messages: this.state.messages.concat(data) });
    });
    this.state.socket.on("delete", data => {
      let array = this.state.persons;
      array.forEach((item, index) => {
        if (item === data.user) {
          array.splice(index, 1);
          this.setState({ persons: array });
        }
      });
    });
    this.scroll();
  };

  componentDidUpdate() {
    this.scroll();
  }

  scroll = () => (document.getElementById("chat").scrollTop = 9999);
  handleInput = e => this.setState({ message: e.target.value });

  submit = e => {
    e.preventDefault();
    this.state.socket.emit("chat_message", this.state.message);
  };

  render() {
    return (
      <Container>
        <Content>
          Chat Room:{this.state.room}
          <br />
          Here:{" "}
          <select>
            {this.state.persons.map((options, index) => {
              return <option value={options}>{options}</option>;
            })}
          </select>
          <Chat id="chat">
            {this.state.messages.map((message, index) =>
              this.state.name.toLowerCase() ===
              message.username.toLowerCase() ? (
                <Myselfcontainer>
                  <label>
                    Me at {message.hours}:{message.minutes}
                  </label>
                  <Msg>{message.msg}</Msg>
                </Myselfcontainer>
              ) : (
                <Othercontainer>
                  <label>
                    {message.username} at {message.hours}:{message.minutes}
                  </label>
                  <Msg>{message.msg}</Msg>
                </Othercontainer>
              )
            )}
          </Chat>
        </Content>
        <Formcontainer onSubmit={this.submit}>
          <Input
            type="text"
            value={this.state.message}
            id="message"
            onChange={this.handleInput}
          />
          <Button type="submit" value="Submit">
            Send
          </Button>
        </Formcontainer>
      </Container>
    );
  }
}

export default Messanger;
