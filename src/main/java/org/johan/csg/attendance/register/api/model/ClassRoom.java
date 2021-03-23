/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.johan.csg.attendance.register.api.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

/**
 * @author johan
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClassRoom implements Serializable {

    private Long id;

    private String name;

    private short grade;

    private String info;
}
