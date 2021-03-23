package org.johan.csg.attendance.register.api.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.validation.annotation.Validated;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Validated
public class StudentAttendanceRequest {

    @ApiModelProperty(example = "1", required = true)
    Long attendanceRegisterId;

    @ApiModelProperty(example = "1", required = true)
    Long studentId;

    @ApiModelProperty(example = "unknown", required = true)
    StatusEnum status;

    String information;

    public enum StatusEnum {
        unknown("unknown"),
        present("present"),
        absent("absent"),
        excused("excused");

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
        public static StatusEnum fromValue(String value) {
            for (StatusEnum b : StatusEnum.values()) {
                if (b.value.equals(value)) {
                    return b;
                }
            }
            throw new IllegalArgumentException("Unexpected value '" + value + "'");
        }
    }
}
