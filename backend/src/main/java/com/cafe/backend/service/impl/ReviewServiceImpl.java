package com.cafe.backend.service.impl;

import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;

import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import com.cafe.backend.dto.ReviewDTO;
import com.cafe.backend.entity.review.ReviewEntity;

import com.cafe.backend.exception.BadRequestException;
import com.cafe.backend.exception.DataMappingException;
import com.cafe.backend.exception.NotFoundException;
import com.cafe.backend.exception.ResourceNotFoundException;

import com.cafe.backend.repository.ReviewRepository;

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
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final ReviewMapper reviewMapper;

    @Override
    public ReviewDTO createReview(ReviewDTO reviewDTO) throws BadRequestException {
        ReviewEntity review = reviewMapper.mapToEntity(reviewDTO);

        review.setId(null);
        review.setCreatedAt(LocalDateTime.now());

        ReviewEntity savedReview = reviewRepository.save(review);
        return reviewMapper.mapToDTO(savedReview);
    }

    @Override
    public ReviewDTO updateReview(Long id, ReviewDTO reviewDTO) throws BadRequestException, NotFoundException {
        ReviewEntity review = reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Could not find review with this id:" + id));

        ReviewEntity updatedReview = updateReviewFields(reviewDTO, review);
        return reviewMapper.mapToDTO(updatedReview);
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

    @Override
    public List<ReviewDTO> getReviewsByCafeteriaId(Long id) throws BadRequestException, NotFoundException {
        try{
        List<ReviewEntity> reviewEntities = reviewRepository.findByCafeteriaIdAndIsDeletedFalse(id);

        if (reviewEntities.isEmpty()) {
            throw new ResourceNotFoundException("No products found");
        }

        List<ReviewDTO> reviewDTOs = new LinkedList<ReviewDTO>();
        for(ReviewEntity reviewEntity : reviewEntities){
            reviewDTOs.add(reviewMapper.mapToDTO(reviewEntity));
        }

        return reviewDTOs;
        } catch (Exception e) {
            throw new DataMappingException("Cannot map userAccount to entity.", e);
        }
        
    }
}
