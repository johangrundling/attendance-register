package org.johan.csg.attendance.register.api.mapper;

import org.johan.csg.attendance.register.api.db.entity.StudentAttendanceEntity;
import org.johan.csg.attendance.register.api.db.entity.StudentEntity;
import org.johan.csg.attendance.register.api.model.AttendanceRegisterRecord;
import org.johan.csg.attendance.register.api.model.Student;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

import java.util.List;
import java.util.Objects;

@Mapper(componentModel = "spring", builder = @Builder(disableBuilder = true))
public abstract class StudentMapper {

    public static StudentMapper INSTANCE = Mappers.getMapper(StudentMapper.class);

    @Mapping(target = "religionId", ignore = true)
    @Mapping(target = "classRoomId", ignore = true)
    @Mapping(target = "religionName", ignore = true)
    @Mapping(target = "classRoomName", ignore = true)
    public abstract Student mapStudent(StudentEntity source);
    public abstract List<Student> mapStudent(List<StudentEntity> source);

    @AfterMapping
    protected void withClassRoomAndReligion(StudentEntity source, @MappingTarget Student target) {

        if(!Objects.isNull(source.getReligion())){
            target.setReligionId(source.getReligion().getId());
            target.setReligionName(source.getReligion().getReligionName());
        }

        if(!Objects.isNull(source.getClassRoom())){
            target.setClassRoomId(source.getClassRoom().getId());
            target.setClassRoomName(source.getClassRoom().getName());
        }
    }

    @Mapping(target = "religion", ignore = true)
    @Mapping(target = "classRoom", ignore = true)
    public abstract StudentEntity mapStudentEntity(Student source);

    @AfterMapping
    protected void withClassRoomAndReligion(Student source, @MappingTarget StudentEntity target) {

//        if(!Objects.isNull(source.getReligion())){
//            target.setReligionId(source.getReligion().getId());
//            target.setReligionName(source.getReligion().getReligionName());
//        }
//
//        if(!Objects.isNull(source.getClassRoom())){
//            target.setClassRoomId(source.getClassRoom().getId());
//            target.setClassName(source.getClassRoom().getName());
//        }
    }


    @Mapping(target = "studentId", ignore = true)
    @Mapping(target = "fullName", ignore = true)
    public abstract AttendanceRegisterRecord mapStudentAttendance(StudentAttendanceEntity source);
    public abstract List<AttendanceRegisterRecord> mapStudentAttendance(List<StudentAttendanceEntity> source);

    @AfterMapping
    protected void withClassRoomAndReligion(StudentAttendanceEntity source, @MappingTarget AttendanceRegisterRecord target) {

        if(!Objects.isNull(source.getStudentEntity())){
            target.setStudentId(source.getStudentEntity().getId());
            target.setFullName(source.getStudentEntity().getFullName());
        }

    }

}




