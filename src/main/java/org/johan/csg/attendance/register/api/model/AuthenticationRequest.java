package org.johan.csg.attendance.register.api.model;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.validation.annotation.Validated;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Validated
public class AuthenticationRequest implements Serializable {

    @ApiModelProperty(example = "csg", required = true)
    private String username;
    @ApiModelProperty(example = "password", required = true)
    private String password;

}