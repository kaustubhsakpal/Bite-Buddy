package in.kaush.BiteBuddy.controller;

import in.kaush.BiteBuddy.service.DashboardService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin("*")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    // 📊 SUMMARY
    @GetMapping("/summary")
    public Map<String, Object> getSummary() {
        return dashboardService.getSummary();
    }

    // 🔔 ACTIVITY
    @GetMapping("/activity")
    public List<Map<String, Object>> getActivity() {
        return dashboardService.getRecentActivity();
    }
}
