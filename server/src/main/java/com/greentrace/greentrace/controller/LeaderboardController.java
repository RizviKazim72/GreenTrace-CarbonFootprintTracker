package com.greentrace.greentrace.controller;

import com.greentrace.greentrace.model.entity.Company;
import com.greentrace.greentrace.service.LeaderboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leaderboard")
@RequiredArgsConstructor
public class LeaderboardController {
    
    private final LeaderboardService leaderboardService;
    
    @GetMapping("/top")
    public ResponseEntity<List<Company>> getTopCompanies(
            @RequestParam(defaultValue = "10") int limit
    ) {
        List<Company> companies = leaderboardService.getTopCompanies(limit);
        return ResponseEntity.ok(companies);
    }
    
    @GetMapping("/industry/{industry}")
    public ResponseEntity<List<Company>> getTopCompaniesByIndustry(
            @PathVariable Company.Industry industry,
            @RequestParam(defaultValue = "10") int limit
    ) {
        List<Company> companies = leaderboardService.getTopCompaniesByIndustry(industry, limit);
        return ResponseEntity.ok(companies);
    }
    
    @GetMapping("/public/top")
    public ResponseEntity<List<Company>> getPublicLeaderboard(
            @RequestParam(defaultValue = "10") int limit
    ) {
        List<Company> companies = leaderboardService.getTopCompanies(limit);
        return ResponseEntity.ok(companies);
    }
    
    @GetMapping("/my-ranking")
    public ResponseEntity<java.util.Map<String, Object>> getMyRanking(
            @org.springframework.security.core.annotation.AuthenticationPrincipal com.greentrace.greentrace.model.entity.User user
    ) {
        java.util.Map<String, Object> ranking = leaderboardService.getMyRanking(user.getId());
        return ResponseEntity.ok(ranking);
    }
    
    @GetMapping("/rankings")
    public ResponseEntity<Page<Company>> getRankings(
            @RequestParam(required = false) Company.Industry industry,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        
        if (industry != null) {
            Page<Company> companies = leaderboardService.getCompaniesByIndustry(industry, pageable);
            return ResponseEntity.ok(companies);
        }
        
        List<Company> topCompanies = leaderboardService.getTopCompanies(size);
        return ResponseEntity.ok(Page.empty());
    }
}
