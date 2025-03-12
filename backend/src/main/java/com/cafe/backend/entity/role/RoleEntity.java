package com.cafe.backend.entity.role;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "role")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class RoleEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "role_name", length = 100, nullable = false)
    private String roleName;
}
