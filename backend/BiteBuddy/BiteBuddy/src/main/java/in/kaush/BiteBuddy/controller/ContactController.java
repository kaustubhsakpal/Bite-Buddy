package in.kaush.BiteBuddy.controller;

import in.kaush.BiteBuddy.entity.ContactMessage;
import in.kaush.BiteBuddy.service.ContactService;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/api/contact")
@CrossOrigin("*")
public class ContactController {

    private final ContactService service;

    public ContactController(ContactService service) {
        this.service = service;
    }

    // USER: submit message
    @PostMapping
    public ContactMessage submit(@RequestBody ContactMessage msg) {
        return service.save(msg);
    }

    // ADMIN: get all messages (ABHI PUBLIC)
    @GetMapping
    public List<ContactMessage> getAll() {
        return service.getAll();
    }

    // mark replied
    @PutMapping("/reply/{id}")
    public void markReplied(@PathVariable String id) {
        service.markReplied(id);
    }

    // delete message
    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        service.delete(id);
    }
}
