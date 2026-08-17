package com.smartcart.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class SmartCartAiApplication {

    public static void main(String[] args) {
        SpringApplication.run(SmartCartAiApplication.class, args);
    }



}
