package in.kaush.BiteBuddy.controller;

import in.kaush.BiteBuddy.entity.Order;
import in.kaush.BiteBuddy.service.OrderService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin("*")
public class OrderController {

    private final OrderService service;

    public OrderController(OrderService service) {
        this.service = service;
    }

    // USER: place order
    @PostMapping
    public Order placeOrder(@RequestBody Order order) {
        return service.placeOrder(order);
    }

    // ADMIN: get orders
    @GetMapping
    public List<Order> getOrders() {
        return service.getAllOrders();
    }

    // ADMIN: accept / reject
    @PutMapping("/{id}")
    public void updateStatus(
            @PathVariable String id,
            @RequestBody Order order
    ) {
        service.updateStatus(id, order.getStatus());
    }
}
