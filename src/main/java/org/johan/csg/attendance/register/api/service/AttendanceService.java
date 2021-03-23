package org.johan.csg.attendance.register.api.service;

import lombok.RequiredArgsConstructor;
import org.johan.csg.attendance.register.api.db.entity.*;
import org.johan.csg.attendance.register.api.db.repository.AttendanceRegisterRepository;
import org.johan.csg.attendance.register.api.db.repository.StudentAttendanceRepository;
import org.johan.csg.attendance.register.api.db.repository.StudentRepository;
import org.johan.csg.attendance.register.api.db.repository.TermRepository;
import org.johan.csg.attendance.register.api.mapper.StudentMapper;
import org.johan.csg.attendance.register.api.model.AttendanceRegisterRequest;
import org.johan.csg.attendance.register.api.model.AttendanceRegisterResponse;
import org.johan.csg.attendance.register.api.model.StudentAttendanceRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class AttendanceService {

    private final AttendanceRegisterRepository attendanceRegisterRepository;

    private final TermRepository termRepository;

    private final StudentAttendanceRepository studentAttendanceRepository;

    public void recordStudentAttendance(StudentAttendanceRequest request) {

        StudentAttendanceEntity sae = studentAttendanceRepository
                .findByStudentAttendanceEntityPK_StudentIdAndStudentAttendanceEntityPK_AttendanceRegisterId(
                        request.getStudentId(),
                        request.getAttendanceRegisterId());

        sae.setStatus(request.getStatus());
        sae.setInformation(request.getInformation());
        sae.setUpdated(LocalDate.now());

        studentAttendanceRepository.save(sae);
    }

    public AttendanceRegisterResponse fetchAttendanceRegister(AttendanceRegisterRequest request) {

        AttendanceRegisterEntity are = attendanceRegisterRepository
                .findFirstByClassRoom_IdAndRegisterDate(
                        request.getClassRoomId(), request.getRegisterDate());

        if (Objects.isNull(are)) {
            TermEntity term = termRepository.findFirstByTermStartDateBeforeAndTermEndDateAfter(
                    request.getRegisterDate(),
                    request.getRegisterDate()
            );

            AttendanceRegisterEntity nare = AttendanceRegisterEntity.builder()
                    .registerDate(request.getRegisterDate())
                    .term(term)
                    .classRoom(ClassRoomEntity.builder().id(request.getClassRoomId()).build())
                    .build();

            are = attendanceRegisterRepository.save(nare);

            attendanceRegisterRepository.generateRegister(are.getId());

        }

        List<StudentAttendanceEntity> studentAttendanceEntityList =
                studentAttendanceRepository.findByStudentAttendanceEntityPK_AttendanceRegisterId(are.getId());

        return AttendanceRegisterResponse.builder()
                .attendanceRegisterId(are.getId())
                .registerDate(are.getRegisterDate())
                .classRoomId(request.getClassRoomId())
                .term(are.getTerm().getDescription())
                .students(StudentMapper.INSTANCE.mapStudentAttendance(studentAttendanceEntityList))
                .build();
    }


}
