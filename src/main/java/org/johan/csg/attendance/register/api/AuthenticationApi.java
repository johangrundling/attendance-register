package org.johan.csg.attendance.register.api;

import java.util.Objects;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.johan.csg.attendance.register.api.model.AttendanceRegisterResponse;
import org.johan.csg.attendance.register.api.model.AuthenticationRequest;
import org.johan.csg.attendance.register.api.model.AuthenticationResponse;
import org.johan.csg.attendance.register.api.security.JwtTokenUtil;
import org.johan.csg.attendance.register.api.security.JwtUserDetailsService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
@Slf4j
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:8080")
public class AuthenticationApi {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;
    private final JwtUserDetailsService userDetailsService;

    @ApiOperation(value = "Generate token based on user credentials", nickname = "authenticate", response = AttendanceRegisterResponse.class, tags = {"authentication-api"})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "successful operation", response = AuthenticationResponse.class),
            @ApiResponse(code = 200, message = "successful operation")})
    @RequestMapping(value = "/authenticate",
            produces = "application/json",
            consumes = "application/json",
            method = RequestMethod.POST)
    public ResponseEntity<?> authenticate(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {

        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(authenticationRequest.getUsername());

        final String token = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthenticationResponse(token));
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            log.error("User disabled: {} ", username);
            throw new Exception("User disabled", e);
        } catch (BadCredentialsException e) {
            log.error("Invalid logon details: {} ", username);
            throw new Exception("Invalid logon details", e);
        }
    }
}