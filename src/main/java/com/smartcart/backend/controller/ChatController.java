package com.smartcart.backend.controller;

import com.smartcart.backend.dto.ChatRequest;
import com.smartcart.backend.dto.ChatResponse;
import com.smartcart.backend.service.GeminiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "http://localhost:5173")
public class ChatController {

    @Autowired
    private GeminiService geminiService;

    @PostMapping
    public ChatResponse chat(@RequestBody ChatRequest request) {

        return geminiService.chat(request.getMessage());

    }
}