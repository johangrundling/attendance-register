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
import org.johan.csg.attendance.register.api.model.StudentAttendanceRequest;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDate;

/**
 *
 * @author johan
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "student_attendance")
public class StudentAttendanceEntity implements Serializable {

    @EmbeddedId
    protected StudentAttendanceEntityPK studentAttendanceEntityPK;
    @Enumerated(EnumType.STRING)
    private StudentAttendanceRequest.StatusEnum status;
    private String information;
    @Basic(optional = false)
    @NotNull
    @Column(name = "updated")
    private LocalDate updated;
    @JoinColumn(name = "attendance_register_id", referencedColumnName = "id", insertable = false, updatable = false)
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private AttendanceRegisterEntity attendanceRegisterEntity;
    @JoinColumn(name = "student_id", referencedColumnName = "id", insertable = false, updatable = false)
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private StudentEntity studentEntity;

}
