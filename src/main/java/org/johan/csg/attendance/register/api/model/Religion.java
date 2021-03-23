package org.johan.csg.attendance.register.api.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.validation.annotation.Validated;

import java.io.Serializable;

/**
 * Student
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Validated
public class Religion implements Serializable {

  private Long id;

  private String religionName;

}

