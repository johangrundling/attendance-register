/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.johan.csg.attendance.register.api.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Entity;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

/**
 *
 * @author johan
 */
@Embeddable
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentAttendanceEntityPK implements Serializable {

    @Basic(optional = false)
    @NotNull
    @Column(name = "student_id")
    private Long studentId;
    @Basic(optional = false)
    @NotNull
    @Column(name = "attendance_register_id")
    private Long attendanceRegisterId;

}
