package com.smartcart.backend.scheduler;

import com.smartcart.backend.entity.User;
import com.smartcart.backend.repository.UserRepository;
import com.smartcart.backend.service.EmailService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class BirthdayScheduler {

    private final UserRepository userRepository;
    private final EmailService emailService;

    public BirthdayScheduler(UserRepository userRepository,
                             EmailService emailService) {
        this.userRepository = userRepository;
        this.emailService = emailService;
    }

    // Testing: har 1 minute mein check karega
    @Scheduled(cron = "0 0 9 * * *")
    public void sendBirthdayEmails() {

        LocalDate today = LocalDate.now();

        List<User> users = userRepository.findAll();

        for (User user : users) {

            if (user.getDateOfBirth() != null
                    && user.getDateOfBirth().getMonth() == today.getMonth()
                    && user.getDateOfBirth().getDayOfMonth() == today.getDayOfMonth()) {

                emailService.sendBirthdayEmail(
                        user.getEmail(),
                        user.getName()
                );
            }
        }
    }
}