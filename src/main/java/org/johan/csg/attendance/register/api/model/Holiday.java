package org.johan.csg.attendance.register.api.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.validation.annotation.Validated;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * Student
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Validated
public class Holiday implements Serializable {

  private Long id;

  private String holidayName;

  private LocalDate holidayDate;

  private String info;

}

