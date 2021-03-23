package org.johan.csg.attendance.register.api.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.validation.annotation.Validated;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Validated
public class StudentQueryFilter {
    String fullname;
    Long classRoomId;
}
