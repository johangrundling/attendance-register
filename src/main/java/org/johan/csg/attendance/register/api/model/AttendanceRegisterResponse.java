package org.johan.csg.attendance.register.api.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.validation.annotation.Validated;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Validated
public class AttendanceRegisterResponse {

    private Long attendanceRegisterId;

    private Long classRoomId;

    @JsonProperty("registerDate")
    @org.springframework.format.annotation.DateTimeFormat(iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE)
    private LocalDate registerDate;

    private String term;

    private List<AttendanceRegisterRecord> students;

}
