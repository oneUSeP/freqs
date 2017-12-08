import {
  connect
} from 'react-redux'

import Attendance from '../components/Attendance'
import {
  getAttendances,
  createAttendance,
  updateAttendance,
  deleteAttendance
} from 'store/modules/attendance'

const mapActionCreators = {
  getAttendances,
  createAttendance,
  updateAttendance,
  deleteAttendance
}

const mapStateToProps = (state) => ({
  attendance: state.attendance.get('attendance'),
  creatingAttendanceSuccess: state.attendance.get('creatingAttendanceSuccess'),
  createAttendanceError: state.attendance.get('createAttendanceError')
})

export default connect(mapStateToProps, mapActionCreators)(Attendance)
