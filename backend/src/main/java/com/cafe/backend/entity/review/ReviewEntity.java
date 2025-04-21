package com.cafe.backend.entity.review;

import java.time.LocalDateTime;

import com.cafe.backend.entity.account.UserEntity;
import com.cafe.backend.entity.cafeteria.CafeteriaEntity;

import jakarta.persistence.*;
import lombok.*;

/**
 * {@code ReviewEntity} is an entity class representing a review left by a user for a cafeteria.
 * This class stores information about the review, such as the title, body, rating, creation date, and whether it is deleted.
 * <p>
 * The entity is mapped to the {@code review} table in the database. It also maintains relationships with other entities:
 * - The {@code user} is linked to a {@code UserEntity}, representing the user who created the review.
 * - The {@code cafeteria} is linked to a {@code CafeteriaEntity}, representing the cafeteria being reviewed.
 * </p>
 *
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
