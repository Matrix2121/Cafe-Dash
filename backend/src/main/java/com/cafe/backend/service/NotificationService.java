package com.cafe.backend.service;

public interface NotificationService {
    void sendPushNotification(String pushToken, String title, String body);
}