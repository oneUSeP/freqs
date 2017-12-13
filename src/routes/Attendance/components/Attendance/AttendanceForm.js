import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextFieldGroup from 'components/common/TextFieldGroup'
import validateInput from 'utils/validators/attendance'
import {FormGroup, InputGroup, FormControl, DropdownButton, MenuItem} from 'react-bootstrap'
import classnames from 'classnames'

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
            <div className='dashhead'>
              <div className='dashhead-titles' style={{float: 'none'}}>
                <h6 className='dashhead-subtitle'>USeP-IC Open House (39th Foundation Day)</h6>
                <h3 className='dashhead-title'>PERSONAL INFORMATION</h3>
              </div>
            </div>
            <div className='form-group row'>
              <TextFieldGroup
                onChange={this.onChange}
                value={this.state.name}
                field='name'
                placeholder='Full Name'
                error={this.state.errors.name}
              />
              <FormGroup className={classnames({ 'has-error': this.state.errors.college })}>
              {this.state.errors.college && <small className='help-block text-right'>{this.state.errors.college}</small>}
                <InputGroup>
                  <input
                    onChange={this.onChange}
                    value={this.state.college}
                    type={this.state.type}
                    name='college'
                    className={'form-control'}
                  />
                  <DropdownButton
                    componentClass={InputGroup.Button}
                    id='input-dropdown-addon'
                    title='SELECT'
                    onSelect={e => { this.setState({college: e}) }}
                  >
                    <MenuItem eventKey={'College of Arts and Sciences'}>College of Arts and Sciences</MenuItem>
                    <MenuItem eventKey={'College of Education'} >College of Education</MenuItem>
                    <MenuItem eventKey={'College of Engineering'} >College of Engineering</MenuItem>
                    <MenuItem eventKey={'College of Governance and Business'} >College of Governance and Business</MenuItem>
                    <MenuItem eventKey={'College of Technology'}>College of Technology</MenuItem>
                    <MenuItem eventKey={'School of Applied Economics'} >School of Applied Economics</MenuItem>
                    <MenuItem eventKey={'Institute of Computing'} >Institute of Computing</MenuItem>
                    <MenuItem eventKey={'University Evening Program'} >University Evening Program</MenuItem>
                  </DropdownButton>
                </InputGroup>
                <span className='statcard-desc'>College</span>
              </FormGroup>
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
