package org.johan.csg.attendance.register.api.service;

import lombok.RequiredArgsConstructor;
import org.johan.csg.attendance.register.api.db.entity.StudentEntity;
import org.johan.csg.attendance.register.api.db.repository.ClassRoomRepository;
import org.johan.csg.attendance.register.api.db.repository.ReligionRepository;
import org.johan.csg.attendance.register.api.db.repository.StudentRepository;
import org.johan.csg.attendance.register.api.mapper.StudentMapper;
import org.johan.csg.attendance.register.api.model.RestApiResultStudent;
import org.johan.csg.attendance.register.api.model.Student;
import org.johan.csg.attendance.register.api.model.StudentQueryFilter;
import org.johan.csg.attendance.register.api.model.StudentQueryResponse;
import org.springframework.stereotype.Service;

import java.util.Objects;


@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository studentRepository;
    private final ClassRoomRepository classRoomRepository;
    private final ReligionRepository religionRepository;

    public RestApiResultStudent saveStudent(Student student) {
        StudentEntity se = StudentMapper.INSTANCE.mapStudentEntity(student);
        se.setClassRoom(classRoomRepository.findById(student.getClassRoomId())
                .orElse(null));
        if(!Objects.isNull(student.getReligionId())) {
            se.setReligion(religionRepository.findById(student.getReligionId())
                    .orElse(null));
        }
        se = studentRepository.save(se);
        return RestApiResultStudent.builder()
                .student(StudentMapper.INSTANCE.mapStudent(se))
                .build();
    }

    public RestApiResultStudent getStudentById(Long id) {
        StudentEntity se = studentRepository.findById(id).orElseThrow();
        return RestApiResultStudent.builder()
                .student(StudentMapper.INSTANCE.mapStudent(se))
                .build();
    }

    public StudentQueryResponse fetchStudentByFilter(StudentQueryFilter filter) {
        return StudentQueryResponse.builder()
                .students(StudentMapper.INSTANCE.mapStudent(studentRepository.findAll()))
                .build();
    }

    public void updateStudent(Student student) {
        StudentEntity se = studentRepository.findById(student.getId()).get();
        se.setFullName(student.getFullName());
        se.setNickname(student.getNickname());
        se.setStatus(student.getStatus());
        se.setClassRoom(classRoomRepository.findById(student.getClassRoomId())
                .orElse(null));
        se.setReligion(religionRepository.findById(student.getReligionId())
                .orElse(null));

        studentRepository.save(se);
    }
}
