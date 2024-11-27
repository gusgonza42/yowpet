package com.yowpet.backend.controller.test;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping ( "/api" )
public class TestContoller {
    @RequestMapping ( "/hello" )
    public String sayHello( ) {
        return "Hello, YowPet!";
    }
}