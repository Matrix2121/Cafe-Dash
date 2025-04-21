package com.cafe.backend.repository;

import com.cafe.backend.entity.review.ReviewEntity;
import com.cafe.backend.exception.BadRequestException;
import com.cafe.backend.exception.NotFoundException;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * {@code ReviewRepository} is a repository interface for accessing and managing {@code ReviewEntity} objects.
 * It extends {@code JpaRepository}, providing basic CRUD operations and query methods for {@code ReviewEntity}.
 * <p>
 * This repository interface allows for the interaction with the {@code review} table in the database, specifically
 * handling operations related to reviews written by users about cafeterias.
 * </p>
 *
 * @author ZapryanZapryanov, VasilStoykov
 */
@Repository
public interface ReviewRepository extends JpaRepository<ReviewEntity, Long> {

    /**
     * Finds a list of {@code ReviewEntity} by the cafeteria's ID, where the review is not marked as deleted.
     *
     * @param cafeteriaId the ID of the cafeteria to search for reviews.
     * @return a list of {@code ReviewEntity} associated with the given cafeteria that are not deleted.
     */
    List<ReviewEntity> findByCafeteriaIdAndIsDeletedFalse(Long cafeteriaId);

    /**
     * Finds a list of {@code ReviewEntity} by the user's ID, where the review is not marked as deleted.
     *
     * @param userId the ID of the user to search for reviews.
     * @return a list of {@code ReviewEntity} written by the given user that are not deleted.
     * @throws BadRequestException if the user ID is invalid or not in the proper format.
     * @throws NotFoundException if no reviews are found for the given user ID.
     */
    List<ReviewEntity> findByUserIdAndIsDeletedFalse(Long userId) throws BadRequestException, NotFoundException;
}