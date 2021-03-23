package org.johan.csg.attendance.register.api.model;


public interface StudentTermAttendanceRecord {

    Long getStudentId();
    String getClassRoomName();
    String getGrade();
    String getFullName();
    Long getPresentCnt();
    Long getAbsentCnt();
    Long getExcusedCnt();
    Long getUnknownCnt();
}
