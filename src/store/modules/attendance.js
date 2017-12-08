import Immutable from 'immutable'
import { CALL_API } from 'redux-api-middleware'
import _ from 'lodash'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const CREATE_ATTENDANCE = 'api/CREATE_ATTENDANCE'
export const CREATE_ATTENDANCE_SUCCESS = 'api/CREATE_ATTENDANCE_SUCCESS'
export const CREATE_ATTENDANCE_FAIL = 'api/CREATE_ATTENDANCE_FAIL'
export const GET_ATTENDANCES = 'api/GET_ATTENDANCES'
export const GET_ATTENDANCES_SUCCESS = 'api/GET_ATTENDANCES_SUCCESS'
export const GET_ATTENDANCES_FAIL = 'api/GET_ATTENDANCES_FAIL'
export const DELETE_ATTENDANCE = 'api/DELETE_ATTENDANCE'
export const DELETE_ATTENDANCE_SUCCESS = 'api/DELETE_ATTENDANCE_SUCCESS'
export const DELETE_ATTENDANCE_FAIL = 'api/DELETE_ATTENDANCE_FAIL'

// ------------------------------------
// Actions
// ------------------------------------

export function getAttendances () {
  return (dispatch, getState) => {
    dispatch(showLoading())
    let endpoint = 'api/parse/classes/Attendance'
    return dispatch({
      [CALL_API]: {
        endpoint,
        method: 'GET',
        headers: {
          'X-Parse-Application-Id': `${process.env.APPLICATION_ID}`,
          'X-Parse-REST-API-Key': `${process.env.REST_API_KEY}`,
          'Content-Type': 'application/json'
        },
        types: [GET_ATTENDANCES, GET_ATTENDANCES_SUCCESS, GET_ATTENDANCES_FAIL]
      }
    }).then(() => { dispatch(hideLoading()) })
  }
}

export function createAttendance (data) {
  let { name } = data
  return (dispatch, getState) => {
    console.log(process.env)
    return dispatch({
      [CALL_API]: {
        endpoint: '/api/parse/classes/Attendance',
        method: 'POST',
        headers: {
          'X-Parse-Application-Id': 'myAppId',
          'X-Parse-REST-API-Key': 'masterKey',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({'name': name}),
        types: [
          CREATE_ATTENDANCE,
          CREATE_ATTENDANCE_SUCCESS,
          CREATE_ATTENDANCE_FAIL]
      }
    })
  }
}

export function updateAttendance (objId, data) {
  return (dispatch, getState) => {
    return dispatch({
      [CALL_API]: {
        endpoint: `/api/classes/Attendance/${objId}`,
        method: 'PUT',
        headers: {
          'X-Parse-Application-Id': `${process.env.APPLICATION_ID}`,
          'X-Parse-REST-API-Key': `${process.env.REST_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        types: [
          CREATE_ATTENDANCE,
          CREATE_ATTENDANCE_SUCCESS,
          CREATE_ATTENDANCE_FAIL]
      }
    })
  }
}

export function deleteAttendance (objId) {
  return (dispatch, getState) => {
    return dispatch({
      [CALL_API]: {
        endpoint: `/api/classes/Attendance/${objId}`,
        method: 'DELETE',
        headers: {
          'X-Parse-Application-Id': `${process.env.APPLICATION_ID}`,
          'X-Parse-REST-API-Key': `${process.env.REST_API_KEY}`
        },
        types: [
          DELETE_ATTENDANCE,
          DELETE_ATTENDANCE_SUCCESS,
          DELETE_ATTENDANCE_FAIL]
      }
    })
  }
}

export const actions = {
  getAttendances,
  createAttendance,
  deleteAttendance,
  updateAttendance
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const actionHandlers = {}

// ------------------------------------
// Rehydrate store action handler
// ------------------------------------

actionHandlers[ CREATE_ATTENDANCE ] = state => {
  return state.merge({
    creatingAttendance: true,
    creatingAttendanceSuccess: false,
    createAttendanceError: null,
    deletingAttendanceSuccess: false
  })
}

actionHandlers[ CREATE_ATTENDANCE_SUCCESS ] = (state, action) => {
  return state.merge({
    creatingAttendance: false,
    creatingAttendanceSuccess: true,
    createAttendanceError: null,
    attendance: action.payload
  })
}

actionHandlers[ CREATE_ATTENDANCE_FAIL ] = (state, action) => {
  return state.merge({
    creatingAttendance: false,
    creatingAttendanceSuccess: false,
    createAttendanceError: action.payload
  })
}

actionHandlers[ GET_ATTENDANCES ] = state => {
  return state.merge({
    fetchingAttendances: true,
    fetchingAttendancesSuccess: false,
    getAttendancesError: null,
    creatingAttendanceSuccess: false,
    deletingAttendanceSuccess: false
  })
}

actionHandlers[ GET_ATTENDANCES_SUCCESS ] = (state, action) => {
  return state.merge({
    fetchingAttendances: false,
    fetchingAttendancesSuccess: true,
    getAttendancesError: null,
    attendances: action.payload.data.attendances
  })
}

actionHandlers[ GET_ATTENDANCES_FAIL ] = (state, action) => {
  return state.merge({
    fetchingAttendances: false,
    fetchingAttendancesSuccess: false,
    getAttendancesError: action.payload.response.error
  })
}

actionHandlers[ DELETE_ATTENDANCE ] = state => {
  return state.merge({
    deletingAttendance: true,
    deletingAttendanceSuccess: false,
    deleteAttendanceError: null
  })
}

actionHandlers[ DELETE_ATTENDANCE_SUCCESS ] = (state, action) => {
  return state.merge({
    deletingAttendance: false,
    deletingAttendanceSuccess: true,
    deleteAttendanceError: null
  })
}

actionHandlers[ DELETE_ATTENDANCE_FAIL ] = (state, action) => {
  return state.merge({
    deletingAttendance: false,
    deletingAttendanceSuccess: false,
    deleteAttendanceError: action.payload.response.error
  })
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = Immutable.fromJS({
  attendance: null,
  createAttendanceError: false,
  creatingAttendanceSuccess: false,
  attendances: null,
  getAttendancesError: false,
  fetchingAttendanceSuccess: false,
  deleteAttendanceError: false,
  deletingAttendanceSuccess: false
})

export default function reducer (state = initialState, action) {
  const handler = actionHandlers[ action.type ]

  return handler ? handler(state, action) : state
}

