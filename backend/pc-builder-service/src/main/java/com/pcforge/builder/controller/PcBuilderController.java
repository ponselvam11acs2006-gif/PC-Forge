package com.pcforge.builder.controller;

import com.pcforge.builder.dto.BuildValidationRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/pc-builder")
public class PcBuilderController {

    @PostMapping("/validate")
    public ResponseEntity<Map<String, Object>> validateBuild(@RequestBody BuildValidationRequest request) {
        List<String> errors = new ArrayList<>();
        List<String> warnings = new ArrayList<>();
        int estimatedWattage = 100; // Base motherboard, fans, storage draw

        // 1. CPU & Motherboard Socket Check
        String cpuSocket = request.getCpu() != null ? (String) request.getCpu().get("socket") : null;
        String moboSocket = request.getMotherboard() != null ? (String) request.getMotherboard().get("socket") : null;

        if (cpuSocket != null && moboSocket != null && !cpuSocket.equalsIgnoreCase(moboSocket)) {
            errors.add("ERROR: Selected CPU uses " + cpuSocket + " socket, but Motherboard supports " + moboSocket + ". Please select a compatible motherboard.");
        }

        // 2. RAM & Motherboard Compatibility
        String ramType = request.getRam() != null ? (String) request.getRam().get("ram_type") : null;
        String moboRamType = request.getMotherboard() != null ? (String) request.getMotherboard().get("ram_type") : null;

        if (ramType != null && moboRamType != null && !ramType.equalsIgnoreCase(moboRamType)) {
            errors.add("ERROR: Selected RAM is " + ramType + ", but Motherboard supports " + moboRamType + " memory.");
        }

        // 3. Power Consumption & PSU Calculation
        if (request.getCpu() != null && request.getCpu().containsKey("power")) {
            estimatedWattage += ((Number) request.getCpu().get("power")).intValue();
        } else {
            estimatedWattage += 120;
        }

        if (request.getGpu() != null && request.getGpu().containsKey("power")) {
            estimatedWattage += ((Number) request.getGpu().get("power")).intValue();
        } else {
            estimatedWattage += 200;
        }

        if (request.getPsu() != null && request.getPsu().containsKey("wattage")) {
            int psuWattage = ((Number) request.getPsu().get("wattage")).intValue();
            if (psuWattage < estimatedWattage + 50) {
                errors.add("ERROR: Selected PSU (" + psuWattage + "W) is insufficient for system total draw of ~" + estimatedWattage + "W. Recommend at least " + (estimatedWattage + 150) + "W PSU.");
            } else if (psuWattage < estimatedWattage + 150) {
                warnings.add("WARNING: PSU headroom is low. Total system draw ~" + estimatedWattage + "W on a " + psuWattage + "W PSU.");
            }
        }

        boolean compatible = errors.isEmpty();

        // 4. Performance FPS Estimation
        Map<String, String> gameFps = new HashMap<>();
        if (request.getGpu() != null) {
            String gpuName = (String) request.getGpu().get("name");
            if (gpuName != null && gpuName.contains("4070")) {
                gameFps.put("Valorant (1440p)", "320+ FPS");
                gameFps.put("Cyberpunk 2077 (1440p Ultra RT)", "95 FPS");
                gameFps.put("Forza Horizon 5 (4K Ultra)", "115 FPS");
            } else {
                gameFps.put("Valorant (1080p)", "240 FPS");
                gameFps.put("Cyberpunk 2077 (1080p High)", "75 FPS");
                gameFps.put("Forza Horizon 5 (1080p Ultra)", "90 FPS");
            }
        } else {
            gameFps.put("Valorant (1080p)", "120 FPS");
            gameFps.put("GTA V (1080p Medium)", "60 FPS");
        }

        Map<String, Object> response = new HashMap<>();
        response.put("compatible", compatible);
        response.put("errors", errors);
        response.put("warnings", warnings);
        response.put("estimatedWattage", estimatedWattage);
        response.put("performanceEstimator", Map.of(
                "level", compatible ? (estimatedWattage > 350 ? "Ultra 1440p / 4K Gaming" : "High 1080p Gaming") : "Incomplete / Incompatible",
                "games", gameFps
        ));

        return ResponseEntity.ok(response);
    }
}
