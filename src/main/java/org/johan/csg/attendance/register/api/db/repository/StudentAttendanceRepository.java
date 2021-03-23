package org.johan.csg.attendance.register.api.db.repository;

import org.johan.csg.attendance.register.api.db.entity.StudentAttendanceEntity;
import org.johan.csg.attendance.register.api.db.entity.StudentAttendanceEntityPK;
import org.johan.csg.attendance.register.api.db.entity.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentAttendanceRepository extends JpaRepository<StudentAttendanceEntity, StudentAttendanceEntityPK> {

    List<StudentAttendanceEntity> findByStudentAttendanceEntityPK_AttendanceRegisterId(Long registerId);

    StudentAttendanceEntity findByStudentAttendanceEntityPK_StudentIdAndStudentAttendanceEntityPK_AttendanceRegisterId(
            Long studentId, Long attendanceRegisterId);

}
