package com.cafe.backend.entity.account;

import com.cafe.backend.enums.UserTypeEnum;
import jakarta.persistence.*;
import lombok.*;
import java.util.Collection;
import java.util.List;

/**
 * {@code UserAccount} is an entity class.
 * @author AngelStoynov
 */

@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor

public abstract class UserAccountEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "username", length = 100, nullable = false, unique = true)
    private String username;

    @Column(name = "password", length = 120, nullable = false)
    private String password;
}
