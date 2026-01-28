package in.kaush.BiteBuddy.service;

import in.kaush.BiteBuddy.entity.ContactMessage;
import in.kaush.BiteBuddy.repository.ContactRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactService {

    private final ContactRepository repo;

    public ContactService(ContactRepository repo) {
        this.repo = repo;
    }

    public ContactMessage save(ContactMessage msg) {
        return repo.save(msg);
    }

    public List<ContactMessage> getAll() {
        return repo.findAll();
    }

    public void markReplied(String id) {
        ContactMessage msg = repo.findById(id).orElseThrow();
        msg.setReplied(true);
        repo.save(msg);
    }

    public void delete(String id) {
        repo.deleteById(id);
    }

}

