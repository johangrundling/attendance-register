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
public class RestApiResultClassRooms extends RestApiResult{

      private List<ClassRoom> classRooms;

}
