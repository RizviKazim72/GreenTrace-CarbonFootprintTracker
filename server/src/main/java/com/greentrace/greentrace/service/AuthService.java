package com.greentrace.greentrace.service;

import com.greentrace.greentrace.config.JwtUtil;
import com.greentrace.greentrace.model.dto.request.LoginRequest;
import com.greentrace.greentrace.model.dto.request.RegisterRequest;
import com.greentrace.greentrace.model.dto.response.AuthResponse;
import com.greentrace.greentrace.model.entity.Company;
import com.greentrace.greentrace.model.entity.User;
import com.greentrace.greentrace.repository.CompanyRepository;
import com.greentrace.greentrace.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {
    
    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }
        
        // Create user
        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(User.Role.COMPANY)
                .enabled(true)
                .build();
        
        user = userRepository.save(user);
        
        // Create company
        Company company = Company.builder()
                .name(request.getCompanyName())
                .industry(request.getIndustry())
                .size(request.getCompanySize())
                .description(request.getDescription())
                .website(request.getWebsite())
                .address(request.getAddress())
                .phone(request.getPhone())
                .user(user)
                .greenPoints(0)
                .totalFootprint(0.0)
                .build();
        
        company = companyRepository.save(company);
        
        // Generate JWT token
        String token = jwtUtil.generateToken(user);
        
        return AuthResponse.builder()
                .token(token)
                .type("Bearer")
                .userId(user.getId())
                .email(user.getEmail())
                .role(user.getRole())
                .companyId(company.getId())
                .companyName(company.getName())
                .build();
    }
    
    public AuthResponse login(LoginRequest request) {
        // Authenticate user
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        
        // Get user
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Get company
        Company company = companyRepository.findByUserId(user.getId())
                .orElse(null);
        
        // Generate JWT token
        String token = jwtUtil.generateToken(user);
        
        return AuthResponse.builder()
                .token(token)
                .type("Bearer")
                .userId(user.getId())
                .email(user.getEmail())
                .role(user.getRole())
                .companyId(company != null ? company.getId() : null)
                .companyName(company != null ? company.getName() : null)
                .build();
    }
    
    public User getCurrentUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
