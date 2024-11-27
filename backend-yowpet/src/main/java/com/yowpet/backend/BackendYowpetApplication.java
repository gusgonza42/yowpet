package com.yowpet.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableJpaRepositories (basePackages = "com.yowpet.backend.repository.mysql")
@EnableMongoRepositories (basePackages = "com.yowpet.backend.repository.mongo")

public class BackendYowpetApplication {

    public static void main( String[] args ) {
        SpringApplication.run( BackendYowpetApplication.class, args );
    }
}