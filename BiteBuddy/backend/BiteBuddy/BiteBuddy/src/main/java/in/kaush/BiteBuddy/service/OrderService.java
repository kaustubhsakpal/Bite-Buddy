package in.kaush.BiteBuddy.service;

import in.kaush.BiteBuddy.entity.Order;

import java.util.List;

public interface OrderService {

    // user side
    Order placeOrder(Order order);

    // admin side
    List<Order> getAllOrders();

    // admin accept / reject
    void updateStatus(String id, String status);

    // dashboard revenue
    int calculateRevenue();
}
