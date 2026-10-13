package com.brewrush.backend;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Allows any origin to resolve the CORS Error
public class TestController {

    @Autowired
    private MongoTemplate mongoTemplate;

    @GetMapping("/api/test")
    public String testEndpoint() {
        return "BrewRush Backend is running successfully!";
    }

    @GetMapping("/api/db-test")
    public String testDb() {
        try {
            Map<String, String> data = new HashMap<>();
            data.put("status", "success");
            data.put("project", "BrewRush");
            
            mongoTemplate.save(data, "test_collection");
            
            return "Successfully connected & saved test data to MongoDB Atlas Database: brewrush!";
        } catch (Exception e) {
            return "MongoDB Connection Failed: " + e.getMessage();
        }
    }
}