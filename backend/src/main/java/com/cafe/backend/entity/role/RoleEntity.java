package com.cafe.backend.entity.role;

import com.cafe.backend.entity.account.UserAccountEntity;
import com.cafe.backend.enums.UserTypeEnum;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@Table(name = "role")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class RoleEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "role_name", length = 100, columnDefinition = "VARCHAR(100) DEFAULT 'ANONYMOUS'")
    private UserTypeEnum type;

    @ManyToMany(mappedBy = "roles")
    private Set<UserAccountEntity> users;
}
