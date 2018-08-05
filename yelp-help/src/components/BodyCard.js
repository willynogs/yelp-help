import React, { Component } from 'react';

class BodyCard extends Component {
  render() {
    const { title, children } = this.props;

    return (
      <div className='col-md-12'>
        <h2 className='body-title'>{ title }</h2>
        { children }
      </div>
    );
  }
}

export default BodyCard;
