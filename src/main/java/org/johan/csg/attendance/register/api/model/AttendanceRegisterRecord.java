package org.johan.csg.attendance.register.api.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.validation.annotation.Validated;

import java.io.Serializable;
import java.util.Objects;

/**
 * AttendanceRegisterResponse
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
@Validated
public class AttendanceRegisterRecord  implements Serializable {

  private Long studentId;

  private String fullName;

  private StudentAttendanceRequest.StatusEnum status;

  private String information;


}

