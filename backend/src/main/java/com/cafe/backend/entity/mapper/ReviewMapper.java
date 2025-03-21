package com.cafe.backend.entity.mapper;

import com.cafe.backend.dto.ReviewDTO;
import com.cafe.backend.entity.account.UserEntity;
import com.cafe.backend.entity.cafeteria.CafeteriaEntity;
import com.cafe.backend.entity.review.ReviewEntity;

import com.cafe.backend.exception.DataMappingException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

/**
 * @author VasilStoykov
 */

public class ReviewMapper {

    public static ReviewDTO mapToDTO(ReviewEntity reviewEntity) throws DataMappingException {
        if (reviewEntity == null) {
            throw new DataMappingException("ReviewEntity cannot be null");
        }
        return new ReviewDTO(
                reviewEntity.getId(),
                reviewEntity.getTitle(),
                reviewEntity.getBody(),
                reviewEntity.getRating(),
                reviewEntity.getCreatedAt(),
                reviewEntity.getUser().getId(),
                reviewEntity.getCafeteria().getId()
        );
    }


    public static ReviewEntity mapToEntity(ReviewDTO reviewDTO) throws DataMappingException {
        if (reviewDTO == null) {
            throw new DataMappingException("ReviewDTO cannot be null");
        }

        return ReviewEntity.builder()
                .id(reviewDTO.id())
                .title(reviewDTO.title())
                .body(reviewDTO.body())
                .rating(reviewDTO.rating())
                .createdAt(reviewDTO.createdAt())
                .build();
    }
}