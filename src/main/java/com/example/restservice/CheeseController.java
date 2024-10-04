package com.example.restservice;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;


@RestController
@CrossOrigin(origins = "http://localhost:3000") 
public class CheeseController {

    private final List<Cheese> cheeses;

    
    public CheeseController() throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        
        File jsonFile = new File("src/test/resources/cheeseData.json");
        cheeses = objectMapper.readValue(jsonFile, new TypeReference<List<Cheese>>() {});
    }

    @GetMapping("/cheese")
    public List<Cheese> getCheeseByName(@RequestParam(value = "name", required = false) String name) {
        if (name == null || name.isEmpty()) {
            return cheeses; // Return all cheese if no name is provided
        } else {
            // Filter the cheese list by name (case insensitive)
            List<Cheese> filteredCheese = new ArrayList<>();
            for (Cheese cheese : cheeses) {
                if (cheese.content().equalsIgnoreCase(name)) {
                    filteredCheese.add(cheese);
                }
            }
            return filteredCheese; 
        }
    }
}
