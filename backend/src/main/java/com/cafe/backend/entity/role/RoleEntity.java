package com.cafe.backend.entity.role;

import com.cafe.backend.enums.UserTypeEnum;
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

    @Enumerated(EnumType.STRING)
    @Column(name = "role_name", length = 100, columnDefinition = "VARCHAR(100) DEFAULT 'ANONYMOUS'")
    private UserTypeEnum type;
}
