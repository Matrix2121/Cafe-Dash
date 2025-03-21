package com.cafe.backend.entity.mapper;

import com.cafe.backend.dto.ReviewDTO;
import com.cafe.backend.entity.account.UserEntity;
import com.cafe.backend.entity.cafeteria.CafeteriaEntity;
import com.cafe.backend.entity.review.ReviewEntity;

import com.cafe.backend.exception.DataMappingException;

public class ReviewMapper {

    public static ReviewDTO mapToDTO(ReviewEntity reviewEntity) {
        if (reviewEntity == null) return null;

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

    public static ReviewEntity mapToEntity(ReviewDTO reviewDTO, UserEntity userEntity, CafeteriaEntity cafeteriaEntity) throws DataMappingException {
        try {
            if (reviewDTO == null) return null;

            return ReviewEntity.builder()
                    .id(reviewDTO.id())
                    .title(reviewDTO.title())
                    .body(reviewDTO.body())
                    .rating(reviewDTO.rating())
                    .createdAt(reviewDTO.createdAt())
                    .user(userEntity)
                    .cafeteria(cafeteriaEntity)
                    .build();

        } catch (Exception e) {
            throw new DataMappingException("Cannot map Review to entity", e);
        }
    }
}