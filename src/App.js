import React, { Component } from 'react';
import { calculateResult } from './utils';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      userInput: '',
      result: '',
      error: '',
      time: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState({ value });
  }

  handleSubmit(event) {
    const { value } = this.state;
    var startTime = performance.now();
    const { input, result, error,} = calculateResult(value);
    var endTime = performance.now();
    this.setState({ userInput: input, result, error, time: endTime - startTime });
    event.preventDefault();
  }

  render() {
    const { userInput, result, error, time} = this.state;
    return (
      <div className="App">
        <form className="App-form" onSubmit={this.handleSubmit}>
          <p>
            <span>Please enter single digit numbers.</span>
          </p>
          <div>
            <div className='InputDiv'>
              <input className='Input' type="text" value={this.state.value} onChange={this.handleChange} /> 
              <p className='TimeText'>Time Elapsed: {time}s</p>
            </div>
          </div>
          { userInput &&
            <p>
              <span>Result for input '{userInput}' is '{result}'</span>
            </p>
          }
          { error &&
            <p className="App-error">
              {error}
            </p>
          }
        </form>
      </div>
    );
  }
}

export default App;
