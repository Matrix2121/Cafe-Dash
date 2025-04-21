package com.cafe.backend.repository;

import com.cafe.backend.entity.account.UserEntity;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * The {@code UserRepository} provides database access methods for {@link UserEntity}
 * using Spring Data JPA.
 *
 * <p>This repository supports standard CRUD operations and includes custom query methods
 * that respect logical deletion via the {@code isDeleted} flag.</p>
 *
 * <p>These methods are commonly used in authentication, profile management,
 * and administrative user operations.</p>
 *
 * <p>Each query explicitly filters out users marked as deleted.</p>
 *
 * @author ZapryanZapryanov
 */

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

	/**
	 * Finds a non-deleted user by their ID.
	 *
	 * @param id The unique ID of the user.
	 * @return An {@link Optional} containing the user, if found and not deleted.
	 */
	Optional<UserEntity> findByIdAndIsDeletedFalse(Long id);

	/**
	 * Finds a non-deleted user by their username.
	 *
	 * @param username The username to search for.
	 * @return An {@link Optional} containing the user, if found and not deleted.
	 */
	Optional<UserEntity> findByUsernameAndIsDeletedFalse(String username);

	/**
	 * Finds a non-deleted user by their email.
	 *
	 * @param email The email address to search for.
	 * @return An {@link Optional} containing the user, if found and not deleted.
	 */
	Optional<UserEntity> findByEmailAndIsDeletedFalse(String email);

	/**
	 * Retrieves all users that are not marked as deleted.
	 *
	 * @return A list of non-deleted users.
	 */
	List<UserEntity> findAllByIsDeletedFalse();
}