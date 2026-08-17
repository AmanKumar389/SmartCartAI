package com.smartcart.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendBirthdayEmail(String to, String name) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom("earn4profits@gmail.com");
        message.setTo(to);
        message.setSubject("🎂 Happy Birthday " + name + "!");

        message.setText(
                "Dear " + name + ",\n\n" +
                        "🎉 Wishing you a very Happy Birthday! 🎂\n\n" +
                        "May your day be filled with happiness, success and wonderful moments.\n\n" +
                        "Best Wishes,\n" +
                        "SmartCart AI Team"
        );

        mailSender.send(message);
    }
}
