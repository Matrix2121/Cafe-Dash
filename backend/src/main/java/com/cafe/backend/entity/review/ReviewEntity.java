package com.cafe.backend.entity.review;

import java.time.LocalDateTime;

import com.cafe.backend.entity.account.UserEntity;
import com.cafe.backend.entity.cafeteria.CafeteriaEntity;

import jakarta.persistence.*;
import lombok.*;

/**
 * {@code Review} is an entity class.
 * @author VasilStoykov
 */

@Data
@Entity
@Table(name = "review")
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class ReviewEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "title", length = 255, nullable = false)
    private String title;

    @Column(name = "body", length = 1023)
    private String body;

    @Column(name = "rating")
    private int rating;

    @Column(name = "createdAt", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "is_deleted")
    private boolean isDeleted;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "cafeteriaId", nullable = false)
    private CafeteriaEntity cafeteria;
}
