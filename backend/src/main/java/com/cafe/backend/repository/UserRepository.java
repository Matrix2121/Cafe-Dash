package com.cafe.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cafe.backend.entity.account.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

}
