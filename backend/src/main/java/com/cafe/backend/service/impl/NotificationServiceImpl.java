package com.cafe.backend.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.cafe.backend.service.NotificationService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class NotificationServiceImpl implements NotificationService {

    private static final String EXPO_URL = "https://exp.host/--/api/v2/push/send";
    
    public void sendPushNotification(String pushToken, String title, String body) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> payload = new HashMap<>();
        payload.put("to", pushToken);
        payload.put("title", title);
        payload.put("body", body);
        payload.put("sound", "default");
        payload.put("data", Map.of("type", "order-update"));

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(payload, headers);

        try {
            restTemplate.postForEntity(EXPO_URL, request, String.class);
        } catch (Exception e) {
            System.out.println("Error sending push: " + e.getMessage());
        }
    }
}