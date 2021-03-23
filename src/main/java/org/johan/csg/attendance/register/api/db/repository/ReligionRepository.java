package org.johan.csg.attendance.register.api.db.repository;

import org.johan.csg.attendance.register.api.db.entity.ReligionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReligionRepository extends JpaRepository<ReligionEntity, Long> {

}
