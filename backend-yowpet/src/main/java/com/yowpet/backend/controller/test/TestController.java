//save all files
package com.yowpet.backend.controller.test;

import com.yowpet.backend.service.test.TestService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller to handle test-related requests.
 */
@RestController
@RequestMapping("/test")
public class TestController {

    private final TestService testService;

    /**
     * Constructor to inject the test service.
     *
     * @param testService the test service to inject
     */
    public TestController(TestService testService) {
        this.testService = testService;
    }

    /**
     * Handles GET requests to get all items.
     *
     * @return a list of all items
     */
    @Operation(summary = "Get all items", description = "Retrieves all items from the test service.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved list of items",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = List.class))),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping("/all")
    public List<String> getAllItems() {
        return testService.getAllItems();
    }

    /**
     * Handles POST requests to add a new item.
     *
     * @param item the item to add
     * @return a message indicating the item was added
     */
    @Operation(summary = "Add a new item", description = "Adds a new item to the test service.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully added the item",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(type = "string"))),
            @ApiResponse(responseCode = "400", description = "Invalid input"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PostMapping("/add")
    public String addItem(@RequestBody String item) {
        return testService.addItem(item);
    }
}