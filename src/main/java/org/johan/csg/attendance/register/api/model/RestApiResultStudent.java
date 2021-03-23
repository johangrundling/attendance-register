package org.johan.csg.attendance.register.api.model;

import lombok.*;
import org.springframework.validation.annotation.Validated;

@Data
@Builder ()
@AllArgsConstructor
@NoArgsConstructor
@Validated
@EqualsAndHashCode(callSuper = false)
public class RestApiResultStudent extends RestApiResult{
      private Student student;
}
