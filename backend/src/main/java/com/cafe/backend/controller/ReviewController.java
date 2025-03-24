package com.cafe.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.cafe.backend.dto.ReviewDTO;
import com.cafe.backend.exception.BadRequestException;
import com.cafe.backend.exception.NotFoundException;
import com.cafe.backend.service.ReviewService;

/**
 * The {@code ReviewController} serves as the RESTful API entry point for
 * managing reviews.
 * <p>
 * This controller handles HTTP requests from the frontend and interacts with
 * the service layer
 * to perform CRUD operations on reviews.
 * </p>
 *
 * @author VasilStoykov
 */

@RestController
@RequestMapping("/api/reviews")

public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public ReviewDTO createReview(@RequestBody ReviewDTO reviewDTO) throws BadRequestException, NotFoundException {
        return reviewService.createReview(reviewDTO);
    }

    @PutMapping("/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public ReviewDTO updateReview(@PathVariable("id") Long id, @RequestBody ReviewDTO updatedReviewDTO)
            throws NotFoundException, BadRequestException {
        return reviewService.updateReview(id, updatedReviewDTO);
    }

    @GetMapping("/{cafeteriaid}")
    @ResponseStatus(value = HttpStatus.OK)
    public List<ReviewDTO> getReviewsByCafeteriaId(@PathVariable("cafeteriaid") Long id)
            throws NotFoundException, BadRequestException {
        return reviewService.getReviewsByCafeteriaId(id);
    }
}
