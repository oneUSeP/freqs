import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Alert from 'react-s-alert'
import AttendanceForm from './AttendanceForm'

class Attendance extends Component {
  componentWillReceiveProps (nextProps) {
    if (nextProps.createAttendanceError) {
      let status = nextProps.createAttendanceError.status
      let message = nextProps.createAttendanceError.message
      Alert.error(`<h4>Error ${status}</h4><ul>` + (message ? (`<li>${message}</li>`) : '') + '</ul>', {
        position: 'bottom',
        effect: 'scale',
        html: true
      })
    }

    if (nextProps.creatingAttendanceSuccess) {
      let attendance = nextProps.attendance
      // Alert.success(`${attendance.get('objectId')} Recorded!`, {
      Alert.success('RECORDED', {
        position: 'bottom'
        // effect: 'scale'
      })
    }
  }

  handleValueChange (val) {
    this.setState({ name: val })
  }

  render () {
    return (
      <div className='container attendance-wrapper' style={{ marginTop: '5%' }}>
        <div className='hr-divider m-t m-b'>
          <h3 className='hr-divider-content hr-divider-heading'><img src='http://localhost:3000/usep-logo.png' width='70' /><img src='http://localhost:3000/ic-logo.png' width='70' /></h3>
        </div>
        <AttendanceForm {...this.props} />
        {/* <div className='flextable'>
          <div className='flextable-item flextable-primary'>
            <KeyboardedInput
              value={this.state.name}
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
              <button type='button' className='btn btn-lg btn-pill btn-success' onClick={this.onSubmit}>
                <span className='icon icon-pencil'></span>
              </button>
              <button type='button' onClick={e => { this.setState({name: ''}) }} className='btn btn-lg btn-pill btn-danger'>
                <span className='icon icon-erase'></span>
              </button>
            </div>
          </div>
        </div> */}
      </div>
    )
  }
}

Attendance.propTypes = {

}

export default Attendance
