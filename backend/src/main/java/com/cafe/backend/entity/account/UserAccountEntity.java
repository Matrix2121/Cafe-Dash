package com.cafe.backend.entity.account;

import com.cafe.backend.entity.order.OrderEntity;
import com.cafe.backend.entity.role.RoleEntity;
import jakarta.persistence.*;
import lombok.*;
import java.util.Set;

/**
 * {@code UserAccount} is an entity class.
 * @author AngelStoynov
 */

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class UserAccountEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "username", length = 100, nullable = false, unique = true)
    private String username;

    @Column(name = "password", length = 120, nullable = false)
    private String password;

    @ManyToMany
    @JoinTable(
            name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<RoleEntity> roles;

    @ManyToMany
    @JoinTable(
            name = "user_orders",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "order_id")
    )
    private Set<OrderEntity> orders;
}
