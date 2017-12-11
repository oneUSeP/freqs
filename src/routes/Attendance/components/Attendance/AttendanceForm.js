import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextFieldGroup from 'components/common/TextFieldGroup'
import validateInput from 'utils/validators/attendance'

class AttendanceForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      college: '',
      email: '',
      mobile: '',
      isLoading: false,
      errors: []
    }
  }

  isValid = () => {
    const { errors, isValid } = validateInput(this.state)

    if (!isValid) {
      this.setState({ errors, isLoading: false })
    }

    return isValid
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault()
    let data = this.state
    if (this.isValid(data)) {
      this.setState({ name: '',
        college: '',
        email: '',
        mobile: '',
        isLoading: true,
        errors: {} })

      this.props.createAttendance(data)
    } else {
      // this.setState({verify: null})
    }
  }

  render () {
    return (
      <form className='form-access' >
        <div className='row text-center m-t-md'>
          <div className='w-lg m-x-auto'>
            <strong className='text-muted'>PERSONAL INFORMATION</strong>
            <div className='form-group row'>
              <TextFieldGroup
                onChange={this.onChange}
                value={this.state.name}
                field='name'
                placeholder='Full Name'
                error={this.state.errors.name}
              />
              <TextFieldGroup
                onChange={this.onChange}
                value={this.state.college}
                field='college'
                placeholder='College'
                error={this.state.errors.college}
              />
              <TextFieldGroup
                onChange={this.onChange}
                value={this.state.email}
                field='email'
                placeholder='Email'
                error={this.state.errors.email}
              />
              <TextFieldGroup
                onChange={this.onChange}
                value={this.state.mobile}
                field='mobile'
                placeholder='Mobile Number'
                error={this.state.errors.mobile}
              />
            </div>
            <div className='form-group row'>
              <button type='button' className='btn btn-lg btn-pill btn-success' onClick={this.onSubmit}>
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

AttendanceForm.propTypes = {

}

export default AttendanceForm
