package org.johan.csg.attendance.register.api.db.repository;

import org.johan.csg.attendance.register.api.db.entity.ReligionEntity;
import org.johan.csg.attendance.register.api.db.entity.TermEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface TermRepository extends JpaRepository<TermEntity, Long> {
    TermEntity findFirstByTermStartDateBeforeAndTermEndDateAfter(
            LocalDate registerDateStart, LocalDate registerDateEnd);

}
