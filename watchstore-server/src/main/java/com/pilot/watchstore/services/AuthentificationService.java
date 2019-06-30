package com.pilot.watchstore.services;

import com.pilot.watchstore.payload.JwtLoginSuccessResponse;
import com.pilot.watchstore.payload.LoginRequest;
import org.springframework.validation.BindingResult;

public interface AuthentificationService {
    JwtLoginSuccessResponse customerAuthentification(LoginRequest loginRequest , BindingResult result);
}
