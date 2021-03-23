package org.johan.csg.attendance.register.api.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.validation.annotation.Validated;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Validated
public class AttendanceRegisterRequest  implements Serializable {
  private static final long serialVersionUID = 1L;

  @JsonProperty("classRoomId")
  private Long classRoomId;

  @JsonProperty("registerDate")
  @org.springframework.format.annotation.DateTimeFormat(iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE)
  private LocalDate registerDate;

}

