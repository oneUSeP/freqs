import React, { Component } from 'react'
import PropTypes from 'prop-types'
import KeyboardedInput from 'react-touch-screen-keyboard'

class Attendance extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: '',
      customMapping: [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', '@'],
        ['z', 'x', 'c', 'v', 'b', 'n', 'm', '.com']
      ]
    }
    this.handleValueChange = this.handleValueChange.bind(this)
  }

  handleValueChange (val) {
    this.setState({ value: val })
  }

  render () {
    return (
      <div className='container login-wrapper' style={{ marginTop: '10%' }}>
        <div className='hr-divider m-t m-b'>
          <h3 className='hr-divider-content hr-divider-heading'><img src='http://192.168.1.195:3000/usep-logo.png' width='70' /></h3>
        </div>
        <div className='flextable'>
          <div className='flextable-item flextable-primary'>
            <KeyboardedInput
              value={this.state.value}
              onChange={(value) => { this.handleValueChange(value) }}
              opacity={1}
              defaultKeyboard={this.state.customMapping}
              isDraggable={false}
              placeholder={'Full Name (Click ME)'} enabled
              inputClassName={'form-control'}
            />
          </div>
          <div className='flextable-item'>
            <div className='btn-group'>
              <button type='button' className='btn btn-lg btn-pill btn-success'>
                <span className='icon icon-pencil'></span>
              </button>
              <button type='button' className='btn btn-lg btn-pill btn-danger'>
                <span className='icon icon-erase'></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Attendance.propTypes = {

}

export default Attendance
