package com.example.restservice;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import java.io.File;
import java.io.IOException;
import java.util.List;

@SpringBootTest
@AutoConfigureMockMvc
public class CheeseControllerTests {

    @Autowired
    private MockMvc mockMvc;

    private List<Cheese> testData;

    // Load JSON test data before running tests
    @BeforeEach
    public void setUp() throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        File jsonFile = new File("src/test/resources/cheeseTestData.json");
        // Read the JSON data into a list of Cheese objects
        testData = List.of(objectMapper.readValue(jsonFile, Cheese[].class));
    }

    @Test
    public void getAllCheesesShouldReturnCheeseList() throws Exception {
        this.mockMvc.perform(get("/cheese"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].content").value(testData.get(0).content()))
                .andExpect(jsonPath("$[0].imageUrl").value(testData.get(0).imageUrl()))
                .andExpect(jsonPath("$[1].content").value(testData.get(1).content()))
                .andExpect(jsonPath("$[1].imageUrl").value(testData.get(1).imageUrl()));
    }

    @Test
    public void paramCheeseShouldReturnTailoredMessage() throws Exception {
        // Test with a cheese name that exists
        this.mockMvc.perform(get("/cheese").param("name", "Brie"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].content").value("Brie"))
                .andExpect(jsonPath("$[0].imageUrl").value("https://www.cheese.com/brie/"));
    }
}
