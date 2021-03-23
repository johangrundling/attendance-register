package org.johan.csg.attendance.register.api.db.repository;

import org.johan.csg.attendance.register.api.db.entity.AttendanceRegisterEntity;
import org.johan.csg.attendance.register.api.model.StudentAttendanceRecord;
import org.johan.csg.attendance.register.api.model.StudentTermAttendanceRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AttendanceRegisterRepository extends JpaRepository<AttendanceRegisterEntity, Long> {

    AttendanceRegisterEntity findFirstByClassRoom_IdAndRegisterDate(Long classRoomId, LocalDate registerDate);


    /**
     * Find loans stats on loan projections
     *
     * @return LoanStats, it includes totaldisbursed amount and refinanceRequestCount.
     */
    @Query(value = "select cr.name as classRoomName, cr.grade as grade, s.full_name as fullName, sa.status as status, sa.information as information from student_attendance sa " +
            "left join student s on s.id = sa.student_id " +
            "left join attendance_register ar on ar.id = sa.attendance_register_id " +
            "left join class_room cr on cr.id = ar.class_room_id", nativeQuery = true)
    List<StudentAttendanceRecord> reportDaily();

    @Query(value = "select s.id as studentId, cr.name as classRoomName, cr.grade as grade, s.full_name as fullName," +
            "            sum(case when sa.status in ('present') then 1 else 0 end) as presentCnt," +
            "            sum(case when sa.status in ( 'absent') then 1 else 0 end) as absentCnt ," +
            "            sum(case when sa.status in ('excused') then 1 else 0 end) as excusedCnt ," +
            "            sum(case when sa.status in ('unknown') then 1 else 0 end) as unknownCnt " +
            "           from student_attendance sa " +
            "            left join student s on s.id = sa.student_id " +
            "            left join attendance_register ar on ar.id = sa.attendance_register_id " +
            "            left join class_room cr on cr.id = ar.class_room_id " +
            "             group by s.id", nativeQuery = true)
    List<StudentTermAttendanceRecord> reportTerm();


    @Modifying
    @Transactional
    @Query(value = "     INSERT INTO student_attendance" +
            "            (student_id," +
            "             attendance_register_id," +
            "             status," +
            "             information," +
            "             updated)" +
            "    select s.id, ar.id, " +
            "        CASE WHEN  sa.id is not null OR rh.religion_id is not null THEN 'excused' else 'unknown'  END ,\n" +
            "        IFNULL( rh.holiday_name,sa.reason), CURRENT_TIMESTAMP() " +
            "    from attendance_register ar" +
            "    join class_room cr on cr.id = ar.class_room_id" +
            "    join student s on s.class_room_id = cr.id" +
            "    left join religion r on r.id = s.religion_id" +
            "    left join holiday rh on rh.religion_id = r.id and holiday_date = ar.register_date" +
            "    left join student_absence sa on sa.student_id = s.id and ar.register_date between sa.from_date and sa.to_date" +
            "    where ar.id = ?", nativeQuery = true)
    public void generateRegister(Long registerId);


}
