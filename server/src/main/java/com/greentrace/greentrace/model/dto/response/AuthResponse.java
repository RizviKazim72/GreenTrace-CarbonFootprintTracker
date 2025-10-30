package com.greentrace.greentrace.model.dto.response;

import com.greentrace.greentrace.model.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponse {
    
    private String token;
    private String refreshToken;
    private String type;
    private Long userId;
    private String email;
    private User.Role role;
    private Long companyId;
    private String companyName;
    
    @Builder.Default
    private String tokenType = "Bearer";
}
