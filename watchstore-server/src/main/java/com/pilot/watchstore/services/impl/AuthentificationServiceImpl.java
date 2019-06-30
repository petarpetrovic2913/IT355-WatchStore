package com.pilot.watchstore.services.impl;

import com.pilot.watchstore.config.JwtTokenProvider;
import com.pilot.watchstore.exceptions.handlers.ValidationException;
import com.pilot.watchstore.payload.JwtLoginSuccessResponse;
import com.pilot.watchstore.payload.LoginRequest;
import com.pilot.watchstore.services.AuthentificationService;
import com.pilot.watchstore.services.validation.MapValidationErrorService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import java.util.Map;

import static com.pilot.watchstore.config.SecurityConstants.TOKEN_PREFIX;

@Service
public class AuthentificationServiceImpl implements AuthentificationService {

    private AuthenticationManager authenticationManager;
    private JwtTokenProvider tokenProvider;
    private MapValidationErrorService mapValidationErrorService;

    public AuthentificationServiceImpl(AuthenticationManager authenticationManager, JwtTokenProvider tokenProvider, MapValidationErrorService mapValidationErrorService) {
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
        this.mapValidationErrorService = mapValidationErrorService;
    }


    public JwtLoginSuccessResponse customerAuthentification(LoginRequest loginRequest , BindingResult result) {

        Map errorMap = mapValidationErrorService.mapValidationService(result);
        if(errorMap != null) throw new ValidationException(errorMap);

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = TOKEN_PREFIX + tokenProvider.generateToken(authentication,loginRequest.isRememberMe());

        return new JwtLoginSuccessResponse(true , jwt);
    }

}
