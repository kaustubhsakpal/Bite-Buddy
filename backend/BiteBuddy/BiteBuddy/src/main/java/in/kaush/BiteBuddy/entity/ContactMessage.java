package in.kaush.BiteBuddy.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "contact_messages")
public class ContactMessage {

    @Id
    private String id;

    private String name;
    private String email;
    private String message;

    private boolean replied = false;
    private LocalDateTime createdAt = LocalDateTime.now();

    // getters setters
    public String getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getMessage() { return message; }
    public boolean isReplied() { return replied; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    public void setId(String id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setEmail(String email) { this.email = email; }
    public void setMessage(String message) { this.message = message; }
    public void setReplied(boolean replied) { this.replied = replied; }
}

