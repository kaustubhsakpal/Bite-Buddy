package in.kaush.BiteBuddy.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "orders")
public class Order {

    @Id
    private String id;

    private String item;
    private int quantity;
    private int amount;

    private String status = "PENDING";
    private LocalDateTime createdAt = LocalDateTime.now();
}
