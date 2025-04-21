package com.cafe.backend.repository;

import com.cafe.backend.entity.product.ProductEntity;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * {@code ProductRepository} is a repository interface for accessing and managing {@code ProductEntity} objects.
 * It extends {@code JpaRepository}, providing basic CRUD operations and query methods for {@code ProductEntity}.
 * <p>
 * This repository interface allows for the interaction with the {@code product} table in the database, specifically
 * handling operations related to products within a cafeteria.
 * </p>
 *
 * @author ZapryanZapryanov, VasilStoykov
 */
@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Long> {

    /**
     * Finds a list of {@code ProductEntity} by the cafeteria's ID.
     *
     * @param cafeteriaId the ID of the cafeteria to search for products.
     * @return a list of {@code ProductEntity} associated with the given cafeteria.
     */
    List<ProductEntity> findByCafeteriaId(Long cafeteriaId);
}