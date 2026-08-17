package com.smartcart.backend.service;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import com.smartcart.backend.dto.ChatResponse;
import com.smartcart.backend.entity.Product;
import com.smartcart.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Autowired
    private ProductRepository productRepository;

    public ChatResponse chat(String userMessage) {

        try {

            Client client = Client.builder()
                    .apiKey(apiKey)
                    .build();

            List<Product> products = productRepository.findAll();
            List<Product> matchedProducts = new ArrayList<>();

            String message = userMessage.toLowerCase().trim();

            for (Product product : products) {

                String name = product.getName().toLowerCase();
                String category = product.getCategory().toLowerCase();

                if (name.contains(message)
                        || category.contains(message)
                        || message.contains(name)
                        || message.contains(category)) {

                    matchedProducts.add(product);
                }
            }

// Agar kuch bhi match na ho to AI ko kuch products dikha do
            if (matchedProducts.isEmpty()) {
                matchedProducts = products.stream()
                        .limit(5)
                        .toList();
            }

            StringBuilder prompt = new StringBuilder();

            prompt.append("You are SmartCart AI Shopping Assistant.\n");
            prompt.append("Answer only using the SmartCart products whenever possible.\n");
            prompt.append("If the requested product is unavailable, clearly say it is not available and then suggest a similar category.\n\n");

            prompt.append("IMPORTANT RULES:\n");
            prompt.append("1. Never use Markdown.\n");
            prompt.append("2. Never use **, *, ## or bullet symbols.\n");
            prompt.append("3. Reply in simple plain text.\n");
            prompt.append("4. Put every product on a new line.\n");
            prompt.append("5. Always mention Product Name, Category, Price and Description.\n");
            prompt.append("6. If user asks for the cheapest or best product, compare the available products.\n");
            prompt.append("7. If user asks within a budget, show only matching products.\n\n");

            prompt.append("Available Products:\n\n");

            for (Product product : products) {

                prompt.append("Product Name: ")
                        .append(product.getName()).append("\n");

                prompt.append("Category: ")
                        .append(product.getCategory()).append("\n");

                prompt.append("Price: ₹")
                        .append(product.getPrice()).append("\n");

                prompt.append("Description: ")
                        .append(product.getDescription()).append("\n");

                prompt.append("------------------------------\n");
            }

            prompt.append("\nCustomer Question:\n");
            prompt.append(userMessage);

            GenerateContentResponse response =
                    client.models.generateContent(
                            "gemini-2.5-flash",
                            prompt.toString(),
                            null
                    );

            String reply = "Sorry, I couldn't generate a response.";

            if (response != null && response.text() != null) {

                reply = response.text();

                reply = reply.replace("**", "");
                reply = reply.replace("*", "");
                reply = reply.replace("##", "");
                reply = reply.replace("```", "");
                reply = reply.trim();
            }
            System.out.println("Matched Products = " + matchedProducts.size());

            for (Product p : matchedProducts) {
                System.out.println(p.getName());
            }

            return new ChatResponse(reply, matchedProducts);

        } catch (Exception e) {
            e.printStackTrace();
            return new ChatResponse(
                    "Something went wrong while contacting Gemini AI.",
                    new ArrayList<>()
            );
        }
    }
}