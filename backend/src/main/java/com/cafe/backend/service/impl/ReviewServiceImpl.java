package com.cafe.backend.service.impl;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import com.cafe.backend.dto.ReviewDTO;
import com.cafe.backend.entity.account.UserEntity;
import com.cafe.backend.entity.cafeteria.CafeteriaEntity;
import com.cafe.backend.entity.review.ReviewEntity;

import com.cafe.backend.exception.BadRequestException;
import com.cafe.backend.exception.DataMappingException;
import com.cafe.backend.exception.NotFoundException;
import com.cafe.backend.exception.ResourceNotFoundException;

import com.cafe.backend.repository.CafeteriaRepository;
import com.cafe.backend.repository.ReviewRepository;
import com.cafe.backend.repository.UserRepository;

import com.cafe.backend.entity.mapper.ReviewMapper;
import com.cafe.backend.service.ReviewService;

/**
 * {@code ReviewServiceImpl} is class that implements {@link ReviewService}.
 * It uses {@code reviewRepository} to save/find the necessary data by the
 * provided methods by {@code JpaRepository} which {@link reviewRepository}
 * extends.
 * 
 * @author VasilStoykov
 */

@Service
@Transactional
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CafeteriaRepository cafeteriaRepository;

    @Override
    public ReviewDTO createReview(ReviewDTO reviewDTO) throws BadRequestException {
        UserEntity user = userRepository.findById(reviewDTO.userId())
                .orElseThrow(() -> new DataMappingException("User not found with ID: " + reviewDTO.userId()));

        CafeteriaEntity cafeteria = cafeteriaRepository.findById(reviewDTO.cafeteriaId())
                .orElseThrow(() -> new DataMappingException("Cafeteria not found with ID: " + reviewDTO.cafeteriaId()));

        ReviewEntity review = ReviewMapper.mapToEntity(reviewDTO, user, cafeteria);

        review.setId(null);
        review.setCreatedAt(LocalDateTime.now());

        ReviewEntity savedReview = reviewRepository.save(review);
        return ReviewMapper.mapToDTO(savedReview);
    }

    @Override
    public ReviewDTO updateReview(Long id, ReviewDTO reviewDTO) throws BadRequestException, NotFoundException {
        ReviewEntity review = reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Could not find review with this id:" + id));

        ReviewEntity updatedReview = updateReviewFields(reviewDTO, review);
        return ReviewMapper.mapToDTO(updatedReview);
    }

    private ReviewEntity updateReviewFields(ReviewDTO newReviewDTO, ReviewEntity review) throws DataMappingException {
        try {
            review.setTitle(newReviewDTO.title());
            review.setBody(newReviewDTO.body());
            review.setRating(newReviewDTO.rating());
            return reviewRepository.save(review);
        } catch (Exception e) {
            throw new DataMappingException("Cannot map userAccount to entity.", e);
        }
    }
}
