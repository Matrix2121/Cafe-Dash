package com.cafe.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.cafe.backend.dto.ReviewDTO;
import com.cafe.backend.exception.BadRequestException;
import com.cafe.backend.exception.NotFoundException;
import com.cafe.backend.security.SecurityRoleHelper;
import com.cafe.backend.service.ReviewService;

/**
 * The {@code ReviewController} serves as the RESTful API entry point for
 * managing reviews.
 *
 * <p>This controller handles HTTP requests from the frontend and interacts with
 * the service layer to perform CRUD operations on {@link ReviewDTO} objects.</p>
 *
 * <p>Supported operations include creating a review, updating it, and retrieving
 * reviews by cafeteria or user.</p>
 *
 * @author VasilStoykov
 */
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    /**
     * Service layer for handling business logic related to reviews.
     */
    @Autowired
    private ReviewService reviewService;

    /**
     * Creates a new review.
     *
     * @param reviewDTO The data of the review to be created.
     * @return The created review as a {@link ReviewDTO}.
     * @throws BadRequestException if the request data is invalid.
     * @throws NotFoundException if referenced entities are not found.
     */
    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public ReviewDTO createReview(@RequestBody ReviewDTO reviewDTO) throws BadRequestException, NotFoundException {
        return reviewService.createReview(reviewDTO);
    }

    /**
     * Updates an existing review by its ID.
     *
     * @param id The ID of the review to update.
     * @param updatedReviewDTO The new data for the review.
     * @return The updated review as a {@link ReviewDTO}.
     * @throws NotFoundException if the review with the given ID does not exist.
     * @throws BadRequestException if the provided data is invalid.
     */
    @PutMapping("/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public ReviewDTO updateReview(@PathVariable("id") Long id, @RequestBody ReviewDTO updatedReviewDTO)
            throws NotFoundException, BadRequestException {
        return reviewService.updateReview(id, updatedReviewDTO);
    }

    /**
     * Retrieves all reviews associated with a specific cafeteria.
     *
     * @param id The ID of the cafeteria.
     * @return A list of {@link ReviewDTO} objects related to the cafeteria.
     * @throws NotFoundException if the cafeteria or reviews are not found.
     * @throws BadRequestException if the request is invalid.
     */
    @GetMapping("/{cafeteriaid}")
    @ResponseStatus(value = HttpStatus.OK)
    public List<ReviewDTO> getReviewsByCafeteriaId(@PathVariable("cafeteriaid") Long id)
            throws NotFoundException, BadRequestException {
        return reviewService.getReviewsByCafeteriaId(id);
    }

    /**
     * Retrieves all reviews submitted by a specific user.
     *
     * @param userId The ID of the user.
     * @return A list of {@link ReviewDTO} objects submitted by the user.
     * @throws BadRequestException if the request is invalid.
     * @throws NotFoundException if the user or their reviews are not found.
     */
    @GetMapping("/user/{userId}")
    @ResponseStatus(value = HttpStatus.OK)
    public List<ReviewDTO> getReviewsByUserId(@PathVariable Long userId) throws BadRequestException, NotFoundException {
    	SecurityRoleHelper.checkUserHasAnyRole("admin", "owner");
        return reviewService.getReviewsByUserId(userId);
    }
}