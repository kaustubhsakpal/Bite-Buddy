package in.kaush.BiteBuddy.service;

import java.util.List;
import java.util.Map;

public interface DashboardService {

    Map<String, Object> getSummary();

    List<Map<String, Object>> getRecentActivity();
}

