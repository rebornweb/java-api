package com.example.restservice;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CheeseController {

    private final AtomicLong counter = new AtomicLong();
    private final List<Cheese> cheeses;

    public CheeseController() throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        // Load cheese data from the JSON file
        File jsonFile = new File("src/test/resources/cheeseData.json");
        cheeses = objectMapper.readValue(jsonFile, new TypeReference<List<Cheese>>() {});
    }

    @GetMapping("/cheese")
    public List<Cheese> cheese(@RequestParam(value = "name", required = false) String name) {
        if (name != null) {
            return cheeses.stream()
                    .filter(cheese -> cheese.content().equalsIgnoreCase(name))
                    .toList();
        }
        return cheeses; // Return all cheeses as a fallback
    }
}
