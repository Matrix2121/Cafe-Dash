package com.cafe.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cafe.backend.entity.role.RoleEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * {@code RoleRepository} is a repository interface for accessing and managing {@code RoleEntity} objects.
 * It extends {@code JpaRepository}, providing basic CRUD operations and query methods for {@code RoleEntity}.
 * <p>
 * This repository interface allows for the interaction with the {@code role} table in the database, specifically
 * handling operations related to user roles within the system.
 * </p>
 *
 * @author ZapryanZapryanov
 */
@Repository
public interface RoleRepository extends JpaRepository<RoleEntity, Long> {

	/**
	 * Finds a {@code RoleEntity} by its role name, where the role is not marked as deleted.
	 *
	 * @param roleName the name of the role to search for.
	 * @return an {@code Optional} containing the {@code RoleEntity} if found and not deleted, or empty if not found.
	 */
	Optional<RoleEntity> findByRoleNameAndIsDeletedFalse(String roleName);
}
