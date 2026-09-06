package com.pcforge.recommendation.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {

    @GetMapping("/build")
    public ResponseEntity<Map<String, Object>> getRecommendedBuild(
            @RequestParam(defaultValue = "100000") Double budget,
            @RequestParam(defaultValue = "GAMING") String useCase) {

        Map<String, Object> recommendation = new HashMap<>();
        recommendation.put("targetBudget", budget);
        recommendation.put("useCase", useCase);

        if (budget >= 150000) {
            recommendation.put("tier", "High End 4K Beast");
            recommendation.put("components", Map.of(
                    "cpu", "AMD Ryzen 7 7800X3D",
                    "gpu", "NVIDIA RTX 4070 Ti Super",
                    "motherboard", "MSI MAG B650 Tomahawk WiFi",
                    "ram", "Corsair Vengeance RGB 32GB DDR5 6000MHz",
                    "ssd", "Samsung 990 PRO 2TB NVMe",
                    "psu", "Corsair RM850x 850W Gold",
                    "cabinet", "NZXT H9 Flow"
            ));
            recommendation.put("estimatedPrice", 168493.00);
        } else {
            recommendation.put("tier", "Mid-Range 1440p Champion");
            recommendation.put("components", Map.of(
                    "cpu", "Intel Core i7-14700K",
                    "gpu", "NVIDIA RTX 4060 Ti",
                    "motherboard", "ASUS ROG Strix Z790-F",
                    "ram", "Corsair Vengeance RGB 32GB DDR5",
                    "ssd", "Samsung 990 PRO 2TB NVMe",
                    "psu", "Corsair RM850x 850W Gold",
                    "cabinet", "NZXT H9 Flow"
            ));
            recommendation.put("estimatedPrice", 99999.00);
        }

        return ResponseEntity.ok(recommendation);
    }
}
