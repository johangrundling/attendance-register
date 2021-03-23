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

/**
 * Student
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Validated
public class Student  implements Serializable {
  private static final long serialVersionUID = 1L;

  private Long id;

  private String fullName;

  private String nickname;

  private Long classRoomId;

  private String classRoomName;

  private Long religionId;

  private String religionName;

  private StatusEnum status;

  public enum StatusEnum {
    active("active"),
    present("inactive");

    private String value;

    StatusEnum(String value) {
      this.value = value;
    }

    @JsonValue
    public String getValue() {
      return value;
    }

    @Override
    public String toString() {
      return String.valueOf(value);
    }

    @JsonCreator
    public static StudentAttendanceRequest.StatusEnum fromValue(String value) {
      for (StudentAttendanceRequest.StatusEnum b : StudentAttendanceRequest.StatusEnum.values()) {
        if (b.getValue().equals(value)) {
          return b;
        }
      }
      throw new IllegalArgumentException("Unexpected value '" + value + "'");
    }
  }

}

