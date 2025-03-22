package com.cafe.backend.entity.mapper;

import com.cafe.backend.dto.ReviewDTO;
import com.cafe.backend.entity.account.UserEntity;
import com.cafe.backend.entity.cafeteria.CafeteriaEntity;
import com.cafe.backend.entity.review.ReviewEntity;
import com.cafe.backend.exception.DataMappingException;

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

        UserEntity user = new UserEntity();
        user.setId(reviewDTO.userId());

        CafeteriaEntity cafeteria = new CafeteriaEntity();
        cafeteria.setId(reviewDTO.cafeteriaId());

        return ReviewEntity.builder()
                .id(reviewDTO.id())
                .title(reviewDTO.title())
                .body(reviewDTO.body())
                .rating(reviewDTO.rating())
                .createdAt(reviewDTO.createdAt())
                .user(user)
                .cafeteria(cafeteria)
                .build();
    }
}