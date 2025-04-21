package com.cafe.backend.entity.role;

import jakarta.persistence.*;
import lombok.*;

/**
 * {@code RoleEntity} is an entity class representing a role assigned to a user.
 * This class stores information about the role, including its name and whether it is deleted.
 * <p>
 * The entity is mapped to the {@code role} table in the database and holds the following fields:
 * - The {@code id} is the unique identifier for the role.
 * - The {@code roleName} is the name of the role.
 * - The {@code isDeleted} field indicates whether the role is marked as deleted.
 * </p>
 *
 * @author ZapryanZapryanov
 */
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

    @Column(name = "is_deleted")
    private boolean isDeleted;
}