import React from 'react';
import * as request from 'superagent';
import './App.css';
import { connect } from 'react-redux';
import { onEvent } from './actions/messages'

class App extends React.Component {
  state = {
    message: ''
  }
  //connect to the server EventStream
  source = new EventSource('http://localhost:5000/stream')

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

    console.log('submit')

    const { message } = this.state

    this.setState({ message: '' })

    request
      .post('http://localhost:5000/message')
      .send({ message })
      .then(response => {
        console.log('response test:', response)
      })
      .catch(console.error)
  }

  render() {
    const messages = this
      .props
      .messages
      .map((message, index) => <p
        key={index}
      >
        {message}
      </p>)

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

        {messages}
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

