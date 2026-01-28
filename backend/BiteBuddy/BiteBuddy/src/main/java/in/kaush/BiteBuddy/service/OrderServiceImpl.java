package in.kaush.BiteBuddy.service;

import in.kaush.BiteBuddy.entity.Order;
import in.kaush.BiteBuddy.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    // ✅ USER: place order
    @Override
    public Order placeOrder(Order order) {
        order.setStatus("PENDING");
        return orderRepository.save(order);
    }

    // ✅ ADMIN: get all orders
    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // ✅ ADMIN: accept / reject
    @Override
    public void updateStatus(String id, String status) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setStatus(status);
        orderRepository.save(order);
    }

    // ✅ DASHBOARD: revenue (only ACCEPTED)
    @Override
    public int calculateRevenue() {
        return orderRepository.findByStatus("ACCEPTED")
                .stream()
                .mapToInt(Order::getAmount)
                .sum();
    }
}

