package in.kaush.BiteBuddy.repository;

import in.kaush.BiteBuddy.entity.ContactMessage;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ContactRepository
        extends MongoRepository<ContactMessage, String> {
}
