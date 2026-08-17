package com.smartcart.backend.controller;

import com.smartcart.backend.service.EmailService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/email")
public class EmailController {

    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @GetMapping("/test")
    public String testEmail(
            @RequestParam String to,
            @RequestParam String name) {

        emailService.sendBirthdayEmail(to, name);

        return "Test email sent successfully";
    }
}
