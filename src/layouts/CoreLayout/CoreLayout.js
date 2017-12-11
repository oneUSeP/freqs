import React from 'react'
import Header from '../../components/Header'
import classes from './CoreLayout.scss'
import '../../styles/core.scss'
import Alert from 'react-s-alert'

import 'react-s-alert/dist/s-alert-default.css'
import 'react-s-alert/dist/s-alert-css-effects/scale.css'

import 'react-select/dist/react-select.css'

import LoadingBar from 'react-redux-loading-bar'

export const CoreLayout = ({ children }) => (
  <div className='container text-center'>
    {/* <Header /> */}
    <LoadingBar style={{position: 'fixed', top: 0, left: 0, backgroundColor: '#009dc7', zIndex: 9999, height: 5}} />
    <div className={classes.mainContainer}>
      {children}
      <Alert stack={{limit: 3}} />
    </div>
  </div>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
