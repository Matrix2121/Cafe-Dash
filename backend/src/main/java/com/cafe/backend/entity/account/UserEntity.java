package com.cafe.backend.entity.account;

import com.cafe.backend.entity.order.OrderEntity;
import com.cafe.backend.entity.review.ReviewEntity;
import com.cafe.backend.entity.role.RoleEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.*;

/**
 * {@code UserEntity} is an entity class that represents a user in the system.
 * It contains information about the user's identity, credentials, roles, orders, reviews, and deletion status.
 * <p>
 * This class is mapped to the {@code users} table in the database.
 * The entity is designed to:
 * - Store the user's unique identifier {@code id}.
 * - Store the user's {@code username}, {@code email}, and {@code password}.
 * - Maintain a list of roles assigned to the user {@code roles}.
 * - Maintain a list of orders and reviews associated with the user {@code orders} and {@code reviews}.
 * - Track whether the user is deleted {@code isDeleted}.
 * </p>
 *
 * @author AngelStoynov, ZapryanZapryanov
 */
@Entity
@Table(name = "users")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "username", length = 100, nullable = false, unique = true)
    private String username;

    @Column(name = "email", length = 100, nullable = false, unique = true)
    private String email;

    @Column(name = "password", length = 120, nullable = false)
    private String password;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private List<RoleEntity> roles;

    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderEntity> orders = new LinkedList<>();

    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<ReviewEntity> reviews = new ArrayList<>();

    @Column(name = "expo_push_token")
    private String expoPushToken;

    @Column(name = "is_deleted")
    private boolean isDeleted;
}