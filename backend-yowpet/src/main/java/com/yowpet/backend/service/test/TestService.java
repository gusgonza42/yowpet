package com.yowpet.backend.service.test;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Test service that simulates an in-memory database.
 */
@Service
public class TestService {
    private final List< String > mockDatabase = new ArrayList<>( );

    /**
     * Gets all items from the simulated database.
     *
     * @return a list of all items
     */
    public List< String > getAllItems( ) {
        return mockDatabase;
    }

    /**
     * Adds a new item to the simulated database.
     *
     * @param item the item to add
     * @return a message indicating the item was added
     */
    public String addItem( String item ) {
        mockDatabase.add( item );
        return "Item added: " + item;

    }
}