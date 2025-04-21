package com.cafe.backend.service;

import java.util.List;

import com.cafe.backend.dto.ReviewDTO;
import com.cafe.backend.exception.BadRequestException;
import com.cafe.backend.exception.NotFoundException;

/**
 * {@code ReviewService} is an interface that defines the methods for handling review-related operations.
 * These operations include creating, updating, and retrieving reviews, as well as calculating review statistics.
 * <p>
 * The methods in this interface throw {@code BadRequestException} and {@code NotFoundException} when the input is invalid
 * or when the requested review data is not found.
 * </p>
 *
 * @author VasilStoykov
 */
public interface ReviewService {

    /**
     * Creates a new review.
     *
     * @param reviewDTO the {@code ReviewDTO} containing review data to be created.
     * @return the created {@code ReviewDTO}.
     * @throws BadRequestException if the review data is invalid.
     * @throws NotFoundException if the associated cafeteria or user is not found.
     */
    ReviewDTO createReview(ReviewDTO reviewDTO) throws BadRequestException, NotFoundException;

    /**
     * Updates an existing review.
     *
     * @param id the ID of the review to be updated.
     * @param reviewDTO the {@code ReviewDTO} containing the updated review data.
     * @return the updated {@code ReviewDTO}.
     * @throws BadRequestException if the review data is invalid.
     * @throws NotFoundException if the review or associated cafeteria/user is not found.
     */
    ReviewDTO updateReview(Long id, ReviewDTO reviewDTO) throws BadRequestException, NotFoundException;

    /**
     * Retrieves a list of reviews for a specific cafeteria.
     *
     * @param id the ID of the cafeteria.
     * @return a list of {@code ReviewDTO} for the specified cafeteria.
     * @throws BadRequestException if the cafeteria ID is invalid.
     * @throws NotFoundException if no reviews are found for the given cafeteria.
     */
    List<ReviewDTO> getReviewsByCafeteriaId(Long id) throws BadRequestException, NotFoundException;

    /**
     * Retrieves the count of reviews for a specific cafeteria.
     *
     * @param cafeteriaId the ID of the cafeteria.
     * @return the number of reviews for the given cafeteria.
     * @throws BadRequestException if the cafeteria ID is invalid.
     * @throws NotFoundException if no reviews are found for the given cafeteria.
     */
    Integer getCountReviews(Long cafeteriaId) throws BadRequestException, NotFoundException;

    /**
     * Retrieves the average rating for a specific cafeteria based on its reviews.
     *
     * @param cafeteriaId the ID of the cafeteria.
     * @return the average rating for the given cafeteria.
     * @throws BadRequestException if the cafeteria ID is invalid.
     * @throws NotFoundException if no reviews are found for the given cafeteria.
     */
    Double getRating(Long cafeteriaId) throws BadRequestException, NotFoundException;

    /**
     * Retrieves a list of reviews written by a specific user.
     *
     * @param userId the ID of the user.
     * @return a list of {@code ReviewDTO} written by the given user.
     * @throws BadRequestException if the user ID is invalid.
     * @throws NotFoundException if no reviews are found for the given user.
     */
    List<ReviewDTO> getReviewsByUserId(Long userId) throws BadRequestException, NotFoundException;
}
