package in.kaush.BiteBuddy.service;

import in.kaush.BiteBuddy.entity.Order;
import in.kaush.BiteBuddy.repository.FoodRepository;
import in.kaush.BiteBuddy.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class DashboardServiceImpl implements DashboardService {

    private final OrderRepository orderRepository;
    private final FoodRepository foodRepository;

    public DashboardServiceImpl(
            OrderRepository orderRepository,
            FoodRepository foodRepository
    ) {
        this.orderRepository = orderRepository;
        this.foodRepository = foodRepository;
    }

    // ================= SUMMARY =================
    @Override
    public Map<String, Object> getSummary() {

        // 🕒 TODAY RANGE (FIXED)
        LocalDate today = LocalDate.now();
        LocalDateTime start = today.atStartOfDay();
        LocalDateTime end = today.plusDays(1).atStartOfDay();

        List<Order> todaysOrders =
                orderRepository.findByCreatedAtBetween(start, end);

        int ordersToday = todaysOrders.size();

        int revenueToday = todaysOrders.stream()
                .filter(o -> "ACCEPTED".equals(o.getStatus()))
                .mapToInt(Order::getAmount)
                .sum();

        Map<String, Object> map = new HashMap<>();
        map.put("totalFoods", foodRepository.count());
        map.put("ordersToday", ordersToday);
        map.put("revenueToday", revenueToday);

        return map;
    }

    // ================= ACTIVITY =================
    @Override
    public List<Map<String, Object>> getRecentActivity() {

        List<Order> orders = orderRepository
                .findAll()
                .stream()
                .sorted(Comparator.comparing(Order::getCreatedAt).reversed())
                .limit(5)
                .toList();

        List<Map<String, Object>> activity = new ArrayList<>();

        for (Order order : orders) {
            Map<String, Object> map = new HashMap<>();
            map.put("title", "Order placed: " + order.getItem());
            map.put("amount", order.getAmount());
            activity.add(map);
        }

        return activity;
    }
}

