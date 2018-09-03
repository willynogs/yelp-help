import React, { Component } from 'react';

class NotFound extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  _goHome() {
    const { history } = this.props;
    history.push(`/`);
  }

  render() {
    return (
      <div className="container">
        <h1 id='main-title' className='display-3 text-center'>Oops!</h1>

        <div className='col-md-12'>
          <p id='main-blurb' className='text-center'>
            {"Looks like this page doesn't exist! Sorry about that."}
          </p>
          <button type='button' id='submit-button' className={`btn btn-block btn-primary`} onClick={() => this._goHome()}>
            Go Home
          </button>
        </div>
      </div>
    );
  }
}

export default NotFound;
