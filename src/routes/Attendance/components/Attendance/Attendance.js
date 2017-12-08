import React, { Component } from 'react'
import PropTypes from 'prop-types'
import KeyboardedInput from 'react-touch-screen-keyboard'
import validateInput from 'utils/validators/attendance'
import Alert from 'react-s-alert'

class Attendance extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      isLoading: false,
      errors: [],
      customMapping: [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', '@'],
        ['z', 'x', 'c', 'v', 'b', 'n', 'm', '.com']
      ]
    }
    this.handleValueChange = this.handleValueChange.bind(this)
  }

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
      Alert.success('Recorded!', {
        position: 'bottom'
        // effect: 'scale'
      })
    }
  }

  handleValueChange (val) {
    this.setState({ name: val })
  }

  isValid = () => {
    const { errors, isValid } = validateInput(this.state)

    if (!isValid) {
      this.setState({ errors, isLoading: false })
    }

    return isValid
  }

  onSubmit = (e) => {
    e.preventDefault()
    let data = this.state
    if (this.isValid(data)) {
      this.setState({ name: '',
        isLoading: true,
        errors: {} })

      this.props.createAttendance(data)
    } else {
      // this.setState({verify: null})
    }
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
        </div>
      </div>
    )
  }
}

Attendance.propTypes = {

}

export default Attendance
