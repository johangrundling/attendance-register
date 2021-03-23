package org.johan.csg.attendance.register.api.db.repository;

import org.johan.csg.attendance.register.api.db.entity.ClassRoomEntity;
import org.johan.csg.attendance.register.api.db.entity.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClassRoomRepository extends JpaRepository<ClassRoomEntity, Long> {


}
