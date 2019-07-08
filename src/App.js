import React from 'react';
import * as request from 'superagent';
import './App.css';
import { connect } from 'react-redux';
import { onEvent } from './actions/messages'

class App extends React.Component {
  state = {
    message: ''
  }

  baseUrl = 'https://arcane-plains-29650.herokuapp.com/'
  //baseUrl = 'http://localhost:5000'
  //connect to the server EventStream
  source = new EventSource(`${this.baseUrl}/stream`)

  //handle new events
  // onEvent = (event) => {
  //   const { data } = event

  //   //deserialize the array
  //   const messages = JSON.parse(data)

  //   console.log('messages test', messages)

  //   this.setState({ messages })
  // }

  //connect the source to the handler
  componentDidMount() {
    this.source.onmessage = this.props.onEvent
  }

  onChange = (event) => {
    const { value } = event.target

    this.setState({ message: value })
  }

  onSubmit = (event) => {
    event.preventDefault()

    //console.log('submit')

    const { message } = this.state

    this.setState({ message: '' })

    request
      .post(`${this.baseUrl}/message`)
      .send({ message })
      .then(response => {
        console.log('post response:', response)
      })
      .catch(console.error)
  }

renderMessages(messages) {
  return messages
      .map((message, index) => <p
        key={index}>
        {message.content}
      </p>)
  }

  render() {
    //console.log("MESSAGES: ", this.props.messages)
    return (
      <main>
        <form onSubmit={this.onSubmit}>
          <input
            onChange={this.onChange}
            type='text'
            value={this.state.message}
          />
          <button>
            send
          </button>
        </form>

         {
           this.props.messages &&
           this.renderMessages(this.props.messages)
         }
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages
  }
}

const mapDispatchToProps = { onEvent }

export default connect(mapStateToProps, mapDispatchToProps)(App)

