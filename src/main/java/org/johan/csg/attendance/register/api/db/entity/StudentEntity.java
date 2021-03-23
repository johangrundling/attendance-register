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
import org.johan.csg.attendance.register.api.model.Student;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

/**
 *
 * @author johan
 */
@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "student")
public class StudentEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Long id;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 45)
    @Column(name = "fullName")
    private String fullName;
    @Size(max = 45)
    @Column(name = "nickname")
    private String nickname;
    @Enumerated(EnumType.STRING)
    @NotNull
    private Student.StatusEnum status;
    @JoinColumn(name = "religion_id", referencedColumnName = "id" )
    @ManyToOne(fetch = FetchType.EAGER,  cascade = CascadeType.ALL)
    private ReligionEntity religion;
    @JoinColumn(name = "class_room_id", referencedColumnName = "id")
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private ClassRoomEntity classRoom;

}
