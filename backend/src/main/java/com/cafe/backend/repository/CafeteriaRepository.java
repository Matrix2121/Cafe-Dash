package com.cafe.backend.repository;

import com.cafe.backend.entity.cafeteria.CafeteriaEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * {@code CafeteriaRepository} is a repository interface for accessing and managing {@code CafeteriaEntity} objects.
 * It extends {@code JpaRepository}, providing basic CRUD operations and query methods for the {@code CafeteriaEntity}.
 * <p>
 * This repository interface allows for the interaction with the {@code cafeterias} table in the database.
 * </p>
 *
 * @author ZapryanZapryanov
 */
@Repository
public interface CafeteriaRepository extends JpaRepository<CafeteriaEntity, Long> {
}