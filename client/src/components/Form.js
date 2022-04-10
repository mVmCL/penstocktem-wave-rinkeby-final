import React, { Component } from 'react'

export class Form extends Component {
  render() {


    return (
        <form className='form'>
          <textarea type='text' name="message" id="message" placeholder='Send a message too...'/>
        
            </form>
    )
  }
}

export default Form