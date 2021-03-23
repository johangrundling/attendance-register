package org.johan.csg.attendance.register.api.model;

import lombok.*;
import org.springframework.validation.annotation.Validated;

import java.util.List;

@Data
@Builder ()
@AllArgsConstructor
@NoArgsConstructor
@Validated
@EqualsAndHashCode(callSuper = false)
public class RestApiResultReligions extends RestApiResult{

      private List<Religion> religions;

}
