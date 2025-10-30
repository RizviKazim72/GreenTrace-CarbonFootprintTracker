package com.greentrace.greentrace.controller;

import com.greentrace.greentrace.model.dto.request.LoginRequest;
import com.greentrace.greentrace.model.dto.request.RegisterRequest;
import com.greentrace.greentrace.model.dto.response.AuthResponse;
import com.greentrace.greentrace.model.entity.User;
import com.greentrace.greentrace.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    
    private final AuthService authService;
    
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser(@AuthenticationPrincipal User user) {
        User currentUser = authService.getCurrentUser(user.getEmail());
        return ResponseEntity.ok(currentUser);
    }
}
