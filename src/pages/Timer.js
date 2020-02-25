import React, { Component } from 'react';

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = { timer: 5, timeLeft: 0 };
  }

  start = async () => {
    let timer = this.state.timer;
    this.setState({ timeLeft: timer });

    let countDown = setInterval(() => {
      timer = timer - 1;
      this.setState({ timeLeft: timer });

      if (timer <= 0) {
        clearInterval(countDown);
      }
    }, 1000);
  };

  handleChange = e => {
    this.setState({ timer: e.target.value });
  };

  render() {
    const { timer, timeLeft } = this.state;
    return (
      <div className='timer'>
        <h1>Timer</h1>
        {timeLeft === 0 ? (
          <div className='setTime'>
            <input
              type='number'
              name='time'
              min='0'
              max='60'
              step='1'
              value={timer}
              onChange={this.handleChange}
            />
            <div className='timer-type'>
              <span>Hours</span>
              <span>Minutes</span>
              <span className='timer-active'>Seconds</span>
            </div>
            <button onClick={this.start}>Start</button>
          </div>
        ) : (
          <div className='timeLeft'>{timeLeft}s</div>
        )}
      </div>
    );
  }
}
