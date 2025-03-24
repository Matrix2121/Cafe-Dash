package com.cafe.backend.service;

import java.util.List;

import com.cafe.backend.dto.ReviewDTO;
import com.cafe.backend.exception.BadRequestException;
import com.cafe.backend.exception.NotFoundException;

/**
 * {@code UserService} is an interface that defines basic CRUD methods.
 * 
 * @author VasilStoykov
 */

public interface ReviewService {
    ReviewDTO createReview(ReviewDTO reviewDTO) throws BadRequestException, NotFoundException;
    ReviewDTO updateReview(Long id, ReviewDTO reviewDTO) throws BadRequestException, NotFoundException;
    List<ReviewDTO> getReviewsByCafeteriaId(Long id) throws BadRequestException, NotFoundException;
    Integer getcountReviews(Long cafeteriaId) throws BadRequestException, NotFoundException;
    Double getRating(Long cafeteriaId) throws BadRequestException, NotFoundException;
}
