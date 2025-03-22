package com.cafe.backend.repository;

import com.cafe.backend.entity.account.UserEntity;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
	Optional<UserEntity> findByUsernameAndIsDeletedFalse(String username);
}
