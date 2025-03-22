package com.cafe.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cafe.backend.entity.role.RoleEntity;

public interface RoleRepository extends JpaRepository<RoleEntity, Long> {
	Optional<RoleEntity> findByRoleNameAndIsDeletedFalse(String roleName);
}
