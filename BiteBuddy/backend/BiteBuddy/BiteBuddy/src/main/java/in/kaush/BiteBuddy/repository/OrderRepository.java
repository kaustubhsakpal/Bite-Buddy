package in.kaush.BiteBuddy.repository;

import in.kaush.BiteBuddy.entity.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface OrderRepository extends MongoRepository<Order, String> {

    List<Order> findByStatus(String status);

    List<Order> findByCreatedAtBetween(
            LocalDateTime start,
            LocalDateTime end
    );
}


